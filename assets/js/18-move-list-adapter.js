
/* Move List metadata adapter/fix v5 - renders shared cache metadata and keeps rebuild progress visible */
(function(){
  var STORAGE = (typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "leafgreen_251_dual_tracker_v3_");
  var META_KEY = (typeof MOVE_META_CACHE_KEY !== "undefined" ? MOVE_META_CACHE_KEY : STORAGE + "move_meta_cache_v1");
  var SIMPLE_KEY = (typeof moveCacheKey === "function" ? moveCacheKey() : STORAGE + "move_cache_v1");
  var LEGACY_SIMPLE_KEYS = [SIMPLE_KEY, STORAGE + "move_cache_v1", STORAGE + "all_moves_type_cache_v1"];
  var META_SCHEMA = "frlg_move_meta_shared_v5";

  function sleep(ms){ return new Promise(function(resolve){ setTimeout(resolve, ms); }); }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>\"]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
  function readJson(key, fallback){ try{ return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }catch(e){ return fallback; } }
  function writeJson(key, value){ try{ localStorage.setItem(key, JSON.stringify(value)); return true; }catch(e){ console.warn("Could not write", key, e); return false; } }
  function slugMove(name){ return String(name || "").trim().replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[’']/g,"").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase(); }
  function compactKey(name){ return slugMove(name).replace(/-/g,""); }
  function prettyMove(name){ var slug = slugMove(name); if(typeof formatMoveName === "function") return formatMoveName(slug); return slug.replace(/-/g," ").replace(/\b\w/g,function(c){ return c.toUpperCase(); }); }
  function setListStatus(text){ var el=document.getElementById("moveListStatus"); if(el) el.textContent=text; }
  function setIndexStatus(text){ var el=document.getElementById("moveIndexStatus"); if(el) el.textContent=text; }
  function ensureMoveNames(){ if(window.GEN3_MOVE_NAMES && window.GEN3_MOVE_NAMES.length >= 355) return; }
  function moveObjects(){ ensureMoveNames(); return (window.GEN3_MOVE_NAMES || []).map(function(n,i){ return n ? {id:i, raw:n, api:slugMove(n), compact:compactKey(n), display:prettyMove(n)} : null; }).filter(Boolean); }
  function objForMove(move){ var slug=slugMove(move), compact=compactKey(move); return moveObjects().find(function(o){ return o.api===slug || o.compact===compact || slugMove(o.display)===slug; }) || null; }
  function allLookupKeys(obj){ var keys=[obj.api,obj.compact,slugMove(obj.raw),compactKey(obj.raw),slugMove(obj.display),compactKey(obj.display)]; return keys.filter(function(k,i,a){ return k && a.indexOf(k)===i; }); }
  function metaCache(){ return readJson(META_KEY, {}); }
  function simpleCaches(){ return LEGACY_SIMPLE_KEYS.map(function(k){ return {key:k, cache:readJson(k,{})}; }); }
  function normaliseCachedMeta(obj, meta, source){
    if(!meta) return null;
    var dc = meta.damage_class || meta.damageClass || meta.category || meta.class || "";
    var type = meta.type || (meta.typeName || "");
    if(type && typeof type === "object" && type.name) type = type.name;
    return {
      schema: meta.schema || META_SCHEMA,
      id: meta.id || obj.id,
      name: obj.api,
      display: meta.display || meta.nameDisplay || prettyMove(obj.api),
      type: type || "",
      power: meta.power === null || meta.power === undefined || meta.power === "" ? 0 : Number(meta.power),
      accuracy: meta.accuracy === null || meta.accuracy === undefined || meta.accuracy === "" ? 100 : Number(meta.accuracy),
      category: dc,
      damage_class: dc,
      pp: meta.pp === null || meta.pp === undefined || meta.pp === "" ? 0 : Number(meta.pp),
      priority: meta.priority === null || meta.priority === undefined || meta.priority === "" ? 0 : Number(meta.priority),
      flavor: meta.flavor || meta.description || meta.desc || "",
      effect: meta.effect || meta.short_effect || meta.shortEffect || "",
      fullDetailsLoaded: !!(meta.fullDetailsLoaded || meta.pp || meta.priority || meta.flavor || meta.effect || meta.description || meta.desc),
      source: source || meta.source || "cache"
    };
  }
  function getMoveMetaForDisplay(move){
    var obj = typeof move === "object" ? move : objForMove(move);
    if(!obj) return null;
    var keys=allLookupKeys(obj), cache=metaCache();
    for(var i=0;i<keys.length;i++){ if(cache[keys[i]]) return normaliseCachedMeta(obj, cache[keys[i]], "move_meta_cache"); }
    var stores=simpleCaches();
    for(var s=0;s<stores.length;s++){
      for(var k=0;k<keys.length;k++){
        var m=stores[s].cache[keys[k]];
        if(m) return normaliseCachedMeta(obj, m, stores[s].key);
      }
    }
    return null;
  }
  function cacheMeta(obj, meta){
    if(!obj || !meta) return meta;
    var cache=metaCache();
    var normal=normaliseCachedMeta(obj, meta, meta.source || "normalised");
    normal.fullDetailsLoaded = !!meta.fullDetailsLoaded;
    normal.schema = META_SCHEMA;
    allLookupKeys(obj).forEach(function(k){ cache[k]=normal; });
    writeJson(META_KEY, cache);
    var simple=readJson(SIMPLE_KEY, {});
    allLookupKeys(obj).forEach(function(k){ simple[k]=Object.assign({}, simple[k] || {}, {display:normal.display,type:normal.type,power:normal.power,accuracy:normal.accuracy,category:normal.category,damage_class:normal.damage_class}); });
    writeJson(SIMPLE_KEY, simple);
    return normal;
  }
  function compactMetaFromApi(obj, raw){
    var flavor="", effect="";
    if(raw && Array.isArray(raw.flavor_text_entries)){
      var f=raw.flavor_text_entries.find(function(x){return x.language&&x.language.name==="en"&&x.version_group&&x.version_group.name==="firered-leafgreen";}) || raw.flavor_text_entries.find(function(x){return x.language&&x.language.name==="en";});
      if(f) flavor=String(f.flavor_text||"").replace(/\s+/g," ").trim();
    }
    if(raw && Array.isArray(raw.effect_entries)){
      var e=raw.effect_entries.find(function(x){return x.language&&x.language.name==="en";});
      if(e) effect=String(e.short_effect||e.effect||"").replace(/\$effect_chance/g, raw.effect_chance || "").replace(/\s+/g," ").trim();
    }
    var dc=raw&&raw.damage_class&&raw.damage_class.name ? raw.damage_class.name : "";
    return {schema:META_SCHEMA,id:obj.id,name:obj.api,display:obj.display,pokeApiName:raw&&raw.name?raw.name:obj.api,type:raw&&raw.type&&raw.type.name?raw.type.name:"",power:raw&&raw.power!==null&&raw.power!==undefined?raw.power:0,accuracy:raw&&raw.accuracy!==null&&raw.accuracy!==undefined?raw.accuracy:100,category:dc,damage_class:dc,pp:raw&&raw.pp!==null&&raw.pp!==undefined?raw.pp:0,priority:raw&&raw.priority!==null&&raw.priority!==undefined?raw.priority:0,flavor:flavor,effect:effect,fullDetailsLoaded:true,source:"pokeapi"};
  }
  async function fetchMoveMeta(obj){
    var existing=getMoveMetaForDisplay(obj);
    if(existing && existing.fullDetailsLoaded && existing.type && existing.damage_class) return existing;
    var response=await fetch("https://pokeapi.co/api/v2/move/"+obj.id+"/");
    if(!response.ok) throw new Error("Move metadata request failed for #"+obj.id+" "+obj.display);
    return cacheMeta(obj, compactMetaFromApi(obj, await response.json()));
  }

  var previousGetMoveMeta = window.getMoveMeta;
  window.getMoveMeta = async function(moveName){
    var obj=objForMove(moveName);
    if(!obj){ return typeof previousGetMoveMeta === "function" ? previousGetMoveMeta(moveName) : null; }
    var existing=getMoveMetaForDisplay(obj);
    if(existing && existing.type && existing.damage_class) return cacheMeta(obj, existing);
    try{ return await fetchMoveMeta(obj); }
    catch(e){ if(typeof previousGetMoveMeta === "function") return previousGetMoveMeta(moveName); return null; }
  };

  function seedMoveOptions(){
    var dl=document.getElementById("moveOptions");
    var objs=moveObjects().slice().sort(function(a,b){ return a.display.localeCompare(b.display); });
    if(dl) dl.innerHTML=objs.map(function(o){ return '<option value="'+esc(o.display)+'"></option>'; }).join("");
  }
  window.ensureMoveOptionsLoaded = function(){ seedMoveOptions(); };

  function currentFilters(){ return {name:(document.getElementById("moveListNameFilter")||{}).value||"",type:(document.getElementById("moveListTypeFilter")||{}).value||"",cat:(document.getElementById("moveListCategoryFilter")||{}).value||"",power:(document.getElementById("moveListPowerFilter")||{}).value||"",acc:(document.getElementById("moveListAccuracyFilter")||{}).value||""}; }
  function movePasses(obj, meta, f){
    var nf=slugMove(f.name||""), nc=compactKey(f.name||"");
    if(nf && obj.api.indexOf(nf)<0 && obj.compact.indexOf(nc)<0 && obj.display.toLowerCase().indexOf(String(f.name).toLowerCase())<0) return false;
    if(f.type && (!meta || meta.type!==f.type)) return false;
    if(f.cat && (!meta || (meta.damage_class||meta.category)!==f.cat)) return false;
    var p=meta?meta.power:null, a=meta?meta.accuracy:null;
    if(f.power==="damaging" && !(p>0)) return false;
    if(f.power==="non-damaging" && !(p===0 || p===null || p===undefined)) return false;
    if(f.power==="60plus" && !(p>=60)) return false;
    if(f.power==="80plus" && !(p>=80)) return false;
    if(f.power==="100plus" && !(p>=100)) return false;
    if(f.acc==="perfect" && !(a===100 || a===null || a===undefined)) return false;
    if(f.acc==="90plus" && !(a>=90 || a===null || a===undefined)) return false;
    if(f.acc==="less90" && !(a!==null && a!==undefined && a<90)) return false;
    return true;
  }
  function renderMoveCard(obj, meta){
    var hasMeta=!!(meta && (meta.type || meta.damage_class || meta.category || meta.pp || meta.power || meta.flavor || meta.effect));
    var type=meta&&meta.type?meta.type:"Metadata not loaded";
    var cat=meta&&(meta.damage_class||meta.category)?(meta.damage_class||meta.category):"Metadata not loaded";
    var power=!meta||meta.power===null||meta.power===undefined?"—":(meta.power===0?"—":meta.power);
    var accuracy=!meta||meta.accuracy===null||meta.accuracy===undefined?"—":(meta.accuracy===100?"100%":meta.accuracy+"%");
    var pp=!meta||meta.pp===null||meta.pp===undefined||meta.pp===0?"—":meta.pp;
    var priority=meta&&meta.priority?meta.priority:0;
    var desc=meta&&(meta.flavor||meta.effect)?(meta.flavor||meta.effect):(hasMeta?"No description cached yet.":"Metadata not loaded. Use Load details or Build/refresh move index in Settings.");
    var effect=meta&&meta.effect&&meta.effect!==desc?'<div class="moveEffect"><b>Effect:</b> '+esc(meta.effect)+'</div>':"";
    return '<article class="moveListCard" id="move-entry-'+esc(obj.api)+'" data-move-api="'+esc(obj.api)+'"><h3>'+esc(obj.display)+'</h3><div class="moveMetaGrid"><span>Type: '+esc(type)+'</span><span>Class: '+esc(cat)+'</span><span>Power: '+esc(power)+'</span><span>Accuracy: '+esc(accuracy)+'</span><span>PP: '+esc(pp)+'</span><span>Priority: '+esc(priority)+'</span></div><div class="moveDescription">'+esc(desc)+'</div>'+effect+(!meta||!meta.fullDetailsLoaded?'<div style="margin-top:8px"><button class="miniButton" onclick="loadMoveListDetail(\''+esc(obj.api)+'\')">Load details</button></div>':"")+'</article>';
  }
  window.renderMoveList = function(){
    var out=document.getElementById("moveListResults"); if(!out) return;
    seedMoveOptions();
    var f=currentFilters();
    var arr=moveObjects().filter(function(obj){ return movePasses(obj, getMoveMetaForDisplay(obj), f); });
    arr.sort(function(a,b){ return a.display.localeCompare(b.display); });
    var summary=document.getElementById("activeMoveListFilters");
    if(summary){ var parts=[]; if(f.name) parts.push('Name contains "'+f.name+'"'); if(f.type) parts.push("Type "+f.type); if(f.cat) parts.push(f.cat); if(f.power) parts.push("Power "+f.power); if(f.acc) parts.push("Accuracy "+f.acc); summary.textContent=(parts.length?parts.join(", "):"None")+" — "+arr.length+" shown"; }
    var loaded=arr.filter(function(obj){ var m=getMoveMetaForDisplay(obj); return m && (m.type || m.damage_class || m.category); }).length;
    setListStatus(arr.length+" moves shown. Metadata available for "+loaded+"/"+arr.length+".");
    out.innerHTML=arr.map(function(obj){ return renderMoveCard(obj, getMoveMetaForDisplay(obj)); }).join("");
  };
  window.loadMoveListDetail = async function(move){
    var obj=objForMove(move), slug=obj?obj.api:slugMove(move), card=document.getElementById("move-entry-"+slug);
    if(card) card.innerHTML='<div class="loading">Loading '+esc(obj?obj.display:prettyMove(slug))+'...</div>';
    try{ if(!obj) throw new Error("Unknown Gen 3 move: "+move); await fetchMoveMeta(obj); window.renderMoveList(); setTimeout(function(){ var c=document.getElementById("move-entry-"+obj.api); if(c) c.scrollIntoView({block:"center"}); },0); }
    catch(e){ if(card) card.innerHTML='<div class="error">Could not load '+esc(move)+': '+esc(e.message||e)+'</div>'; }
  };
  window.loadVisibleMoveListDetails = async function(){
    var cards=Array.from(document.querySelectorAll(".moveListCard")), total=cards.length, loaded=0;
    for(var i=0;i<cards.length;i++){
      var obj=objForMove(cards[i].getAttribute("data-move-api")); if(!obj) continue;
      var existing=getMoveMetaForDisplay(obj);
      if(existing&&existing.fullDetailsLoaded){ loaded++; continue; }
      setListStatus("Loading move details "+(i+1)+"/"+total+" — "+obj.display);
      try{ await fetchMoveMeta(obj); loaded++; }catch(e){ console.warn("Move metadata load failed", obj.display, e); }
      if(i%5===0) await sleep(15);
    }
    window.renderMoveList();
    setListStatus("Loaded move details for "+loaded+"/"+total+" shown moves.");
  };
  window.clearMoveListFilters = function(){ ["moveListNameFilter","moveListTypeFilter","moveListCategoryFilter","moveListPowerFilter","moveListAccuracyFilter"].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=""; }); window.renderMoveList(); };
  window.openMoveListEntry = function(moveName){ var obj=objForMove(moveName), api=obj?obj.api:slugMove(moveName); if(typeof showTab==="function") showTab("moveListTab"); setTimeout(function(){ var f=document.getElementById("moveListNameFilter"); if(f) f.value=obj?obj.display:prettyMove(api); window.renderMoveList(); setTimeout(function(){ var c=document.getElementById("move-entry-"+api); if(c){ c.scrollIntoView({block:"center"}); c.classList.add("locationJumpHighlight"); setTimeout(function(){c.classList.remove("locationJumpHighlight");},1600); } },80); },0); };

  var previousBuildIndex = window.buildDexMoveReferenceIndex;
  window.buildDexMoveReferenceIndex = async function(force){
    if(typeof previousBuildIndex === "function"){
      setIndexStatus("Starting move index and metadata refresh...");
      await sleep(20);
      var result = await previousBuildIndex(force);
      var objs = moveObjects();
      var available = 0;
      for(var i=0;i<objs.length;i++){
        var meta = getMoveMetaForDisplay(objs[i]);
        if(meta && (meta.type || meta.damage_class || meta.category || meta.pp || meta.power || meta.flavor || meta.effect)) available++;
      }
      window.renderMoveList && window.renderMoveList();
      setIndexStatus("Move index and metadata refresh complete: "+available+"/"+objs.length+" move metadata records available.");
      return result;
    }
  };

  function setupMoveTypeFilter(){ var sel=document.getElementById("moveListTypeFilter"); if(sel && sel.options.length<=1){ ["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel"].forEach(function(t){ var o=document.createElement("option"); o.value=t; o.textContent=t.charAt(0).toUpperCase()+t.slice(1); sel.appendChild(o); }); } }
  function init(){ setupMoveTypeFilter(); seedMoveOptions(); if(typeof window.renderMoveList === "function") window.renderMoveList(); }
  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", init);
})();

