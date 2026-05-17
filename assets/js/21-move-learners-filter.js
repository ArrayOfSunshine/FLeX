
/* Final move learner index + filter bridge: IndexedDB persistence and DOM/index move matching */
(function(){
  "use strict";

  var STORAGE = (typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "leafgreen_251_dual_tracker_v3_");
  var DB_NAME = STORAGE + "indexeddb_cache_v1";
  var DB_VERSION = 2;
  var KV_STORE = "kv";
  var LEARNER_KEY = "dexMoveLearnerIndexV2";
  var LEARNER_META_KEY = "dexMoveLearnerIndexMetaV2";
  var MOVE_TOTAL = 354;
  var learnerIndexLoading = false;
  var learnerIndexLoaded = false;

  function sleep(ms){return new Promise(function(resolve){setTimeout(resolve,ms);});}
  function esc(v){return String(v == null ? "" : v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
  function splitCamel(s){return String(s||"").replace(/([a-z])([A-Z])/g,"$1 $2");}
  function slugMove(name){var s=splitCamel(String(name||"").trim()); if(!s)return ""; return s.toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");}
  function compactMove(name){return String(name||"").toLowerCase().replace(/[^a-z0-9]/g,"");}
  function titleFromSlug(slug){return String(slug||"").split("-").filter(Boolean).map(function(p){return p.charAt(0).toUpperCase()+p.slice(1);}).join(" ");}

  function gen3MoveObjects(){
    var names = window.GEN3_MOVE_NAMES || [];
    var out = [];
    for(var i=1;i<=MOVE_TOTAL && i<names.length;i++){
      var raw = names[i];
      if(!raw) continue;
      var api = slugMove(raw);
      out.push({id:i, raw:raw, api:api, compact:compactMove(raw), display:titleFromSlug(api)});
    }
    return out;
  }
  var MOVE_OBJS = gen3MoveObjects();
  function objForMove(move){
    var raw = String(move == null ? "" : (move.name || move.display || move.api || move)).trim();
    var slug = slugMove(raw), compact = compactMove(raw);
    for(var i=0;i<MOVE_OBJS.length;i++){
      var o = MOVE_OBJS[i];
      if(o.api === slug || o.compact === compact || compactMove(o.display) === compact || String(o.id) === raw) return o;
    }
    return raw ? {api:slug, compact:compact, display:titleFromSlug(slug)} : null;
  }
  function displayMoveName(move){var o=objForMove(move); return o ? o.display : titleFromSlug(slugMove(move));}

  function setStatus(text){["moveIndexStatus","moveIndexBuildStatus","settingsMoveIndexStatus"].forEach(function(id){var el=document.getElementById(id); if(el) el.textContent=text;});}

  function idbOpen(){
    return new Promise(function(resolve,reject){
      if(!window.indexedDB){reject(new Error("IndexedDB unavailable"));return;}
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function(ev){
        var db = ev.target.result;
        if(!db.objectStoreNames.contains("moveMeta")) db.createObjectStore("moveMeta", {keyPath:"api"});
        if(!db.objectStoreNames.contains(KV_STORE)) db.createObjectStore(KV_STORE, {keyPath:"key"});
      };
      req.onsuccess = function(){resolve(req.result);};
      req.onerror = function(){reject(req.error || new Error("IndexedDB open failed"));};
      req.onblocked = function(){reject(new Error("IndexedDB open blocked"));};
    });
  }
  function kvGet(key){
    return idbOpen().then(function(db){return new Promise(function(resolve,reject){
      var tx = db.transaction(KV_STORE,"readonly"), store = tx.objectStore(KV_STORE), req = store.get(key);
      req.onsuccess = function(){resolve(req.result ? req.result.value : null);};
      req.onerror = function(){reject(req.error || new Error("IndexedDB kv get failed"));};
      tx.oncomplete = function(){db.close();};
      tx.onerror = function(){db.close();};
    });});
  }
  function kvPut(key,value){
    return idbOpen().then(function(db){return new Promise(function(resolve,reject){
      var tx = db.transaction(KV_STORE,"readwrite"), store = tx.objectStore(KV_STORE), req = store.put({key:key,value:value,updatedAt:new Date().toISOString()});
      req.onsuccess = function(){resolve(true);};
      req.onerror = function(){reject(req.error || new Error("IndexedDB kv put failed"));};
      tx.oncomplete = function(){db.close();};
      tx.onerror = function(){db.close();};
    });});
  }

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
  function addMoveKeys(set, value){
    itemNames(value).forEach(function(raw){
      var obj = objForMove(raw);
      var values = [raw, splitCamel(raw), slugMove(raw), compactMove(raw)];
      if(obj) values.push(obj.raw, obj.api, obj.display, slugMove(obj.display), compactMove(obj.display));
      values.forEach(function(v){var k=String(v||"").toLowerCase(); if(k) set[k]=true;});
    });
  }
  function keySetForNames(names){var set={}; (names||[]).forEach(function(n){addMoveKeys(set,n);}); return set;}
  function setHasMove(set, move){
    var tmp = {}; addMoveKeys(tmp, move);
    var keys = Object.keys(tmp);
    for(var i=0;i<keys.length;i++){if(set[keys[i]]) return true;}
    return false;
  }
  function selectedInputs(prefix){
    var out=[], seen={};
    for(var i=0;i<4;i++){
      var el=document.getElementById(prefix+i);
      var val=el && el.value ? el.value.trim() : "";
      if(val){var k=compactMove(val); if(k&&!seen[k]){seen[k]=true; out.push(val);}}
    }
    return out;
  }
  function selectedDexMoves(){
    var out=selectedInputs("dexMoveFilter_");
    var old=document.getElementById("dexMoveFilter");
    if(old&&old.value&&old.value.trim()&&!out.some(function(v){return compactMove(v)===compactMove(old.value);})){out.push(old.value.trim());}
    return out;
  }
  function selectedMyMonMoves(){
    var out=selectedInputs("myMonsMoveFilter_");
    var old=document.getElementById("myMonsMoveFilter");
    if(old&&old.value&&old.value.trim()&&!out.some(function(v){return compactMove(v)===compactMove(old.value);})){out.push(old.value.trim());}
    return out;
  }
  function cardIndexList(card){
    if(typeof DEX_MOVE_REFERENCE_INDEX === "undefined" || !DEX_MOVE_REFERENCE_INDEX || !card) return [];
    var id = card.dataset ? card.dataset.id : "";
    var pokeid = card.dataset ? card.dataset.pokeid : "";
    var keys = [id, String(parseInt(id,10)||""), pokeid, String(parseInt(pokeid,10)||"")];
    for(var i=0;i<keys.length;i++){var k=keys[i]; if(k && DEX_MOVE_REFERENCE_INDEX[k]) return DEX_MOVE_REFERENCE_INDEX[k] || [];}
    return [];
  }
  function cardDomMoveNames(card){
    var out=[], seen={};
    if(!card || !card.querySelectorAll) return out;
    var nodes = card.querySelectorAll(".moveInlineLink,[data-move],.move-list li");
    Array.prototype.forEach.call(nodes,function(node){
      var candidates=[];
      if(node.getAttribute){
        candidates.push(node.getAttribute("data-move-name"));
        candidates.push(node.getAttribute("data-move"));
      }
      if(node.classList && node.classList.contains("moveInlineLink")) candidates.push(node.textContent);
      if(node.matches && node.matches(".move-list li")){
        var btn = node.querySelector && node.querySelector(".moveInlineLink,[data-move]");
        if(btn){candidates.push(btn.getAttribute("data-move-name")); candidates.push(btn.getAttribute("data-move")); candidates.push(btn.textContent);}
      }
      candidates.forEach(function(v){v=String(v||"").trim(); if(!v)return; var k=compactMove(v); if(k&&!seen[k]){seen[k]=true; out.push(v);}});
    });
    return out;
  }
  function cardMoveSet(card){
    return keySetForNames([].concat(cardIndexList(card), cardDomMoveNames(card)));
  }

  function movesFromPayload(payload){
    var out=[], seen={};
    function add(name){
      var obj=objForMove(name), display=obj?obj.display:displayMoveName(name), k=compactMove(display);
      if(k&&!seen[k]){seen[k]=true; out.push(display);}
    }
    if(payload){
      ["levelMoves","machineMoves","tutorMoves","eggMoves"].forEach(function(k){
        (payload[k]||[]).forEach(function(m){add(m && m.name ? m.name : m);});
      });
      if(!out.length && Array.isArray(payload.moves)){
        payload.moves.forEach(function(rec){
          var name = rec && rec.move && rec.move.name;
          if(!name) return;
          var ok = (rec.version_group_details||[]).some(function(d){
            var vg=d&&d.version_group&&d.version_group.name;
            var method=d&&d.move_learn_method&&d.move_learn_method.name;
            return vg==="firered-leafgreen" && ["level-up","machine","tutor","egg"].indexOf(method)>=0;
          });
          if(ok) add(name);
        });
      }
    }
    return out;
  }

  async function saveLearnerIndex(){
    var payload = {index:(typeof DEX_MOVE_REFERENCE_INDEX !== "undefined" ? DEX_MOVE_REFERENCE_INDEX : {}), count:Object.keys(typeof DEX_MOVE_REFERENCE_INDEX !== "undefined" ? DEX_MOVE_REFERENCE_INDEX : {}).length, builtAt:new Date().toISOString(), schema:"frlg_learner_index_v2"};
    try{await kvPut(LEARNER_KEY,payload); await kvPut(LEARNER_META_KEY,{count:payload.count,builtAt:payload.builtAt,schema:payload.schema}); return true;}
    catch(e){console.warn("IndexedDB learner index save failed",e); return false;}
  }
  async function loadLearnerIndex(){
    if(learnerIndexLoading) return;
    learnerIndexLoading = true;
    try{
      var payload = await kvGet(LEARNER_KEY);
      if(payload && payload.index && typeof DEX_MOVE_REFERENCE_INDEX !== "undefined"){
        DEX_MOVE_REFERENCE_INDEX = payload.index || {};
        learnerIndexLoaded = true;
        setStatus("Move learner index loaded: "+Object.keys(DEX_MOVE_REFERENCE_INDEX||{}).length+"/386 Pokémon records.");
      }else{
        learnerIndexLoaded = true;
      }
    }catch(e){
      console.warn("IndexedDB learner index load failed",e);
      learnerIndexLoaded = true;
    }finally{
      learnerIndexLoading = false;
      if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();
      if(typeof applyFilter === "function") applyFilter();
      if(typeof renderMyMons === "function") renderMyMons();
    }
  }

  var previousSaveDexMoveReferenceIndex = window.saveDexMoveReferenceIndex;
  window.saveDexMoveReferenceIndex = function(){
    try{ if(previousSaveDexMoveReferenceIndex) previousSaveDexMoveReferenceIndex(); }catch(e){}
    saveLearnerIndex();
  };

  window.dexMoveReferenceReady = function(){return typeof DEX_MOVE_REFERENCE_INDEX !== "undefined" && Object.keys(DEX_MOVE_REFERENCE_INDEX||{}).length >= 386;};
  window.dexMoveIndexStatusText = function(){
    if(selectedDexMoves().length && !window.dexMoveReferenceReady()) return learnerIndexLoading ? " (index loading)" : " (index not built)";
    return "";
  };
  window.hasAnyDexMoveFilter = function(){return selectedDexMoves().length>0;};
  window.getDexMoveFilterValues = function(){return selectedDexMoves().map(function(v){return {display:v, normalised:slugMove(v)};});};
  window.dexMoveFilterAllowsCard = function(card){
    var selected=selectedDexMoves();
    if(!selected.length) return true;
    if(!window.dexMoveReferenceReady()) return true;
    var set=cardMoveSet(card);
    return selected.every(function(m){return setHasMove(set,m);});
  };
  try{ dexMoveFilterAllowsCard = window.dexMoveFilterAllowsCard; }catch(e){}

  var previousEnsureMoveOptionsLoaded = window.ensureMoveOptionsLoaded;
  window.ensureMoveOptionsLoaded = function(){
    var dl=document.getElementById("moveOptions");
    if(!dl){ if(previousEnsureMoveOptionsLoaded) try{previousEnsureMoveOptionsLoaded();}catch(e){} return; }
    var opts=MOVE_OBJS.slice().sort(function(a,b){return a.display.localeCompare(b.display);});
    dl.innerHTML=opts.map(function(o){return '<option value="'+esc(o.display)+'"></option>';}).join("");
  };

  var previousBuild = window.buildDexMoveReferenceIndex;
  window.buildDexMoveReferenceIndex = async function(force){
    if(typeof DEX_MOVE_REFERENCE_BUILDING !== "undefined" && DEX_MOVE_REFERENCE_BUILDING) return;
    if(!force && window.dexMoveReferenceReady()){
      if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();
      if(typeof applyFilter === "function") applyFilter();
      return;
    }
    if(force && !confirm("Build/refresh the FireRed/LeafGreen Pokémon move index and canonical Gen 3 move metadata cache? This will cache learner data and move metadata in this browser.")) return;
    try{
      DEX_MOVE_REFERENCE_BUILDING = true;
      if(typeof DEX_MOVE_FILTER_LOADING !== "undefined") DEX_MOVE_FILTER_LOADING = true;
      if(force && typeof DEX_MOVE_REFERENCE_INDEX !== "undefined") DEX_MOVE_REFERENCE_INDEX = {};
      window.ensureMoveOptionsLoaded();
      var cards=Array.from(document.querySelectorAll("#grid .card[data-pokeid], .card[data-pokeid]")).filter(function(c,i,a){return c.dataset&&c.dataset.id&&a.findIndex(function(x){return x.dataset&&x.dataset.id===c.dataset.id;})===i;});
      if(typeof DEX_MOVE_REFERENCE_PROGRESS !== "undefined") DEX_MOVE_REFERENCE_PROGRESS = {done:0,total:cards.length||386};
      for(var i=0;i<cards.length;i++){
        var card=cards[i], id=card.dataset.id, pokeid=card.dataset.pokeid;
        try{
          setStatus("Building Pokémon move index "+(i+1)+"/"+cards.length+" — #"+id);
          if(force || !DEX_MOVE_REFERENCE_INDEX[id] || !DEX_MOVE_REFERENCE_INDEX[id].length){
            var payload=null;
            if(typeof window.fetchPokemonData === "function") payload = await window.fetchPokemonData(pokeid);
            else {var r=await fetch("https://pokeapi.co/api/v2/pokemon/"+pokeid+"/"); if(r.ok) payload=await r.json();}
            var names=movesFromPayload(payload||{});
            if(!names.length) names=cardDomMoveNames(card);
            DEX_MOVE_REFERENCE_INDEX[id]=names;
          }
        }catch(e){
          console.warn("Move learner index build failed for", id, e);
          if(!DEX_MOVE_REFERENCE_INDEX[id]) DEX_MOVE_REFERENCE_INDEX[id]=cardDomMoveNames(card);
        }
        if(typeof DEX_MOVE_REFERENCE_PROGRESS !== "undefined") DEX_MOVE_REFERENCE_PROGRESS.done=i+1;
        if(i%8===0){await saveLearnerIndex(); if(typeof updateActiveDexFilters === "function") updateActiveDexFilters(); await sleep(15);}
      }
      await saveLearnerIndex();
      var beforeStatusCount = Object.keys(DEX_MOVE_REFERENCE_INDEX||{}).length;
      if(previousBuild){
        var oldConfirm = window.confirm;
        try{ if(force) window.confirm=function(){return true;}; await previousBuild(force); }
        catch(e){ console.warn("Previous metadata build bridge failed", e); }
        finally{ window.confirm=oldConfirm; }
      }
      await saveLearnerIndex();
      setStatus("Move index refresh complete: "+Object.keys(DEX_MOVE_REFERENCE_INDEX||{}).length+"/386 Pokémon learner records"+(beforeStatusCount<386?"; rebuilt from canonical parser":"")+".");
    }finally{
      DEX_MOVE_REFERENCE_BUILDING = false;
      if(typeof DEX_MOVE_FILTER_LOADING !== "undefined") DEX_MOVE_FILTER_LOADING = false;
      if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();
      if(typeof applyFilter === "function") applyFilter();
      if(typeof renderMyMons === "function") renderMyMons();
      if(typeof window.renderMoveList === "function") window.renderMoveList();
    }
  };

  window.getMyMonsMoveFilterValues = function(){return selectedMyMonMoves().map(slugMove).slice(0,4);};
  try{ getMyMonsMoveFilterValues = window.getMyMonsMoveFilterValues; }catch(e){}
  window.monMatchesMyMonsFilters = function(mon){
    var search=((document.getElementById("myMonsSearch")||{}).value||"").trim().toLowerCase();
    var type=(document.getElementById("myMonsTypeFilter")||{}).value||"";
    var type2=(document.getElementById("myMonsTypeFilter2")||{}).value||"";
    var nature=(document.getElementById("myMonsNatureFilter")||{}).value||"";
    var abilityEl=document.getElementById("myMonsAbilityFilter");
    var rawAbilityFilter=(abilityEl&&abilityEl.value||"").trim().toLowerCase();
    var abilityFilter=typeof normaliseAbilityName==="function"?normaliseAbilityName(rawAbilityFilter):rawAbilityFilter;
    var selected=selectedMyMonMoves();
    var speciesName=(mon&&(mon.speciesName||(typeof getSpeciesName==="function"?getSpeciesName(mon.speciesId):"")))||"";
    if(search && typeof speciesFilterMatches==="function" && !speciesFilterMatches(mon.speciesId||"",speciesName,search)) return false;
    if(nature && String(mon.nature||"").toLowerCase()!==nature) return false;
    if(abilityFilter){
      var monAbility=typeof normaliseAbilityName==="function"?normaliseAbilityName(mon.ability||""):String(mon.ability||"").toLowerCase();
      var monAbilityDisplay=typeof displayAbilityName==="function"?displayAbilityName(mon.ability||"").toLowerCase():String(mon.ability||"").toLowerCase();
      if(!(monAbility===abilityFilter || monAbility.indexOf(abilityFilter)>=0 || monAbilityDisplay.indexOf(rawAbilityFilter)>=0)) return false;
    }
    var types=typeof getSpeciesTypesForMon==="function"?getSpeciesTypesForMon(mon):[];
    if(type && types.indexOf(type)<0) return false;
    if(type2 && types.indexOf(type2)<0) return false;
    if(selected.length){
      var moves=(mon&&mon.moves||[]).map(function(m){return m&&m.name?m.name:m;});
      var set=keySetForNames(moves);
      if(!selected.every(function(m){return setHasMove(set,m);})) return false;
    }
    return true;
  };
  try{ monMatchesMyMonsFilters = window.monMatchesMyMonsFilters; }catch(e){}

  function init(){
    window.ensureMoveOptionsLoaded();
    loadLearnerIndex();
    setTimeout(function(){window.ensureMoveOptionsLoaded(); if(typeof applyFilter==="function")applyFilter(); if(typeof renderMyMons==="function")renderMyMons();},700);
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.addEventListener("load", function(){setTimeout(init,300);});
})();
