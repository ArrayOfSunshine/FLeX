
/* Move index builder progress + full move metadata cache */
(function(){
  function sleep(ms){ return new Promise(function(resolve){ setTimeout(resolve, ms); }); }
  function apiMoveName(name){ return String(name || "").trim().replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase(); }
  function titleMoveName(api){ if(typeof formatMoveName === "function") return formatMoveName(api); return String(api || "").replace(/-/g," ").replace(/\b\w/g,function(c){ return c.toUpperCase(); }); }
  function setStatus(text){ var el=document.getElementById("moveIndexStatus"); if(el) el.textContent = text; }
  function getSharedMoveMetaCache(){ try{ return JSON.parse(localStorage.getItem(MOVE_META_CACHE_KEY) || "{}"); }catch(e){ return {}; } }
  function setSharedMoveMetaCache(cache){ try{ localStorage.setItem(MOVE_META_CACHE_KEY, JSON.stringify(cache)); }catch(e){ console.warn("Could not save move metadata cache", e); } }
  function extractMoveMeta(api, raw, existing){
    existing = existing || {};
    var flavour = "", effect = "";
    if(Array.isArray(raw.flavor_text_entries)){
      var f = raw.flavor_text_entries.find(function(x){ return x.language && x.language.name === "en" && x.version_group && x.version_group.name === "firered-leafgreen"; }) || raw.flavor_text_entries.find(function(x){ return x.language && x.language.name === "en"; });
      if(f) flavour = String(f.flavor_text || "").replace(/\s+/g," ").trim();
    }
    if(Array.isArray(raw.effect_entries)){
      var e = raw.effect_entries.find(function(x){ return x.language && x.language.name === "en"; });
      if(e) effect = String(e.short_effect || e.effect || "").replace(/\$effect_chance/g, raw.effect_chance || "").replace(/\s+/g," ").trim();
    }
    var damageClass = raw.damage_class && raw.damage_class.name ? raw.damage_class.name : (existing.damage_class || existing.category || "");
    return Object.assign({}, existing, {name:api,display:existing.display||titleMoveName(api),type:raw.type&&raw.type.name?raw.type.name:(existing.type||""),power:raw.power===null||raw.power===undefined?0:raw.power,accuracy:raw.accuracy===null||raw.accuracy===undefined?100:raw.accuracy,category:damageClass,damage_class:damageClass,pp:raw.pp===null||raw.pp===undefined?(existing.pp||0):raw.pp,priority:raw.priority===null||raw.priority===undefined?(existing.priority||0):raw.priority,flavor:flavour||existing.flavor||"",effect:effect||existing.effect||"",fullDetailsLoaded:true});
  }
  async function buildFullMoveMetadata(){
    var names = (window.GEN3_MOVE_NAMES || []).filter(Boolean);
    var cache = getSharedMoveMetaCache();
    var simpleMoveCache = (typeof getMoveCache === "function") ? getMoveCache() : {};
    for(var i=0; i<names.length; i++){
      var api = apiMoveName(names[i]);
      var cached = cache[api];
      if(!(cached && cached.fullDetailsLoaded)){
        try{
          setStatus("Building full move metadata " + (i+1) + "/" + names.length + " — " + titleMoveName(api));
          var response = await fetch("https://pokeapi.co/api/v2/move/" + api + "/");
          if(response.ok){
            var raw = await response.json();
            cache[api] = extractMoveMeta(api, raw, cache[api]);
            simpleMoveCache[api] = {type:cache[api].type,display:cache[api].display,power:cache[api].power,accuracy:cache[api].accuracy,category:cache[api].category};
          }
        }catch(e){ console.warn("Move metadata build failed for", api, e); }
      }
      if(i % 8 === 0){ setSharedMoveMetaCache(cache); if(typeof setMoveCache === "function") try{ setMoveCache(simpleMoveCache); }catch(e){} await sleep(20); }
    }
    setSharedMoveMetaCache(cache); if(typeof setMoveCache === "function") try{ setMoveCache(simpleMoveCache); }catch(e){}
  }
  function allMoveNamesFromPayload(payload){
    if(typeof allMoveNamesFromExpandedPayloadEggLine === "function") return allMoveNamesFromExpandedPayloadEggLine(payload);
    var out = [];
    function add(name){ var n = apiMoveName(name); if(n) out.push(titleMoveName(n)); }
    ["levelMoves","machineMoves","tutorMoves","eggMoves"].forEach(function(k){ (payload && payload[k] || []).forEach(function(m){ add(m && m.name ? m.name : m); }); });
    if(!out.length && payload && Array.isArray(payload.moves)){
      payload.moves.forEach(function(moveRecord){
        var moveName = moveRecord.move && moveRecord.move.name ? moveRecord.move.name : "";
        var valid = (moveRecord.version_group_details || []).some(function(detail){ if(!detail || !detail.version_group || detail.version_group.name !== "firered-leafgreen" || !detail.move_learn_method) return false; var method = detail.move_learn_method.name; return method === "level-up" || method === "machine" || method === "tutor" || method === "egg"; });
        if(valid) add(moveName);
      });
    }
    return Array.from(new Set(out));
  }
  window.buildDexMoveReferenceIndex = async function(force){
    if(typeof DEX_MOVE_REFERENCE_BUILDING !== "undefined" && DEX_MOVE_REFERENCE_BUILDING) return;
    if(typeof dexMoveReferenceReady === "function" && dexMoveReferenceReady() && !force){ if(typeof updateActiveDexFilters === "function") updateActiveDexFilters(); if(typeof applyFilter === "function") applyFilter(); return; }
    if(force && !confirm("Build/refresh the FireRed/LeafGreen move index and full move metadata cache? This runs once and caches the result in this browser.")) return;
    try{
      DEX_MOVE_REFERENCE_BUILDING = true; DEX_MOVE_FILTER_LOADING = true; DEX_MOVE_REFERENCE_PROGRESS = {done:0,total:386}; if(force) DEX_MOVE_REFERENCE_INDEX = {};
      var cards = Array.from(document.querySelectorAll(".card")); DEX_MOVE_REFERENCE_PROGRESS.total = cards.length;
      for(var i=0; i<cards.length; i++){
        var card = cards[i], id = card.dataset.id;
        if(!DEX_MOVE_REFERENCE_INDEX[id]){
          try{
            setStatus("Building Pokémon move index " + (i+1) + "/" + cards.length + " — #" + id);
            var payload = null;
            if(typeof window.fetchPokemonData === "function") payload = await window.fetchPokemonData(card.dataset.pokeid);
            else { var response = await fetch("https://pokeapi.co/api/v2/pokemon/" + card.dataset.pokeid + "/"); if(response.ok) payload = await response.json(); }
            DEX_MOVE_REFERENCE_INDEX[id] = allMoveNamesFromPayload(payload || {});
          }catch(e){ console.warn("Move index build failed for", id, e); }
        }
        DEX_MOVE_REFERENCE_PROGRESS.done = i + 1;
        if(i % 8 === 0){ if(typeof saveDexMoveReferenceIndex === "function") saveDexMoveReferenceIndex(); try{ localStorage.setItem(DEX_MOVE_REFERENCE_META_KEY, JSON.stringify({schema:(typeof MOVE_INDEX_EGG_LINE_SCHEMA!=="undefined"?MOVE_INDEX_EGG_LINE_SCHEMA:"progress-full-meta-v1"),builtAt:new Date().toISOString(),count:Object.keys(DEX_MOVE_REFERENCE_INDEX || {}).length})); }catch(e){} if(typeof updateActiveDexFilters === "function") updateActiveDexFilters(); await sleep(20); }
      }
      if(typeof saveDexMoveReferenceIndex === "function") saveDexMoveReferenceIndex();
      try{ localStorage.setItem(DEX_MOVE_REFERENCE_META_KEY, JSON.stringify({schema:(typeof MOVE_INDEX_EGG_LINE_SCHEMA!=="undefined"?MOVE_INDEX_EGG_LINE_SCHEMA:"progress-full-meta-v1"),builtAt:new Date().toISOString(),count:Object.keys(DEX_MOVE_REFERENCE_INDEX || {}).length})); }catch(e){}
      await buildFullMoveMetadata();
      setStatus("Move index and full metadata cache built: " + Object.keys(DEX_MOVE_REFERENCE_INDEX || {}).length + "/386 Pokémon, " + ((window.GEN3_MOVE_NAMES||[]).filter(Boolean).length) + " moves.");
      if(typeof renderMoveList === "function") renderMoveList();
    }finally{
      DEX_MOVE_REFERENCE_BUILDING = false; DEX_MOVE_FILTER_LOADING = false; if(typeof updateActiveDexFilters === "function") updateActiveDexFilters(); if(typeof applyFilter === "function") applyFilter();
    }
  };
})();
