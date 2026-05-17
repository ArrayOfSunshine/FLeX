
/* FLéX hosted prebuilt JSON repair — direct static data bridge
   Fixes slow/stalling location loads and move cards with missing metadata by
   using data/flex-prebuilt-data-gen3.json (or split files) directly. */
(function(){
  "use strict";
  if(window.__FLEX_HOSTED_PREBUILT_DIRECT_BRIDGE_V2__) return;
  window.__FLEX_HOSTED_PREBUILT_DIRECT_BRIDGE_V2__ = true;

  var MOVE_TOTAL = 354;
  var prebuiltReady = null;
  var moveMetaBySlug = {};

  function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
  function splitCamel(s){return String(s||"").replace(/([a-z])([A-Z])/g,"$1 $2");}
  function slugMove(name){var s=splitCamel(String(name||"").trim()); if(!s) return ""; return s.toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");}
  function compactMove(name){return String(name||"").toLowerCase().replace(/[^a-z0-9]/g,"");}
  function titleFromSlug(slug){return String(slug||"").split("-").filter(Boolean).map(function(p){return p.charAt(0).toUpperCase()+p.slice(1);}).join(" ");}
  function currentVersion(){try{return typeof getGameVersion==="function" ? getGameVersion() : "leafgreen";}catch(e){return "leafgreen";}}
  function status(text){["moveListStatus","moveIndexStatus","moveIndexBuildStatus","settingsMoveIndexStatus"].forEach(function(id){var el=document.getElementById(id); if(el && text) el.textContent=text;});}

  function moveObjects(){
    var names = window.GEN3_MOVE_NAMES || [];
    var out = [];
    for(var i=1;i<=MOVE_TOTAL && i<names.length;i++){
      var raw = names[i];
      if(!raw) continue;
      var api = slugMove(raw);
      out.push({id:i, raw:raw, api:api, compact:compactMove(raw), display:typeof formatMoveName==="function" ? formatMoveName(api) : titleFromSlug(api)});
    }
    return out;
  }
  var MOVE_OBJS = moveObjects();
  var MOVE_BY_SLUG = {}, MOVE_BY_COMPACT = {}, MOVE_BY_ID = {};
  MOVE_OBJS.forEach(function(o){MOVE_BY_SLUG[o.api]=o; MOVE_BY_COMPACT[o.compact]=o; MOVE_BY_ID[String(o.id)]=o;});
  function objForMove(move){
    var raw = String(move && move.name ? move.name : (move && move.api ? move.api : move || "")).trim();
    return MOVE_BY_SLUG[slugMove(raw)] || MOVE_BY_COMPACT[compactMove(raw)] || MOVE_BY_ID[String(raw)] || null;
  }

  function normalisedMoveMetaFromPrebuilt(m){
    if(!m) return null;
    var obj = MOVE_BY_ID[String(m.id)] || MOVE_BY_SLUG[slugMove(m.name)] || MOVE_BY_COMPACT[compactMove(m.name)] || {id:m.id||0, api:slugMove(m.name), display:m.display||titleFromSlug(slugMove(m.name))};
    return {
      schema:"flex_prebuilt_move_meta_v1",
      id:obj.id || m.id,
      api:obj.api || slugMove(m.name),
      name:obj.api || slugMove(m.name),
      display:obj.display || m.display || titleFromSlug(slugMove(m.name)),
      type:m.type || "",
      damage_class:m.damage_class || m.class || "",
      category:m.damage_class || m.class || "",
      power:m.power == null ? null : Number(m.power),
      accuracy:m.accuracy == null ? null : Number(m.accuracy),
      pp:m.pp == null ? null : Number(m.pp),
      priority:m.priority == null ? 0 : Number(m.priority)||0,
      flavor:m.flavor_text || m.flavor || "",
      effect:m.effect || "",
      fullDetailsLoaded:true,
      source:"prebuilt-json"
    };
  }

  function indexPrebuiltMoves(data){
    moveMetaBySlug = {};
    (data && data.moves || []).forEach(function(m){
      var meta = normalisedMoveMetaFromPrebuilt(m);
      if(!meta || !meta.api) return;
      var obj = objForMove(meta.api) || objForMove(meta.id) || objForMove(meta.display);
      if(obj){meta.api=obj.api; meta.name=obj.api; meta.id=obj.id; meta.display=obj.display;}
      moveMetaBySlug[meta.api] = meta;
      moveMetaBySlug[compactMove(meta.display)] = meta;
      moveMetaBySlug[String(meta.id)] = meta;
    });
    return moveMetaBySlug;
  }

  function getPrebuiltMoveMeta(move){
    var obj = objForMove(move);
    if(obj && moveMetaBySlug[obj.api]) return moveMetaBySlug[obj.api];
    var raw = String(move && move.name ? move.name : (move && move.api ? move.api : move || ""));
    return moveMetaBySlug[slugMove(raw)] || moveMetaBySlug[compactMove(raw)] || moveMetaBySlug[String(raw)] || null;
  }

  function areaToLocationName(raw){
    var s = String(raw || "").toLowerCase();
    s = s.replace(/^kanto-/,"").replace(/-area$/,"").replace(/-room$/,"");
    var route = s.match(/^route-(\d+)/);
    if(route) return "Route " + parseInt(route[1],10);
    s = s.replace(/pokemon-/g,"pokemon-");
    var parts = s.split("-").filter(Boolean).map(function(part){
      if(part === "mt") return "Mt.";
      if(part === "ss") return "S.S.";
      if(/^b\d+f$/.test(part) || /^\d+f$/.test(part)) return part.toUpperCase();
      if(part === "pokemon") return "Pokémon";
      return part.charAt(0).toUpperCase()+part.slice(1);
    });
    return parts.join(" ").replace(/\s+/g," ").trim();
  }
  function encounterMethod(method){
    var map={"walk":"Walking / grass or cave","surf":"Surfing","old-rod":"Fishing / Old Rod","good-rod":"Fishing / Good Rod","super-rod":"Fishing / Super Rod","rock-smash":"Rock Smash","headbutt":"Headbutt"};
    method = String(method||"");
    return map[method] || method.split("-").filter(Boolean).map(function(w){return w.charAt(0).toUpperCase()+w.slice(1);}).join(" ");
  }
  function pokemonNameById(data,id){
    var p = (data.pokemon || []).find(function(x){return String(x.id)===String(id);});
    if(!p) return "#" + String(id).padStart(3,"0");
    var s = (data.species || []).find(function(x){return String(x.id)===String(id);});
    return (s && s.display) || p.display || p.name || ("#" + String(id).padStart(3,"0"));
  }
  function buildLocationDataFromPrebuilt(data, version){
    var out = {};
    (data.encounters || []).forEach(function(mon){
      var id = String(mon.id || "").padStart(3,"0");
      var name = pokemonNameById(data, mon.id);
      (mon.encounters || []).forEach(function(area){
        var loc = areaToLocationName(area.location_area && area.location_area.name || "");
        if(!loc) return;
        (area.version_details || []).filter(function(v){return v && v.version === version;}).forEach(function(v){
          (v.encounter_details || []).forEach(function(d){
            var min=d.min_level, max=d.max_level;
            var level = min===max ? "Lv "+min : "Lv "+min+"-"+max;
            var chance = d.chance != null ? d.chance+"%" : (v.max_chance != null ? v.max_chance+"%" : "");
            var cond = d.condition_values && d.condition_values.length ? " ("+d.condition_values.map(function(c){return String(c).replace(/-/g," ");}).join(", ")+")" : "";
            if(!out[loc]) out[loc] = [];
            out[loc].push({id:id, name:name, method:encounterMethod(d.method), rate:(chance ? chance+"; " : "") + level + cond});
          });
        });
      });
    });
    Object.keys(out).forEach(function(loc){
      var seen={};
      out[loc]=out[loc].filter(function(x){var k=x.id+"|"+x.method+"|"+x.rate; if(seen[k]) return false; seen[k]=true; return true;})
        .sort(function(a,b){return parseInt(a.id,10)-parseInt(b.id,10) || String(a.method).localeCompare(String(b.method));});
    });
    return out;
  }

  function buildLearnerIndexFromPrebuilt(data){
    if(!data || !data.pokemon || !data.pokemon.length) return;
    var idx = {};
    data.pokemon.forEach(function(p){
      var moves=[];
      (p.moves || []).forEach(function(m){
        var allowed=(m.version_group_details || []).some(function(d){return d.version_group === "firered-leafgreen" && ["level-up","machine","tutor","egg"].indexOf(d.move_learn_method)>=0;});
        if(allowed) moves.push(slugMove(m.name));
      });
      idx[String(p.id).padStart(3,"0")] = Array.from(new Set(moves));
      idx[String(p.id)] = idx[String(p.id).padStart(3,"0")];
    });
    try{
      window.DEX_MOVE_REFERENCE_INDEX = idx;
      if(typeof DEX_MOVE_REFERENCE_INDEX !== "undefined") DEX_MOVE_REFERENCE_INDEX = idx;
      if(typeof saveDexMoveReferenceIndex === "function") saveDexMoveReferenceIndex();
      if(typeof DEX_MOVE_REFERENCE_META_KEY !== "undefined") localStorage.setItem(DEX_MOVE_REFERENCE_META_KEY, JSON.stringify({schema:"flex_prebuilt_json_learners_v1", builtAt:new Date().toISOString(), count:Object.keys(idx).length/2, source:"prebuilt-json"}));
    }catch(e){console.warn("Could not install prebuilt learner index", e);}
  }

  async function ensurePrebuilt(){
    if(prebuiltReady) return prebuiltReady;
    prebuiltReady = (async function(){
      if(typeof window.loadFlexPrebuiltData !== "function") throw new Error("Prebuilt loader is unavailable");
      var data = await window.loadFlexPrebuiltData();
      if(!data) throw new Error("Prebuilt JSON files were not found. Upload them to /data.");
      indexPrebuiltMoves(data);
      buildLearnerIndexFromPrebuilt(data);
      return data;
    })();
    return prebuiltReady;
  }

  var previousGetMoveMetaSync = window.getMoveMetaSync;
  var previousGetMoveMeta = window.getMoveMeta;
  window.getMoveMetaSync = function(move){
    return getPrebuiltMoveMeta(move) || (previousGetMoveMetaSync ? previousGetMoveMetaSync(move) : null);
  };
  window.monMoveMetaFromCache = function(move){return window.getMoveMetaSync(move && move.name ? move.name : move);};
  window.getMoveMeta = async function(move){
    var pre = getPrebuiltMoveMeta(move);
    if(pre) return pre;
    try{await ensurePrebuilt(); pre = getPrebuiltMoveMeta(move); if(pre) return pre;}catch(e){}
    return previousGetMoveMeta ? previousGetMoveMeta(move) : null;
  };

  function isTabActive(id){
    var el = document.getElementById(id);
    return !!(el && el.classList && el.classList.contains("active"));
  }

  function ensurePrebuiltForFeature(reason){
    status(reason ? ("Loading " + reason + " data…") : "Loading static data…");
    return ensurePrebuilt().then(function(){
      status("Static FLéX data loaded from /data.");
      return true;
    }).catch(function(e){
      console.warn("Prebuilt static data bridge unavailable", e);
      throw e;
    });
  }

  var previousRenderMoveList = window.renderMoveList;
  if(typeof previousRenderMoveList === "function"){
    window.renderMoveList = function(){
      var result = previousRenderMoveList.apply(this, arguments);
      if(isTabActive("moveListTab") && !prebuiltReady){
        ensurePrebuiltForFeature("move metadata").then(function(){try{previousRenderMoveList();}catch(e){}}).catch(function(){});
      }
      return result;
    };
  }

  window.loadEncounterData = async function(force){
    var container = document.getElementById("locationResults");
    if(container && !window.ENCOUNTER_LOCATION_DATA) container.innerHTML = '<p class="smallText">Loading prebuilt FLéX encounter data…</p>';
    try{
      var data = await ensurePrebuiltForFeature("encounter");
      data = await ensurePrebuilt();
      var built = buildLocationDataFromPrebuilt(data, currentVersion());
      ENCOUNTER_LOCATION_DATA = built;
      window.ENCOUNTER_LOCATION_DATA = built;
      try{localStorage.removeItem(typeof encounterCacheKey === "function" ? encounterCacheKey() : "");}catch(e){}
      if(typeof refreshLocationDropdown === "function") refreshLocationDropdown();
      if(typeof renderLocationView === "function") renderLocationView();
      return built;
    }catch(e){
      console.warn("Prebuilt encounter load failed", e);
      if(container) container.innerHTML = '<p class="error">Could not load prebuilt encounter data. Check that the JSON files are in the /data folder.</p>';
      return null;
    }
  };

  var previousInitLocations = window.initLocations;
  window.initLocations = function(){
    if(previousInitLocations) previousInitLocations.apply(this, arguments);
    if(isTabActive("locationTab")) window.loadEncounterData(false);
  };

  var previousShowTab = window.showTab;
  if(typeof previousShowTab === "function" && !previousShowTab.__flexLazyPrebuiltWrapped){
    window.showTab = function(tabId){
      var result = previousShowTab.apply(this, arguments);
      if(tabId === "moveListTab"){
        ensurePrebuiltForFeature("move metadata").then(function(){try{if(typeof window.renderMoveList === "function") window.renderMoveList();}catch(e){}}).catch(function(){});
      }
      if(tabId === "locationTab") window.loadEncounterData(false);
      return result;
    };
    window.showTab.__flexLazyPrebuiltWrapped = true;
  }

  window.ensureFlexPrebuiltData = ensurePrebuilt;
  status("Static JSON will load when Move List or Locations are opened.");
})();
