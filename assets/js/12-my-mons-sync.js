
/* Team Builder live My Mon sync
   - My Mon team slots now store/use a live UID reference only.
   - Saved move snapshots are ignored for My Mon slots and refreshed from My Mon's current data.
   - Editing moves in Team Builder converts that slot to species mode so it becomes an independent plan. */
(function(){
  var STORAGE_PREFIX = "leafgreen_251_dual_tracker_v3_";
  var TEAM_SAVE_KEY = STORAGE_PREFIX + "saved_teams_v3";
  var CURRENT_TEAM_ID_KEY = STORAGE_PREFIX + "current_team_id_v3";

  function parseJson(value, fallback){
    try{ var parsed = JSON.parse(value || "null"); return parsed === null ? fallback : parsed; }
    catch(e){ return fallback; }
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

  function getMons(){
    return (typeof getMyMons === "function") ? getMyMons() : [];
  }

  function getMonByUid(uid){
    var mons = getMons();
    for(var i=0;i<mons.length;i++) if(mons[i] && mons[i].uid === uid) return mons[i];
    return null;
  }

  function monSpeciesName(mon){
    if(!mon) return "";
    if(mon.speciesName) return mon.speciesName;
    if(typeof getSpeciesName === "function") return getSpeciesName(mon.speciesId);
    return mon.speciesId || "";
  }

  function esc(value){
    return String(value == null ? "" : value)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/\"/g,"&quot;")
      .replace(/'/g,"&#39;");
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

  function moveName(move){ return move && move.name ? String(move.name) : ""; }
  function moveType(move){ return move && move.type ? String(move.type) : ""; }

  function setMoveFields(slot, moves, loadMeta){
    moves = Array.isArray(moves) ? moves : [];
    for(var j=0;j<4;j++){
      var f = getMoveField(slot, j);
      var m = moves[j] || {};
      if(!f.nameEl || !f.typeEl) continue;
      f.nameEl.value = moveName(m);
      f.typeEl.value = moveType(m);
      f.nameEl.dataset.power = m.power || "";
      f.nameEl.dataset.accuracy = m.accuracy || "";
      f.nameEl.dataset.category = m.category || "";
      if(loadMeta !== false && f.nameEl.value && (!f.typeEl.value || !f.nameEl.dataset.power || !f.nameEl.dataset.category) && typeof getMoveMeta === "function"){
        (function(nameEl, typeEl){
          getMoveMeta(nameEl.value).then(function(meta){
            if(meta && typeof applyMoveMetaToFields === "function") applyMoveMetaToFields(nameEl, typeEl, meta);
            if(typeof analyzeTeam === "function") analyzeTeam();
          });
        })(f.nameEl, f.typeEl);
      }
    }
  }

  function slotMonUid(slot){
    var sel = document.getElementById("teamMonSelect_" + slot);
    return sel ? sel.value : "";
  }

  function slotSpeciesId(slot){
    if(getMode(slot) === "mon"){
      var mon = getMonByUid(slotMonUid(slot));
      return mon ? mon.speciesId : "";
    }
    var sel = document.getElementById("teamSpeciesSelect_" + slot);
    return sel ? sel.value : "";
  }

  function prefillFromMon(slot){
    var uid = slotMonUid(slot);
    var mon = uid ? getMonByUid(uid) : null;
    if(mon) setMoveFields(slot, mon.moves || [], true);
    else clearMoveFields(slot);
    if(typeof updateTeamSlotSprite === "function") updateTeamSlotSprite(slot);
  }

  function refreshSyncedMyMonSlots(){
    for(var i=0;i<6;i++){
      if(getMode(i) === "mon") prefillFromMon(i);
    }
    if(typeof populateTeamBuilderSelectors === "function") populateTeamBuilderSelectors();
    if(typeof updateAllTeamSlotSprites === "function") updateAllTeamSlotSprites();
    if(typeof analyzeTeam === "function") analyzeTeam();
  }

  function populateSelectors(){
    var mons = getMons();
    var selected = [];
    for(var i=0;i<6;i++){
      selected[i] = getMode(i) === "mon" ? slotMonUid(i) : "";
    }
    for(var slot=0;slot<6;slot++){
      var sel = document.getElementById("teamMonSelect_" + slot);
      if(!sel) continue;
      var current = selected[slot] || "";
      var used = {};
      selected.forEach(function(uid, idx){ if(uid && idx !== slot) used[uid] = true; });
      var html = '<option value="">None</option>';
      mons.forEach(function(m){
        if(!m || !m.uid) return;
        if(used[m.uid] && m.uid !== current) return;
        var label = (m.nickname ? m.nickname + " — " : "") + "#" + (m.speciesId || "") + " " + monSpeciesName(m);
        html += '<option value="' + esc(m.uid) + '">' + esc(label) + '</option>';
      });
      if(current && !getMonByUid(current)) html += '<option value="' + esc(current) + '">Missing My Mon reference</option>';
      sel.innerHTML = html;
      if(current) sel.value = current;
      setModeUi(slot, getMode(slot));
    }
  }

  function captureMoves(slot){
    var moves = [];
    for(var j=0;j<4;j++){
      var f = getMoveField(slot, j);
      moves.push({
        name: f.nameEl ? f.nameEl.value : "",
        type: f.typeEl ? f.typeEl.value : "",
        power: f.nameEl ? (f.nameEl.dataset.power || "") : "",
        accuracy: f.nameEl ? (f.nameEl.dataset.accuracy || "") : "",
        category: f.nameEl ? (f.nameEl.dataset.category || "") : ""
      });
    }
    return moves;
  }

  function captureSlots(){
    var slots = [];
    for(var i=0;i<6;i++){
      var mode = getMode(i);
      var monUid = slotMonUid(i);
      var speciesId = slotSpeciesId(i);
      slots.push({
        mode: mode,
        monUid: mode === "mon" ? monUid : "",
        speciesId: speciesId || "",
        moves: mode === "species" ? captureMoves(i) : [],
        syncedFromMyMon: mode === "mon"
      });
    }
    return slots;
  }

  function applySlots(slots){
    slots = Array.isArray(slots) ? slots : [];
    for(var i=0;i<6;i++){
      var data = slots[i] || {mode:"mon", monUid:"", speciesId:"", moves:[]};
      var mode = data.mode === "species" ? "species" : "mon";
      setModeUi(i, mode);
      var monSel = document.getElementById("teamMonSelect_" + i);
      var speciesSel = document.getElementById("teamSpeciesSelect_" + i);
      if(monSel) monSel.value = mode === "mon" ? (data.monUid || "") : "";
      if(speciesSel) speciesSel.value = mode === "species" ? (data.speciesId || "") : "";
    }
    populateSelectors();
    for(var slot=0;slot<6;slot++){
      var d = slots[slot] || {mode:"mon", monUid:"", speciesId:"", moves:[]};
      if((d.mode === "species") || (!d.monUid && d.speciesId && d.moves && d.moves.length)){
        setModeUi(slot, "species");
        var sp = document.getElementById("teamSpeciesSelect_" + slot);
        if(sp) sp.value = d.speciesId || "";
        setMoveFields(slot, d.moves || [], true);
      }else{
        setModeUi(slot, "mon");
        var ms = document.getElementById("teamMonSelect_" + slot);
        if(ms) ms.value = d.monUid || "";
        prefillFromMon(slot);
      }
      if(typeof updateTeamSlotSprite === "function") updateTeamSlotSprite(slot);
    }
    populateSelectors();
    if(typeof updateAllTeamSlotSprites === "function") updateAllTeamSlotSprites();
    if(typeof analyzeTeam === "function") analyzeTeam();
  }

  function makeTeamId(){ return "team_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2,8); }
  function normaliseTeams(raw){
    return Array.isArray(raw) ? raw.filter(function(t){ return t && typeof t === "object"; }).map(function(t){
      return { uid:String(t.uid || makeTeamId()), name:String(t.name || "Unnamed team"), slots:Array.isArray(t.slots) ? t.slots : [], updated:t.updated || "" };
    }) : [];
  }
  function getTeams(){ return normaliseTeams(parseJson(localStorage.getItem(TEAM_SAVE_KEY), [])); }
  function setTeams(teams, current){
    teams = normaliseTeams(teams);
    localStorage.setItem(TEAM_SAVE_KEY, JSON.stringify(teams));
    if(current) localStorage.setItem(CURRENT_TEAM_ID_KEY, current);
    else if(current === "") localStorage.removeItem(CURRENT_TEAM_ID_KEY);
    if(typeof populateTeamLoadSelect === "function") populateTeamLoadSelect();
    return teams;
  }
  function populateTeamDropdown(){
    var sel = document.getElementById("teamLoadSelect");
    if(!sel) return;
    var teams = getTeams();
    var current = localStorage.getItem(CURRENT_TEAM_ID_KEY) || "";
    var html = '<option value="">Select saved team...</option>';
    teams.forEach(function(t){ html += '<option value="' + esc(t.uid) + '">' + esc(t.name || "Unnamed team") + '</option>'; });
    sel.innerHTML = html;
    if(current && teams.some(function(t){ return t.uid === current; })) sel.value = current;
  }

  function convertSlotToSpeciesMode(slot){
    if(getMode(slot) !== "mon") return;
    var mon = getMonByUid(slotMonUid(slot));
    if(!mon) return;
    var speciesSel = document.getElementById("teamSpeciesSelect_" + slot);
    var monSel = document.getElementById("teamMonSelect_" + slot);
    if(speciesSel) speciesSel.value = mon.speciesId || "";
    if(monSel) monSel.value = "";
    setModeUi(slot, "species");
    populateSelectors();
    if(typeof updateTeamSlotSprite === "function") updateTeamSlotSprite(slot);
  }

  window.populateTeamBuilderSelectors = populateSelectors;
  window.captureCurrentTeamSlots = captureSlots;
  window.applyTeamSlots = applySlots;
  window.prefillTeamMovesFromMon = prefillFromMon;
  window.getTeamMon = function(slot){ return getMode(slot) === "mon" ? getMonByUid(slotMonUid(slot)) : null; };
  window.getTeamSpeciesId = slotSpeciesId;
  window.getSlotMode = getMode;
  window.renderTeamBuilder = function(){ populateSelectors(); populateTeamDropdown(); refreshSyncedMyMonSlots(); };

  window.teamModeChanged = function(slot, shouldAnalyse){
    var mode = getMode(slot);
    if(mode === "species"){
      var mon = getMonByUid(slotMonUid(slot));
      var sp = document.getElementById("teamSpeciesSelect_" + slot);
      if(mon && sp && !sp.value) sp.value = mon.speciesId || "";
    }
    setModeUi(slot, mode);
    if(mode === "mon") prefillFromMon(slot);
    if(typeof updateTeamSlotSprite === "function") updateTeamSlotSprite(slot);
    populateSelectors();
    if(shouldAnalyse !== false && typeof analyzeTeam === "function") analyzeTeam();
  };

  window.teamSlotSelectionChanged = function(slot){
    if(getMode(slot) === "mon") prefillFromMon(slot);
    else clearMoveFields(slot);
    if(typeof updateTeamSlotSprite === "function") updateTeamSlotSprite(slot);
    populateSelectors();
    if(typeof updateAllTeamSlotSprites === "function") updateAllTeamSlotSprites();
    if(typeof analyzeTeam === "function") analyzeTeam();
  };

  window.teamMoveChanged = async function(slot, move){
    convertSlotToSpeciesMode(slot);
    var f = getMoveField(slot, move);
    var name = f.nameEl ? f.nameEl.value.trim() : "";
    if(f.typeEl){
      if(!name){
        f.typeEl.value = "";
        if(f.nameEl && typeof applyMoveMetaToFields === "function") applyMoveMetaToFields(f.nameEl, f.typeEl, null);
      }else{
        f.typeEl.value = "loading...";
        var meta = (typeof getMoveMeta === "function") ? await getMoveMeta(name) : null;
        if(meta && typeof applyMoveMetaToFields === "function") applyMoveMetaToFields(f.nameEl, f.typeEl, meta);
        else{
          f.typeEl.value = "";
          if(f.nameEl && typeof applyMoveMetaToFields === "function") applyMoveMetaToFields(f.nameEl, f.typeEl, null);
        }
      }
    }
    if(typeof analyzeTeam === "function") analyzeTeam();
  };

  window.saveCurrentTeam = function(){
    try{
      var teams = getTeams();
      var uid = localStorage.getItem(CURRENT_TEAM_ID_KEY) || "";
      var existing = uid ? teams.find(function(t){ return t && t.uid === uid; }) : null;
      var name;
      if(existing){
        if(!confirm('Save changes to team "' + (existing.name || "Unnamed team") + '"?')) return;
        name = existing.name || "Unnamed team";
      }else{
        name = prompt("Team name?");
        if(!name || !name.trim()) return;
        name = name.trim();
        uid = makeTeamId();
      }
      var team = {uid:uid, name:name, slots:captureSlots(), updated:new Date().toISOString()};
      var idx = teams.findIndex(function(t){ return t && t.uid === uid; });
      if(idx >= 0) teams[idx] = team; else teams.unshift(team);
      setTeams(teams, uid);
      populateTeamDropdown();
      var sel = document.getElementById("teamLoadSelect"); if(sel) sel.value = uid;
      if(typeof analyzeTeam === "function") analyzeTeam();
      alert("Team saved.");
    }catch(e){ alert("Team could not be saved: " + (e && e.message ? e.message : e)); }
  };

  window.loadSelectedTeam = function(){
    var sel = document.getElementById("teamLoadSelect");
    var uid = sel ? sel.value : "";
    if(!uid) return;
    var team = getTeams().find(function(t){ return t && t.uid === uid; });
    if(!team){ populateTeamDropdown(); return; }
    localStorage.setItem(CURRENT_TEAM_ID_KEY, uid);
    applySlots(team.slots || []);
    populateTeamDropdown();
    if(sel) sel.value = uid;
  };

  var originalSetMyMons = window.setMyMons;
  if(typeof originalSetMyMons === "function"){
    window.setMyMons = function(mons){
      var result = originalSetMyMons.apply(this, arguments);
      setTimeout(refreshSyncedMyMonSlots, 0);
      return result;
    };
  }

  var originalSaveMonProfile = window.saveMonProfile;
  if(typeof originalSaveMonProfile === "function"){
    window.saveMonProfile = async function(){
      var result = await originalSaveMonProfile.apply(this, arguments);
      setTimeout(refreshSyncedMyMonSlots, 0);
      return result;
    };
  }

  window.refreshTeamSlotsFromMyMons = refreshSyncedMyMonSlots;
  document.addEventListener("DOMContentLoaded", function(){ setTimeout(function(){ populateSelectors(); refreshSyncedMyMonSlots(); }, 0); });
  window.addEventListener("load", function(){ setTimeout(function(){ populateSelectors(); refreshSyncedMyMonSlots(); }, 100); });
})();