/* Canonical Gen 3 move cache consolidation — final override
   One compact cache, one public metadata accessor, one rebuild flow. */
(function(){
  "use strict";

  var STORAGE = (typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "leafgreen_251_dual_tracker_v3_");
  var CANONICAL_META_KEY = STORAGE + "move_meta_cache_v2";
  var CANONICAL_SCHEMA = "frlg_gen3_move_meta_v2_compact";
  var LEGACY_META_KEY = STORAGE + "move_meta_cache_v1";
  var LEGACY_SIMPLE_KEY = STORAGE + "all_moves_type_cache_v1";
  var RAW_MOVE_PREFIX = STORAGE + "raw_move_v1_";
  var LAST_DIAGNOSTICS = {fetch:{}, parse:{}, storage:{}, other:{}, samples:[]};
  var INDEX_SCHEMA = "frlg_move_index_canonical_consolidated_v1";
  var MOVE_TOTAL = 354;

  function esc(v){
    return String(v == null ? "" : v).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];
    });
  }
  function sleep(ms){ return new Promise(function(resolve){ setTimeout(resolve, ms); }); }
  function readJson(key, fallback){
    try{
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    }catch(e){ return fallback; }
  }
  function writeJson(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch(e){ console.warn("LocalStorage write failed", key, e); return false; }
  }
  function compactKey(name){ return String(name || "").toLowerCase().replace(/[^a-z0-9]/g,""); }
  function slugMove(name){
    var s = String(name || "").trim();
    if(!s) return "";
    s = s.replace(/([a-z])([A-Z])/g,"$1-$2");
    return s.toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  }
  function prettyMove(name){
    var raw = String(name || "").replace(/-/g," ").trim();
    return raw.replace(/\b\w/g,function(m){ return m.toUpperCase(); })
      .replace(/\bTm\b/g,"TM").replace(/\bHm\b/g,"HM")
      .replace(/Solar Beam/i,"Solar Beam").replace(/Thunder Shock/i,"ThunderShock")
      .replace(/Poison Powder/i,"PoisonPowder").replace(/Dynamic Punch/i,"DynamicPunch")
      .replace(/Dragon Breath/i,"DragonBreath").replace(/Extreme Speed/i,"ExtremeSpeed")
      .replace(/Ancient Power/i,"AncientPower").replace(/Feather Dance/i,"FeatherDance")
      .replace(/Grass Whistle/i,"GrassWhistle");
  }
  function ensureMoveNames(){
    if(window.GEN3_MOVE_NAMES && window.GEN3_MOVE_NAMES.length >= MOVE_TOTAL + 1) return;
    console.warn("GEN3_MOVE_NAMES was not present; Move List will rely on existing app definitions when available.");
    window.GEN3_MOVE_NAMES = window.GEN3_MOVE_NAMES || [""];
  }
  function moveObjects(){
    ensureMoveNames();
    return (window.GEN3_MOVE_NAMES || []).map(function(n,i){
      return n ? { id:i, raw:n, api:slugMove(n), compact:compactKey(n), display:prettyMove(n) } : null;
    }).filter(function(o){ return o && o.id >= 1 && o.id <= MOVE_TOTAL; });
  }
  function objForMove(move){
    var key = compactKey(move), slug = slugMove(move), objs = moveObjects();
    for(var i=0;i<objs.length;i++){
      if(objs[i].api === slug || objs[i].compact === key || compactKey(objs[i].display) === key) return objs[i];
    }
    return null;
  }

  function canonicalCache(){
    var cache = readJson(CANONICAL_META_KEY, null);
    if(!cache || typeof cache !== "object" || Array.isArray(cache)) cache = {};
    if(!cache.__schema) cache.__schema = CANONICAL_SCHEMA;
    return cache;
  }
  function saveCanonicalCache(cache){
    cache.__schema = CANONICAL_SCHEMA;
    cache.__updatedAt = new Date().toISOString();
    cache.__count = moveObjects().filter(function(o){ return !!cache[o.api]; }).length;
    return writeJson(CANONICAL_META_KEY, cache);
  }
  function legacyCache(key){ return readJson(key, {}) || {}; }
  function saveLegacy(key, cache){ writeJson(key, cache || {}); }

  function normaliseMeta(obj, meta, source){
    if(!obj || !meta) return null;
    var cls = meta.damage_class || meta.damageClass || meta.category || "";
    if(cls && typeof cls === "object") cls = cls.name || "";
    var type = meta.type || "";
    if(type && typeof type === "object") type = type.name || "";
    return {
      schema: CANONICAL_SCHEMA,
      id: obj.id,
      name: obj.api,
      api: obj.api,
      display: meta.display || obj.display,
      type: type || "",
      damage_class: cls || "",
      category: cls || "",
      power: meta.power === null || meta.power === undefined ? 0 : Number(meta.power) || 0,
      accuracy: meta.accuracy === null || meta.accuracy === undefined ? 100 : Number(meta.accuracy) || 0,
      pp: meta.pp === null || meta.pp === undefined ? 0 : Number(meta.pp) || 0,
      priority: meta.priority === null || meta.priority === undefined ? 0 : Number(meta.priority) || 0,
      effect: meta.effect || meta.short_effect || meta.shortEffect || "",
      flavor: meta.flavor || meta.description || "",
      fullDetailsLoaded: !!(meta.fullDetailsLoaded || meta.effect || meta.flavor || meta.pp !== undefined || meta.priority !== undefined),
      source: source || meta.source || "cache"
    };
  }
  function metaFromLegacy(obj){
    var keys = [obj.api, obj.compact, obj.display, obj.raw, prettyMove(obj.api)];
    var legacy1 = legacyCache(LEGACY_META_KEY);
    var legacy2 = legacyCache(LEGACY_SIMPLE_KEY);
    var candidates = [legacy1, legacy2];
    for(var c=0;c<candidates.length;c++){
      for(var k=0;k<keys.length;k++){
        if(candidates[c] && candidates[c][keys[k]]) return normaliseMeta(obj, candidates[c][keys[k]], c===0 ? "legacy_meta_v1" : "legacy_simple_v1");
      }
    }
    return null;
  }
  function getMetaSync(move){
    var obj = typeof move === "object" ? move : objForMove(move);
    if(!obj) return null;
    var cache = canonicalCache();
    if(cache[obj.api]) return normaliseMeta(obj, cache[obj.api], "canonical_v2");
    var legacy = metaFromLegacy(obj);
    if(legacy){ cache[obj.api] = legacy; saveCanonicalCache(cache); return legacy; }
    return null;
  }
  function compactMetaFromApi(obj, raw){
    var flavor = "", effect = "";
    if(raw && raw.flavor_text_entries){
      var frlg = raw.flavor_text_entries.find(function(x){ return x.language && x.language.name === "en" && x.version_group && x.version_group.name === "firered-leafgreen"; });
      var en = raw.flavor_text_entries.find(function(x){ return x.language && x.language.name === "en"; });
      flavor = String((frlg || en || {}).flavor_text || "").replace(/\s+/g," ").trim();
    }
    if(raw && raw.effect_entries){
      var e = raw.effect_entries.find(function(x){ return x.language && x.language.name === "en"; });
      if(e) effect = String(e.short_effect || e.effect || "").replace(/\$effect_chance/g, raw.effect_chance || "").replace(/\s+/g," ").trim();
    }
    return normaliseMeta(obj, {
      display: obj.display,
      type: raw && raw.type ? raw.type.name : "",
      damage_class: raw && raw.damage_class ? raw.damage_class.name : "",
      power: raw && raw.power !== null && raw.power !== undefined ? raw.power : 0,
      accuracy: raw && raw.accuracy !== null && raw.accuracy !== undefined ? raw.accuracy : 100,
      pp: raw && raw.pp !== null && raw.pp !== undefined ? raw.pp : 0,
      priority: raw && raw.priority !== null && raw.priority !== undefined ? raw.priority : 0,
      flavor: flavor,
      effect: effect,
      fullDetailsLoaded: true,
      source: "pokeapi"
    }, "pokeapi");
  }
  function backfillLegacy(obj, meta){
    // Intentionally disabled. Older builds duplicated move metadata into
    // move_meta_cache_v1 and all_moves_type_cache_v1. On mobile Chrome this
    // can exhaust localStorage and make every move appear to fail. Legacy
    // readers should resolve through getMoveMeta/getMoveMetaSync instead.
    return true;
  }
  function clearMoveMetadataBloat(){
    var removed = 0;
    try{
      localStorage.removeItem(LEGACY_META_KEY); removed++;
      localStorage.removeItem(LEGACY_SIMPLE_KEY); removed++;
      for(var i=localStorage.length-1;i>=0;i--){
        var k = localStorage.key(i);
        if(k && k.indexOf(RAW_MOVE_PREFIX) === 0){ localStorage.removeItem(k); removed++; }
      }
    }catch(e){ console.warn("Could not clear old move metadata caches", e); }
    return removed;
  }
  function resetDiagnostics(){ LAST_DIAGNOSTICS = {fetch:{}, parse:{}, storage:{}, other:{}, samples:[]}; }
  function addDiag(bucket, key, obj, err){
    bucket = bucket || "other"; key = key || "unknown";
    if(!LAST_DIAGNOSTICS[bucket]) LAST_DIAGNOSTICS[bucket] = {};
    LAST_DIAGNOSTICS[bucket][key] = (LAST_DIAGNOSTICS[bucket][key] || 0) + 1;
    if(LAST_DIAGNOSTICS.samples.length < 8){
      LAST_DIAGNOSTICS.samples.push({move: obj && obj.display || "unknown", bucket: bucket, reason: key, message: err && (err.message || String(err)) || ""});
    }
  }
  function diagnosticsSummary(){
    var parts = [];
    ["fetch","parse","storage","other"].forEach(function(bucket){
      var obj = LAST_DIAGNOSTICS[bucket] || {};
      Object.keys(obj).forEach(function(k){ parts.push(bucket + " " + k + " ×" + obj[k]); });
    });
    return parts.length ? parts.join("; ") : "no failure diagnostics recorded";
  }
  async function fetchMoveMeta(obj, force){
    if(!force){
      var existing = getMetaSync(obj);
      if(existing && existing.type && existing.damage_class && existing.fullDetailsLoaded) return existing;
    }
    var response, raw, meta;
    try{
      response = await fetch("https://pokeapi.co/api/v2/move/" + obj.id + "/");
    }catch(e){
      addDiag("fetch", e && e.name ? e.name : "fetch-error", obj, e);
      throw e;
    }
    if(!response.ok){
      var httpErr = new Error("HTTP " + response.status + " while loading #" + obj.id + " " + obj.display);
      addDiag("fetch", "HTTP " + response.status, obj, httpErr);
      throw httpErr;
    }
    try{
      raw = await response.json();
      meta = compactMetaFromApi(obj, raw);
    }catch(e){
      addDiag("parse", e && e.name ? e.name : "parse-error", obj, e);
      throw e;
    }
    var cache = canonicalCache();
    cache[obj.api] = meta;
    if(!saveCanonicalCache(cache)){
      var storageErr = new Error("Could not write canonical move metadata cache. Browser localStorage may be full.");
      addDiag("storage", "localStorage write failed", obj, storageErr);
      throw storageErr;
    }
    return meta;
  }

  window.getMoveMeta = async function(moveName){
    var obj = objForMove(moveName);
    if(!obj) return null;
    var cached = getMetaSync(obj);
    if(cached && cached.type && cached.damage_class) return cached;
    try{ return await fetchMoveMeta(obj, false); }
    catch(e){ console.warn("Move metadata fetch failed", moveName, e); return cached || null; }
  };
  window.getMoveMetaSync = getMetaSync;
  window.getCanonicalMoveMetaCache = canonicalCache;

  window.ensureMoveOptionsLoaded = function(){
    var dl = document.getElementById("moveOptions");
    if(!dl) return;
    var opts = moveObjects().slice().sort(function(a,b){ return a.display.localeCompare(b.display); });
    dl.innerHTML = opts.map(function(o){ return '<option value="'+esc(o.display)+'"></option>'; }).join("");
  };

  function setIndexStatus(text){
    var ids = ["moveIndexStatus","moveIndexBuildStatus","settingsMoveIndexStatus","moveListStatus"];
    for(var i=0;i<ids.length;i++){ var el = document.getElementById(ids[i]); if(el) el.textContent = text; }
  }
  function setMoveListStatus(text){ var el = document.getElementById("moveListStatus"); if(el) el.textContent = text; }
  function setupMoveTypeFilter(){
    var sel = document.getElementById("moveListTypeFilter");
    if(sel && sel.options.length <= 1){
      ["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel"].forEach(function(t){
        var o=document.createElement("option"); o.value=t; o.textContent=t.charAt(0).toUpperCase()+t.slice(1); sel.appendChild(o);
      });
    }
  }
  function currentMoveListFilters(){
    return {
      name:(document.getElementById("moveListNameFilter")||{}).value || "",
      type:(document.getElementById("moveListTypeFilter")||{}).value || "",
      cat:(document.getElementById("moveListCategoryFilter")||{}).value || "",
      power:(document.getElementById("moveListPowerFilter")||{}).value || "",
      acc:(document.getElementById("moveListAccuracyFilter")||{}).value || ""
    };
  }
  function movePasses(obj, meta, f){
    var nameNeedle = String(f.name || "").toLowerCase().trim();
    if(nameNeedle && obj.display.toLowerCase().indexOf(nameNeedle) < 0 && obj.api.indexOf(slugMove(nameNeedle)) < 0 && obj.compact.indexOf(compactKey(nameNeedle)) < 0) return false;
    if(f.type && (!meta || meta.type !== f.type)) return false;
    var cls = meta ? (meta.damage_class || meta.category) : "";
    if(f.cat && cls !== f.cat) return false;
    var p = meta ? meta.power : null, a = meta ? meta.accuracy : null;
    if(f.power === "damaging" && !(p > 0)) return false;
    if(f.power === "non-damaging" && !(p === 0 || p === null || p === undefined)) return false;
    if(f.power === "60plus" && !(p >= 60)) return false;
    if(f.power === "80plus" && !(p >= 80)) return false;
    if(f.power === "100plus" && !(p >= 100)) return false;
    if(f.acc === "perfect" && !(a === 100 || a === null || a === undefined)) return false;
    if(f.acc === "90plus" && !(a >= 90 || a === null || a === undefined)) return false;
    if(f.acc === "less90" && !(a !== null && a !== undefined && a < 90)) return false;
    return true;
  }
  function renderMoveCard(obj, meta){
    var loaded = !!(meta && (meta.type || meta.damage_class || meta.category));
    var type = loaded ? meta.type : "Metadata not loaded";
    var cls = loaded ? (meta.damage_class || meta.category) : "Metadata not loaded";
    var power = !loaded || meta.power === 0 || meta.power === null || meta.power === undefined ? "—" : meta.power;
    var accuracy = !loaded || meta.accuracy === null || meta.accuracy === undefined ? "—" : (meta.accuracy === 100 ? "100%" : meta.accuracy + "%");
    var pp = !loaded || !meta.pp ? "—" : meta.pp;
    var priority = loaded ? (meta.priority || 0) : "—";
    var desc = loaded ? (meta.flavor || meta.effect || "No description cached yet.") : "Metadata not loaded. Use Load details or Build/refresh move index in Settings.";
    var effect = loaded && meta.effect && meta.effect !== desc ? '<div class="moveEffect"><b>Effect:</b> '+esc(meta.effect)+'</div>' : "";
    var button = !loaded ? '<div style="margin-top:8px"><button class="miniButton" onclick="loadMoveListDetail(\''+esc(obj.api)+'\')">Load details</button></div>' : "";
    return '<article class="moveListCard" id="move-entry-'+esc(obj.api)+'" data-move-api="'+esc(obj.api)+'"><h3>'+esc(obj.display)+'</h3><div class="moveMetaGrid"><span>Type: '+esc(type)+'</span><span>Class: '+esc(cls)+'</span><span>Power: '+esc(power)+'</span><span>Accuracy: '+esc(accuracy)+'</span><span>PP: '+esc(pp)+'</span><span>Priority: '+esc(priority)+'</span></div><div class="moveDescription">'+esc(desc)+'</div>'+effect+button+'</article>';
  }
  window.renderMoveList = function(){
    var out = document.getElementById("moveListResults");
    if(!out) return;
    setupMoveTypeFilter();
    window.ensureMoveOptionsLoaded();
    var f = currentMoveListFilters();
    var objs = moveObjects().filter(function(o){ return movePasses(o, getMetaSync(o), f); });
    objs.sort(function(a,b){ return a.display.localeCompare(b.display); });
    var loaded = objs.filter(function(o){ var m = getMetaSync(o); return !!(m && (m.type || m.damage_class || m.category)); }).length;
    var summary = document.getElementById("activeMoveListFilters");
    if(summary){
      var parts=[]; if(f.name) parts.push('Name contains "'+f.name+'"'); if(f.type) parts.push("Type "+f.type); if(f.cat) parts.push(f.cat); if(f.power) parts.push("Power "+f.power); if(f.acc) parts.push("Accuracy "+f.acc);
      summary.textContent = (parts.length ? parts.join(", ") : "None") + " — " + objs.length + " shown";
    }
    setMoveListStatus(objs.length + " moves shown. Metadata available for " + loaded + "/" + objs.length + ".");
    out.innerHTML = objs.map(function(o){ return renderMoveCard(o, getMetaSync(o)); }).join("");
  };
  window.loadMoveListDetail = async function(move){
    var obj = objForMove(move), slug = obj ? obj.api : slugMove(move), card = document.getElementById("move-entry-"+slug);
    if(card) card.innerHTML = '<div class="loading">Loading '+esc(obj ? obj.display : prettyMove(slug))+'...</div>';
    try{
      if(!obj) throw new Error("Unknown Gen 3 move: " + move);
      await fetchMoveMeta(obj, true);
      window.renderMoveList();
      setTimeout(function(){ var c=document.getElementById("move-entry-"+obj.api); if(c) c.scrollIntoView({block:"center"}); },0);
    }catch(e){ if(card) card.innerHTML = '<div class="error">Could not load '+esc(move)+': '+esc(e.message || e)+'</div>'; }
  };
  window.loadVisibleMoveListDetails = async function(){
    var cards = Array.from(document.querySelectorAll(".moveListCard"));
    var total = cards.length, ok = 0, failed = 0;
    for(var i=0;i<cards.length;i++){
      var obj = objForMove(cards[i].getAttribute("data-move-api"));
      if(!obj) continue;
      try{
        setMoveListStatus("Loading visible move metadata " + (i+1) + "/" + total + " — " + obj.display);
        await fetchMoveMeta(obj, false); ok++;
      }catch(e){ console.warn("Visible move metadata load failed", obj.display, e); failed++; }
      if(i % 5 === 0) await sleep(20);
    }
    window.renderMoveList();
    setMoveListStatus("Loaded visible move metadata: " + ok + "/" + total + (failed ? ", failed " + failed : "") + ".");
  };
  window.clearMoveListFilters = function(){
    ["moveListNameFilter","moveListTypeFilter","moveListCategoryFilter","moveListPowerFilter","moveListAccuracyFilter"].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=""; });
    window.renderMoveList();
  };
  window.openMoveListEntry = function(moveName){
    var obj = objForMove(moveName), api = obj ? obj.api : slugMove(moveName);
    if(typeof showTab === "function") showTab("moveListTab");
    setTimeout(function(){
      var f=document.getElementById("moveListNameFilter"); if(f) f.value = obj ? obj.display : prettyMove(api);
      window.renderMoveList();
      setTimeout(function(){ var c=document.getElementById("move-entry-"+api); if(c){ c.scrollIntoView({block:"center"}); c.classList.add("locationJumpHighlight"); setTimeout(function(){ c.classList.remove("locationJumpHighlight"); },1600); } },80);
    },0);
  };

  function moveNamesFromPokemonPayload(payload){
    if(typeof window.allMoveNamesFromExpandedPayloadEggLine === "function"){
      try{ return window.allMoveNamesFromExpandedPayloadEggLine(payload); }catch(e){}
    }
    if(typeof window.allMoveNamesFromPayload === "function"){
      try{ return window.allMoveNamesFromPayload(payload); }catch(e){}
    }
    if(typeof window.moveNamesFromPokemonPayload === "function"){
      try{ return window.moveNamesFromPokemonPayload(payload); }catch(e){}
    }
    if(typeof window.cardMoveListFromPokemonData === "function"){
      try{ return window.cardMoveListFromPokemonData(payload); }catch(e){}
    }
    if(payload && (payload.levelMoves || payload.machineMoves || payload.tutorMoves || payload.eggMoves)){
      return Array.from(new Set([].concat(
        (payload.levelMoves || []).map(function(m){ return m.name; }),
        (payload.machineMoves || []).map(function(m){ return m.name; }),
        (payload.tutorMoves || []).map(function(m){ return m.name; }),
        (payload.eggMoves || []).map(function(m){ return m.name; })
      ).filter(Boolean).map(slugMove)));
    }
    var names = [];
    (payload && payload.moves || []).forEach(function(moveRecord){
      var moveName = moveRecord && moveRecord.move && moveRecord.move.name;
      if(!moveName) return;
      var details = moveRecord.version_group_details || [];
      var allowed = details.some(function(d){
        var vg = d && d.version_group && d.version_group.name;
        var method = d && d.move_learn_method && d.move_learn_method.name;
        return vg === "firered-leafgreen" && ["level-up","machine","tutor","egg"].indexOf(method) >= 0;
      });
      if(allowed) names.push(slugMove(moveName));
    });
    return Array.from(new Set(names));
  }
  async function buildPokemonMoveIndex(force){
    if(typeof DEX_MOVE_REFERENCE_INDEX === "undefined") return {count:0,total:0};
    if(force) DEX_MOVE_REFERENCE_INDEX = {};
    var cards = Array.from(document.querySelectorAll("#grid .card"));
    if(!cards.length) cards = Array.from(document.querySelectorAll(".card[data-pokeid]"));
    DEX_MOVE_REFERENCE_PROGRESS = {done:0,total:cards.length || 386};
    for(var i=0;i<cards.length;i++){
      var card = cards[i], id = card.dataset.id;
      try{
        setIndexStatus("Building Pokémon move index " + (i+1) + "/" + cards.length + " — #" + id);
        if(force || !DEX_MOVE_REFERENCE_INDEX[id]){
          var payload = null;
          if(typeof window.fetchPokemonData === "function") payload = await window.fetchPokemonData(card.dataset.pokeid);
          else{
            var response = await fetch("https://pokeapi.co/api/v2/pokemon/" + card.dataset.pokeid + "/");
            if(response.ok) payload = await response.json();
          }
          DEX_MOVE_REFERENCE_INDEX[id] = moveNamesFromPokemonPayload(payload || {});
        }
      }catch(e){
        console.warn("Move index build failed for", id, e);
        if(!DEX_MOVE_REFERENCE_INDEX[id]) DEX_MOVE_REFERENCE_INDEX[id] = [];
      }
      DEX_MOVE_REFERENCE_PROGRESS.done = i + 1;
      if(i % 8 === 0){
        if(typeof saveDexMoveReferenceIndex === "function") saveDexMoveReferenceIndex();
        else if(typeof DEX_MOVE_REFERENCE_KEY !== "undefined") writeJson(DEX_MOVE_REFERENCE_KEY, DEX_MOVE_REFERENCE_INDEX);
        if(typeof DEX_MOVE_REFERENCE_META_KEY !== "undefined") writeJson(DEX_MOVE_REFERENCE_META_KEY, {schema:INDEX_SCHEMA,builtAt:new Date().toISOString(),count:Object.keys(DEX_MOVE_REFERENCE_INDEX || {}).length});
        if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();
        await sleep(20);
      }
    }
    if(typeof saveDexMoveReferenceIndex === "function") saveDexMoveReferenceIndex();
    else if(typeof DEX_MOVE_REFERENCE_KEY !== "undefined") writeJson(DEX_MOVE_REFERENCE_KEY, DEX_MOVE_REFERENCE_INDEX);
    if(typeof DEX_MOVE_REFERENCE_META_KEY !== "undefined") writeJson(DEX_MOVE_REFERENCE_META_KEY, {schema:INDEX_SCHEMA,builtAt:new Date().toISOString(),count:Object.keys(DEX_MOVE_REFERENCE_INDEX || {}).length});
    return {count:Object.keys(DEX_MOVE_REFERENCE_INDEX || {}).length,total:cards.length || 386};
  }
  async function buildMoveMetadata(force){
    resetDiagnostics();
    var objs = moveObjects(), ok = 0, failed = [];
    for(var i=0;i<objs.length;i++){
      var obj = objs[i];
      var existing = getMetaSync(obj);
      if(!force && existing && existing.type && existing.damage_class && existing.fullDetailsLoaded){ ok++; continue; }
      try{
        setIndexStatus("Building move metadata " + (i+1) + "/" + objs.length + " — " + obj.display);
        await fetchMoveMeta(obj, force);
        ok++;
      }catch(e){
        console.warn("Move metadata build failed for", obj.display, e);
        if(!(e && e.message && /Could not write canonical move metadata cache/.test(e.message))){
          addDiag("other", e && e.name ? e.name : "error", obj, e);
        }
        failed.push(obj.display);
      }
      if(i % 5 === 0){ window.renderMoveList && window.renderMoveList(); await sleep(25); }
    }
    var cache = canonicalCache();
    cache.__lastBuild = {builtAt:new Date().toISOString(),ok:ok,failed:failed,diagnostics:LAST_DIAGNOSTICS};
    saveCanonicalCache(cache);
    return {ok:ok,total:objs.length,failed:failed};
  }
  window.dexMoveReferenceReady = function(){ return typeof DEX_MOVE_REFERENCE_INDEX !== "undefined" && Object.keys(DEX_MOVE_REFERENCE_INDEX || {}).length >= 386; };
  window.buildDexMoveReferenceIndex = async function(force){
    if(typeof DEX_MOVE_REFERENCE_BUILDING !== "undefined" && DEX_MOVE_REFERENCE_BUILDING) return;
    if(force && !confirm("Build/refresh the FireRed/LeafGreen Pokémon move index and canonical Gen 3 move metadata cache? This will cache 386 Pokémon learner records and 354 compact move metadata records in this browser.")) return;
    setIndexStatus("Starting move index and metadata refresh...");
    try{
      if(typeof DEX_MOVE_REFERENCE_BUILDING !== "undefined") DEX_MOVE_REFERENCE_BUILDING = true;
      if(typeof DEX_MOVE_FILTER_LOADING !== "undefined") DEX_MOVE_FILTER_LOADING = true;
      window.ensureMoveOptionsLoaded();
      setupMoveTypeFilter();
      var removedBloat = force ? clearMoveMetadataBloat() : 0;
      if(force && removedBloat){ setIndexStatus("Cleared old duplicate/raw move caches (" + removedBloat + " entries). Starting Pokémon move index..."); await sleep(50); }
      var pkmn = await buildPokemonMoveIndex(!!force);
      var meta = await buildMoveMetadata(!!force);
      window.renderMoveList && window.renderMoveList();
      if(typeof applyFilter === "function") applyFilter();
      if(typeof renderMyMons === "function") renderMyMons();
      if(typeof renderTeams === "function") renderTeams();
      var msg = "Move index and canonical metadata refresh complete: " + pkmn.count + "/" + (pkmn.total || 386) + " Pokémon learner records, " + meta.ok + "/" + meta.total + " move metadata records" + (meta.failed.length ? " (failed: " + meta.failed.length + "; " + diagnosticsSummary() + "; examples: " + meta.failed.slice(0,5).join(", ") + (meta.failed.length > 5 ? ", …" : "") + ")" : "") + ".";
      setIndexStatus(msg);
    }finally{
      if(typeof DEX_MOVE_REFERENCE_BUILDING !== "undefined") DEX_MOVE_REFERENCE_BUILDING = false;
      if(typeof DEX_MOVE_FILTER_LOADING !== "undefined") DEX_MOVE_FILTER_LOADING = false;
      if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();
    }
  };

  function init(){ setupMoveTypeFilter(); window.ensureMoveOptionsLoaded(); if(typeof window.renderMoveList === "function") window.renderMoveList(); }
  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", init);
})();


