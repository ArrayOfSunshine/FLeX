from pathlib import Path
import json, re
root = Path(__file__).resolve().parents[1]
app_path = root / "assets/js/04-app-main.js"
repair_path = root / "assets/js/34-hosted-json-repair.js"
sw_path = root / "service-worker.js"

pokemon = json.loads((root / "data/flex-pokemon-gen3.json").read_text(encoding="utf-8")).get("pokemon", [])
type_index = {
    str(p.get("id")).zfill(3): [t.get("name") for t in p.get("types", []) if t.get("name")]
    for p in pokemon
    if str(p.get("id", "")).isdigit() and 1 <= int(p.get("id")) <= 386
}
type_helper = """
function applyStaticTypeData(id){
  try{
    id = String(id || "").padStart(3, "0");
    const types = FLEX_STATIC_TYPE_INDEX[id];
    if(!types || !types.length) return false;
    const card = document.querySelector(`.card[data-id="${id}"]`);
    if(card) card.dataset.types = types.join(",");
    const el = document.getElementById("types_" + id);
    if(el) el.innerHTML = types.map(t => `<span class="type">${t}</span>`).join("");
    return true;
  }catch(e){ return false; }
}
""".strip()
type_js = "const FLEX_STATIC_TYPE_INDEX = " + json.dumps(type_index, separators=(",", ":")) + ";\n\n" + type_helper + "\n\n"

app = app_path.read_text(encoding="utf-8")
if "FLEX_STATIC_TYPE_INDEX" not in app:
    app = app.replace('const DATA_PREFIX = "leafgreen_251_pokedata_v1_";\n', 'const DATA_PREFIX = "leafgreen_251_pokedata_v1_";\n' + type_js, 1)
old_init = """function init(){
  document.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    document.getElementById("dex_"+id).checked = loadState(id,"dex");
    document.getElementById("living_"+id).checked = loadState(id,"living");
    const qty = document.getElementById("qty_"+id); if(qty) qty.value = loadQty(id);
    loadTypesOnly(id, card.dataset.pokeid);
  });
  updateStats();
  applyFilter();
}"""
new_init = """function init(){
  document.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    document.getElementById("dex_"+id).checked = loadState(id,"dex");
    document.getElementById("living_"+id).checked = loadState(id,"living");
    const qty = document.getElementById("qty_"+id); if(qty) qty.value = loadQty(id);
    if(!applyStaticTypeData(id)){
      loadTypesOnly(id, card.dataset.pokeid);
    }
  });
  populateTypeDropdowns();
  updateStats();
  applyFilter();
}"""
if old_init in app:
    app = app.replace(old_init, new_init, 1)
elif "applyStaticTypeData(id)" not in app:
    raise RuntimeError("Could not patch init()")
app = app.replace("""  renderProgress();
  renderLocationView();
  updateActiveDexFilters();""", """  renderProgress();
  const locationTab = document.getElementById("locationTab");
  if(locationTab && locationTab.classList.contains("active")) renderLocationView();
  updateActiveDexFilters();""", 1)
app_path.write_text(app, encoding="utf-8")

repair = repair_path.read_text(encoding="utf-8")
old_bottom = """  var previousRenderMoveList = window.renderMoveList;
  if(typeof previousRenderMoveList === "function"){
    window.renderMoveList = function(){return previousRenderMoveList.apply(this, arguments);};
  }

  window.loadEncounterData = async function(force){
    var container = document.getElementById("locationResults");
    if(container && !window.ENCOUNTER_LOCATION_DATA) container.innerHTML = '<p class="smallText">Loading prebuilt FLéX encounter data…</p>';
    try{
      var data = await ensurePrebuilt();
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
    window.loadEncounterData(false);
  };

  function finish(){
    ensurePrebuilt().then(function(){
      status("Prebuilt FLéX data loaded. Move metadata and encounters are using /data JSON.");
      try{if(typeof window.renderMoveList === "function") window.renderMoveList();}catch(e){}
      try{if(typeof applyFilter === "function") applyFilter();}catch(e){}
      try{if(typeof renderMyMons === "function") renderMyMons();}catch(e){}
      var locTab=document.getElementById("locationTab");
      if(locTab && locTab.classList.contains("active")) window.loadEncounterData(false);
    }).catch(function(e){console.warn("Prebuilt static data bridge unavailable", e);});
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", finish); else setTimeout(finish,0);
  window.addEventListener("load", function(){setTimeout(finish,250);});
"""
new_bottom = """  function isTabActive(id){
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
"""
if old_bottom not in repair:
    raise RuntimeError("Could not find eager prebuilt bridge block")
repair = repair.replace(old_bottom, new_bottom, 1)
repair_path.write_text(repair, encoding="utf-8")

sw = sw_path.read_text(encoding="utf-8")
sw = re.sub(r"flex-split-assets-v\d+", "flex-split-assets-v3", sw)
sw_path.write_text(sw, encoding="utf-8")
print("Applied initial-load performance patch")
