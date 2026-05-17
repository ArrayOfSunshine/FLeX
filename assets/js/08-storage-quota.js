
/* Team Builder storage quota repair
   Saved teams are tiny, but the app can fill localStorage with rebuildable PokéAPI caches.
   If localStorage is full, clear only rebuildable caches and retry the team save. */
(function(){
  var STORAGE_PREFIX = "leafgreen_251_dual_tracker_v3_";
  var DATA_PREFIX = "leafgreen_251_pokedata_v1_";
  var TEAM_SAVE_KEY = STORAGE_PREFIX + "saved_teams_v3";
  var CURRENT_TEAM_ID_KEY = STORAGE_PREFIX + "current_team_id_v3";

  function safeParse(value, fallback){
    try{
      var parsed = JSON.parse(value || "null");
      return parsed === null ? fallback : parsed;
    }catch(e){
      return fallback;
    }
  }

  function makeUid(){
    return "team_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function esc(value){
    return String(value == null ? "" : value)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/\"/g,"&quot;")
      .replace(/'/g,"&#39;");
  }

  function isQuotaError(err){
    return !!err && (
      err.name === "QuotaExceededError" ||
      err.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
      err.code === 22 ||
      err.code === 1014 ||
      /quota/i.test(String(err.message || err))
    );
  }

  function localStorageKeys(){
    var keys = [];
    for(var i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
    return keys;
  }

  function removeKeysMatching(test){
    var removed = 0;
    localStorageKeys().forEach(function(k){
      if(test(k)){
        try{ localStorage.removeItem(k); removed++; }catch(e){}
      }
    });
    return removed;
  }

  function clearRebuildableCaches(){
    var removed = 0;
    var exactEncounterSuffix = "_exact_encounters_v1";
    var exactEncounterPrefixLeaf = STORAGE_PREFIX + "leafgreen";
    var exactEncounterPrefixFire = STORAGE_PREFIX + "firered";

    var cachePrefixes = [
      DATA_PREFIX,
      STORAGE_PREFIX + "raw_pokemon_v1_",
      STORAGE_PREFIX + "raw_species_v1_",
      STORAGE_PREFIX + "raw_move_v1_",
      STORAGE_PREFIX + "raw_evolution_chain_v1_",
      STORAGE_PREFIX + "egg_donors_v1_",
      STORAGE_PREFIX + "egg_donors_v2_"
    ];

    var cacheKeys = {};
    [
      STORAGE_PREFIX + "dex_move_learners_v2",
      STORAGE_PREFIX + "dex_frlg_reference_move_index_v1",
      STORAGE_PREFIX + "dex_frlg_reference_move_index_meta_v1",
      STORAGE_PREFIX + "all_moves_type_cache_v1",
      STORAGE_PREFIX + "move_meta_cache_v1",
      STORAGE_PREFIX + "ability_meta_cache_v2",
      STORAGE_PREFIX + "pokemon_abilities_cache_gen3_v1",
      STORAGE_PREFIX + "ability_options_gen3_cache_v1",
      STORAGE_PREFIX + "dex_ability_reference_gen3_v1"
    ].forEach(function(k){ cacheKeys[k] = true; });

    removed += removeKeysMatching(function(k){
      if(!k) return false;
      if(cacheKeys[k]) return true;
      for(var i = 0; i < cachePrefixes.length; i++){
        if(k.indexOf(cachePrefixes[i]) === 0) return true;
      }
      if((k.indexOf(exactEncounterPrefixLeaf) === 0 || k.indexOf(exactEncounterPrefixFire) === 0) && k.slice(-exactEncounterSuffix.length) === exactEncounterSuffix) return true;
      return false;
    });

    if(typeof DEX_MOVE_REFERENCE_INDEX !== "undefined"){
      try{ DEX_MOVE_REFERENCE_INDEX = {}; }catch(e){}
    }

    return removed;
  }

  function setCriticalItem(key, value){
    try{
      localStorage.setItem(key, value);
      return {ok:true, cleared:false};
    }catch(firstErr){
      if(!isQuotaError(firstErr)) throw firstErr;
      var removed = clearRebuildableCaches();
      try{
        localStorage.setItem(key, value);
        return {ok:true, cleared:true, removed:removed};
      }catch(secondErr){
        throw secondErr;
      }
    }
  }

  function setCriticalItems(pairs){
    var cleared = false;
    var removed = 0;
    for(var i = 0; i < pairs.length; i++){
      var result = setCriticalItem(pairs[i].key, pairs[i].value);
      cleared = cleared || !!result.cleared;
      removed += result.removed || 0;
    }
    return {cleared:cleared, removed:removed};
  }

  function normaliseTeams(raw){
    if(Array.isArray(raw)){
      return raw.filter(function(t){ return t && typeof t === "object"; }).map(function(t){
        return {
          uid: String(t.uid || makeUid()),
          name: String(t.name || "Unnamed team"),
          slots: Array.isArray(t.slots) ? t.slots : [],
          updated: t.updated || ""
        };
      });
    }
    if(raw && typeof raw === "object"){
      return Object.keys(raw).map(function(k){
        var t = raw[k] || {};
        return {
          uid: String(t.uid || k || makeUid()),
          name: String(t.name || "Unnamed team"),
          slots: Array.isArray(t.slots) ? t.slots : [],
          updated: t.updated || ""
        };
      });
    }
    return [];
  }

  function getTeams(){
    return normaliseTeams(safeParse(localStorage.getItem(TEAM_SAVE_KEY), []));
  }

  function getCurrentTeamId(){
    return localStorage.getItem(CURRENT_TEAM_ID_KEY) || "";
  }

  function setCurrentTeamId(uid){
    if(uid) return setCriticalItem(CURRENT_TEAM_ID_KEY, uid);
    localStorage.removeItem(CURRENT_TEAM_ID_KEY);
    return {ok:true};
  }

  function saveTeamsAndCurrent(teams, uid){
    teams = normaliseTeams(teams);
    return setCriticalItems([
      {key: TEAM_SAVE_KEY, value: JSON.stringify(teams)},
      {key: CURRENT_TEAM_ID_KEY, value: uid || ""}
    ]);
  }

  function populateTeamDropdown(){
    var sel = document.getElementById("teamLoadSelect");
    if(!sel) return;
    var teams = getTeams();
    var current = getCurrentTeamId();
    var html = '<option value="">Select saved team...</option>';
    teams.forEach(function(t){
      if(t && t.uid) html += '<option value="' + esc(t.uid) + '">' + esc(t.name || "Unnamed team") + '</option>';
    });
    sel.innerHTML = html;
    if(current && teams.some(function(t){ return t && t.uid === current; })) sel.value = current;
    else sel.value = "";
  }

  function getMode(slot){
    var checked = document.querySelector('input[name="teamMode_' + slot + '"]:checked');
    return checked && checked.value === "species" ? "species" : "mon";
  }

  function getMoveField(slot, move){
    return {
      nameEl: document.getElementById("teamMoveName_" + slot + "_" + move),
      typeEl: document.getElementById("teamMoveType_" + slot + "_" + move)
    };
  }

  function captureSlots(){
    if(typeof captureCurrentTeamSlots === "function" && captureCurrentTeamSlots !== captureSlots){
      try{
        var fromExisting = captureCurrentTeamSlots();
        if(Array.isArray(fromExisting) && fromExisting.length) return fromExisting;
      }catch(e){}
    }

    var slots = [];
    for(var i=0;i<6;i++){
      var moves = [];
      for(var j=0;j<4;j++){
        var f = getMoveField(i, j);
        moves.push({
          name: f.nameEl ? f.nameEl.value : "",
          type: f.typeEl ? f.typeEl.value : "",
          power: f.nameEl ? (f.nameEl.dataset.power || "") : "",
          accuracy: f.nameEl ? (f.nameEl.dataset.accuracy || "") : "",
          category: f.nameEl ? (f.nameEl.dataset.category || "") : ""
        });
      }
      var monSel = document.getElementById("teamMonSelect_" + i);
      var speciesSel = document.getElementById("teamSpeciesSelect_" + i);
      slots.push({
        mode: getMode(i),
        monUid: monSel ? monSel.value : "",
        speciesId: speciesSel ? speciesSel.value : "",
        moves: moves
      });
    }
    return slots;
  }

  function getLoadedTeam(){
    var uid = getCurrentTeamId();
    if(!uid) return null;
    return getTeams().find(function(t){ return t && t.uid === uid; }) || null;
  }

  window.getSavedTeams = getTeams;
  window.populateTeamLoadSelect = populateTeamDropdown;
  window.setSavedTeams = function(teams){
    var current = getCurrentTeamId();
    var result = saveTeamsAndCurrent(teams, current);
    populateTeamDropdown();
    return result;
  };

  window.saveCurrentTeam = function(){
    try{
      var teams = getTeams();
      var uid = getCurrentTeamId();
      var existing = uid ? teams.find(function(t){ return t && t.uid === uid; }) : null;
      var name;

      if(existing){
        if(!confirm('Save changes to team "' + (existing.name || "Unnamed team") + '"?')) return;
        name = existing.name || "Unnamed team";
      }else{
        name = prompt("Team name?");
        if(!name || !name.trim()) return;
        name = name.trim();
        uid = makeUid();
      }

      var team = {
        uid: uid,
        name: name,
        slots: captureSlots(),
        updated: new Date().toISOString()
      };

      var idx = teams.findIndex(function(t){ return t && t.uid === uid; });
      if(idx >= 0) teams[idx] = team;
      else teams.unshift(team);

      var storageResult = saveTeamsAndCurrent(teams, uid);
      populateTeamDropdown();
      var sel = document.getElementById("teamLoadSelect");
      if(sel) sel.value = uid;
      if(typeof analyzeTeam === "function") analyzeTeam();

      if(storageResult.cleared){
        alert("Team saved. Some rebuildable API caches were cleared because browser storage was full. They will reload as needed.");
      }else{
        alert("Team saved.");
      }
    }catch(e){
      alert("Team could not be saved: " + (e && e.message ? e.message : e));
    }
  };

  window.renameCurrentTeam = function(){
    try{
      var team = getLoadedTeam();
      if(!team){ alert("Load or save a team first, then rename it."); return; }
      var newName = prompt("Rename team:", team.name || "Unnamed team");
      if(!newName || !newName.trim()) return;
      var teams = getTeams();
      teams.forEach(function(t){
        if(t && t.uid === team.uid){
          t.name = newName.trim();
          t.updated = new Date().toISOString();
        }
      });
      var storageResult = saveTeamsAndCurrent(teams, team.uid);
      populateTeamDropdown();
      var sel = document.getElementById("teamLoadSelect");
      if(sel) sel.value = team.uid;
      alert(storageResult.cleared ? "Team renamed. Some rebuildable API caches were cleared because browser storage was full." : "Team renamed.");
    }catch(e){
      alert("Team could not be renamed: " + (e && e.message ? e.message : e));
    }
  };

  window.deleteCurrentTeam = function(){
    try{
      var team = getLoadedTeam();
      if(!team){ alert("No saved team is currently loaded."); return; }
      if(!confirm('Delete team "' + (team.name || "Unnamed team") + '"?')) return;
      var teams = getTeams().filter(function(t){ return !t || t.uid !== team.uid; });
      var storageResult = saveTeamsAndCurrent(teams, "");
      try{ localStorage.removeItem(CURRENT_TEAM_ID_KEY); }catch(e){}
      populateTeamDropdown();
      if(typeof applyTeamSlots === "function") applyTeamSlots([]);
      alert(storageResult.cleared ? "Team deleted. Some rebuildable API caches were cleared because browser storage was full." : "Team deleted.");
    }catch(e){
      alert("Team could not be deleted: " + (e && e.message ? e.message : e));
    }
  };

  window.newTeam = function(){
    setCurrentTeamId("");
    populateTeamDropdown();
    if(typeof applyTeamSlots === "function") applyTeamSlots([]);
  };

  window.loadSelectedTeam = function(){
    try{
      var sel = document.getElementById("teamLoadSelect");
      var uid = sel ? sel.value : "";
      if(!uid) return;
      var team = getTeams().find(function(t){ return t && t.uid === uid; });
      if(!team){
        alert("Saved team could not be found. Refreshing the saved team list.");
        populateTeamDropdown();
        return;
      }
      setCurrentTeamId(uid);
      populateTeamDropdown();
      if(typeof applyTeamSlots === "function") applyTeamSlots(team.slots || []);
      if(sel) sel.value = uid;
    }catch(e){
      alert("Team could not be loaded: " + (e && e.message ? e.message : e));
    }
  };

  window.cloneCurrentTeam = function(){
    var team = getLoadedTeam();
    if(!team){ alert("Load or save a team first, then clone it."); return; }
    setCurrentTeamId("");
    populateTeamDropdown();
    alert('Cloned "' + (team.name || "Unnamed team") + '". Make any edits, then click Save Team to save as a new team.');
  };

  document.addEventListener("DOMContentLoaded", function(){ setTimeout(populateTeamDropdown, 0); });
  window.addEventListener("load", function(){ setTimeout(populateTeamDropdown, 0); });
})();
