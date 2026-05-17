
/* Authoritative Team Builder save/load manager */
(function(){
  var TEAM_SAVE_KEY = "leafgreen_251_dual_tracker_v3_saved_teams_v3";
  var CURRENT_TEAM_ID_KEY = "leafgreen_251_dual_tracker_v3_current_team_id_v3";

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

  function setTeams(teams){
    teams = normaliseTeams(teams);
    localStorage.setItem(TEAM_SAVE_KEY, JSON.stringify(teams));
    populateTeamDropdown();
    setTimeout(populateTeamDropdown, 0);
    setTimeout(populateTeamDropdown, 80);
    return teams;
  }

  function getCurrentTeamId(){
    return localStorage.getItem(CURRENT_TEAM_ID_KEY) || "";
  }

  function setCurrentTeamId(uid){
    if(uid) localStorage.setItem(CURRENT_TEAM_ID_KEY, uid);
    else localStorage.removeItem(CURRENT_TEAM_ID_KEY);
  }

  function getMode(slot){
    var checked = document.querySelector('input[name="teamMode_' + slot + '"]:checked');
    return checked && checked.value === "species" ? "species" : "mon";
  }

  function setModeUi(slot, mode){
    mode = mode === "species" ? "species" : "mon";
    var radio = document.querySelector('input[name="teamMode_' + slot + '"][value="' + mode + '"]');
    if(radio) radio.checked = true;

    var box = document.getElementById("teamSlotBox_" + slot);
    var monSel = document.getElementById("teamMonSelect_" + slot);
    var speciesSel = document.getElementById("teamSpeciesSelect_" + slot);

    if(box){
      box.classList.toggle("mode-mon", mode === "mon");
      box.classList.toggle("mode-species", mode === "species");
    }
    if(monSel) monSel.classList.toggle("hidden", mode !== "mon");
    if(speciesSel) speciesSel.classList.toggle("hidden", mode !== "species");
  }

  function getMoveField(slot, move){
    return {
      nameEl: document.getElementById("teamMoveName_" + slot + "_" + move),
      typeEl: document.getElementById("teamMoveType_" + slot + "_" + move)
    };
  }

  function clearMoveFields(slot){
    for(var j=0;j<4;j++){
      var f = getMoveField(slot, j);
      if(f.nameEl){
        f.nameEl.value = "";
        f.nameEl.dataset.power = "";
        f.nameEl.dataset.accuracy = "";
        f.nameEl.dataset.category = "";
      }
      if(f.typeEl) f.typeEl.value = "";
    }
  }

  function setMoveFields(slot, moves){
    moves = Array.isArray(moves) ? moves : [];
    for(var j=0;j<4;j++){
      var move = moves[j] || {};
      var f = getMoveField(slot, j);
      if(!f.nameEl || !f.typeEl) continue;

      f.nameEl.value = move.name || "";
      f.typeEl.value = move.type || "";
      f.nameEl.dataset.power = move.power || "";
      f.nameEl.dataset.accuracy = move.accuracy || "";
      f.nameEl.dataset.category = move.category || "";

      if(f.nameEl.value && (!f.typeEl.value || !f.nameEl.dataset.power || !f.nameEl.dataset.category) && typeof getMoveMeta === "function"){
        (function(nameEl, typeEl){
          getMoveMeta(nameEl.value).then(function(meta){
            if(meta && typeof applyMoveMetaToFields === "function") applyMoveMetaToFields(nameEl, typeEl, meta);
            if(typeof analyzeTeam === "function") analyzeTeam();
          });
        })(f.nameEl, f.typeEl);
      }
    }
  }

  function slotHasMoves(slot){
    var moves = slot && Array.isArray(slot.moves) ? slot.moves : [];
    return moves.some(function(m){ return m && (m.name || m.type || m.power || m.accuracy || m.category); });
  }

  function captureSlots(){
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

  function populateMyMonSelectors(){
    var mons = (typeof getMyMons === "function") ? getMyMons() : [];
    var selected = [];
    for(var i=0;i<6;i++){
      var monSel = document.getElementById("teamMonSelect_" + i);
      selected[i] = monSel ? monSel.value : "";
    }

    for(var slot=0;slot<6;slot++){
      var sel = document.getElementById("teamMonSelect_" + slot);
      if(!sel) continue;

      var current = selected[slot] || "";
      var usedElsewhere = {};
      selected.forEach(function(uid, idx){ if(uid && idx !== slot) usedElsewhere[uid] = true; });

      var html = '<option value="">None</option>';
      mons.forEach(function(m){
        if(!m || !m.uid) return;
        if(usedElsewhere[m.uid] && m.uid !== current) return;
        var speciesName = m.speciesName || (typeof getSpeciesName === "function" ? getSpeciesName(m.speciesId) : m.speciesId);
        var label = (m.nickname ? m.nickname + " — " : "") + "#" + m.speciesId + " " + speciesName;
        html += '<option value="' + esc(m.uid) + '">' + esc(label) + '</option>';
      });
      sel.innerHTML = html;
      if(current && mons.some(function(m){ return m && m.uid === current; })) sel.value = current;
    }
  }

  function populateTeamDropdown(){
    var sel = document.getElementById("teamLoadSelect");
    if(!sel) return;
    var teams = getTeams();
    var current = getCurrentTeamId();
    var html = '<option value="">Select saved team...</option>';

    teams.forEach(function(t){
      if(!t || !t.uid) return;
      html += '<option value="' + esc(t.uid) + '">' + esc(t.name || "Unnamed team") + '</option>';
    });

    sel.innerHTML = html;
    if(current && teams.some(function(t){ return t && t.uid === current; })) sel.value = current;
    else sel.value = "";
  }

  function applySlots(slots){
    slots = Array.isArray(slots) ? slots : [];

    for(var i=0;i<6;i++){
      var s = slots[i] || {mode:"mon", monUid:"", speciesId:"", moves:[]};
      setModeUi(i, s.mode === "species" ? "species" : "mon");
    }

    populateMyMonSelectors();

    for(var slot=0;slot<6;slot++){
      var data = slots[slot] || {mode:"mon", monUid:"", speciesId:"", moves:[]};
      var mode = data.mode === "species" ? "species" : "mon";
      var monSel = document.getElementById("teamMonSelect_" + slot);
      var speciesSel = document.getElementById("teamSpeciesSelect_" + slot);
      if(monSel) monSel.value = data.monUid || "";
      if(speciesSel) speciesSel.value = data.speciesId || "";

      if(slotHasMoves(data)){
        setMoveFields(slot, data.moves || []);
      }else if(mode === "mon" && data.monUid && typeof prefillTeamMovesFromMon === "function"){
        prefillTeamMovesFromMon(slot);
      }else{
        clearMoveFields(slot);
      }

      if(typeof updateTeamSlotSprite === "function") updateTeamSlotSprite(slot);
    }

    populateMyMonSelectors();
    if(typeof updateAllTeamSlotSprites === "function") updateAllTeamSlotSprites();
    if(typeof analyzeTeam === "function") analyzeTeam();
  }

  function getLoadedTeam(){
    var uid = getCurrentTeamId();
    if(!uid) return null;
    return getTeams().find(function(t){ return t && t.uid === uid; }) || null;
  }

  window.getSavedTeams = getTeams;
  window.setSavedTeams = setTeams;
  window.populateTeamLoadSelect = populateTeamDropdown;
  window.populateTeamBuilderSelectors = populateMyMonSelectors;
  window.captureCurrentTeamSlots = captureSlots;
  window.applyTeamSlots = applySlots;

  window.renderTeamBuilder = function(){
    populateMyMonSelectors();
    populateTeamDropdown();
    if(typeof updateAllTeamSlotSprites === "function") updateAllTeamSlotSprites();
    if(typeof analyzeTeam === "function") analyzeTeam();
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

      setCurrentTeamId(uid);
      setTeams(teams);
      populateTeamDropdown();
      var sel = document.getElementById("teamLoadSelect");
      if(sel) sel.value = uid;
      if(typeof analyzeTeam === "function") analyzeTeam();
      alert("Team saved.");
    }catch(e){
      alert("Team could not be saved: " + (e && e.message ? e.message : e));
    }
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
      applySlots(team.slots || []);
      if(sel) sel.value = uid;
    }catch(e){
      alert("Team could not be loaded: " + (e && e.message ? e.message : e));
    }
  };

  window.newTeam = function(){
    setCurrentTeamId("");
    populateTeamDropdown();
    applySlots([]);
  };

  window.clearTeamSlots = function(clearCurrent){
    if(clearCurrent !== false) setCurrentTeamId("");
    populateTeamDropdown();
    applySlots([]);
  };

  window.renameCurrentTeam = function(){
    var team = getLoadedTeam();
    if(!team){
      alert("Load or save a team first, then rename it.");
      return;
    }
    var newName = prompt("Rename team:", team.name || "Unnamed team");
    if(!newName || !newName.trim()) return;
    var teams = getTeams();
    teams.forEach(function(t){
      if(t && t.uid === team.uid){
        t.name = newName.trim();
        t.updated = new Date().toISOString();
      }
    });
    setTeams(teams);
    var sel = document.getElementById("teamLoadSelect");
    if(sel) sel.value = team.uid;
    alert("Team renamed.");
  };

  window.deleteCurrentTeam = function(){
    var team = getLoadedTeam();
    if(!team){
      alert("No saved team is currently loaded.");
      return;
    }
    if(!confirm('Delete team "' + (team.name || "Unnamed team") + '"?')) return;
    setTeams(getTeams().filter(function(t){ return !t || t.uid !== team.uid; }));
    setCurrentTeamId("");
    populateTeamDropdown();
    applySlots([]);
    alert("Team deleted.");
  };

  window.cloneCurrentTeam = function(){
    var team = getLoadedTeam();
    if(!team){
      alert("Load or save a team first, then clone it.");
      return;
    }
    setCurrentTeamId("");
    populateTeamDropdown();
    alert('Cloned "' + (team.name || "Unnamed team") + '". Make any edits, then click Save Team to save as a new team.');
  };

  window.teamModeChanged = function(slot, shouldAnalyse){
    var mode = getMode(slot);
    setModeUi(slot, mode);
    if(mode === "mon" && typeof prefillTeamMovesFromMon === "function") prefillTeamMovesFromMon(slot);
    else if(typeof updateTeamSlotSprite === "function") updateTeamSlotSprite(slot);
    if(shouldAnalyse !== false && typeof analyzeTeam === "function") analyzeTeam();
  };

  window.teamSlotSelectionChanged = function(slot){
    if(getMode(slot) === "mon" && typeof prefillTeamMovesFromMon === "function") prefillTeamMovesFromMon(slot);
    if(typeof updateTeamSlotSprite === "function") updateTeamSlotSprite(slot);
    populateMyMonSelectors();
    if(typeof updateAllTeamSlotSprites === "function") updateAllTeamSlotSprites();
    if(typeof analyzeTeam === "function") analyzeTeam();
  };

  function initTeamBuilderPersistence(){
    populateMyMonSelectors();
    populateTeamDropdown();
    var uid = getCurrentTeamId();
    if(uid){
      var team = getTeams().find(function(t){ return t && t.uid === uid; });
      if(team) applySlots(team.slots || []);
      else setCurrentTeamId("");
      populateTeamDropdown();
    }
  }

  document.addEventListener("DOMContentLoaded", function(){ setTimeout(initTeamBuilderPersistence, 0); });
  window.addEventListener("load", function(){ setTimeout(initTeamBuilderPersistence, 0); });
})();
