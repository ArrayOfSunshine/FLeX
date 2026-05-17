
(function(){
  var TEAM_SAVE_KEY = "leafgreen_251_dual_tracker_v3_saved_teams_v3";
  var CURRENT_TEAM_ID_KEY = "leafgreen_251_dual_tracker_v3_current_team_id_v3";

  function safeJsonParse(value, fallback){
    try{
      var parsed = JSON.parse(value || "null");
      return parsed === null ? fallback : parsed;
    }catch(e){
      return fallback;
    }
  }

  function getTeams(){
    var teams = safeJsonParse(localStorage.getItem(TEAM_SAVE_KEY), []);
    return Array.isArray(teams) ? teams : [];
  }

  function setTeams(teams){
    if(!Array.isArray(teams)) teams = [];
    localStorage.setItem(TEAM_SAVE_KEY, JSON.stringify(teams));
    populateTeamsDropdown();
  }

  function makeUid(){
    return "team_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function escapeOptionText(value){
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function populateTeamsDropdown(){
    var sel = document.getElementById("teamLoadSelect");
    if(!sel) return;

    var current = localStorage.getItem(CURRENT_TEAM_ID_KEY) || "";
    var teams = getTeams();
    var html = '<option value="">Select saved team...</option>';

    for(var i = 0; i < teams.length; i++){
      var team = teams[i] || {};
      if(!team.uid) continue;
      html += '<option value="' + escapeOptionText(team.uid) + '">' + escapeOptionText(team.name || "Unnamed team") + '</option>';
    }

    sel.innerHTML = html;
    if(current && teams.some(function(t){ return t && t.uid === current; })){
      sel.value = current;
    }else{
      sel.value = "";
    }
  }

  window.getSavedTeams = getTeams;
  window.setSavedTeams = setTeams;
  window.populateTeamLoadSelect = populateTeamsDropdown;

  window.saveCurrentTeam = function(){
    var teams = getTeams();
    var uid = localStorage.getItem(CURRENT_TEAM_ID_KEY) || "";
    var existing = uid ? teams.find(function(t){ return t && t.uid === uid; }) : null;
    var name = "";

    if(existing){
      if(!confirm('Save changes to team "' + (existing.name || "Unnamed team") + '"?')) return;
      name = existing.name || "Unnamed team";
    }else{
      name = prompt("Team name?");
      if(!name || !name.trim()) return;
      name = name.trim();
      uid = makeUid();
    }

    var slots = (typeof captureCurrentTeamSlots === "function") ? captureCurrentTeamSlots() : [];
    var team = {
      uid: uid,
      name: name,
      slots: slots,
      updated: new Date().toISOString()
    };

    var idx = teams.findIndex(function(t){ return t && t.uid === uid; });
    if(idx >= 0){
      teams[idx] = team;
    }else{
      teams.unshift(team);
    }

    localStorage.setItem(CURRENT_TEAM_ID_KEY, uid);
    setTeams(teams);

    var sel = document.getElementById("teamLoadSelect");
    if(sel) sel.value = uid;

    if(typeof analyzeTeam === "function") analyzeTeam();
    alert("Team saved.");
  };

  window.loadSelectedTeam = function(){
    var sel = document.getElementById("teamLoadSelect");
    var uid = sel ? sel.value : "";
    if(!uid) return;

    var teams = getTeams();
    var team = teams.find(function(t){ return t && t.uid === uid; });
    if(!team){
      alert("Saved team could not be found. The saved team list will be refreshed.");
      populateTeamsDropdown();
      return;
    }

    localStorage.setItem(CURRENT_TEAM_ID_KEY, uid);
    if(typeof populateTeamBuilderSelectors === "function") populateTeamBuilderSelectors();
    if(typeof applyTeamSlots === "function") applyTeamSlots(team.slots || []);
    if(typeof populateTeamBuilderSelectors === "function") populateTeamBuilderSelectors();
    populateTeamsDropdown();
    if(sel) sel.value = uid;
    if(typeof analyzeTeam === "function") analyzeTeam();
  };

  var previousRenderTeamBuilder = window.renderTeamBuilder;
  window.renderTeamBuilder = function(){
    if(typeof previousRenderTeamBuilder === "function") previousRenderTeamBuilder();
    populateTeamsDropdown();
  };

  document.addEventListener("DOMContentLoaded", function(){ setTimeout(populateTeamsDropdown, 0); });
  window.addEventListener("load", function(){ setTimeout(populateTeamsDropdown, 0); });
})();
