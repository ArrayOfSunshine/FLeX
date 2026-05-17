
/* Team Builder save/load stability fix
   - Saved teams now restore their own slot moves for both My Mon and All Species slots.
   - Refreshing Team Builder selectors no longer re-prefills My Mon moves and overwrites planned/saved team moves.
   - The last loaded/saved team is restored once on file open when available.
*/
(function(){
  function setTeamSlotModeUiOnly(slot, mode){
    mode = mode === "species" ? "species" : "mon";
    const radio = document.querySelector(`input[name="teamMode_${slot}"][value="${mode}"]`);
    if(radio) radio.checked = true;

    const box = document.getElementById("teamSlotBox_" + slot);
    const monSel = document.getElementById("teamMonSelect_" + slot);
    const speciesSel = document.getElementById("teamSpeciesSelect_" + slot);

    if(box){
      box.classList.toggle("mode-mon", mode === "mon");
      box.classList.toggle("mode-species", mode === "species");
    }
    if(monSel) monSel.classList.toggle("hidden", mode !== "mon");
    if(speciesSel) speciesSel.classList.toggle("hidden", mode !== "species");
  }

  function clearTeamMoveFields(slot){
    for(let j=0;j<4;j++){
      const nameEl = document.getElementById(`teamMoveName_${slot}_${j}`);
      const typeEl = document.getElementById(`teamMoveType_${slot}_${j}`);
      if(!nameEl || !typeEl) continue;
      nameEl.value = "";
      typeEl.value = "";
      nameEl.dataset.power = "";
      nameEl.dataset.accuracy = "";
      nameEl.dataset.category = "";
    }
  }

  function applySavedTeamMoves(slot, moves){
    for(let j=0;j<4;j++){
      const move = moves && moves[j] ? moves[j] : {};
      const nameEl = document.getElementById(`teamMoveName_${slot}_${j}`);
      const typeEl = document.getElementById(`teamMoveType_${slot}_${j}`);
      if(!nameEl || !typeEl) continue;

      nameEl.value = move.name || "";
      typeEl.value = move.type || "";
      nameEl.dataset.power = move.power || "";
      nameEl.dataset.accuracy = move.accuracy || "";
      nameEl.dataset.category = move.category || "";

      if(nameEl.value && (!nameEl.dataset.power || !nameEl.dataset.category) && typeof getMoveMeta === "function"){
        getMoveMeta(nameEl.value).then(meta => {
          if(meta && typeof applyMoveMetaToFields === "function") applyMoveMetaToFields(nameEl, typeEl, meta);
          if(typeof analyzeTeam === "function") analyzeTeam();
        });
      }
    }
  }

  function hasSavedTeamMoves(slot){
    const moves = slot && Array.isArray(slot.moves) ? slot.moves : [];
    return moves.some(m => m && (m.name || m.type || m.power || m.accuracy || m.category));
  }

  window.populateTeamBuilderSelectors = function(){
    const mons = (typeof getMyMons === "function") ? getMyMons() : [];
    const selectedBySlot = [];

    for(let i=0;i<6;i++){
      const monSel = document.getElementById("teamMonSelect_" + i);
      selectedBySlot[i] = monSel ? monSel.value : "";
    }

    for(let i=0;i<6;i++){
      const monSel = document.getElementById("teamMonSelect_" + i);
      if(monSel){
        const current = selectedBySlot[i] || "";
        const usedElsewhere = new Set(selectedBySlot.filter((uid, idx) => idx !== i && uid));
        monSel.innerHTML = '<option value="">None</option>' + mons
          .filter(m => !usedElsewhere.has(m.uid) || m.uid === current)
          .map(m => {
            const label = `${m.nickname ? m.nickname + " — " : ""}#${m.speciesId} ${m.speciesName || (typeof getSpeciesName === "function" ? getSpeciesName(m.speciesId) : m.speciesId)}`;
            return `<option value="${m.uid}">${label}</option>`;
          }).join("");
        if(mons.some(m => m.uid === current)) monSel.value = current;
      }

      setTeamSlotModeUiOnly(i, (typeof getSlotMode === "function") ? getSlotMode(i) : "mon");
      if(typeof updateTeamSlotSprite === "function") updateTeamSlotSprite(i);
    }
  };

  window.applyTeamSlots = function(slots){
    slots = Array.isArray(slots) ? slots : [];

    for(let i=0;i<6;i++){
      const slot = slots[i] || {mode:"mon", monUid:"", speciesId:"", moves:[]};
      const mode = slot.mode === "species" ? "species" : "mon";

      setTeamSlotModeUiOnly(i, mode);

      const monSel = document.getElementById("teamMonSelect_" + i);
      const speciesSel = document.getElementById("teamSpeciesSelect_" + i);
      if(monSel) monSel.value = slot.monUid || "";
      if(speciesSel) speciesSel.value = slot.speciesId || "";

      if(hasSavedTeamMoves(slot)){
        applySavedTeamMoves(i, slot.moves || []);
      } else if(mode === "mon" && slot.monUid && typeof prefillTeamMovesFromMon === "function"){
        prefillTeamMovesFromMon(i);
      } else {
        clearTeamMoveFields(i);
      }

      if(typeof updateTeamSlotSprite === "function") updateTeamSlotSprite(i);
    }

    window.populateTeamBuilderSelectors();
    if(typeof updateAllTeamSlotSprites === "function") updateAllTeamSlotSprites();
    if(typeof analyzeTeam === "function") analyzeTeam();
  };

  window.renderTeamBuilder = function(){
    window.populateTeamBuilderSelectors();
    if(typeof populateTeamLoadSelect === "function") populateTeamLoadSelect();
    if(typeof updateAllTeamSlotSprites === "function") updateAllTeamSlotSprites();
    if(typeof analyzeTeam === "function") analyzeTeam();
  };

  function restoreCurrentSavedTeamOnce(){
    if(window.__teamBuilderCurrentTeamRestored) return;
    window.__teamBuilderCurrentTeamRestored = true;

    try{
      if(typeof currentTeamIdKey !== "function" || typeof getSavedTeams !== "function") return;
      const uid = localStorage.getItem(currentTeamIdKey()) || "";
      if(!uid) return;

      const team = getSavedTeams().find(t => t.uid === uid);
      if(!team) return;

      if(typeof populateTeamLoadSelect === "function") populateTeamLoadSelect();
      const loadSel = document.getElementById("teamLoadSelect");
      if(loadSel) loadSel.value = uid;
      window.applyTeamSlots(team.slots || []);
    }catch(e){}
  }

  document.addEventListener("DOMContentLoaded", function(){ setTimeout(restoreCurrentSavedTeamOnce, 0); });
  window.addEventListener("load", function(){ setTimeout(restoreCurrentSavedTeamOnce, 0); });
})();