/* IndexedDB Gen 3 move metadata storage override — canonical cache off localStorage */
(function(){
  "use strict";

  var STORAGE = (typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "leafgreen_251_dual_tracker_v3_");
  var DB_NAME = STORAGE + "indexeddb_cache_v1";
  var DB_VERSION = 1;
  var MOVE_STORE = "moveMeta";
  var MOVE_TOTAL = 354;
  var MOVE_META_MEMORY = {};
  var MOVE_META_IDB_READY = false;
  var MOVE_META_LAST_DIAG = {fetch:{}, parse:{}, idb:{}, other:{}, samples:[]};

  function esc(v){return String(v == null ? "" : v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
  function sleep(ms){return new Promise(function(resolve){setTimeout(resolve,ms);});}
  function compactKey(name){return String(name||"").toLowerCase().replace(/[^a-z0-9]/g,"");}
  function slugMove(name){var s=String(name||"").trim(); if(!s)return ""; s=s.replace(/([a-z])([A-Z])/g,"$1-$2"); return s.toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");}
  function prettyMove(name){var raw=String(name||"").replace(/-/g," ").trim(); return raw.replace(/\b\w/g,function(m){return m.toUpperCase();}).replace(/Solar Beam/i,"Solar Beam").replace(/Thunder Shock/i,"ThunderShock").replace(/Poison Powder/i,"PoisonPowder").replace(/Dynamic Punch/i,"DynamicPunch").replace(/Dragon Breath/i,"DragonBreath").replace(/Extreme Speed/i,"ExtremeSpeed").replace(/Ancient Power/i,"AncientPower").replace(/Feather Dance/i,"FeatherDance").replace(/Grass Whistle/i,"GrassWhistle");}
  function setStatus(text){["moveIndexStatus","moveIndexBuildStatus","settingsMoveIndexStatus"].forEach(function(id){var el=document.getElementById(id); if(el)el.textContent=text;});}
  function setMoveListStatus(text){var el=document.getElementById("moveListStatus"); if(el)el.textContent=text;}
  function addDiag(bucket,key,obj,err){bucket=bucket||"other"; key=String(key||"unknown"); if(!MOVE_META_LAST_DIAG[bucket])MOVE_META_LAST_DIAG[bucket]={}; MOVE_META_LAST_DIAG[bucket][key]=(MOVE_META_LAST_DIAG[bucket][key]||0)+1; if(MOVE_META_LAST_DIAG.samples.length<8){MOVE_META_LAST_DIAG.samples.push({move:obj&&obj.display||"?", bucket:bucket, key:key, message:err&&err.message?err.message:String(err||"")});}}
  function resetDiag(){MOVE_META_LAST_DIAG={fetch:{}, parse:{}, idb:{}, other:{}, samples:[]};}
  function diagSummary(){var out=[]; ["fetch","parse","idb","other"].forEach(function(b){var o=MOVE_META_LAST_DIAG[b]||{}; Object.keys(o).forEach(function(k){out.push(b+" "+k+" ×"+o[k]);});}); return out.length?out.join("; "):"no detailed failure reason captured";}
  function writeJsonSafe(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch(e){console.warn("localStorage write failed",key,e);return false;}}

  function moveObjects(){
    var names=window.GEN3_MOVE_NAMES||[];
    return names.map(function(n,i){return n?{id:i,raw:n,api:slugMove(n),compact:compactKey(n),display:prettyMove(n)}:null;}).filter(function(o){return o&&o.id>=1&&o.id<=MOVE_TOTAL;});
  }
  function objForMove(move){
    var key=compactKey(move), slug=slugMove(move), objs=moveObjects();
    for(var i=0;i<objs.length;i++){var o=objs[i]; if(o.api===slug||o.compact===key||compactKey(o.display)===key||String(o.id)===String(move))return o;}
    return null;
  }

  function idbOpen(){
    return new Promise(function(resolve,reject){
      if(!window.indexedDB){reject(new Error("IndexedDB is not available in this browser/context"));return;}
      var req=indexedDB.open(DB_NAME,DB_VERSION);
      req.onupgradeneeded=function(ev){var db=ev.target.result; if(!db.objectStoreNames.contains(MOVE_STORE))db.createObjectStore(MOVE_STORE,{keyPath:"api"});};
      req.onsuccess=function(){resolve(req.result);};
      req.onerror=function(){reject(req.error||new Error("IndexedDB open failed"));};
      req.onblocked=function(){reject(new Error("IndexedDB open blocked by another tab"));};
    });
  }
  function idbGetAll(){
    return idbOpen().then(function(db){return new Promise(function(resolve,reject){
      var tx=db.transaction(MOVE_STORE,"readonly"), store=tx.objectStore(MOVE_STORE), req=store.getAll();
      req.onsuccess=function(){resolve(req.result||[]);};
      req.onerror=function(){reject(req.error||new Error("IndexedDB getAll failed"));};
      tx.oncomplete=function(){db.close();};
      tx.onerror=function(){db.close();};
    });});
  }
  function idbPut(meta){
    return idbOpen().then(function(db){return new Promise(function(resolve,reject){
      var tx=db.transaction(MOVE_STORE,"readwrite"), store=tx.objectStore(MOVE_STORE), req=store.put(meta);
      req.onsuccess=function(){resolve(true);};
      req.onerror=function(){reject(req.error||new Error("IndexedDB put failed"));};
      tx.oncomplete=function(){db.close();};
      tx.onerror=function(){db.close();};
    });});
  }
  function idbClear(){
    return idbOpen().then(function(db){return new Promise(function(resolve,reject){
      var tx=db.transaction(MOVE_STORE,"readwrite"), store=tx.objectStore(MOVE_STORE), req=store.clear();
      req.onsuccess=function(){resolve(true);};
      req.onerror=function(){reject(req.error||new Error("IndexedDB clear failed"));};
      tx.oncomplete=function(){db.close();};
      tx.onerror=function(){db.close();};
    });});
  }
  async function loadMoveMetaFromIndexedDB(){
    try{
      var rows=await idbGetAll();
      MOVE_META_MEMORY={};
      rows.forEach(function(row){if(row&&row.api)MOVE_META_MEMORY[row.api]=row;});
      MOVE_META_IDB_READY=true;
      setMoveListStatus("IndexedDB move metadata loaded: "+Object.keys(MOVE_META_MEMORY).length+"/"+MOVE_TOTAL+" records available.");
      if(typeof window.renderMoveList==="function")window.renderMoveList();
    }catch(e){
      MOVE_META_IDB_READY=false;
      console.warn("IndexedDB move metadata load failed",e);
      setMoveListStatus("IndexedDB move metadata unavailable: "+(e&&e.message?e.message:e));
    }
  }

  function effectText(json){
    var entries=(json&&json.effect_entries)||[], chosen=null;
    for(var i=0;i<entries.length;i++){if(entries[i]&&entries[i].language&&entries[i].language.name==="en"){chosen=entries[i];break;}}
    if(!chosen)return "";
    var txt=chosen.short_effect||chosen.effect||"";
    if(json.effect_chance!=null)txt=txt.replace(/\$effect_chance/g,String(json.effect_chance));
    return txt.replace(/\s+/g," ").trim();
  }
  function flavorText(json){
    var entries=(json&&json.flavor_text_entries)||[], chosen=null;
    for(var i=0;i<entries.length;i++){
      var e=entries[i]; if(!e||!e.language||e.language.name!=="en")continue;
      if(e.version_group&&e.version_group.name==="firered-leafgreen"){chosen=e;break;}
      if(!chosen)chosen=e;
    }
    return chosen&&chosen.flavor_text?chosen.flavor_text.replace(/[\n\f\r]+/g," ").replace(/\s+/g," ").trim():"";
  }
  function metaFromApi(obj,json){
    if(!json||!json.name)throw new Error("Move API response was missing expected data");
    return {
      schema:"frlg_gen3_move_meta_indexeddb_v1",
      id:obj.id,
      name:json.name||obj.api,
      api:obj.api,
      display:obj.display,
      type:json.type&&json.type.name?json.type.name:"",
      damage_class:json.damage_class&&json.damage_class.name?json.damage_class.name:"",
      category:json.damage_class&&json.damage_class.name?json.damage_class.name:"",
      power:json.power==null?null:Number(json.power),
      accuracy:json.accuracy==null?null:Number(json.accuracy),
      pp:json.pp==null?null:Number(json.pp),
      priority:json.priority==null?0:Number(json.priority)||0,
      effect:effectText(json),
      flavor:flavorText(json),
      fullDetailsLoaded:true,
      updatedAt:new Date().toISOString(),
      source:"pokeapi-indexeddb"
    };
  }
  async function fetchMoveMetaIndexed(obj,force){
    if(!obj)throw new Error("Unknown move");
    if(!force&&MOVE_META_MEMORY[obj.api]&&MOVE_META_MEMORY[obj.api].fullDetailsLoaded)return MOVE_META_MEMORY[obj.api];
    var response,json,meta;
    try{response=await fetch("https://pokeapi.co/api/v2/move/"+obj.id+"/");}
    catch(e){addDiag("fetch",e&&e.name?e.name:"network error",obj,e);throw e;}
    if(!response||!response.ok){var er=new Error("HTTP "+(response?response.status:"unknown")); addDiag("fetch",er.message,obj,er); throw er;}
    try{json=await response.json(); meta=metaFromApi(obj,json);}catch(e){addDiag("parse",e&&e.name?e.name:"parse error",obj,e);throw e;}
    try{await idbPut(meta);}catch(e){addDiag("idb",e&&e.name?e.name:"write failed",obj,e);throw e;}
    MOVE_META_MEMORY[obj.api]=meta;
    return meta;
  }

  function getMetaSync(move){var obj=typeof move==="object"&&move.api?move:objForMove(move&&move.name?move.name:move); return obj?MOVE_META_MEMORY[obj.api]||null:null;}
  window.getMoveMetaSync=function(move){return getMetaSync(move);};
  window.monMoveMetaFromCache=function(move){return getMetaSync(move&&move.name?move.name:move);};
  window.getMoveMeta=async function(move){var obj=objForMove(move&&move.name?move.name:move); if(!obj)return null; return getMetaSync(obj)||fetchMoveMetaIndexed(obj,false);};

  function clearOldMoveLocalStorageCaches(){
    var removed=0;
    var prefixes=[STORAGE+"raw_move_v1_",STORAGE+"move_meta_cache_v1",STORAGE+"move_meta_cache_v2",STORAGE+"all_moves_type_cache_v1"];
    for(var i=localStorage.length-1;i>=0;i--){
      var k=localStorage.key(i), should=false;
      for(var p=0;p<prefixes.length;p++){if(k===prefixes[p]||k.indexOf(prefixes[p])===0){should=true;break;}}
      if(should){try{localStorage.removeItem(k);removed++;}catch(e){}}
    }
    return removed;
  }

  function moveNamesFromPokemonPayload(payload){
    if(typeof window.allMoveNamesFromExpandedPayloadEggLine==="function"){try{return window.allMoveNamesFromExpandedPayloadEggLine(payload);}catch(e){}}
    if(typeof window.allMoveNamesFromPayload==="function"){try{return window.allMoveNamesFromPayload(payload);}catch(e){}}
    var names=[];
    ((payload&&payload.moves)||[]).forEach(function(rec){
      var moveName=rec&&rec.move&&rec.move.name; if(!moveName)return;
      var ok=((rec.version_group_details)||[]).some(function(d){var vg=d&&d.version_group&&d.version_group.name; var method=d&&d.move_learn_method&&d.move_learn_method.name; return vg==="firered-leafgreen"&&["level-up","machine","tutor","egg"].indexOf(method)>=0;});
      if(ok)names.push(slugMove(moveName));
    });
    return Array.from(new Set(names));
  }
  async function buildPokemonMoveIndex(force){
    if(typeof DEX_MOVE_REFERENCE_INDEX==="undefined")window.DEX_MOVE_REFERENCE_INDEX={};
    if(force)DEX_MOVE_REFERENCE_INDEX={};
    var cards=Array.from(document.querySelectorAll("#grid .card[data-pokeid], .card[data-pokeid]"));
    var seen={}, unique=[];
    cards.forEach(function(c){var id=c.dataset.id||c.getAttribute("data-id"); if(id&&!seen[id]){seen[id]=true; unique.push(c);}});
    cards=unique;
    if(typeof DEX_MOVE_REFERENCE_PROGRESS!=="undefined")DEX_MOVE_REFERENCE_PROGRESS={done:0,total:cards.length||386};
    for(var i=0;i<cards.length;i++){
      var card=cards[i], id=card.dataset.id, pokeid=card.dataset.pokeid;
      try{
        setStatus("Building Pokémon move index "+(i+1)+"/"+cards.length+" — #"+id);
        if(force||!DEX_MOVE_REFERENCE_INDEX[id]){
          var payload=null;
          if(typeof window.fetchPokemonData==="function")payload=await window.fetchPokemonData(pokeid);
          else{var response=await fetch("https://pokeapi.co/api/v2/pokemon/"+pokeid+"/"); if(response.ok)payload=await response.json();}
          DEX_MOVE_REFERENCE_INDEX[id]=moveNamesFromPokemonPayload(payload||{});
        }
      }catch(e){console.warn("Move learner index failed",id,e); if(!DEX_MOVE_REFERENCE_INDEX[id])DEX_MOVE_REFERENCE_INDEX[id]=[];}
      if(typeof DEX_MOVE_REFERENCE_PROGRESS!=="undefined")DEX_MOVE_REFERENCE_PROGRESS.done=i+1;
      if(i%8===0){
        if(typeof saveDexMoveReferenceIndex==="function")saveDexMoveReferenceIndex();
        else if(typeof DEX_MOVE_REFERENCE_KEY!=="undefined")writeJsonSafe(DEX_MOVE_REFERENCE_KEY,DEX_MOVE_REFERENCE_INDEX);
        if(typeof DEX_MOVE_REFERENCE_META_KEY!=="undefined")writeJsonSafe(DEX_MOVE_REFERENCE_META_KEY,{schema:"frlg_move_index_indexeddb_v1",builtAt:new Date().toISOString(),count:Object.keys(DEX_MOVE_REFERENCE_INDEX||{}).length});
        if(typeof updateActiveDexFilters==="function")updateActiveDexFilters();
        await sleep(20);
      }
    }
    if(typeof saveDexMoveReferenceIndex==="function")saveDexMoveReferenceIndex();
    else if(typeof DEX_MOVE_REFERENCE_KEY!=="undefined")writeJsonSafe(DEX_MOVE_REFERENCE_KEY,DEX_MOVE_REFERENCE_INDEX);
    if(typeof DEX_MOVE_REFERENCE_META_KEY!=="undefined")writeJsonSafe(DEX_MOVE_REFERENCE_META_KEY,{schema:"frlg_move_index_indexeddb_v1",builtAt:new Date().toISOString(),count:Object.keys(DEX_MOVE_REFERENCE_INDEX||{}).length});
    return {count:Object.keys(DEX_MOVE_REFERENCE_INDEX||{}).length,total:cards.length||386};
  }
  async function buildMoveMetadata(force){
    resetDiag();
    var objs=moveObjects(), ok=0, failed=[];
    for(var i=0;i<objs.length;i++){
      var obj=objs[i];
      try{
        if(!force&&MOVE_META_MEMORY[obj.api]&&MOVE_META_MEMORY[obj.api].fullDetailsLoaded){ok++; continue;}
        setStatus("Building IndexedDB move metadata "+(i+1)+"/"+objs.length+" — "+obj.display);
        await fetchMoveMetaIndexed(obj,force);
        ok++;
      }catch(e){console.warn("IndexedDB move metadata build failed",obj.display,e); failed.push(obj.display);}
      if(i%5===0){if(typeof window.renderMoveList==="function")window.renderMoveList(); await sleep(25);}
    }
    return {ok:ok,total:objs.length,failed:failed};
  }

  function setupMoveTypeFilter(){var sel=document.getElementById("moveListTypeFilter"); if(sel&&sel.options.length<=1){["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel"].forEach(function(t){var o=document.createElement("option"); o.value=t; o.textContent=t.charAt(0).toUpperCase()+t.slice(1); sel.appendChild(o);});}}
  function currentFilters(){return {name:(document.getElementById("moveListNameFilter")||{}).value||"",type:(document.getElementById("moveListTypeFilter")||{}).value||"",cat:(document.getElementById("moveListCategoryFilter")||{}).value||"",power:(document.getElementById("moveListPowerFilter")||{}).value||"",acc:(document.getElementById("moveListAccuracyFilter")||{}).value||""};}
  function movePasses(obj,meta,f){
    if(f.name&&compactKey(obj.display).indexOf(compactKey(f.name))<0&&obj.api.indexOf(slugMove(f.name))<0)return false;
    if(f.type&&(!meta||meta.type!==f.type))return false;
    var cls=meta&&(meta.damage_class||meta.category)||"";
    if(f.cat&&cls!==f.cat)return false;
    var p=meta&&meta.power!=null?Number(meta.power):null, a=meta&&meta.accuracy!=null?Number(meta.accuracy):null;
    if(f.power){if(f.power==="status"&&p!==null)return false; if(f.power==="lt60"&&!(p!==null&&p<60))return false; if(f.power==="60to89"&&!(p>=60&&p<=89))return false; if(f.power==="90plus"&&!(p>=90))return false;}
    if(f.acc){if(f.acc==="perfect"&&!(a===100||a===null))return false; if(f.acc==="lt100"&&!(a!==null&&a<100))return false; if(f.acc==="lt85"&&!(a!==null&&a<85))return false;}
    return true;
  }
  function renderMoveCard(obj,meta){
    var type=meta&&meta.type?meta.type:"Metadata not loaded", cls=meta&&(meta.damage_class||meta.category)?(meta.damage_class||meta.category):"—";
    var power=meta?(meta.power==null?"—":meta.power):"—", acc=meta?(meta.accuracy==null?"—":meta.accuracy+"%"):"—", pp=meta?(meta.pp==null?"—":meta.pp):"—", pri=meta&&meta.priority?meta.priority:0;
    var desc=meta?(meta.flavor||meta.effect||"No description available."):"Metadata not loaded. Use Settings → Build/refresh move index to cache details.";
    var effect=meta&&meta.effect&&meta.effect!==desc?'<div class="moveEffect"><b>Effect:</b> '+esc(meta.effect)+'</div>':"";
    var button=!meta?'<div style="margin-top:8px"><button class="miniButton" onclick="loadMoveListDetail(\''+esc(obj.api)+'\')">Load details</button></div>':"";
    return '<article class="moveListCard" id="move-entry-'+esc(obj.api)+'" data-move-api="'+esc(obj.api)+'"><h3>'+esc(obj.display)+'</h3><div class="moveMetaGrid"><span>Type: '+esc(type)+'</span><span>Class: '+esc(cls)+'</span><span>Power: '+esc(power)+'</span><span>Accuracy: '+esc(acc)+'</span><span>PP: '+esc(pp)+'</span><span>Priority: '+esc(pri)+'</span></div><div class="moveDescription">'+esc(desc)+'</div>'+effect+button+'</article>';
  }
  window.renderMoveList=function(){
    var out=document.getElementById("moveListResults"); if(!out)return;
    if(typeof window.ensureMoveOptionsLoaded==="function")window.ensureMoveOptionsLoaded();
    setupMoveTypeFilter();
    var f=currentFilters();
    var arr=moveObjects().filter(function(obj){return movePasses(obj,getMetaSync(obj),f);});
    arr.sort(function(a,b){return a.display.localeCompare(b.display);});
    var summary=document.getElementById("activeMoveListFilters");
    if(summary){var parts=[]; if(f.name)parts.push('Name contains "'+f.name+'"'); if(f.type)parts.push("Type "+f.type); if(f.cat)parts.push(f.cat); if(f.power)parts.push("Power "+f.power); if(f.acc)parts.push("Accuracy "+f.acc); summary.textContent=(parts.length?parts.join(", "):"None")+" — "+arr.length+" shown";}
    var loaded=arr.filter(function(obj){var m=getMetaSync(obj); return m&&m.fullDetailsLoaded;}).length;
    setMoveListStatus(arr.length+" moves shown. IndexedDB metadata available for "+loaded+"/"+arr.length+(MOVE_META_IDB_READY?".":". IndexedDB still loading or unavailable."));
    out.innerHTML=arr.map(function(obj){return renderMoveCard(obj,getMetaSync(obj));}).join("");
  };
  window.loadMoveListDetail=async function(move){var obj=objForMove(move), card=obj&&document.getElementById("move-entry-"+obj.api); if(card)card.innerHTML='<div class="loading">Loading '+esc(obj.display)+'...</div>'; try{await fetchMoveMetaIndexed(obj,true); window.renderMoveList();}catch(e){if(card)card.innerHTML='<div class="error">Could not load '+esc(move)+': '+esc(e&&e.message?e.message:e)+'</div>';}};
  window.loadVisibleMoveListDetails=async function(){var cards=Array.from(document.querySelectorAll(".moveListCard")), ok=0, failed=0; for(var i=0;i<cards.length;i++){var obj=objForMove(cards[i].getAttribute("data-move-api")); if(!obj)continue; try{setMoveListStatus("Loading visible move metadata "+(i+1)+"/"+cards.length+" — "+obj.display); await fetchMoveMetaIndexed(obj,false); ok++;}catch(e){failed++;} if(i%5===0)await sleep(20);} window.renderMoveList(); setMoveListStatus("Loaded visible move metadata: "+ok+"/"+cards.length+(failed?", failed "+failed+" ("+diagSummary()+")":"")+".");};
  window.clearMoveListFilters=function(){["moveListNameFilter","moveListTypeFilter","moveListCategoryFilter","moveListPowerFilter","moveListAccuracyFilter"].forEach(function(id){var el=document.getElementById(id); if(el)el.value="";}); window.renderMoveList();};
  window.openMoveListEntry=function(moveName){var obj=objForMove(moveName), api=obj?obj.api:slugMove(moveName); if(typeof showTab==="function")showTab("moveListTab"); setTimeout(function(){var f=document.getElementById("moveListNameFilter"); if(f)f.value=obj?obj.display:prettyMove(api); window.renderMoveList(); setTimeout(function(){var c=document.getElementById("move-entry-"+api); if(c){c.scrollIntoView({block:"center"}); c.classList.add("locationJumpHighlight"); setTimeout(function(){c.classList.remove("locationJumpHighlight");},1600);}},80);},0);};

  window.dexMoveReferenceReady=function(){return typeof DEX_MOVE_REFERENCE_INDEX!=="undefined"&&Object.keys(DEX_MOVE_REFERENCE_INDEX||{}).length>=386;};
  window.buildDexMoveReferenceIndex=async function(force){
    if(typeof DEX_MOVE_REFERENCE_BUILDING!=="undefined"&&DEX_MOVE_REFERENCE_BUILDING)return;
    if(force&&!confirm("Build/refresh the FireRed/LeafGreen Pokémon move index and IndexedDB Gen 3 move metadata cache? This keeps bulky move metadata out of localStorage."))return;
    setStatus("Starting move index and IndexedDB metadata refresh...");
    try{
      if(typeof DEX_MOVE_REFERENCE_BUILDING!=="undefined")DEX_MOVE_REFERENCE_BUILDING=true;
      if(typeof DEX_MOVE_FILTER_LOADING!=="undefined")DEX_MOVE_FILTER_LOADING=true;
      if(typeof window.ensureMoveOptionsLoaded==="function")window.ensureMoveOptionsLoaded();
      setupMoveTypeFilter();
      var removed=force?clearOldMoveLocalStorageCaches():0;
      if(force){try{await idbClear(); MOVE_META_MEMORY={}; setStatus("Cleared old localStorage move caches ("+removed+") and IndexedDB move store. Starting Pokémon index..."); await sleep(50);}catch(e){addDiag("idb",e&&e.name?e.name:"clear failed",null,e); setStatus("Could not clear IndexedDB move store: "+(e&&e.message?e.message:e)); await sleep(80);}}
      var pkmn=await buildPokemonMoveIndex(!!force);
      var meta=await buildMoveMetadata(!!force);
      await loadMoveMetaFromIndexedDB();
      if(typeof applyFilter==="function")applyFilter();
      if(typeof renderMyMons==="function")renderMyMons();
      if(typeof renderTeams==="function")renderTeams();
      var msg="Move index and IndexedDB metadata refresh complete: "+pkmn.count+"/"+(pkmn.total||386)+" Pokémon learner records, "+meta.ok+"/"+meta.total+" move metadata records"+(meta.failed.length?" (failed: "+meta.failed.length+"; "+diagSummary()+"; examples: "+meta.failed.slice(0,5).join(", ")+(meta.failed.length>5?", …":"")+")":"")+".";
      setStatus(msg);
    }finally{
      if(typeof DEX_MOVE_REFERENCE_BUILDING!=="undefined")DEX_MOVE_REFERENCE_BUILDING=false;
      if(typeof DEX_MOVE_FILTER_LOADING!=="undefined")DEX_MOVE_FILTER_LOADING=false;
      if(typeof updateActiveDexFilters==="function")updateActiveDexFilters();
    }
  };

  function initIndexedMoveCache(){setupMoveTypeFilter(); if(typeof window.ensureMoveOptionsLoaded==="function")window.ensureMoveOptionsLoaded(); loadMoveMetaFromIndexedDB(); if(typeof window.renderMoveList==="function")window.renderMoveList();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initIndexedMoveCache); else initIndexedMoveCache();
  window.addEventListener("load",initIndexedMoveCache);
})();
