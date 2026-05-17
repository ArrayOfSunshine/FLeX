
/* Final move cache consumer repair: display names, durable fallback, and robust filters */
(function(){
  "use strict";

  var STORAGE = (typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "leafgreen_251_dual_tracker_v3_");
  var FALLBACK_PREFIX = STORAGE + "move_meta_cache_v2_fallback_chunk_";
  var FALLBACK_COUNT_KEY = STORAGE + "move_meta_cache_v2_fallback_chunk_count";
  var FALLBACK_META_KEY = STORAGE + "move_meta_cache_v2_fallback_meta";
  var CHUNK_SIZE = 90000;
  var MOVE_TOTAL = 354;
  var fallbackMetaCache = loadFallbackMetaCache();

  function esc(v){return String(v == null ? "" : v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
  function slugMove(name){
    var s = String(name || "").trim();
    if(!s) return "";
    s = s.replace(/([a-z])([A-Z])/g,"$1 $2");
    return s.toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  }
  function compactMove(name){return String(name || "").toLowerCase().replace(/[^a-z0-9]/g,"");}
  function titleWords(s){return String(s || "").replace(/\b\w/g,function(c){return c.toUpperCase();});}

  var DISPLAY_EXCEPTIONS = {
    "double-edge":"Double-Edge",
    "self-destruct":"Self-Destruct",
    "soft-boiled":"Soft-Boiled",
    "high-jump-kick":"High Jump Kick",
    "mud-slap":"Mud-Slap",
    "lock-on":"Lock-On",
    "will-o-wisp":"Will-O-Wisp",
    "u-turn":"U-turn"
  };
  var MOVE_OBJS = buildMoveObjects();
  var MOVE_BY_SLUG = {}, MOVE_BY_COMPACT = {}, MOVE_BY_ID = {};
  MOVE_OBJS.forEach(function(o){MOVE_BY_SLUG[o.api]=o; MOVE_BY_COMPACT[o.compact]=o; MOVE_BY_ID[String(o.id)]=o;});

  function displayMoveName(name){
    var slug = slugMove(name);
    var obj = MOVE_BY_SLUG[slug] || MOVE_BY_COMPACT[compactMove(name)] || MOVE_BY_ID[String(name || "")];
    if(obj) return obj.display;
    if(DISPLAY_EXCEPTIONS[slug]) return DISPLAY_EXCEPTIONS[slug];
    return titleWords(slug.replace(/-/g," "));
  }

  function buildMoveObjects(){
    var names = window.GEN3_MOVE_NAMES || [];
    var out = [];
    for(var i=1;i<names.length && i<=MOVE_TOTAL;i++){
      var raw = names[i];
      if(!raw) continue;
      var slug = slugMove(raw);
      var spaced = String(raw).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[-_]+/g," ").replace(/\s+/g," ").trim();
      var display = DISPLAY_EXCEPTIONS[slug] || titleWords(spaced);
      out.push({id:i, raw:raw, api:slug, compact:compactMove(raw), display:display});
    }
    return out;
  }

  try{
    formatMoveName = function(name){ return displayMoveName(name); };
    window.formatMoveName = formatMoveName;
  }catch(e){ window.formatMoveName = displayMoveName; }

  function removeFallbackChunks(){
    try{
      var oldCount = parseInt(localStorage.getItem(FALLBACK_COUNT_KEY) || "0",10) || 0;
      for(var i=0;i<oldCount+20;i++) localStorage.removeItem(FALLBACK_PREFIX + i);
      localStorage.removeItem(FALLBACK_COUNT_KEY);
      localStorage.removeItem(FALLBACK_META_KEY);
    }catch(e){}
  }
  function saveFallbackMetaCache(cache){
    cache = cache || {};
    try{
      removeFallbackChunks();
      var json = JSON.stringify(cache);
      var count = Math.ceil(json.length / CHUNK_SIZE);
      for(var i=0;i<count;i++) localStorage.setItem(FALLBACK_PREFIX + i, json.slice(i*CHUNK_SIZE,(i+1)*CHUNK_SIZE));
      localStorage.setItem(FALLBACK_COUNT_KEY, String(count));
      localStorage.setItem(FALLBACK_META_KEY, JSON.stringify({schema:"frlg_move_meta_fallback_v1", count:Object.keys(cache).length, savedAt:new Date().toISOString()}));
      fallbackMetaCache = cache;
      return true;
    }catch(e){
      console.warn("Could not save compact move metadata fallback", e);
      return false;
    }
  }
  function loadFallbackMetaCache(){
    try{
      var count = parseInt(localStorage.getItem(FALLBACK_COUNT_KEY) || "0",10) || 0;
      if(!count) return {};
      var json = "";
      for(var i=0;i<count;i++) json += localStorage.getItem(FALLBACK_PREFIX + i) || "";
      return json ? JSON.parse(json) : {};
    }catch(e){
      console.warn("Could not load compact move metadata fallback", e);
      return {};
    }
  }
  function objForMove(move){
    var raw = String(move && move.name ? move.name : (move || "")).trim();
    if(!raw) return null;
    return MOVE_BY_SLUG[slugMove(raw)] || MOVE_BY_COMPACT[compactMove(raw)] || MOVE_BY_ID[String(raw)] || null;
  }
  function fallbackMeta(move){
    var obj = typeof move === "object" && move && move.api ? move : objForMove(move);
    if(!obj) return null;
    return fallbackMetaCache[obj.api] || fallbackMetaCache[obj.compact] || null;
  }
  function collectFallbackSnapshot(){
    var cache = {};
    for(var i=0;i<MOVE_OBJS.length;i++){
      var obj = MOVE_OBJS[i];
      var meta = null;
      try{ if(previousGetMoveMetaSync) meta = previousGetMoveMetaSync(obj.api) || previousGetMoveMetaSync(obj.display) || previousGetMoveMetaSync(obj.raw); }catch(e){}
      meta = meta || fallbackMeta(obj);
      if(meta && (meta.type || meta.damage_class || meta.category || meta.fullDetailsLoaded)){
        var copy = {};
        for(var k in meta) copy[k] = meta[k];
        copy.id = obj.id;
        copy.api = obj.api;
        copy.display = obj.display;
        copy.name = copy.name || obj.api;
        cache[obj.api] = copy;
      }
    }
    return cache;
  }
  function saveFallbackSnapshot(){
    var snapshot = collectFallbackSnapshot();
    if(Object.keys(snapshot).length) saveFallbackMetaCache(snapshot);
    return snapshot;
  }

  var previousGetMoveMetaSync = window.getMoveMetaSync;
  var previousGetMoveMeta = window.getMoveMeta;
  window.getMoveMetaSync = function(move){
    var meta = null;
    try{ if(previousGetMoveMetaSync) meta = previousGetMoveMetaSync(move); }catch(e){}
    if(meta) return normaliseMetaDisplay(meta, move);
    return normaliseMetaDisplay(fallbackMeta(move), move);
  };
  window.getMoveMeta = async function(move){
    var cached = window.getMoveMetaSync(move);
    if(cached) return cached;
    if(previousGetMoveMeta){
      try{
        var meta = await previousGetMoveMeta(move);
        if(meta){
          var obj = objForMove(move);
          if(obj){ fallbackMetaCache[obj.api] = normaliseMetaDisplay(meta, obj); saveFallbackMetaCache(fallbackMetaCache); }
          return normaliseMetaDisplay(meta, move);
        }
      }catch(e){ console.warn("getMoveMeta fallback fetch failed", move, e); }
    }
    return null;
  };
  function normaliseMetaDisplay(meta, move){
    if(!meta) return null;
    var obj = objForMove(move) || objForMove(meta.api || meta.name || meta.display);
    if(obj && meta.display !== obj.display){
      var copy = {};
      for(var k in meta) copy[k] = meta[k];
      copy.display = obj.display;
      copy.api = obj.api;
      copy.id = obj.id;
      return copy;
    }
    return meta;
  }

  window.ensureMoveOptionsLoaded = function(){
    var dl = document.getElementById("moveOptions");
    if(!dl) return;
    var opts = MOVE_OBJS.slice().sort(function(a,b){return a.display.localeCompare(b.display);});
    dl.innerHTML = opts.map(function(o){return '<option value="'+esc(o.display)+'"></option>';}).join("");
  };

  function itemNames(item){
    if(item == null) return [];
    if(typeof item === "string" || typeof item === "number") return [String(item)];
    var out = [];
    ["name","display","api","raw","normalised","normalized","move","moveName"].forEach(function(k){
      var v = item[k];
      if(!v) return;
      if(typeof v === "string" || typeof v === "number") out.push(String(v));
      else if(v.name) out.push(String(v.name));
      else if(v.display) out.push(String(v.display));
    });
    return out;
  }
  function keySetForNames(names){
    var set = {};
    (names || []).forEach(function(n){
      itemNames(n).forEach(function(raw){
        var obj = objForMove(raw);
        var display = obj ? obj.display : displayMoveName(raw);
        [raw, slugMove(raw), compactMove(raw), display, slugMove(display), compactMove(display)].forEach(function(k){ if(k) set[k.toLowerCase ? k.toLowerCase() : k] = true; });
      });
    });
    return set;
  }
  function setHasMove(set, move){
    var obj = objForMove(move);
    var display = obj ? obj.display : displayMoveName(move);
    var candidates = [move, slugMove(move), compactMove(move), display, slugMove(display), compactMove(display)];
    for(var i=0;i<candidates.length;i++){
      var k = String(candidates[i] || "").toLowerCase();
      if(k && set[k]) return true;
    }
    return false;
  }
  function selectedInputs(prefix){
    var out = [], seen = {};
    for(var i=0;i<4;i++){
      var el = document.getElementById(prefix + i);
      if(el && el.value.trim()){
        var val = el.value.trim();
        var key = compactMove(val);
        if(key && !seen[key]){seen[key]=true; out.push(val);}
      }
    }
    return out;
  }
  function selectedDexMoveNames(){
    var out = selectedInputs("dexMoveFilter_");
    var oldEl = document.getElementById("dexMoveFilter");
    if(oldEl && oldEl.value.trim() && !out.some(function(v){return compactMove(v)===compactMove(oldEl.value);})) out.push(oldEl.value.trim());
    return out;
  }
  function selectedMyMonMoveNames(){
    var out = selectedInputs("myMonsMoveFilter_");
    var oldEl = document.getElementById("myMonsMoveFilter");
    if(oldEl && oldEl.value.trim() && !out.some(function(v){return compactMove(v)===compactMove(oldEl.value);})) out.push(oldEl.value.trim());
    return out;
  }
  function indexListForCard(card){
    if(typeof DEX_MOVE_REFERENCE_INDEX === "undefined" || !DEX_MOVE_REFERENCE_INDEX || !card) return [];
    var id = card.dataset ? card.dataset.id : "";
    var pokeid = card.dataset ? card.dataset.pokeid : "";
    var keys = [id, String(parseInt(id,10)||""), pokeid, String(parseInt(pokeid,10)||"")];
    for(var i=0;i<keys.length;i++){
      var k = keys[i];
      if(k && DEX_MOVE_REFERENCE_INDEX[k]) return DEX_MOVE_REFERENCE_INDEX[k] || [];
    }
    return [];
  }

  window.getDexMoveFilterValues = function(){
    return selectedDexMoveNames().map(function(v){return {display:v, normalised:slugMove(v)};});
  };
  window.hasAnyDexMoveFilter = function(){ return selectedDexMoveNames().length > 0; };
  try{
    dexMoveFilterAllowsCard = function(card){
      var selected = selectedDexMoveNames();
      if(!selected.length) return true;
      if(typeof dexMoveReferenceReady === "function" && !dexMoveReferenceReady()) return true;
      var list = indexListForCard(card);
      var set = keySetForNames(list);
      return selected.every(function(m){return setHasMove(set,m);});
    };
    window.dexMoveFilterAllowsCard = dexMoveFilterAllowsCard;
  }catch(e){ window.dexMoveFilterAllowsCard = function(card){return true;}; }

  try{
    getMyMonsMoveFilterValues = function(){ return selectedMyMonMoveNames().map(slugMove).slice(0,4); };
    window.getMyMonsMoveFilterValues = getMyMonsMoveFilterValues;
  }catch(e){}

  try{
    monMatchesMyMonsFilters = function(mon){
      var search = ((document.getElementById("myMonsSearch") || {}).value || "").trim().toLowerCase();
      var type = (document.getElementById("myMonsTypeFilter") || {}).value || "";
      var type2 = (document.getElementById("myMonsTypeFilter2") || {}).value || "";
      var nature = (document.getElementById("myMonsNatureFilter") || {}).value || "";
      var abilityEl = document.getElementById("myMonsAbilityFilter");
      var rawAbilityFilter = (abilityEl && abilityEl.value || "").trim().toLowerCase();
      var abilityFilter = typeof normaliseAbilityName === "function" ? normaliseAbilityName(rawAbilityFilter) : rawAbilityFilter;
      var selected = selectedMyMonMoveNames();
      var speciesName = (mon && (mon.speciesName || (typeof getSpeciesName === "function" ? getSpeciesName(mon.speciesId) : ""))) || "";
      if(search && typeof speciesFilterMatches === "function" && !speciesFilterMatches(mon.speciesId || "", speciesName, search)) return false;
      if(nature && String(mon.nature || "").toLowerCase() !== nature) return false;
      if(abilityFilter){
        var monAbility = typeof normaliseAbilityName === "function" ? normaliseAbilityName(mon.ability || "") : String(mon.ability || "").toLowerCase();
        var monAbilityDisplay = typeof displayAbilityName === "function" ? displayAbilityName(mon.ability || "").toLowerCase() : String(mon.ability || "").toLowerCase();
        if(!(monAbility === abilityFilter || monAbility.indexOf(abilityFilter) >= 0 || monAbilityDisplay.indexOf(rawAbilityFilter) >= 0)) return false;
      }
      var types = typeof getSpeciesTypesForMon === "function" ? getSpeciesTypesForMon(mon) : [];
      if(type && types.indexOf(type) < 0) return false;
      if(type2 && types.indexOf(type2) < 0) return false;
      if(selected.length){
        var moves = (mon && mon.moves || []).map(function(m){return m && m.name ? m.name : m;});
        var set = keySetForNames(moves);
        if(!selected.every(function(m){return setHasMove(set,m);})) return false;
      }
      return true;
    };
    window.monMatchesMyMonsFilters = monMatchesMyMonsFilters;
  }catch(e){}

  function setupMoveTypeFilter(){
    var sel = document.getElementById("moveListTypeFilter");
    if(sel && sel.options.length <= 1){
      ["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel"].forEach(function(t){var o=document.createElement("option"); o.value=t; o.textContent=t.charAt(0).toUpperCase()+t.slice(1); sel.appendChild(o);});
    }
  }
  function moveListFilters(){return {name:(document.getElementById("moveListNameFilter")||{}).value||"",type:(document.getElementById("moveListTypeFilter")||{}).value||"",cat:(document.getElementById("moveListCategoryFilter")||{}).value||"",power:(document.getElementById("moveListPowerFilter")||{}).value||"",acc:(document.getElementById("moveListAccuracyFilter")||{}).value||""};}
  function movePasses(obj,meta,f){
    if(f.name && compactMove(obj.display).indexOf(compactMove(f.name)) < 0 && obj.api.indexOf(slugMove(f.name)) < 0) return false;
    if(f.type && (!meta || meta.type !== f.type)) return false;
    var cls = meta && (meta.damage_class || meta.category) || "";
    if(f.cat && cls !== f.cat) return false;
    var p = meta && meta.power != null ? Number(meta.power) : null;
    var a = meta && meta.accuracy != null ? Number(meta.accuracy) : null;
    if(f.power){ if(f.power === "status" && p !== null) return false; if(f.power === "lt60" && !(p !== null && p < 60)) return false; if(f.power === "60to89" && !(p >= 60 && p <= 89)) return false; if(f.power === "90plus" && !(p >= 90)) return false; if(f.power === "damaging" && !(p > 0)) return false; if(f.power === "non-damaging" && !(p === null || p === 0)) return false; if(f.power === "60plus" && !(p >= 60)) return false; if(f.power === "80plus" && !(p >= 80)) return false; if(f.power === "100plus" && !(p >= 100)) return false; }
    if(f.acc){ if(f.acc === "perfect" && !(a === 100 || a === null)) return false; if(f.acc === "lt100" && !(a !== null && a < 100)) return false; if(f.acc === "lt85" && !(a !== null && a < 85)) return false; if(f.acc === "90plus" && !(a >= 90 || a === null)) return false; if(f.acc === "less90" && !(a !== null && a < 90)) return false; }
    return true;
  }
  function renderMoveCard(obj,meta){
    meta = normaliseMetaDisplay(meta,obj);
    var loaded = !!(meta && (meta.type || meta.damage_class || meta.category));
    var type = loaded ? meta.type : "Metadata not loaded";
    var cls = loaded ? (meta.damage_class || meta.category || "—") : "—";
    var power = loaded ? (meta.power == null ? "—" : meta.power) : "—";
    var acc = loaded ? (meta.accuracy == null ? "—" : meta.accuracy + "%") : "—";
    var pp = loaded ? (meta.pp == null ? "—" : meta.pp) : "—";
    var pri = loaded ? (meta.priority || 0) : "—";
    var desc = loaded ? (meta.flavor || meta.effect || "No description available.") : "Metadata not loaded. Use Settings → Build/refresh move index to cache details.";
    var effect = loaded && meta.effect && meta.effect !== desc ? '<div class="moveEffect"><b>Effect:</b> '+esc(meta.effect)+'</div>' : "";
    return '<article class="moveListCard" id="move-entry-'+esc(obj.api)+'" data-move-api="'+esc(obj.api)+'"><h3>'+esc(obj.display)+'</h3><div class="moveMetaGrid"><span>Type: '+esc(type)+'</span><span>Class: '+esc(cls)+'</span><span>Power: '+esc(power)+'</span><span>Accuracy: '+esc(acc)+'</span><span>PP: '+esc(pp)+'</span><span>Priority: '+esc(pri)+'</span></div><div class="moveDescription">'+esc(desc)+'</div>'+effect+'</article>';
  }
  window.renderMoveList = function(){
    var out = document.getElementById("moveListResults");
    if(!out) return;
    window.ensureMoveOptionsLoaded();
    setupMoveTypeFilter();
    var f = moveListFilters();
    var arr = MOVE_OBJS.filter(function(obj){return movePasses(obj, window.getMoveMetaSync(obj.api), f);}).sort(function(a,b){return a.display.localeCompare(b.display);});
    var summary = document.getElementById("activeMoveListFilters");
    if(summary){var parts=[]; if(f.name)parts.push('Name contains "'+f.name+'"'); if(f.type)parts.push("Type "+f.type); if(f.cat)parts.push(f.cat); if(f.power)parts.push("Power "+f.power); if(f.acc)parts.push("Accuracy "+f.acc); summary.textContent=(parts.length?parts.join(", "):"None")+" — "+arr.length+" shown";}
    var loaded = arr.filter(function(obj){var m=window.getMoveMetaSync(obj.api); return m && (m.type || m.damage_class || m.category);}).length;
    var st = document.getElementById("moveListStatus"); if(st) st.textContent = arr.length+" moves shown. Metadata available for "+loaded+"/"+arr.length+".";
    out.innerHTML = arr.map(function(obj){return renderMoveCard(obj, window.getMoveMetaSync(obj.api));}).join("");
  };
  window.openMoveListEntry = function(moveName){
    var obj = objForMove(moveName), api = obj ? obj.api : slugMove(moveName);
    if(typeof showTab === "function") showTab("moveListTab");
    setTimeout(function(){var f=document.getElementById("moveListNameFilter"); if(f) f.value = obj ? obj.display : displayMoveName(moveName); window.renderMoveList(); setTimeout(function(){var c=document.getElementById("move-entry-"+api); if(c){c.scrollIntoView({block:"center"}); c.classList.add("locationJumpHighlight"); setTimeout(function(){c.classList.remove("locationJumpHighlight");},1600);}},80);},0);
  };

  var previousBuildDexMoveReferenceIndex = window.buildDexMoveReferenceIndex;
  window.buildDexMoveReferenceIndex = async function(force){
    if(previousBuildDexMoveReferenceIndex) await previousBuildDexMoveReferenceIndex(force);
    saveFallbackSnapshot();
    window.ensureMoveOptionsLoaded();
    if(typeof applyFilter === "function") applyFilter();
    if(typeof renderMyMons === "function") renderMyMons();
    if(typeof renderTeams === "function") renderTeams();
    window.renderMoveList();
  };

  function initFinalMoveConsumers(){
    window.ensureMoveOptionsLoaded();
    saveFallbackSnapshot();
    if(typeof applyFilter === "function") applyFilter();
    if(typeof renderMyMons === "function") renderMyMons();
    window.renderMoveList();
    setTimeout(function(){saveFallbackSnapshot(); if(typeof applyFilter === "function") applyFilter(); if(typeof renderMyMons === "function") renderMyMons(); window.renderMoveList();},1200);
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", initFinalMoveConsumers); else initFinalMoveConsumers();
  window.addEventListener("load", function(){setTimeout(initFinalMoveConsumers,400);});
})();
