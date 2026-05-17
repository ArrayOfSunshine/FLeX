
/* Final bridge: make legacy move consumers read canonical IndexedDB-backed metadata/index shapes */
(function(){
  function moveSlug(name){
    var s = String(name || "").trim();
    if(!s) return "";
    s = s.replace(/([a-z])([A-Z])/g,"$1 $2");
    return s.toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  }
  function moveCompact(name){ return String(name || "").toLowerCase().replace(/[^a-z0-9]/g,""); }
  function moveDisplay(name){
    if(typeof formatMoveName === "function") return formatMoveName(moveSlug(name));
    return String(name || "").replace(/-/g," ").replace(/\b\w/g,function(c){return c.toUpperCase();});
  }
  function moveKeys(name){
    var raw = String(name && name.name ? name.name : (name || "")).trim();
    var slug = moveSlug(raw);
    var display = moveDisplay(raw);
    return [raw, slug, display, moveCompact(raw), moveCompact(slug), moveCompact(display)].filter(Boolean);
  }
  function moveKeySet(list){
    var set = {};
    (list || []).forEach(function(item){
      moveKeys(item && item.name ? item.name : item).forEach(function(k){ set[k] = true; });
    });
    return set;
  }
  function moveSetHas(set, value){
    return moveKeys(value).some(function(k){ return !!set[k]; });
  }
  function selectedDexMoves(){
    var out = [];
    for(var i=0;i<4;i++){
      var el = document.getElementById("dexMoveFilter_" + i);
      if(el && el.value.trim()) out.push(el.value.trim());
    }
    var oldEl = document.getElementById("dexMoveFilter");
    if(oldEl && oldEl.value.trim()) out.push(oldEl.value.trim());
    var seen = {};
    return out.filter(function(v){ var k = moveCompact(v); if(!k || seen[k]) return false; seen[k] = true; return true; });
  }
  function selectedMyMonsMoves(){
    var out = [];
    for(var i=0;i<4;i++){
      var el = document.getElementById("myMonsMoveFilter_" + i);
      if(el && el.value.trim()) out.push(el.value.trim());
    }
    var oldEl = document.getElementById("myMonsMoveFilter");
    if(oldEl && oldEl.value.trim()) out.push(oldEl.value.trim());
    var seen = {};
    return out.filter(function(v){ var k = moveCompact(v); if(!k || seen[k]) return false; seen[k] = true; return true; });
  }
  function metaForMove(move){
    if(!move) return null;
    var attempts = moveKeys(move && move.name ? move.name : move);
    if(typeof window.getMoveMetaSync === "function"){
      for(var i=0;i<attempts.length;i++){
        var meta = window.getMoveMetaSync(attempts[i]);
        if(meta) return meta;
      }
    }
    return null;
  }
  function moveModel(move){
    var rawName = String(move && move.name ? move.name : (move || "")).trim();
    if(!rawName) return null;
    var meta = metaForMove(rawName) || {};
    var cls = meta.damage_class || meta.damageClass || meta.category || (move && move.category) || "";
    if(cls && typeof cls === "object") cls = cls.name || "";
    var type = meta.type || (move && move.type) || "";
    if(type && typeof type === "object") type = type.name || "";
    var power = meta.power;
    if(power === null || power === undefined || power === "") power = (move && move.power !== undefined && move.power !== "") ? move.power : 0;
    var accuracy = meta.accuracy;
    if(accuracy === null || accuracy === undefined || accuracy === "") accuracy = (move && move.accuracy !== undefined && move.accuracy !== "") ? move.accuracy : 100;
    return {
      name: rawName,
      display: meta.display || moveDisplay(rawName),
      type: type || "",
      power: Number(power) || 0,
      accuracy: Number(accuracy) || 100,
      category: cls || "",
      damage_class: cls || "",
      pp: meta.pp,
      priority: meta.priority || 0,
      effect: meta.effect || "",
      flavor: meta.flavor || ""
    };
  }

  window.normaliseMoveName = moveSlug;
  window.dexNormaliseMoveName = moveSlug;

  try{
    dexMoveFilterAllowsCard = function(card){
      var selected = selectedDexMoves();
      if(!selected.length) return true;
      if(typeof dexMoveReferenceReady === "function" && !dexMoveReferenceReady()) return true;
      var id = card && card.dataset ? card.dataset.id : "";
      var list = (typeof DEX_MOVE_REFERENCE_INDEX !== "undefined" && DEX_MOVE_REFERENCE_INDEX && DEX_MOVE_REFERENCE_INDEX[id]) ? DEX_MOVE_REFERENCE_INDEX[id] : [];
      var set = moveKeySet(list);
      return selected.every(function(move){ return moveSetHas(set, move); });
    };
  }catch(e){ console.warn("Could not bridge Dex move filter", e); }

  try{
    getMyMonsMoveFilterValues = function(){ return selectedMyMonsMoves().map(moveSlug).slice(0,4); };
  }catch(e){ console.warn("Could not bridge My Mon move filter values", e); }

  try{
    monMatchesMyMonsFilters = function(mon){
      var search = ((document.getElementById("myMonsSearch") || {}).value || "").trim().toLowerCase();
      var type = (document.getElementById("myMonsTypeFilter") || {}).value || "";
      var type2 = (document.getElementById("myMonsTypeFilter2") || {}).value || "";
      var nature = (document.getElementById("myMonsNatureFilter") || {}).value || "";
      var abilityEl = document.getElementById("myMonsAbilityFilter");
      var rawAbilityFilter = (abilityEl && abilityEl.value || "").trim().toLowerCase();
      var abilityFilter = typeof normaliseAbilityName === "function" ? normaliseAbilityName(rawAbilityFilter) : rawAbilityFilter;
      var selected = selectedMyMonsMoves();
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
        var set = moveKeySet((mon.moves || []).map(function(m){ return m && m.name ? m.name : m; }));
        if(!selected.every(function(m){ return moveSetHas(set, m); })) return false;
      }
      return true;
    };
  }catch(e){ console.warn("Could not bridge My Mon filters", e); }

  try{
    monMoveMetaFromCache = function(move){ return moveModel(move); };
    window.monMoveMetaFromCache = monMoveMetaFromCache;
  }catch(e){ console.warn("Could not bridge rating move metadata", e); }

  try{
    getTeamSlotSelectedMoves = function(slot){
      var moves = [];
      for(var j=0;j<4;j++){
        var nameEl = document.getElementById("teamMoveName_" + slot + "_" + j);
        var name = nameEl ? nameEl.value.trim() : "";
        if(!name) continue;
        var model = moveModel(name) || {name:name,type:"",power:0,accuracy:100,category:""};
        moves.push(model);
      }
      return moves;
    };
  }catch(e){ console.warn("Could not bridge team selected moves", e); }

  try{
    getTeamMoveDetails = function(){
      var moves = [];
      for(var i=0;i<6;i++){
        var speciesId = typeof getTeamSpeciesId === "function" ? getTeamSpeciesId(i) : "";
        var card = speciesId ? document.querySelector('.card[data-id="' + speciesId + '"]') : null;
        var pokemonName = card ? card.dataset.name : "";
        var pokemonTypes = card && card.dataset.types ? card.dataset.types.split(",").filter(Boolean) : [];
        for(var j=0;j<4;j++){
          var nameEl = document.getElementById("teamMoveName_" + i + "_" + j);
          var name = nameEl ? nameEl.value.trim() : "";
          if(!name) continue;
          var model = moveModel(name);
          if(!model) continue;
          model.slot = i;
          model.pokemon = pokemonName || ("Slot " + (i + 1));
          model.pokemonTypes = pokemonTypes;
          moves.push(model);
        }
      }
      return moves;
    };
  }catch(e){ console.warn("Could not bridge team move details", e); }

  function refreshMoveConsumers(){
    try{ if(typeof applyFilter === "function") applyFilter(); }catch(e){}
    try{ if(typeof renderMyMons === "function") renderMyMons(); }catch(e){}
    try{ if(typeof analyzeTeam === "function") analyzeTeam(); }catch(e){}
  }
  window.refreshMoveConsumersFromIndexedDB = refreshMoveConsumers;
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(refreshMoveConsumers, 600); });
  else setTimeout(refreshMoveConsumers, 600);
  window.addEventListener("load", function(){ setTimeout(refreshMoveConsumers, 900); });
})();
