
const STORAGE_PREFIX = "leafgreen_251_dual_tracker_v3_";
const DATA_PREFIX = "leafgreen_251_pokedata_v1_";
const FLEX_STATIC_TYPE_INDEX = {"001":["grass","poison"],"002":["grass","poison"],"003":["grass","poison"],"004":["fire"],"005":["fire"],"006":["fire","flying"],"007":["water"],"008":["water"],"009":["water"],"010":["bug"],"011":["bug"],"012":["bug","flying"],"013":["bug","poison"],"014":["bug","poison"],"015":["bug","poison"],"016":["normal","flying"],"017":["normal","flying"],"018":["normal","flying"],"019":["normal"],"020":["normal"],"021":["normal","flying"],"022":["normal","flying"],"023":["poison"],"024":["poison"],"025":["electric"],"026":["electric"],"027":["ground"],"028":["ground"],"029":["poison"],"030":["poison"],"031":["poison","ground"],"032":["poison"],"033":["poison"],"034":["poison","ground"],"035":["fairy"],"036":["fairy"],"037":["fire"],"038":["fire"],"039":["normal","fairy"],"040":["normal","fairy"],"041":["poison","flying"],"042":["poison","flying"],"043":["grass","poison"],"044":["grass","poison"],"045":["grass","poison"],"046":["bug","grass"],"047":["bug","grass"],"048":["bug","poison"],"049":["bug","poison"],"050":["ground"],"051":["ground"],"052":["normal"],"053":["normal"],"054":["water"],"055":["water"],"056":["fighting"],"057":["fighting"],"058":["fire"],"059":["fire"],"060":["water"],"061":["water"],"062":["water","fighting"],"063":["psychic"],"064":["psychic"],"065":["psychic"],"066":["fighting"],"067":["fighting"],"068":["fighting"],"069":["grass","poison"],"070":["grass","poison"],"071":["grass","poison"],"072":["water","poison"],"073":["water","poison"],"074":["rock","ground"],"075":["rock","ground"],"076":["rock","ground"],"077":["fire"],"078":["fire"],"079":["water","psychic"],"080":["water","psychic"],"081":["electric","steel"],"082":["electric","steel"],"083":["normal","flying"],"084":["normal","flying"],"085":["normal","flying"],"086":["water"],"087":["water","ice"],"088":["poison"],"089":["poison"],"090":["water"],"091":["water","ice"],"092":["ghost","poison"],"093":["ghost","poison"],"094":["ghost","poison"],"095":["rock","ground"],"096":["psychic"],"097":["psychic"],"098":["water"],"099":["water"],"100":["electric"],"101":["electric"],"102":["grass","psychic"],"103":["grass","psychic"],"104":["ground"],"105":["ground"],"106":["fighting"],"107":["fighting"],"108":["normal"],"109":["poison"],"110":["poison"],"111":["ground","rock"],"112":["ground","rock"],"113":["normal"],"114":["grass"],"115":["normal"],"116":["water"],"117":["water"],"118":["water"],"119":["water"],"120":["water"],"121":["water","psychic"],"122":["psychic","fairy"],"123":["bug","flying"],"124":["ice","psychic"],"125":["electric"],"126":["fire"],"127":["bug"],"128":["normal"],"129":["water"],"130":["water","flying"],"131":["water","ice"],"132":["normal"],"133":["normal"],"134":["water"],"135":["electric"],"136":["fire"],"137":["normal"],"138":["rock","water"],"139":["rock","water"],"140":["rock","water"],"141":["rock","water"],"142":["rock","flying"],"143":["normal"],"144":["ice","flying"],"145":["electric","flying"],"146":["fire","flying"],"147":["dragon"],"148":["dragon"],"149":["dragon","flying"],"150":["psychic"],"151":["psychic"],"152":["grass"],"153":["grass"],"154":["grass"],"155":["fire"],"156":["fire"],"157":["fire"],"158":["water"],"159":["water"],"160":["water"],"161":["normal"],"162":["normal"],"163":["normal","flying"],"164":["normal","flying"],"165":["bug","flying"],"166":["bug","flying"],"167":["bug","poison"],"168":["bug","poison"],"169":["poison","flying"],"170":["water","electric"],"171":["water","electric"],"172":["electric"],"173":["fairy"],"174":["normal","fairy"],"175":["fairy"],"176":["fairy","flying"],"177":["psychic","flying"],"178":["psychic","flying"],"179":["electric"],"180":["electric"],"181":["electric"],"182":["grass"],"183":["water","fairy"],"184":["water","fairy"],"185":["rock"],"186":["water"],"187":["grass","flying"],"188":["grass","flying"],"189":["grass","flying"],"190":["normal"],"191":["grass"],"192":["grass"],"193":["bug","flying"],"194":["water","ground"],"195":["water","ground"],"196":["psychic"],"197":["dark"],"198":["dark","flying"],"199":["water","psychic"],"200":["ghost"],"201":["psychic"],"202":["psychic"],"203":["normal","psychic"],"204":["bug"],"205":["bug","steel"],"206":["normal"],"207":["ground","flying"],"208":["steel","ground"],"209":["fairy"],"210":["fairy"],"211":["water","poison"],"212":["bug","steel"],"213":["bug","rock"],"214":["bug","fighting"],"215":["dark","ice"],"216":["normal"],"217":["normal"],"218":["fire"],"219":["fire","rock"],"220":["ice","ground"],"221":["ice","ground"],"222":["water","rock"],"223":["water"],"224":["water"],"225":["ice","flying"],"226":["water","flying"],"227":["steel","flying"],"228":["dark","fire"],"229":["dark","fire"],"230":["water","dragon"],"231":["ground"],"232":["ground"],"233":["normal"],"234":["normal"],"235":["normal"],"236":["fighting"],"237":["fighting"],"238":["ice","psychic"],"239":["electric"],"240":["fire"],"241":["normal"],"242":["normal"],"243":["electric"],"244":["fire"],"245":["water"],"246":["rock","ground"],"247":["rock","ground"],"248":["rock","dark"],"249":["psychic","flying"],"250":["fire","flying"],"251":["psychic","grass"],"252":["grass"],"253":["grass"],"254":["grass"],"255":["fire"],"256":["fire","fighting"],"257":["fire","fighting"],"258":["water"],"259":["water","ground"],"260":["water","ground"],"261":["dark"],"262":["dark"],"263":["normal"],"264":["normal"],"265":["bug"],"266":["bug"],"267":["bug","flying"],"268":["bug"],"269":["bug","poison"],"270":["water","grass"],"271":["water","grass"],"272":["water","grass"],"273":["grass"],"274":["grass","dark"],"275":["grass","dark"],"276":["normal","flying"],"277":["normal","flying"],"278":["water","flying"],"279":["water","flying"],"280":["psychic","fairy"],"281":["psychic","fairy"],"282":["psychic","fairy"],"283":["bug","water"],"284":["bug","flying"],"285":["grass"],"286":["grass","fighting"],"287":["normal"],"288":["normal"],"289":["normal"],"290":["bug","ground"],"291":["bug","flying"],"292":["bug","ghost"],"293":["normal"],"294":["normal"],"295":["normal"],"296":["fighting"],"297":["fighting"],"298":["normal","fairy"],"299":["rock"],"300":["normal"],"301":["normal"],"302":["dark","ghost"],"303":["steel","fairy"],"304":["steel","rock"],"305":["steel","rock"],"306":["steel","rock"],"307":["fighting","psychic"],"308":["fighting","psychic"],"309":["electric"],"310":["electric"],"311":["electric"],"312":["electric"],"313":["bug"],"314":["bug"],"315":["grass","poison"],"316":["poison"],"317":["poison"],"318":["water","dark"],"319":["water","dark"],"320":["water"],"321":["water"],"322":["fire","ground"],"323":["fire","ground"],"324":["fire"],"325":["psychic"],"326":["psychic"],"327":["normal"],"328":["ground"],"329":["ground","dragon"],"330":["ground","dragon"],"331":["grass"],"332":["grass","dark"],"333":["normal","flying"],"334":["dragon","flying"],"335":["normal"],"336":["poison"],"337":["rock","psychic"],"338":["rock","psychic"],"339":["water","ground"],"340":["water","ground"],"341":["water"],"342":["water","dark"],"343":["ground","psychic"],"344":["ground","psychic"],"345":["rock","grass"],"346":["rock","grass"],"347":["rock","bug"],"348":["rock","bug"],"349":["water"],"350":["water"],"351":["normal"],"352":["normal"],"353":["ghost"],"354":["ghost"],"355":["ghost"],"356":["ghost"],"357":["grass","flying"],"358":["psychic"],"359":["dark"],"360":["psychic"],"361":["ice"],"362":["ice"],"363":["ice","water"],"364":["ice","water"],"365":["ice","water"],"366":["water"],"367":["water"],"368":["water"],"369":["water","rock"],"370":["water"],"371":["dragon"],"372":["dragon"],"373":["dragon","flying"],"374":["steel","psychic"],"375":["steel","psychic"],"376":["steel","psychic"],"377":["rock"],"378":["ice"],"379":["steel"],"380":["dragon","psychic"],"381":["dragon","psychic"],"382":["water"],"383":["ground"],"384":["dragon","flying"],"385":["steel","psychic"],"386":["psychic"]};

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

const FRLG_MACHINES = {
  "focus-punch":"TM01", "dragon-claw":"TM02", "water-pulse":"TM03", "calm-mind":"TM04", "roar":"TM05",
  "toxic":"TM06", "hail":"TM07", "bulk-up":"TM08", "bullet-seed":"TM09", "hidden-power":"TM10",
  "sunny-day":"TM11", "taunt":"TM12", "ice-beam":"TM13", "blizzard":"TM14", "hyper-beam":"TM15",
  "light-screen":"TM16", "protect":"TM17", "rain-dance":"TM18", "giga-drain":"TM19", "safeguard":"TM20",
  "frustration":"TM21", "solar-beam":"TM22", "iron-tail":"TM23", "thunderbolt":"TM24", "thunder":"TM25",
  "earthquake":"TM26", "return":"TM27", "dig":"TM28", "psychic":"TM29", "shadow-ball":"TM30",
  "brick-break":"TM31", "double-team":"TM32", "reflect":"TM33", "shock-wave":"TM34", "flamethrower":"TM35",
  "sludge-bomb":"TM36", "sandstorm":"TM37", "fire-blast":"TM38", "rock-tomb":"TM39", "aerial-ace":"TM40",
  "torment":"TM41", "facade":"TM42", "secret-power":"TM43", "rest":"TM44", "attract":"TM45",
  "thief":"TM46", "steel-wing":"TM47", "skill-swap":"TM48", "snatch":"TM49", "overheat":"TM50",
  "cut":"HM01", "fly":"HM02", "surf":"HM03", "strength":"HM04", "flash":"HM05", "rock-smash":"HM06", "waterfall":"HM07"
};
let currentFilter = "all";

function key(id,type){ return STORAGE_PREFIX + id + "_" + type; }
function dataKey(id){ return DATA_PREFIX + id; }

function saveState(id,type,val){
  localStorage.setItem(key(id,type), val ? "true" : "false");
  updateStats();
  updateUnownVariantUi();
  applyFilter();
}

function loadState(id,type){
  const v3 = localStorage.getItem(key(id,type));
  if(v3 !== null) return v3 === "true";

  const v2 = localStorage.getItem("leafgreen_251_dual_tracker_v2_" + id + "_" + type);
  if(v2 !== null) return v2 === "true";

  const oldLiving = localStorage.getItem(id + "_living");
  const oldDex = localStorage.getItem(id + "_dex");
  const oldSingle = localStorage.getItem(id);
  if(type === "living" && oldLiving !== null) return oldLiving === "true";
  if(type === "dex" && oldDex !== null) return oldDex === "true";
  if(type === "living" && oldSingle !== null) return oldSingle === "true";
  return false;
}

function init(){
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
}

function updateStats(){
  let dexCount = 0;
  let livingCount = 0;

  document.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    const dex = document.getElementById("dex_" + id);
    const living = document.getElementById("living_" + id);

    if(dex && dex.checked) dexCount++;
    if(living && living.checked) livingCount++;
  });

  const stats = document.getElementById("stats");
  if(stats){
    stats.textContent = `Pokédex: ${dexCount}/386 | Living Dex: ${livingCount}/386`;
  }
  const bottomStats = document.getElementById("bottomStats");
  if(bottomStats){
    bottomStats.textContent = `Pokédex: ${dexCount}/386 | Living Dex: ${livingCount}/386`;
  }
}

function setFilter(filter){
  currentFilter = filter;
  applyFilter();
}


function getDexFilterLabel(){
  if(currentFilter === "missingDex") return "Missing Pokédex";
  if(currentFilter === "missingLiving") return "Missing Living Dex";
  if(currentFilter === "missingObtainable") return "Missing + " + (typeof getGameVersionLabel === "function" ? getGameVersionLabel() : "version") + " obtainable";
  if(currentFilter === "requiresTradeMissing") return "Missing + needs trade";
  if(currentFilter && currentFilter.startsWith("chain:")) return "Evolution line";
  return "";
}

function updateActiveDexFilters(){
  const el = document.getElementById("activeDexFilters");
  if(!el) return;

  const parts = [];
  const filterLabel = getDexFilterLabel();
  const searchEl = document.getElementById("nameSearch");
  const type1El = document.getElementById("typeFilter1");
  const type2El = document.getElementById("typeFilter2");
  const selectedAbility = typeof getDexAbilityFilterValue === "function" ? getDexAbilityFilterValue() : null;

  if(filterLabel) parts.push(filterLabel);
  if(searchEl && searchEl.value.trim()) parts.push("Name: " + searchEl.value.trim());
  if(type1El && type1El.value) parts.push("Type 1: " + type1El.value);
  if(type2El && type2El.value) parts.push("Type 2: " + type2El.value);
  if(selectedAbility){
    const suffix = typeof dexAbilityIndexStatusText === "function" ? dexAbilityIndexStatusText() : "";
    parts.push("Ability: " + selectedAbility.display + suffix);
  }

  const selectedMoves = typeof getDexMoveFilterValues === "function" ? getDexMoveFilterValues() : [];
  if(selectedMoves.length){
    const suffix = typeof dexMoveIndexStatusText === "function" ? dexMoveIndexStatusText() : "";
    parts.push("Moves: " + selectedMoves.map(m => m.display).join(" + ") + suffix);
  }

  el.textContent = parts.length ? parts.join(" | ") : "None";
}

function clearDexFilters(){
  currentFilter = "all";

  const searchEl = document.getElementById("nameSearch");
  const type1El = document.getElementById("typeFilter1");
  const type2El = document.getElementById("typeFilter2");
  const moveEl = document.getElementById("dexMoveFilter");
  const abilityEl = document.getElementById("dexAbilityFilter");

  if(searchEl) searchEl.value = "";
  if(type1El) type1El.value = "";
  if(type2El) type2El.value = "";
  if(moveEl) moveEl.value = "";
  if(abilityEl) abilityEl.value = "";

  for(let i=0;i<4;i++){
    const moveEl = document.getElementById("dexMoveFilter_" + i);
    if(moveEl) moveEl.value = "";
  }
  for(let i=0;i<4;i++){
    const moveEl = document.getElementById("dexMoveFilter_" + i);
    if(moveEl) moveEl.value = "";
  }
  applyFilter();
}


const DEX_MOVE_LEARNERS_CACHE_KEY = STORAGE_PREFIX + "dex_move_learners_v2";
let DEX_MOVE_LEARNERS_CACHE = {};
let DEX_MOVE_FILTER_TIMER = null;
let DEX_MOVE_FILTER_LOADING = false;

try{
  DEX_MOVE_LEARNERS_CACHE = JSON.parse(localStorage.getItem(DEX_MOVE_LEARNERS_CACHE_KEY) || "{}");
}catch(e){
  DEX_MOVE_LEARNERS_CACHE = {};
}

function dexNormaliseMoveName(name){
  if(typeof normaliseMoveName === "function") return normaliseMoveName(name);
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function saveDexMoveLearnerCache(){
  try{ localStorage.setItem(DEX_MOVE_LEARNERS_CACHE_KEY, JSON.stringify(DEX_MOVE_LEARNERS_CACHE)); }catch(e){}
}

function dexPokemonIdFromUrl(url){
  const m = String(url || "").match(/\/pokemon\/(\d+)\/?$/);
  return m ? String(parseInt(m[1],10)).padStart(3,"0") : "";
}

async function loadDexMoveLearners(moveName){
  const apiName = dexNormaliseMoveName(moveName);
  if(!apiName) return [];
  if(DEX_MOVE_LEARNERS_CACHE[apiName]) return DEX_MOVE_LEARNERS_CACHE[apiName];

  DEX_MOVE_FILTER_LOADING = true;
  if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();

  try{
    const response = await fetch(`https://pokeapi.co/api/v2/move/${apiName}/`);
    if(!response.ok) throw new Error("Move not found");
    const data = await response.json();

    const ids = [];
    (data.learned_by_pokemon || []).forEach(p => {
      const id = dexPokemonIdFromUrl(p.url);
      if(id && parseInt(id,10) <= 386) ids.push(id);
    });

    DEX_MOVE_LEARNERS_CACHE[apiName] = Array.from(new Set(ids));
    saveDexMoveLearnerCache();
    return DEX_MOVE_LEARNERS_CACHE[apiName];
  }catch(e){
    DEX_MOVE_LEARNERS_CACHE[apiName] = [];
    saveDexMoveLearnerCache();
    return [];
  }finally{
    DEX_MOVE_FILTER_LOADING = false;
    if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();
  }
}

function scheduleDexMoveFilter(){
  clearTimeout(DEX_MOVE_FILTER_TIMER);
  if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();

  DEX_MOVE_FILTER_TIMER = setTimeout(async function(){
    if(hasAnyDexMoveFilter() && typeof dexMoveReferenceReady === "function" && !dexMoveReferenceReady()){
      if(typeof DEX_MOVE_REFERENCE_BUILDING === "undefined" || !DEX_MOVE_REFERENCE_BUILDING){
        await buildDexMoveReferenceIndex(false);
      }
    }

    if(typeof applyFilter === "function") applyFilter();
  }, 200);
}


function scrollDexToTop(){
  const dex = document.getElementById("dexTab");
  if(dex){
    const y = Math.max(0, dex.getBoundingClientRect().top + window.pageYOffset - 95);
    window.scrollTo({top:y, behavior:"smooth"});
  }else{
    window.scrollTo({top:0, behavior:"smooth"});
  }
}

function updateBackToTopButton(){
  const btn = document.getElementById("backToTopButton");
  if(!btn) return;
  const dex = document.getElementById("dexTab");
  const dexActive = dex && dex.classList.contains("active");
  btn.classList.toggle("visible", !!dexActive && window.scrollY > 650);
}

window.addEventListener("scroll", updateBackToTopButton, {passive:true});
window.addEventListener("resize", updateBackToTopButton);


/* One-time cached FRLG move reference index.
   This is separate from visible move rendering and from tab navigation. */
const DEX_MOVE_REFERENCE_KEY = STORAGE_PREFIX + "dex_frlg_reference_move_index_v1";
const DEX_MOVE_REFERENCE_META_KEY = STORAGE_PREFIX + "dex_frlg_reference_move_index_meta_v1";
let DEX_MOVE_REFERENCE_INDEX = {};
let DEX_MOVE_REFERENCE_BUILDING = false;
let DEX_MOVE_REFERENCE_PROGRESS = {done:0,total:386};

try{
  DEX_MOVE_REFERENCE_INDEX = JSON.parse(localStorage.getItem(DEX_MOVE_REFERENCE_KEY) || "{}");
}catch(e){
  DEX_MOVE_REFERENCE_INDEX = {};
}

function saveDexMoveReferenceIndex(){
  try{
    localStorage.setItem(DEX_MOVE_REFERENCE_KEY, JSON.stringify(DEX_MOVE_REFERENCE_INDEX));
    localStorage.setItem(DEX_MOVE_REFERENCE_META_KEY, JSON.stringify({
      builtAt:new Date().toISOString(),
      count:Object.keys(DEX_MOVE_REFERENCE_INDEX).length
    }));
  }catch(e){}
}


function getDexMoveFilterValues(){
  const values = [];
  for(let i=0;i<4;i++){
    const el = document.getElementById("dexMoveFilter_" + i);
    const value = el ? el.value.trim() : "";
    const normalised = dexNormaliseMoveName(value);
    if(normalised && !values.some(v => v.normalised === normalised)){
      values.push({display:value, normalised});
    }
  }

  // Backwards compatibility for older saved DOM/file variants.
  const oldEl = document.getElementById("dexMoveFilter");
  if(oldEl && oldEl.value.trim()){
    const normalised = dexNormaliseMoveName(oldEl.value.trim());
    if(normalised && !values.some(v => v.normalised === normalised)){
      values.push({display:oldEl.value.trim(), normalised});
    }
  }

  return values.slice(0,4);
}

function hasAnyDexMoveFilter(){
  return getDexMoveFilterValues().length > 0;
}


function dexMoveReferenceReady(){
  return Object.keys(DEX_MOVE_REFERENCE_INDEX || {}).length >= 386;
}

function frlgNonEggMoveAllowed(detail){
  const vg = detail && detail.version_group ? detail.version_group.name : "";
  const method = detail && detail.move_learn_method ? detail.move_learn_method.name : "";
  return vg === "firered-leafgreen" && (method === "level-up" || method === "machine" || method === "tutor");
}

function cardMoveListFromPokemonData(data){
  return (data.moves || [])
    .filter(moveRecord => (moveRecord.version_group_details || []).some(frlgNonEggMoveAllowed))
    .map(moveRecord => dexNormaliseMoveName(moveRecord.move && moveRecord.move.name ? moveRecord.move.name : ""))
    .filter(Boolean);
}

async function buildDexMoveReferenceIndex(force){
  if(DEX_MOVE_REFERENCE_BUILDING) return;
  if(dexMoveReferenceReady() && !force){
    updateActiveDexFilters();
    applyFilter();
    return;
  }

  if(force && !confirm("Build/refresh the FireRed/LeafGreen move index? This runs once and caches the result in this browser.")){
    return;
  }

  DEX_MOVE_REFERENCE_BUILDING = true;
  DEX_MOVE_REFERENCE_PROGRESS = {done:0,total:386};
  DEX_MOVE_FILTER_LOADING = true;
  updateActiveDexFilters();

  try{
    if(force) DEX_MOVE_REFERENCE_INDEX = {};

    const cards = Array.from(document.querySelectorAll(".card"));
    DEX_MOVE_REFERENCE_PROGRESS.total = cards.length;

    // Small sequential batches. This avoids UI lockups and does not call visible move loaders.
    for(let i=0; i<cards.length; i++){
      const card = cards[i];
      const id = card.dataset.id;

      if(!DEX_MOVE_REFERENCE_INDEX[id]){
        try{
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${card.dataset.pokeid}/`);
          if(response.ok){
            const data = await response.json();
            DEX_MOVE_REFERENCE_INDEX[id] = Array.from(new Set(cardMoveListFromPokemonData(data)));
          }
        }catch(e){
          // Leave missing; user can refresh index later.
        }
      }

      DEX_MOVE_REFERENCE_PROGRESS.done = i + 1;

      if(i % 8 === 0){
        saveDexMoveReferenceIndex();
        updateActiveDexFilters();
        await new Promise(resolve => setTimeout(resolve, 20));
      }
    }

    saveDexMoveReferenceIndex();
  }finally{
    DEX_MOVE_REFERENCE_BUILDING = false;
    DEX_MOVE_FILTER_LOADING = false;
    updateActiveDexFilters();
    applyFilter();
  }
}

function dexMoveFilterAllowsCard(card){
  const selectedMoves = getDexMoveFilterValues();
  if(!selectedMoves.length) return true;

  if(!dexMoveReferenceReady()){
    return true;
  }

  const list = DEX_MOVE_REFERENCE_INDEX[card.dataset.id] || [];
  return selectedMoves.every(move => list.includes(move.normalised));
}

function dexMoveIndexStatusText(){
  if(DEX_MOVE_REFERENCE_BUILDING){
    return ` (building ${DEX_MOVE_REFERENCE_PROGRESS.done}/${DEX_MOVE_REFERENCE_PROGRESS.total})`;
  }
  if(!dexMoveReferenceReady()){
    return " (index not built)";
  }
  return "";
}

function applyFilter(){
  const searchEl = document.getElementById("nameSearch");
  const type1El = document.getElementById("typeFilter1");
  const type2El = document.getElementById("typeFilter2");
  const search = searchEl ? searchEl.value.trim().toLowerCase() : "";
  const type1 = type1El ? type1El.value : "";
  const type2 = type2El ? type2El.value : "";

  document.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    const dex = document.getElementById("dex_"+id).checked;
    const living = document.getElementById("living_"+id).checked;
    const name = (card.dataset.name || "").toLowerCase();
    const types = (card.dataset.types || "").split(",").filter(Boolean);
    const badgeText = (card.querySelector(".badge") ? card.querySelector(".badge").textContent : "").toLowerCase();
    const unavailable = badgeText.includes("unavailable") || badgeText.includes("special");
    const needsTrade = badgeText.includes("trade");
    const soloObtainable = !unavailable && !needsTrade;

    let show = true;
    if(currentFilter === "missingDex") show = show && !dex;
    if(currentFilter === "missingLiving") show = show && !living;
    if(currentFilter === "missingObtainable") show = show && !living && soloObtainable;
    if(currentFilter === "requiresTradeMissing") show = show && !living && needsTrade;
    if(currentFilter && currentFilter.startsWith("chain:")) show = show && card.dataset.chain === currentFilter.substring(6);
    if(search) show = show && speciesFilterMatches(id, card.dataset.name || "", search);
    if(type1) show = show && types.includes(type1);
    if(type2) show = show && types.includes(type2);

    show = show && dexMoveFilterAllowsCard(card);
    show = show && (typeof dexAbilityFilterAllowsCard === "function" ? dexAbilityFilterAllowsCard(card) : true);

    card.classList.toggle("hidden", !show);
  });

  renderProgress();
  const locationTab = document.getElementById("locationTab");
  if(locationTab && locationTab.classList.contains("active")) renderLocationView();
  updateActiveDexFilters();
}

function expandAll(kind, open){
  let selector = "details";
  if(kind === "obtain") selector = ".obtainDetails";
  if(kind === "moves") selector = ".movesDetails";
  document.querySelectorAll(selector).forEach(d => {
    d.open = open;
    if(open && d.classList.contains("movesDetails")){
      const card = d.closest(".card");
      loadPokemonData(card.dataset.id, card.dataset.pokeid);
    }
  });
}

function formatMoveName(name){
  return name.split("-").map(w => w ? w[0].toUpperCase() + w.slice(1) : w).join(" ");
}

function formatMachineMove(name){
  const machine = FRLG_MACHINES[name] || "TM/HM";
  return machine + " " + formatMoveName(name);
}

function machineSortValue(name){
  const machine = FRLG_MACHINES[name] || "ZZ99";
  const prefix = machine.slice(0,2);
  const num = parseInt(machine.slice(2),10) || 999;
  return (prefix === "TM" ? 0 : 1) * 1000 + num;
}

function renderTypes(id, types){
  const el = document.getElementById("types_"+id);
  const card = document.querySelector(`.card[data-id="${id}"]`);
  if(card) card.dataset.types = (types || []).join(",");
  if(!el) return;
  if(!types || !types.length){
    el.innerHTML = '<span class="type error">type unavailable</span>';
    return;
  }
  el.innerHTML = types.map(t => `<span class="type">${t}</span>`).join("");
  populateTypeDropdowns();
  applyFilter();
}

function renderMoves(id, payload){
  const el = document.getElementById("moves_"+id);
  if(!el) return;

  const levelMoves = payload.levelMoves || [];
  const machineMoves = payload.machineMoves || [];

  const levelHtml = levelMoves.length
    ? '<ul class="move-list">' + levelMoves.map(m => `<li>Lv ${m.level}: ${formatMoveName(m.name)}</li>`).join("") + '</ul>'
    : '<div class="loading">No level-up moves listed for FireRed/LeafGreen.</div>';

  const machineHtml = machineMoves.length
    ? '<ul class="move-list">' + machineMoves.map(m => `<li>${formatMachineMove(m.name)}</li>`).join("") + '</ul>'
    : '<div class="loading">No TM/HM moves listed for FireRed/LeafGreen.</div>';

  el.innerHTML = `
    <div class="move-section">
      <div class="move-title">Level-up moves</div>
      ${levelHtml}
    </div>
    <div class="move-section">
      <div class="move-title">TM/HM compatible moves</div>
      ${machineHtml}
    </div>`;
}

async function fetchPokemonData(pokeid){
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeid}/`);
  if(!response.ok) throw new Error("PokéAPI request failed");
  const data = await response.json();

  const types = data.types
    .sort((a,b) => a.slot - b.slot)
    .map(t => t.type.name);

  const baseStats = {};
  (data.stats || []).forEach(s => {
    if(s && s.stat && s.stat.name) baseStats[s.stat.name] = s.base_stat || 0;
  });

  const abilities = (data.abilities || [])
    .filter(a => !a.is_hidden)
    .map(a => ({name:a.ability && a.ability.name ? a.ability.name : "", hidden:!!a.is_hidden}))
    .filter(a => a.name)
    .sort((a,b) => displayAbilityName(a.name).localeCompare(displayAbilityName(b.name)));

  const levelMap = new Map();
  const machineMap = new Map();

  data.moves.forEach(moveEntry => {
    const moveName = moveEntry.move.name;
    moveEntry.version_group_details.forEach(vgd => {
      if(vgd.version_group.name !== "firered-leafgreen") return;
      const method = vgd.move_learn_method.name;
      if(method === "level-up"){
        const level = vgd.level_learned_at || 0;
        const existing = levelMap.get(moveName);
        if(existing === undefined || level < existing) levelMap.set(moveName, level);
      }
      if(method === "machine"){
        machineMap.set(moveName, true);
      }
    });
  });

  const levelMoves = Array.from(levelMap.entries())
    .map(([name, level]) => ({name, level}))
    .sort((a,b) => a.level - b.level || a.name.localeCompare(b.name));

  const machineMoves = Array.from(machineMap.keys())
    .map(name => ({name}))
    .sort((a,b) => machineSortValue(a.name) - machineSortValue(b.name) || a.name.localeCompare(b.name));

  return {types, baseStats, abilities, levelMoves, machineMoves, cachedAt: new Date().toISOString()};
}

async function loadPokemonData(id, pokeid){
  const movesEl = document.getElementById("moves_"+id);
  const cached = localStorage.getItem(dataKey(id));
  if(cached){
    try{
      const payload = JSON.parse(cached);
      renderTypes(id, payload.types);
      renderMoves(id, payload);
      return payload;
    }catch(e){}
  }

  if(movesEl) movesEl.innerHTML = '<span class="loading">Loading from PokéAPI...</span>';

  try{
    const payload = await fetchPokemonData(pokeid);
    localStorage.setItem(dataKey(id), JSON.stringify(payload));
    renderTypes(id, payload.types);
    renderMoves(id, payload);
    return payload;
  }catch(e){
    if(movesEl) movesEl.innerHTML = '<span class="error">Could not load move data. Check internet access, then collapse/reopen this section.</span>';
    const typeEl = document.getElementById("types_"+id);
    if(typeEl && typeEl.textContent.includes("loading")) typeEl.innerHTML = '<span class="type error">type unavailable</span>';
  }
}

async function loadTypesOnly(id, pokeid){
  const cached = localStorage.getItem(dataKey(id));
  if(cached){
    try{
      const payload = JSON.parse(cached);
      renderTypes(id, payload.types);
      return;
    }catch(e){}
  }

  // Lightweight fetch still gets the same Pokémon endpoint, but only renders type until moves are opened.
  try{
    const payload = await fetchPokemonData(pokeid);
    localStorage.setItem(dataKey(id), JSON.stringify(payload));
    renderTypes(id, payload.types);
  }catch(e){
    const el = document.getElementById("types_"+id);
    if(el) el.innerHTML = '<span class="type error">type unavailable</span>';
  }
}

async function preloadVisibleMoveData(){
  const visible = Array.from(document.querySelectorAll(".card:not(.hidden)"));
  for(const card of visible){
    const id = card.dataset.id;
    const pokeid = card.dataset.pokeid;
    await loadPokemonData(id, pokeid);
  }
  alert("Visible move/type data loaded and cached.");
}

function exportProgress(){
  const data = {};
  document.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    data[id] = {
      dex: document.getElementById("dex_"+id).checked,
      living: document.getElementById("living_"+id).checked,
      qty: loadQty(id)
    };
  });
  const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "leafgreen_living_dex_progress.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

function importProgress(event){
  const file = event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(){
    try{
      const data = JSON.parse(reader.result);
      Object.keys(data).forEach(id => {
        if(data[id].dex !== undefined) localStorage.setItem(key(id,"dex"), data[id].dex ? "true" : "false");
        if(data[id].living !== undefined) localStorage.setItem(key(id,"living"), data[id].living ? "true" : "false");
        if(data[id].qty !== undefined) localStorage.setItem(key(id,"qty"), String(parseInt(data[id].qty,10) || 0));
      });
      init();
updateBackToTopButton();
updateActiveDexFilters();
applyGameVersionTheme();
      alert("Progress imported.");
    }catch(e){
      alert("Could not import progress. Make sure this is a valid exported JSON file.");
    }
  };
  reader.readAsText(file);
}


const SPECIAL_LOCATION_DATA = {"Pallet Town": [{"id": "001", "name": "Bulbasaur", "method": "Gift", "rate": "Starter choice"}, {"id": "004", "name": "Charmander", "method": "Gift", "rate": "Starter choice"}, {"id": "007", "name": "Squirtle", "method": "Gift", "rate": "Starter choice"}], "Vermilion City": [{"id": "083", "name": "Farfetch'd", "method": "In-game trade", "rate": "Trade Spearow for Farfetch'd"}], "Route 18": [{"id": "108", "name": "Lickitung", "method": "In-game trade", "rate": "Trade Golduck for Lickitung in LeafGreen"}], "Route 2": [{"id": "122", "name": "Mr. Mime", "method": "In-game trade", "rate": "Trade Abra for Mr. Mime"}], "Celadon City": [{"id": "133", "name": "Eevee", "method": "Gift", "rate": "Celadon Mansion; one per save"}], "Celadon Game Corner": [{"id": "063", "name": "Abra", "method": "Prize", "rate": "Costs coins"}, {"id": "137", "name": "Porygon", "method": "Prize", "rate": "Costs coins"}, {"id": "147", "name": "Dratini", "method": "Prize", "rate": "Costs coins; Safari Zone Super Rod alternative"}], "Saffron City": [{"id": "106", "name": "Hitmonlee", "method": "Gift", "rate": "Fighting Dojo; choose one"}, {"id": "107", "name": "Hitmonchan", "method": "Gift", "rate": "Fighting Dojo; choose one"}, {"id": "131", "name": "Lapras", "method": "Gift", "rate": "Silph Co.; one per save"}], "Mt. Moon": [{"id": "138", "name": "Omanyte", "method": "Fossil", "rate": "Choose Helix Fossil; revive at Cinnabar Lab"}, {"id": "140", "name": "Kabuto", "method": "Fossil", "rate": "Choose Dome Fossil; revive at Cinnabar Lab"}], "Cinnabar Island": [{"id": "138", "name": "Omanyte", "method": "Fossil revival", "rate": "Helix Fossil"}, {"id": "140", "name": "Kabuto", "method": "Fossil revival", "rate": "Dome Fossil"}, {"id": "142", "name": "Aerodactyl", "method": "Fossil revival", "rate": "Old Amber"}], "Pewter City": [{"id": "142", "name": "Aerodactyl", "method": "Special item", "rate": "Old Amber from museum back room; revive at Cinnabar Lab"}], "Route 12": [{"id": "143", "name": "Snorlax", "method": "Static encounter", "rate": "One-time"}], "Route 16": [{"id": "143", "name": "Snorlax", "method": "Static encounter", "rate": "One-time"}], "Seafoam Islands": [{"id": "144", "name": "Articuno", "method": "Static legendary", "rate": "Lv50; one-time"}], "Power Plant": [{"id": "145", "name": "Zapdos", "method": "Static legendary", "rate": "Lv50; one-time"}], "One Island / Mt. Ember": [{"id": "146", "name": "Moltres", "method": "Static legendary", "rate": "Lv50; one-time"}], "Cerulean Cave": [{"id": "150", "name": "Mewtwo", "method": "Static legendary", "rate": "Lv70; one-time"}], "Roaming legendary": [{"id": "243", "name": "Raikou", "method": "Roaming", "rate": "After Elite Four/National Dex; only if Squirtle starter"}, {"id": "244", "name": "Entei", "method": "Roaming", "rate": "After Elite Four/National Dex; only if Bulbasaur starter"}, {"id": "245", "name": "Suicune", "method": "Roaming", "rate": "After Elite Four/National Dex; only if Charmander starter"}], "Trade / external / event": [{"id": "065", "name": "Alakazam", "method": "Trade evolution", "rate": "Trade Kadabra"}, {"id": "068", "name": "Machamp", "method": "Trade evolution", "rate": "Trade Machoke"}, {"id": "076", "name": "Golem", "method": "Trade evolution", "rate": "Trade Graveler"}, {"id": "094", "name": "Gengar", "method": "Trade evolution", "rate": "Trade Haunter"}, {"id": "186", "name": "Politoed", "method": "Trade evolution with held item", "rate": "Trade Poliwhirl holding King's Rock"}, {"id": "199", "name": "Slowking", "method": "Trade evolution with held item", "rate": "Trade Slowpoke holding King's Rock"}, {"id": "208", "name": "Steelix", "method": "Trade evolution with held item", "rate": "Trade Onix holding Metal Coat"}, {"id": "212", "name": "Scizor", "method": "Trade evolution with held item", "rate": "Trade Scyther holding Metal Coat"}, {"id": "230", "name": "Kingdra", "method": "Trade evolution with held item", "rate": "Trade Seadra holding Dragon Scale"}, {"id": "233", "name": "Porygon2", "method": "Trade evolution with held item", "rate": "Trade Porygon holding Upgrade"}, {"id": "151", "name": "Mew", "method": "Event/trade", "rate": "Not normally obtainable"}, {"id": "249", "name": "Lugia", "method": "Event/trade", "rate": "MysticTicket/Navel Rock or external"}, {"id": "250", "name": "Ho-Oh", "method": "Event/trade", "rate": "MysticTicket/Navel Rock or external"}, {"id": "251", "name": "Celebi", "method": "Event/trade", "rate": "Not normally obtainable"}]};
let ENCOUNTER_LOCATION_DATA = null;
let locationMode = "all";

function showTab(tabId){
  document.querySelectorAll(".tabPage").forEach(t => t.classList.toggle("active", t.id === tabId));
  document.querySelectorAll(".tabButton").forEach(b => b.classList.toggle("active", b.dataset.tab === tabId));
  if(tabId === "locationTab") { loadEncounterData(false); renderLocationView(); }
  if(tabId === "progressTab") renderProgress();
  if(tabId === "teamTab") { renderTeamBuilder();
/* Ensure FLéX title is current after startup */
updateFlexBranding();
renderSavedIVProfiles();
populateMyMonsFilterDropdowns();
renderMyMons();
updateDexOwnershipFromMons();
populateTeamBuilderSelectors();
populateTeamLoadSelect(); setTimeout(analyzeTeam, 50); }
  if(tabId === "ivTab") { renderSavedIVProfiles(); }
  if(tabId === "myMonsTab") { populateMyMonsFilterDropdowns(); renderMyMons(); }
}

function saveQty(id, value){
  const clean = Math.max(0, Math.min(99, parseInt(value || "0", 10) || 0));
  localStorage.setItem(key(id,"qty"), String(clean));
  const el = document.getElementById("qty_"+id);
  if(el) el.value = clean;
  renderProgress();
}
function loadQty(id){ const v = localStorage.getItem(key(id,"qty")); return v === null ? 0 : (parseInt(v,10) || 0); }

function showEvolutionLine(chainKey){
  if(!chainKey) return;
  currentFilter = "chain:" + chainKey;
  const searchEl = document.getElementById("nameSearch"); if(searchEl) searchEl.value = "";
  const type1El = document.getElementById("typeFilter1"); if(type1El) type1El.value = "";
  const type2El = document.getElementById("typeFilter2"); if(type2El) type2El.value = "";
  showTab("dexTab");
  applyFilter();
  window.scrollTo({top:0, behavior:"smooth"});
}


function encounterCacheKey(){ return STORAGE_PREFIX + getGameVersion() + "_exact_encounters_v1"; }

function prettyLocationArea(raw){
  let s = raw || "";
  s = s.replace(/^kanto-/, "");
  s = s.replace(/-area$/, "");
  s = s.replace(/-room$/, "");
  s = s.replace(/pokemon-/g, "Pokémon-");
  s = s.split("-").map(part => {
    if(part === "mt") return "Mt.";
    if(part === "ss") return "S.S.";
    if(part === "1f" || part === "2f" || part === "3f" || part === "4f" || part === "5f" || part === "b1f" || part === "b2f" || part === "b3f" || part === "b4f") return part.toUpperCase();
    if(part === "route") return "Route";
    if(part === "island") return "Island";
    return part ? part.charAt(0).toUpperCase() + part.slice(1) : part;
  }).join(" ");
  s = s.replace("Mt. Moon", "Mt. Moon");
  s = s.replace("Pokemon", "Pokémon");
  return s;
}

function prettyEncounterMethod(method){
  const map = {
    "walk": "Walking / grass or cave",
    "surf": "Surfing",
    "old-rod": "Fishing / Old Rod",
    "good-rod": "Fishing / Good Rod",
    "super-rod": "Fishing / Super Rod",
    "rock-smash": "Rock Smash",
    "headbutt": "Headbutt"
  };
  return map[method] || method.split("-").map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(" ");
}

function getCombinedLocationData(){
  const merged = {};
  if(ENCOUNTER_LOCATION_DATA){
    Object.keys(ENCOUNTER_LOCATION_DATA).forEach(loc => merged[loc] = (merged[loc] || []).concat(ENCOUNTER_LOCATION_DATA[loc]));
  }
  Object.keys(SPECIAL_LOCATION_DATA).forEach(loc => merged[loc] = (merged[loc] || []).concat(SPECIAL_LOCATION_DATA[loc]));
  return merged;
}

function initLocations(){
  const cached = localStorage.getItem(encounterCacheKey());
  if(cached){
    try{ ENCOUNTER_LOCATION_DATA = JSON.parse(cached); }catch(e){ ENCOUNTER_LOCATION_DATA = null; }
  }
  refreshLocationDropdown();
  document.querySelectorAll('.locationsDetails[open]').forEach(d => renderDexCardLocations(d.closest('.card').dataset.id));
}

function refreshLocationDropdown(){
  const select = document.getElementById("locationSelect");
  if(!select) return;
  const current = select.value;
  const data = getCombinedLocationData();
  const names = Object.keys(data).sort((a,b) => {
    const ar = a.match(/^Route (\d+)$/), br = b.match(/^Route (\d+)$/);
    if(ar && br) return parseInt(ar[1],10) - parseInt(br[1],10);
    if(ar) return -1;
    if(br) return 1;
    return a.localeCompare(b);
  });
  select.innerHTML = names.map(n => `<option value="${n}">${n}</option>`).join("");
  if(current && names.includes(current)) select.value = current;
  renderLocationView();
}

function setLocationMode(mode){ locationMode = mode; renderLocationView(); }

async function loadEncounterData(force){
  const cached = localStorage.getItem(encounterCacheKey());
  if(cached && !force){
    try{
      ENCOUNTER_LOCATION_DATA = JSON.parse(cached);
      refreshLocationDropdown();
      return;
    }catch(e){}
  }

  const container = document.getElementById("locationResults");
  if(container) container.innerHTML = '<p class="smallText">Loading exact LeafGreen encounter data. This can take a little while the first time...</p>';

  const data = {};
  const cards = Array.from(document.querySelectorAll(".card"));
  for(let idx=0; idx<cards.length; idx++){
    const card = cards[idx];
    const id = card.dataset.id;
    const pokeid = card.dataset.pokeid;
    const name = card.dataset.name;
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeid}/encounters`);
      if(!response.ok) continue;
      const areas = await response.json();
      areas.forEach(area => {
        const loc = prettyLocationArea(area.location_area.name);
        area.version_details
          .filter(v => v.version.name === getGameVersion())
          .forEach(v => {
            v.encounter_details.forEach(d => {
              const min = d.min_level, max = d.max_level;
              const level = min === max ? `Lv ${min}` : `Lv ${min}-${max}`;
              const method = prettyEncounterMethod(d.method.name);
              const chance = d.chance !== undefined && d.chance !== null ? `${d.chance}%` : `${v.max_chance}%`;
              const condition = d.condition_values && d.condition_values.length
                ? " (" + d.condition_values.map(c => c.name.replace(/-/g," ")).join(", ") + ")"
                : "";
              if(!data[loc]) data[loc] = [];
              data[loc].push({
                id, name,
                method,
                rate: `${chance}; ${level}${condition}`
              });
            });
          });
      });
    }catch(e){}
    if(container && idx % 20 === 0){
      container.innerHTML = `<p class="smallText">Loading exact LeafGreen encounter data... ${idx + 1}/${cards.length}</p>`;
    }
  }

  Object.keys(data).forEach(loc => {
    data[loc].sort((a,b) => parseInt(a.id,10) - parseInt(b.id,10) || a.method.localeCompare(b.method));
  });

  ENCOUNTER_LOCATION_DATA = data;
  localStorage.setItem(encounterCacheKey(), JSON.stringify(data));
  refreshLocationDropdown();
}


function parseRatePercent(rateText){
  const match = String(rateText || "").match(/(\d+(?:\.\d+)?)%/);
  return match ? parseFloat(match[1]) : null;
}

function methodGroup(method){
  const m = String(method || "").toLowerCase();
  if(m.includes("surf")) return "Surfing";
  if(m.includes("old rod")) return "Old Rod";
  if(m.includes("good rod")) return "Good Rod";
  if(m.includes("super rod")) return "Super Rod";
  if(m.includes("fish")) return "Fishing";
  if(m.includes("rock smash")) return "Rock Smash";
  if(m.includes("gift")) return "Gift";
  if(m.includes("trade")) return "Trade";
  if(m.includes("static")) return "Static";
  if(m.includes("fossil")) return "Fossil";
  if(m.includes("prize")) return "Prize";
  if(m.includes("walking") || m.includes("grass") || m.includes("cave")) return "Walking";
  return method || "Other";
}

function levelTextFromRate(rateText){
  const match = String(rateText || "").match(/Lv\s*([0-9]+)(?:-([0-9]+))?/i);
  if(!match) return "";
  return match[2] ? `Lv ${match[1]}-${match[2]}` : `Lv ${match[1]}`;
}

function summariseEntries(entries){
  const byMethod = {};
  const levels = [];
  entries.forEach(e => {
    const group = methodGroup(e.method);
    const pct = parseRatePercent(e.rate);
    if(!byMethod[group]) byMethod[group] = {sum:0, hasPercent:false, labels:[]};
    if(pct !== null){
      byMethod[group].sum += pct;
      byMethod[group].hasPercent = true;
    } else if(e.rate) {
      byMethod[group].labels.push(e.rate);
    }
    const lvl = levelTextFromRate(e.rate);
    if(lvl) levels.push(lvl);
  });

  const rateParts = Object.keys(byMethod).map(method => {
    const info = byMethod[method];
    if(info.hasPercent) return `${method}: ${Math.round(info.sum * 10) / 10}%`;
    const label = info.labels.length ? info.labels[0] : "special";
    return `${method}: ${label}`;
  });

  const numericLevels = [];
  levels.forEach(lvl => {
    const nums = lvl.match(/\d+/g);
    if(nums) nums.forEach(n => numericLevels.push(parseInt(n,10)));
  });
  let levelSummary = "";
  if(numericLevels.length){
    const min = Math.min(...numericLevels);
    const max = Math.max(...numericLevels);
    levelSummary = min === max ? `Lv ${min}` : `Lv ${min}-${max}`;
  }

  return {rateParts, levelSummary};
}

function allLocationData(){
  return getCombinedLocationData();
}


let PENDING_LOCATION_POKEMON_EXPAND = null;

function escapeJsString(value){
  return String(value || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n").replace(/\r/g, "");
}

function openLocationForPokemon(locationName, pokemonId){
  PENDING_LOCATION_POKEMON_EXPAND = { locationName, pokemonId };

  showTab("locationTab");

  const select = document.getElementById("locationSelect");
  if(select){
    select.value = locationName;
  }

  renderLocationView();

  setTimeout(() => {
    expandLocationPokemonEntry(pokemonId);
  }, 100);
}

function expandLocationPokemonEntry(pokemonId){
  const details = document.querySelector(`#locationResults details.locItem[data-poke-id="${pokemonId}"]`);
  if(details){
    details.open = true;
    details.classList.add("locationJumpHighlight");
    details.scrollIntoView({behavior:"smooth", block:"center"});
    setTimeout(() => details.classList.remove("locationJumpHighlight"), 1800);
  }
}


function renderLocationView(){
  const container = document.getElementById("locationResults");
  const select = document.getElementById("locationSelect");
  if(!container || !select || !select.value) return;

  const data = allLocationData();
  const items = data[select.value] || [];

  const grouped = {};
  items.forEach(item => {
    const dex = document.getElementById("dex_"+item.id)?.checked;
    const living = document.getElementById("living_"+item.id)?.checked;

    if(locationMode === "missingDex" && dex) return;
    if(locationMode === "missingLiving" && living) return;

    if(!grouped[item.id]){
      grouped[item.id] = {
        name: item.name,
        entries: []
      };
    }
    grouped[item.id].entries.push(item);
  });

  const keys = Object.keys(grouped).sort((a,b)=>parseInt(a)-parseInt(b));

  if(!keys.length){
    container.innerHTML = '<p class="smallText">No Pokémon match this location filter.</p>';
    return;
  }

  const pendingId = PENDING_LOCATION_POKEMON_EXPAND && PENDING_LOCATION_POKEMON_EXPAND.locationName === select.value
    ? PENDING_LOCATION_POKEMON_EXPAND.pokemonId
    : null;

  container.innerHTML = keys.map(id => {
    const g = grouped[id];
    const summary = summariseEntries(g.entries);
    const badges = summary.rateParts.map(p => `<span class="locRateBadge">${p}</span>`).join("");
    const lvl = summary.levelSummary ? `<span class="locRateBadge">${summary.levelSummary}</span>` : "";
    const openAttr = pendingId === id ? " open" : "";

    return `
      <details class="locItem" data-poke-id="${id}"${openAttr}>
        <summary class="locName">#${id} ${g.name} ${badges} ${lvl}</summary>
        ${g.entries.map(e => `
          <div class="smallText locDetail">
            <div><b>Method:</b> ${e.method || "—"}</div>
            <div><b>Rate / details:</b> ${e.rate || "—"}</div>
          </div>
        `).join("")}
      </details>
    `;
  }).join("");

  if(pendingId){
    setTimeout(() => expandLocationPokemonEntry(pendingId), 50);
    PENDING_LOCATION_POKEMON_EXPAND = null;
  }
}


function renderDexCardLocations(id){
  const el = document.getElementById("locations_" + id);
  if(!el) return;

  const sortEl = document.getElementById("locSort_" + id);
  const sortMode = sortEl ? sortEl.value : "name";

  const data = allLocationData();
  if(!ENCOUNTER_LOCATION_DATA){
    el.innerHTML = '<span class="loading">Open Settings and tap Load/refresh exact encounter data under Locations cache to populate wild locations.</span>';
  }

  let rows = [];
  Object.keys(data).forEach(loc => {
    const entries = (data[loc] || []).filter(e => e.id === id);
    if(!entries.length) return;

    const summary = summariseEntries(entries);

    let levelNums = [];
    entries.forEach(e => {
      const text = String(e.rate || "");
      const levelMatches = text.matchAll(/Lv\s*([0-9]+)(?:\s*-\s*([0-9]+))?/gi);
      for(const match of levelMatches){
        levelNums.push(parseInt(match[1],10));
        if(match[2]) levelNums.push(parseInt(match[2],10));
      }
    });
    const minLevel = levelNums.length ? Math.min(...levelNums) : 999;
    const maxLevel = levelNums.length ? Math.max(...levelNums) : -1;

    let totalRate = 0;
    entries.forEach(e => {
      const pct = parseRatePercent(e.rate);
      if(pct) totalRate += pct;
    });

    const locJs = escapeJsString(loc);
    const idJs = escapeJsString(id);

    rows.push({
      loc,
      html: `
        <button type="button" class="locSummary locSummaryLink" onclick="openLocationForPokemon('${locJs}','${idJs}')">
          <div><b>${loc}</b></div>
          <div><b>Method/rate:</b> ${summary.rateParts.join("; ") || "—"}</div>
          <div><b>Levels:</b> ${summary.levelSummary || "—"}</div>
        </button>
      `,
      minLevel,
      maxLevel,
      totalRate
    });
  });

  rows.sort((a,b) => {
    if(sortMode === "levelAsc") {
      return (a.minLevel - b.minLevel) || (a.maxLevel - b.maxLevel) || a.loc.localeCompare(b.loc);
    }
    if(sortMode === "levelDesc") {
      return (b.maxLevel - a.maxLevel) || (b.minLevel - a.minLevel) || a.loc.localeCompare(b.loc);
    }
    if(sortMode === "rateDesc") {
      return (b.totalRate - a.totalRate) || a.loc.localeCompare(b.loc);
    }
    return a.loc.localeCompare(b.loc);
  });

  el.innerHTML = rows.length ? rows.map(r => r.html).join("") : '<span class="loading">No location data found.</span>';
}



const PROGRESS_CELEBRATION_PREVIEW_KEY = "leafgreen_251_dual_tracker_v3_progressCelebrationPreview";

function getProgressCelebrationPreview(){
  return localStorage.getItem(PROGRESS_CELEBRATION_PREVIEW_KEY) === "true";
}

function setProgressCelebrationPreview(enabled){
  localStorage.setItem(PROGRESS_CELEBRATION_PREVIEW_KEY, enabled ? "true" : "false");
  renderProgress();
}

function syncProgressCelebrationPreviewToggle(){
  const toggle = document.getElementById("progressCelebrationPreviewToggle");
  if(toggle) toggle.checked = getProgressCelebrationPreview();
}

document.addEventListener("DOMContentLoaded", syncProgressCelebrationPreviewToggle);
window.addEventListener("load", syncProgressCelebrationPreviewToggle);


function renderProgress(){
  const el = document.getElementById("progressBreakdown");
  if(!el) return;
  let kantoDex=0,kantoLiving=0,johtoDex=0,johtoLiving=0,hoennDex=0,hoennLiving=0,obtainableTotal=0,obtainableLiving=0;
  document.querySelectorAll(".card").forEach(card => {
    const idNum = parseInt(card.dataset.id,10);
    const id = card.dataset.id;
    const dexEl = document.getElementById("dex_"+id);
    const livingEl = document.getElementById("living_"+id);
    const dex = !!(dexEl && dexEl.checked);
    const living = !!(livingEl && livingEl.checked);
    const badgeText = (card.querySelector(".badge") ? card.querySelector(".badge").textContent : "").toLowerCase();
    const obtainable = !(badgeText.includes("unavailable") || badgeText.includes("special") || badgeText.includes("trade") || badgeText.includes("external") || badgeText.includes("event"));
    if(idNum <= 151){ if(dex) kantoDex++; if(living) kantoLiving++; }
    else if(idNum <= 251){ if(dex) johtoDex++; if(living) johtoLiving++; }
    else { if(dex) hoennDex++; if(living) hoennLiving++; }
    if(obtainable){ obtainableTotal++; if(living) obtainableLiving++; }
  });
  function card(title, have, total, celebrationKey){
    const pct = total ? Math.round((have/total)*100) : 0;
    const completeClass = pct >= 100 ? " progressComplete" : "";
    const bgClassMap = {
      kantoDex: "progressBgKantoDex",
      kantoLiving: "progressBgKantoLiving",
      johtoDex: "progressBgJohtoDex",
      johtoLiving: "progressBgJohtoLiving",
      hoennDex: "progressBgHoennDex",
      hoennLiving: "progressBgHoennLiving",
      unownVariants: "progressBgUnownVariants"
    };
    const bgClass = bgClassMap[celebrationKey] || "";
    const showCelebrationArt = !!bgClass && (pct >= 100 || getProgressCelebrationPreview());
    const celebrationClass = showCelebrationArt ? " progressCelebration " + bgClass : "";
    return `<div class="progressCard${completeClass}${celebrationClass}"><div>${title}</div><div class="big">${pct}%</div><div>${have}/${total}</div><div class="progressBar"><div class="progressFill" style="width:${pct}%"></div></div></div>`;
  }
  const unownVariants = getUnownVariants();
  const unownVariantCount = UNOWN_VARIANTS.filter(function(v){ return !!unownVariants[v]; }).length;
  const unownVariantPct = Math.round((unownVariantCount / UNOWN_VARIANTS.length) * 100);
  const unownCelebrationClass = (unownVariantPct >= 100 || getProgressCelebrationPreview()) ? " progressCelebration progressBgUnownVariants" : "";
  const unownVariantCard = `<div class="progressCard variantProgressCard${unownVariantPct >= 100 ? ' progressComplete' : ''}${unownCelebrationClass}"><div>Unown Variants</div><div class="big" id="unownVariantProgressPct">${unownVariantPct}%</div><div id="unownVariantProgressText">${unownVariantCount}/${UNOWN_VARIANTS.length}</div><div class="progressBar"><div id="unownVariantProgressFill" class="progressFill" style="width:${unownVariantPct}%"></div></div></div>`;
  el.innerHTML = card("Kanto Pokédex", kantoDex, 151, "kantoDex") + card("Kanto Living Dex", kantoLiving, 151, "kantoLiving") + card("Johto Pokédex", johtoDex, 100, "johtoDex") + card("Johto Living Dex", johtoLiving, 100, "johtoLiving") + card("Hoenn Pokédex", hoennDex, 135, "hoennDex") + card("Hoenn Living Dex", hoennLiving, 135, "hoennLiving") + card((typeof getGameVersionLabel === "function" ? getGameVersionLabel() : "FR/LG") + " solo-obtainable Living Dex", obtainableLiving, obtainableTotal) + unownVariantCard;
  updateUnownVariantUi();

  const tradeEl = document.getElementById("tradeRequirements");
  if(tradeEl){
    const rows = [];
    document.querySelectorAll(".card").forEach(card => {
      const id = card.dataset.id;
      const livingEl = document.getElementById("living_"+id);
      const living = !!(livingEl && livingEl.checked);
      const badgeText = (card.querySelector(".badge") ? card.querySelector(".badge").textContent : "").toLowerCase();
      if(!living && (badgeText.includes("trade") || badgeText.includes("external") || badgeText.includes("event") || badgeText.includes("unavailable") || badgeText.includes("special"))){
        const obtain = card.querySelector(".obtain") ? card.querySelector(".obtain").textContent : "";
        rows.push(`<div class="plannerItem"><b>#${id} ${card.dataset.name}</b><br><span class="smallText">${obtain}</span></div>`);
      }
    });
    tradeEl.innerHTML = rows.length ? rows.join("") : '<p class="smallText">No missing trade/external Pokémon based on your Living Dex ticks.</p>';
  }
}


function escapeHtml(value){
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function displayAbilityName(name){
  return String(name || "")
    .split("-")
    .map(w => w ? w[0].toUpperCase() + w.slice(1) : w)
    .join(" ");
}

function normaliseAbilityName(name){
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ABILITY_CACHE_KEY = STORAGE_PREFIX + "ability_meta_cache_v2";
const POKEMON_ABILITY_CACHE_KEY = STORAGE_PREFIX + "pokemon_abilities_cache_gen3_v1";

function getAbilityCache(){
  try{return JSON.parse(localStorage.getItem(ABILITY_CACHE_KEY) || "{}");}catch(e){return {};}
}

function setAbilityCache(cache){
  try{localStorage.setItem(ABILITY_CACHE_KEY, JSON.stringify(cache));}catch(e){}
}

function getPokemonAbilityCache(){
  try{return JSON.parse(localStorage.getItem(POKEMON_ABILITY_CACHE_KEY) || "{}");}catch(e){return {};}
}

function setPokemonAbilityCache(cache){
  try{localStorage.setItem(POKEMON_ABILITY_CACHE_KEY, JSON.stringify(cache));}catch(e){}
}

const ABILITY_OPTIONS_CACHE_KEY = STORAGE_PREFIX + "ability_options_gen3_cache_v1";
const DEX_ABILITY_REFERENCE_CACHE_KEY = STORAGE_PREFIX + "dex_ability_reference_gen3_v1";
let DEX_ABILITY_REFERENCE_INDEX = {};
let DEX_ABILITY_REFERENCE_BUILDING = false;
let DEX_ABILITY_REFERENCE_PROGRESS = {done:0,total:0};
let DEX_ABILITY_FILTER_TIMER = null;

const GEN3_ABILITY_NAMES = {
  "stench":true,"drizzle":true,"speed-boost":true,"battle-armor":true,"sturdy":true,"damp":true,"limber":true,"sand-veil":true,
  "static":true,"volt-absorb":true,"water-absorb":true,"oblivious":true,"cloud-nine":true,"compound-eyes":true,"insomnia":true,
  "color-change":true,"immunity":true,"flash-fire":true,"shield-dust":true,"own-tempo":true,"suction-cups":true,"intimidate":true,
  "shadow-tag":true,"rough-skin":true,"wonder-guard":true,"levitate":true,"effect-spore":true,"synchronize":true,"clear-body":true,
  "natural-cure":true,"lightning-rod":true,"serene-grace":true,"swift-swim":true,"chlorophyll":true,"illuminate":true,"trace":true,
  "huge-power":true,"poison-point":true,"inner-focus":true,"magma-armor":true,"water-veil":true,"magnet-pull":true,"soundproof":true,
  "rain-dish":true,"sand-stream":true,"pressure":true,"thick-fat":true,"early-bird":true,"flame-body":true,"run-away":true,
  "keen-eye":true,"hyper-cutter":true,"pickup":true,"truant":true,"hustle":true,"cute-charm":true,"plus":true,"minus":true,
  "forecast":true,"sticky-hold":true,"shed-skin":true,"guts":true,"marvel-scale":true,"liquid-ooze":true,"overgrow":true,
  "blaze":true,"torrent":true,"swarm":true,"rock-head":true,"drought":true,"arena-trap":true,"vital-spirit":true,
  "white-smoke":true,"pure-power":true,"shell-armor":true,"air-lock":true
};

function isGen3AbilityName(name){
  return !!GEN3_ABILITY_NAMES[normaliseAbilityName(name)];
}

try{
  DEX_ABILITY_REFERENCE_INDEX = JSON.parse(localStorage.getItem(DEX_ABILITY_REFERENCE_CACHE_KEY) || "{}");
}catch(e){
  DEX_ABILITY_REFERENCE_INDEX = {};
}

function getAbilityOptionsCache(){
  try{return JSON.parse(localStorage.getItem(ABILITY_OPTIONS_CACHE_KEY) || "{}");}catch(e){return {};}
}

function setAbilityOptionsCache(cache){
  try{localStorage.setItem(ABILITY_OPTIONS_CACHE_KEY, JSON.stringify(cache));}catch(e){}
}

async function ensureAbilityOptionsLoaded(allowNetwork=true){
  const datalist = document.getElementById("abilityOptions");
  if(!datalist) return;

  const cache = getAbilityOptionsCache();
  const cachedNames = Object.keys(cache).filter(isGen3AbilityName).sort((a,b) => displayAbilityName(a).localeCompare(displayAbilityName(b)));
  if(cachedNames.length){
    datalist.innerHTML = cachedNames.map(n => `<option value="${escapeHtml(displayAbilityName(n))}"></option>`).join("");
    return;
  }

  if(!allowNetwork) return;

  // Ability names are static for this app. Keep this list Gen 3 only so autocomplete
  // does not suggest later-generation abilities that FireRed/LeafGreen Pokémon cannot have.
  const newCache = {};
  Object.keys(GEN3_ABILITY_NAMES).forEach(name => {
    newCache[name] = {display:displayAbilityName(name), generation:"generation-iii"};
  });
  setAbilityOptionsCache(newCache);
  const names = Object.keys(newCache).sort((a,b) => displayAbilityName(a).localeCompare(displayAbilityName(b)));
  datalist.innerHTML = names.map(n => `<option value="${escapeHtml(displayAbilityName(n))}"></option>`).join("");
}

function getDexAbilityFilterValue(){
  const el = document.getElementById("dexAbilityFilter");
  const value = el ? el.value.trim() : "";
  const normalised = normaliseAbilityName(value);
  return normalised ? {raw:value, normalised:normalised, display:value || displayAbilityName(normalised)} : null;
}

function dexAbilityReferenceReady(){
  const cards = Array.from(document.querySelectorAll(".card"));
  return cards.length > 0 && cards.every(card => Array.isArray(DEX_ABILITY_REFERENCE_INDEX[card.dataset.id]));
}

function saveDexAbilityReferenceIndex(){
  try{localStorage.setItem(DEX_ABILITY_REFERENCE_CACHE_KEY, JSON.stringify(DEX_ABILITY_REFERENCE_INDEX));}catch(e){}
}

function scheduleDexAbilityFilter(){
  clearTimeout(DEX_ABILITY_FILTER_TIMER);
  if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();

  DEX_ABILITY_FILTER_TIMER = setTimeout(function(){
    const selected = getDexAbilityFilterValue();
    if(selected && !dexAbilityReferenceReady()){
      buildDexAbilityReferenceIndex();
    }
    applyFilter();
  }, 160);
}

async function buildDexAbilityReferenceIndex(){
  if(DEX_ABILITY_REFERENCE_BUILDING) return;
  DEX_ABILITY_REFERENCE_BUILDING = true;
  const cards = Array.from(document.querySelectorAll(".card"));
  DEX_ABILITY_REFERENCE_PROGRESS = {done:0,total:cards.length};
  updateActiveDexFilters();

  try{
    for(const card of cards){
      const id = card.dataset.id;
      if(!Array.isArray(DEX_ABILITY_REFERENCE_INDEX[id])){
        const abilities = await getPokemonAbilitiesBySpeciesId(id);
        DEX_ABILITY_REFERENCE_INDEX[id] = abilities.map(a => normaliseAbilityName(a.name)).filter(Boolean);
      }
      DEX_ABILITY_REFERENCE_PROGRESS.done++;
      if(DEX_ABILITY_REFERENCE_PROGRESS.done % 10 === 0){
        saveDexAbilityReferenceIndex();
        updateActiveDexFilters();
        applyFilter();
      }
    }
    saveDexAbilityReferenceIndex();
  }finally{
    DEX_ABILITY_REFERENCE_BUILDING = false;
    updateActiveDexFilters();
    applyFilter();
  }
}

function dexAbilityFilterAllowsCard(card){
  const selected = getDexAbilityFilterValue();
  if(!selected) return true;

  const list = DEX_ABILITY_REFERENCE_INDEX[card.dataset.id];

  // While the one-time Dex ability index is still being built, do not hide cards
  // that have not been indexed yet. As soon as a card has an indexed ability list,
  // apply the filter to that card immediately.
  if(!Array.isArray(list)){
    return DEX_ABILITY_REFERENCE_BUILDING || !dexAbilityReferenceReady();
  }

  const raw = String(selected.raw || "").trim().toLowerCase();
  return list.some(ability => {
    const display = displayAbilityName(ability).toLowerCase();
    return ability === selected.normalised || ability.includes(selected.normalised) || (raw && display.includes(raw));
  });
}

function dexAbilityIndexStatusText(){
  if(DEX_ABILITY_REFERENCE_BUILDING){
    return ` (building ${DEX_ABILITY_REFERENCE_PROGRESS.done}/${DEX_ABILITY_REFERENCE_PROGRESS.total})`;
  }
  if(getDexAbilityFilterValue() && !dexAbilityReferenceReady()){
    return " (index not built)";
  }
  return "";
}

async function getPokemonAbilitiesBySpeciesId(speciesId){
  const card = speciesId ? document.querySelector(`.card[data-id="${speciesId}"]`) : null;
  const pokeid = card ? card.dataset.pokeid : speciesId;
  if(!pokeid) return [];

  const cacheKey = String(pokeid);
  const cache = getPokemonAbilityCache();
  if(Array.isArray(cache[cacheKey])) return cache[cacheKey];

  try{
    const cached = speciesId ? localStorage.getItem(dataKey(speciesId)) : "";
    if(cached){
      const payload = JSON.parse(cached);
      if(Array.isArray(payload.abilities) && payload.abilities.length){
        const fromPayload = normalisePokemonAbilityList(payload.abilities);
        if(fromPayload.length){
          cache[cacheKey] = fromPayload;
          setPokemonAbilityCache(cache);
          return cache[cacheKey];
        }
      }
    }
  }catch(e){}

  try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeid}/`);
    if(!response.ok) throw new Error("Pokémon ability request failed");
    const data = await response.json();
    const abilities = normalisePokemonAbilityListFromApi(data);
    cache[cacheKey] = abilities;
    setPokemonAbilityCache(cache);
    return abilities;
  }catch(e){
    return [];
  }
}

function normalisePokemonAbilityList(abilities){
  const seen = {};
  const list = [];
  (abilities || []).forEach(a => {
    const name = normaliseAbilityName(a && a.name ? a.name : a);
    if(!name || seen[name] || !isGen3AbilityName(name)) return;
    seen[name] = true;
    list.push({name:name, hidden:false});
  });
  return list.sort((a,b) => displayAbilityName(a.name).localeCompare(displayAbilityName(b.name)));
}

function normalisePokemonAbilityListFromApi(data){
  const seen = {};
  const list = [];

  function addAbility(entry){
    if(!entry || entry.is_hidden) return;
    const raw = entry.ability && entry.ability.name ? entry.ability.name : entry.name;
    const name = normaliseAbilityName(raw);
    if(!name || seen[name] || !isGen3AbilityName(name)) return;
    seen[name] = true;
    list.push({name:name, hidden:false});
  }

  (data.abilities || []).forEach(addAbility);

  // PokéAPI's current Pokémon endpoint can omit abilities a Pokémon had in Gen 3
  // if that species changed ability in later games. past_abilities restores those.
  (data.past_abilities || []).forEach(group => {
    (group.abilities || []).forEach(addAbility);
  });

  return list.sort((a,b) => displayAbilityName(a.name).localeCompare(displayAbilityName(b.name)));
}

function updateAbilityCacheStatus(message){
  const el = document.getElementById("abilityCacheStatus");
  if(el) el.textContent = message || "";
}

async function buildAllAbilityDataCache(forceRefresh){
  if(forceRefresh){
    setPokemonAbilityCache({});
    setAbilityCache({});
    DEX_ABILITY_REFERENCE_INDEX = {};
    saveDexAbilityReferenceIndex();
  }

  await ensureAbilityOptionsLoaded(true);

  const abilityNames = Object.keys(GEN3_ABILITY_NAMES).sort((a,b) => displayAbilityName(a).localeCompare(displayAbilityName(b)));
  for(let i=0;i<abilityNames.length;i++){
    updateAbilityCacheStatus(`Caching ability descriptions ${i+1}/${abilityNames.length}...`);
    await getAbilityMeta(abilityNames[i]);
  }

  const cards = Array.from(document.querySelectorAll(".card"));
  DEX_ABILITY_REFERENCE_PROGRESS = {done:0,total:cards.length};
  for(const card of cards){
    const id = card.dataset.id;
    const abilities = await getPokemonAbilitiesBySpeciesId(id);
    DEX_ABILITY_REFERENCE_INDEX[id] = abilities.map(a => normaliseAbilityName(a.name)).filter(Boolean);
    DEX_ABILITY_REFERENCE_PROGRESS.done++;
    if(DEX_ABILITY_REFERENCE_PROGRESS.done % 10 === 0){
      saveDexAbilityReferenceIndex();
      updateAbilityCacheStatus(`Caching Pokémon abilities ${DEX_ABILITY_REFERENCE_PROGRESS.done}/${DEX_ABILITY_REFERENCE_PROGRESS.total}...`);
      if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();
    }
  }

  saveDexAbilityReferenceIndex();
  updateAbilityCacheStatus(`Ability cache complete: ${cards.length} Pokémon, Gen 3 abilities only.`);
  if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();
  if(typeof applyFilter === "function") applyFilter();
  if(typeof renderMyMons === "function") renderMyMons();
}

async function getAbilityMeta(abilityName){
  const apiName = normaliseAbilityName(abilityName);
  if(!apiName) return null;

  const cache = getAbilityCache();
  if(cache[apiName]) return cache[apiName];

  try{
    const response = await fetch(`https://pokeapi.co/api/v2/ability/${apiName}/`);
    if(!response.ok) throw new Error("Ability detail request failed");
    const data = await response.json();
    const effectEntry = (data.effect_entries || []).find(e => e.language && e.language.name === "en");
    const flavorEntry = (data.flavor_text_entries || []).find(e => e.language && e.language.name === "en" && e.version_group && e.version_group.name === "firered-leafgreen")
      || (data.flavor_text_entries || []).find(e => e.language && e.language.name === "en");
    const meta = {
      name: apiName,
      display: displayAbilityName(apiName),
      generation: data.generation && data.generation.name ? data.generation.name : (isGen3AbilityName(apiName) ? "generation-iii" : ""),
      shortEffect: effectEntry && effectEntry.short_effect ? effectEntry.short_effect : "",
      effect: effectEntry && effectEntry.effect ? effectEntry.effect : "",
      flavor: flavorEntry && flavorEntry.flavor_text ? flavorEntry.flavor_text.replace(/\s+/g, " ").trim() : ""
    };
    cache[apiName] = meta;
    setAbilityCache(cache);
    return meta;
  }catch(e){
    return null;
  }
}

async function populateMonAbilityDropdown(preferredAbility){
  const abilityEl = document.getElementById("monAbility");
  if(!abilityEl) return;
  const speciesId = monSpeciesIdFromInput(document.getElementById("monSpecies")?.value || "");
  const preferred = normaliseAbilityName(preferredAbility || abilityEl.value || "");

  if(!speciesId){
    abilityEl.innerHTML = '<option value="">Select species first</option>';
    return;
  }

  abilityEl.innerHTML = '<option value="">Loading abilities...</option>';
  const abilities = await getPokemonAbilitiesBySpeciesId(speciesId);

  if(!abilities.length){
    abilityEl.innerHTML = '<option value="">No abilities found</option>';
    return;
  }

  abilityEl.innerHTML = abilities.map(a => `<option value="${escapeHtml(a.name)}">${escapeHtml(displayAbilityName(a.name))}${a.hidden ? " (hidden)" : ""}</option>`).join("");
  if(preferred && abilities.some(a => normaliseAbilityName(a.name) === preferred)){
    abilityEl.value = abilities.find(a => normaliseAbilityName(a.name) === preferred).name;
  }else{
    abilityEl.value = abilities[0].name;
  }
}

async function renderDexCardAbilities(id, pokeid){
  const el = document.getElementById("abilities_" + id);
  if(!el) return;
  el.innerHTML = '<span class="loading">Loading abilities from PokéAPI...</span>';

  const abilities = await getPokemonAbilitiesBySpeciesId(id);
  if(!abilities.length){
    el.innerHTML = '<span class="error">Could not load ability data. Check internet access, then collapse/reopen this section.</span>';
    return;
  }

  const rows = [];
  for(const ability of abilities){
    const meta = await getAbilityMeta(ability.name);
    const effect = meta ? (meta.shortEffect || meta.flavor || meta.effect || "No effect text available.") : "Could not load effect text.";
    rows.push(`<div class="move-section"><div class="move-title">${escapeHtml(displayAbilityName(ability.name))}${ability.hidden ? " (hidden)" : ""}</div><div class="smallText">${escapeHtml(effect)}</div></div>`);
  }
  el.innerHTML = rows.join("");
}

function abilityDefensiveAdjustments(abilityName){
  const key = normaliseAbilityName(abilityName);
  const adjustments = {
    levitate: [{type:"ground", multiplier:0, reason:"Levitate grants Ground immunity"}],
    "volt-absorb": [{type:"electric", multiplier:0, reason:"Volt Absorb grants Electric immunity"}],
    "water-absorb": [{type:"water", multiplier:0, reason:"Water Absorb grants Water immunity"}],
    "flash-fire": [{type:"fire", multiplier:0, reason:"Flash Fire grants Fire immunity"}],
    "thick-fat": [{type:"fire", multiplier:0.5, reason:"Thick Fat halves Fire damage"},{type:"ice", multiplier:0.5, reason:"Thick Fat halves Ice damage"}],
    "wonder-guard": [{type:"__special__", multiplier:null, reason:"Wonder Guard only allows super-effective damaging hits; not fully modelled in this type-summary view"}]
  };
  return adjustments[key] || [];
}

function applyAbilityDefensiveAdjustments(multiplier, mon){
  const notes = [];
  if(!mon || !mon.ability) return notes;
  abilityDefensiveAdjustments(mon.ability).forEach(adj => {
    if(adj.type === "__special__"){
      notes.push(adj.reason);
      return;
    }
    if(Object.prototype.hasOwnProperty.call(multiplier, adj.type)){
      multiplier[adj.type] *= adj.multiplier;
      notes.push(adj.reason);
    }
  });
  return notes;
}

function pokemonSpriteUrlFromPokeId(pokeid, shiny){
  const numericId=parseInt(pokeid,10);
  if(!numericId) return "";
  const shinyPath=shiny ? "shiny/" : "";
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${shinyPath}${numericId}.png`;
}

function monIsShiny(mon){
  return !!mon && (mon.shinyStatus === "shiny" || mon.isShiny === true);
}

function monSpriteUrl(mon){
  if(!mon) return "";
  return pokemonSpriteUrlFromPokeId(mon.pokeid || mon.speciesId, monIsShiny(mon));
}

function updateTeamSlotSprite(slot){
  const box=document.getElementById("teamSlotBox_"+slot);
  if(!box) return;

  const speciesId=getTeamSpeciesId(slot);
  if(!speciesId){
    box.style.removeProperty("--team-sprite");
    return;
  }

  const mon=getSlotMode(slot)==="mon" ? getTeamMon(slot) : null;
  const card=document.querySelector(`.card[data-id="${speciesId}"]`);
  const pokeid=mon ? (mon.pokeid || mon.speciesId) : (card ? card.dataset.pokeid : parseInt(speciesId,10));
  const spriteUrl=pokemonSpriteUrlFromPokeId(pokeid, monIsShiny(mon));

  if(spriteUrl) box.style.setProperty("--team-sprite", `url('${spriteUrl}')`);
  else box.style.removeProperty("--team-sprite");
}

function updateAllTeamSlotSprites(){
  for(let i=0;i<6;i++) updateTeamSlotSprite(i);
}


function teamMoveKey(slot, move){
  return STORAGE_PREFIX + "team_slot_" + slot + "_move_" + move;
}

function teamPokemonChanged(slot){
  const mode=getTeamMode(slot);
  const monSel=document.getElementById("teamMonSelect_"+slot);
  const speciesSel=document.getElementById("teamSpeciesSelect_"+slot);
  localStorage.setItem(teamKey(slot), mode==="species" ? (speciesSel?.value||"") : (monSel?.value||""));
  renderTeamMonMoves(slot);
  analyzeTeam();
}

function normaliseMoveName(name){
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function displayMoveName(apiName){
  return String(apiName || "").split("-").map(w => w ? w.charAt(0).toUpperCase() + w.slice(1) : w).join(" ");
}

function moveCacheKey(){
  return STORAGE_PREFIX + "all_moves_type_cache_v1";
}

function getMoveCache(){
  try{
    return JSON.parse(localStorage.getItem(moveCacheKey()) || "{}");
  }catch(e){
    return {};
  }
}

function setMoveCache(cache){
  localStorage.setItem(moveCacheKey(), JSON.stringify(cache));
}

async function ensureMoveOptionsLoaded(allowNetwork=true){
  const datalist = document.getElementById("moveOptions");
  if(!datalist) return;

  const cache = getMoveCache();
  const names = Object.keys(cache).sort();

  if(names.length){
    datalist.innerHTML = names.map(n => `<option value="${displayMoveName(n)}"></option>`).join("");
    return;
  }

  if(!allowNetwork) return;

  datalist.innerHTML = '<option value="Loading moves..."></option>';

  try{
    const response = await fetch("https://pokeapi.co/api/v2/move?limit=1000");
    if(!response.ok) throw new Error("Move list request failed");
    const data = await response.json();

    const newCache = {};
    data.results.forEach(m => {
      newCache[m.name] = {type:"", display:displayMoveName(m.name)};
    });

    setMoveCache(newCache);
    datalist.innerHTML = Object.keys(newCache).sort().map(n => `<option value="${displayMoveName(n)}"></option>`).join("");
  }catch(e){
    datalist.innerHTML = '<option value="Could not load moves"></option>';
  }
}


const MOVE_META_CACHE_KEY = STORAGE_PREFIX + "move_meta_cache_v1";

function getMoveMetaCache(){
  try{return JSON.parse(localStorage.getItem(MOVE_META_CACHE_KEY) || "{}");}catch(e){return {};}
}

function setMoveMetaCache(cache){
  try{localStorage.setItem(MOVE_META_CACHE_KEY, JSON.stringify(cache));}catch(e){}
}

async function getMoveMeta(moveName){
  const apiName = normaliseMoveName(moveName);
  if(!apiName) return null;

  let cache = getMoveMetaCache();
  if(cache[apiName]) return cache[apiName];

  try{
    const response = await fetch(`https://pokeapi.co/api/v2/move/${apiName}/`);
    if(!response.ok) throw new Error("Move detail request failed");
    const data = await response.json();

    const meta = {
      name: apiName,
      display: displayMoveName(apiName),
      type: data.type && data.type.name ? data.type.name : "",
      power: data.power || 0,
      accuracy: data.accuracy || 100,
      category: data.damage_class && data.damage_class.name ? data.damage_class.name : ""
    };

    cache[apiName] = meta;
    setMoveMetaCache(cache);

    // Also backfill the older move cache so existing dropdown/type behaviour remains intact.
    const oldCache = getMoveCache();
    oldCache[apiName] = {
      type: meta.type,
      display: meta.display,
      power: meta.power,
      accuracy: meta.accuracy,
      category: meta.category
    };
    setMoveCache(oldCache);

    return meta;
  }catch(e){
    return null;
  }
}

function applyMoveMetaToFields(nameEl, typeEl, meta){
  if(!nameEl || !typeEl) return;
  if(!meta){
    nameEl.dataset.power = "";
    nameEl.dataset.accuracy = "";
    nameEl.dataset.category = "";
    return;
  }

  typeEl.value = meta.type || "";
  nameEl.dataset.power = String(meta.power || 0);
  nameEl.dataset.accuracy = String(meta.accuracy || 100);
  nameEl.dataset.category = meta.category || "";
}

async function getMoveTypeByName(moveName){
  const meta = await getMoveMeta(moveName);
  return meta && meta.type ? meta.type : "";
}

async function teamMoveNameChanged(slot, move){
  return teamMoveChanged(slot, move);
}

function saveTeamMove(slot, move){
  const nameEl = document.getElementById(`teamMoveName_${slot}_${move}`);
  const typeEl = document.getElementById(`teamMoveType_${slot}_${move}`);
  localStorage.setItem(teamMoveKey(slot, move), JSON.stringify({
    name: nameEl ? nameEl.value : "",
    type: typeEl ? typeEl.value : ""
  }));
}

function loadTeamState(){
  for(let i=0;i<6;i++){
    const sel = document.getElementById("teamSlot_" + i);
    if(sel) sel.value = localStorage.getItem(teamKey(i)) || "";

    for(let j=0;j<4;j++){
      try{
        const move = JSON.parse(localStorage.getItem(teamMoveKey(i,j)) || "{}");
        const nameEl = document.getElementById(`teamMoveName_${i}_${j}`);
        const typeEl = document.getElementById(`teamMoveType_${i}_${j}`);
        if(nameEl) nameEl.value = move.name || "";
        if(typeEl) typeEl.value = move.type || "";
      }catch(e){}
    }
  }
}


const TYPE_CHART = {
  normal:{weak:["fighting"],resist:[],immune:["ghost"]},
  fire:{weak:["water","ground","rock"],resist:["fire","grass","ice","bug","steel"],immune:[]},
  water:{weak:["electric","grass"],resist:["fire","water","ice","steel"],immune:[]},
  electric:{weak:["ground"],resist:["electric","flying","steel"],immune:[]},
  grass:{weak:["fire","ice","poison","flying","bug"],resist:["water","electric","grass","ground"],immune:[]},
  ice:{weak:["fire","fighting","rock","steel"],resist:["ice"],immune:[]},
  fighting:{weak:["flying","psychic"],resist:["bug","rock","dark"],immune:[]},
  poison:{weak:["ground","psychic"],resist:["grass","fighting","poison","bug"],immune:[]},
  ground:{weak:["water","grass","ice"],resist:["poison","rock"],immune:["electric"]},
  flying:{weak:["electric","ice","rock"],resist:["grass","fighting","bug"],immune:["ground"]},
  psychic:{weak:["bug","ghost","dark"],resist:["fighting","psychic"],immune:[]},
  bug:{weak:["fire","flying","rock"],resist:["grass","fighting","ground"],immune:[]},
  rock:{weak:["water","grass","fighting","ground","steel"],resist:["normal","fire","poison","flying"],immune:[]},
  ghost:{weak:["ghost","dark"],resist:["poison","bug"],immune:["normal","fighting"]},
  dragon:{weak:["ice","dragon"],resist:["fire","water","electric","grass"],immune:[]},
  dark:{weak:["fighting","bug"],resist:["ghost","dark"],immune:["psychic"]},
  steel:{weak:["fire","fighting","ground"],resist:["normal","grass","ice","flying","psychic","bug","rock","ghost","dragon","dark","steel"],immune:["poison"]}
};

const ATTACK_EFFECT = {
  normal:{super:[], notvery:["rock","steel"], none:["ghost"]},
  fire:{super:["grass","ice","bug","steel"], notvery:["fire","water","rock","dragon"], none:[]},
  water:{super:["fire","ground","rock"], notvery:["water","grass","dragon"], none:[]},
  electric:{super:["water","flying"], notvery:["electric","grass","dragon"], none:["ground"]},
  grass:{super:["water","ground","rock"], notvery:["fire","grass","poison","flying","bug","dragon","steel"], none:[]},
  ice:{super:["grass","ground","flying","dragon"], notvery:["fire","water","ice","steel"], none:[]},
  fighting:{super:["normal","ice","rock","dark","steel"], notvery:["poison","flying","psychic","bug"], none:["ghost"]},
  poison:{super:["grass"], notvery:["poison","ground","rock","ghost"], none:["steel"]},
  ground:{super:["fire","electric","poison","rock","steel"], notvery:["grass","bug"], none:["flying"]},
  flying:{super:["grass","fighting","bug"], notvery:["electric","rock","steel"], none:[]},
  psychic:{super:["fighting","poison"], notvery:["psychic","steel"], none:["dark"]},
  bug:{super:["grass","psychic","dark"], notvery:["fire","fighting","poison","flying","ghost","steel"], none:[]},
  rock:{super:["fire","ice","flying","bug"], notvery:["fighting","ground","steel"], none:[]},
  ghost:{super:["psychic","ghost"], notvery:["dark"], none:["normal"]},
  dragon:{super:["dragon"], notvery:["steel"], none:[]},
  dark:{super:["psychic","ghost"], notvery:["fighting","dark","steel"], none:[]},
  steel:{super:["ice","rock"], notvery:["fire","water","electric","steel"], none:[]}
};


const NATURE_MODS={hardy:{},lonely:{attack:1.1,defense:.9},brave:{attack:1.1,speed:.9},adamant:{attack:1.1,"special-attack":.9},naughty:{attack:1.1,"special-defense":.9},bold:{defense:1.1,attack:.9},docile:{},relaxed:{defense:1.1,speed:.9},impish:{defense:1.1,"special-attack":.9},lax:{defense:1.1,"special-defense":.9},timid:{speed:1.1,attack:.9},hasty:{speed:1.1,defense:.9},serious:{},jolly:{speed:1.1,"special-attack":.9},naive:{speed:1.1,"special-defense":.9},modest:{"special-attack":1.1,attack:.9},mild:{"special-attack":1.1,defense:.9},quiet:{"special-attack":1.1,speed:.9},bashful:{},rash:{"special-attack":1.1,"special-defense":.9},calm:{"special-defense":1.1,attack:.9},gentle:{"special-defense":1.1,defense:.9},sassy:{"special-defense":1.1,speed:.9},careful:{"special-defense":1.1,"special-attack":.9},quirky:{}};
const STAT_LABELS={hp:"HP",attack:"Attack",defense:"Defense","special-attack":"Sp. Atk","special-defense":"Sp. Def",speed:"Speed"};
let CURRENT_IV_BASE_STATS=null;
function ivProfileKey(){return STORAGE_PREFIX+"iv_profiles_v1";}
function getPokemonNameById(id){const card=document.querySelector(`.card[data-id="${id}"]`);return card?card.dataset.name:id;}
function getNatureMultiplier(stat){const nature=document.getElementById("ivNature")?.value||"hardy";return (NATURE_MODS[nature]||{})[stat]||1;}
async function loadIvBaseStats(){const id=document.getElementById("ivPokemon")?.value||"";const baseEl=document.getElementById("ivBaseStats");CURRENT_IV_BASE_STATS=null;if(!id){if(baseEl)baseEl.textContent="";calculateIVs();return;}const card=document.querySelector(`.card[data-id="${id}"]`);if(!card)return;if(baseEl)baseEl.textContent="Loading base stats...";try{const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${card.dataset.pokeid}/`);if(!response.ok)throw new Error("stats");const data=await response.json();const stats={};data.stats.forEach(s=>stats[s.stat.name]=s.base_stat);CURRENT_IV_BASE_STATS=stats;if(baseEl)baseEl.innerHTML="<b>Base stats:</b> "+Object.keys(STAT_LABELS).map(k=>`${STAT_LABELS[k]} ${stats[k]}`).join(" | ");calculateIVs();}catch(e){if(baseEl)baseEl.textContent="Could not load base stats. Check internet access, then try again.";}}
function calcStatFromIV(stat,base,iv,ev,level,nature){if(stat==="hp")return Math.floor(((2*base+iv+Math.floor(ev/4))*level)/100)+level+10;const raw=Math.floor(((2*base+iv+Math.floor(ev/4))*level)/100)+5;return Math.floor(raw*nature);}
function possibleIVsForStat(stat,observed,base,ev,level,nature){const possible=[];for(let iv=0;iv<=31;iv++){if(calcStatFromIV(stat,base,iv,ev,level,nature)===observed)possible.push(iv);}return possible;}
function calculateIVs(){const resultEl=document.getElementById("ivResults");if(!resultEl)return;const pokemonId=document.getElementById("ivPokemon")?.value||"";const level=parseInt(document.getElementById("ivLevel")?.value||"0",10);if(!pokemonId){resultEl.innerHTML='<p class="smallText">Select a Pokémon to begin.</p>';return;}if(!CURRENT_IV_BASE_STATS){resultEl.innerHTML='<p class="smallText">Base stats not loaded yet.</p>';return;}if(!level||level<1||level>100){resultEl.innerHTML='<p class="smallText">Enter a level from 1 to 100.</p>';return;}const rows=[];Object.keys(STAT_LABELS).forEach(stat=>{const observed=parseInt(document.getElementById("ivStat_"+stat)?.value||"",10);const ev=Math.max(0,Math.min(255,parseInt(document.getElementById("ivEv_"+stat)?.value||"0",10)||0));const base=CURRENT_IV_BASE_STATS[stat];if(!observed||!base){rows.push(`<div class="ivResultCard"><b>${STAT_LABELS[stat]}</b><div class="smallText">Enter observed stat.</div></div>`);return;}const nature=stat==="hp"?1:getNatureMultiplier(stat);const possible=possibleIVsForStat(stat,observed,base,ev,level,nature);let display,note="";if(possible.length){const min=Math.min(...possible),max=Math.max(...possible);display=min===max?`${min}`:`${min}–${max}`;if(possible.length>1)note="Range is normal at lower levels; level up/Rare Candy gives tighter results.";}else{display="No match";note="Check level/stat/nature/EVs. Unknown EVs may affect the result.";}rows.push(`<div class="ivResultCard"><b>${STAT_LABELS[stat]}</b><div class="ivRange">${display}</div><div class="ivNote">Base ${base} | EV ${ev} | observed ${observed}${nature!==1?" | nature ×"+nature:""}</div>${note?`<div class="ivNote">${note}</div>`:""}</div>`);});resultEl.innerHTML=rows.join("");}
function clearIVCalculator(){Object.keys(STAT_LABELS).forEach(stat=>{const statEl=document.getElementById("ivStat_"+stat);const evEl=document.getElementById("ivEv_"+stat);if(statEl)statEl.value="";if(evEl)evEl.value="0";});calculateIVs();}
function collectIVCalculatorInput(){const pokemonId=document.getElementById("ivPokemon")?.value||"";const nature=document.getElementById("ivNature")?.value||"hardy";const level=parseInt(document.getElementById("ivLevel")?.value||"0",10)||"";const stats={},evs={};Object.keys(STAT_LABELS).forEach(stat=>{stats[stat]=document.getElementById("ivStat_"+stat)?.value||"";evs[stat]=document.getElementById("ivEv_"+stat)?.value||"0";});return{id:Date.now().toString(),pokemonId,pokemonName:getPokemonNameById(pokemonId),nature,level,stats,evs,created:new Date().toISOString()};}
function saveIVProfile(){const profile=collectIVCalculatorInput();if(!profile.pokemonId){alert("Select a Pokémon first.");return;}const profiles=JSON.parse(localStorage.getItem(ivProfileKey())||"[]");profiles.unshift(profile);localStorage.setItem(ivProfileKey(),JSON.stringify(profiles));renderSavedIVProfiles();alert("IV profile saved.");}
function loadIVProfile(profileId){const profiles=JSON.parse(localStorage.getItem(ivProfileKey())||"[]");const p=profiles.find(x=>x.id===profileId);if(!p)return;document.getElementById("ivPokemon").value=p.pokemonId||"";document.getElementById("ivNature").value=p.nature||"hardy";document.getElementById("ivLevel").value=p.level||"";Object.keys(STAT_LABELS).forEach(stat=>{const statEl=document.getElementById("ivStat_"+stat);const evEl=document.getElementById("ivEv_"+stat);if(statEl)statEl.value=p.stats?.[stat]||"";if(evEl)evEl.value=p.evs?.[stat]||"0";});loadIvBaseStats();}
function deleteIVProfile(profileId){const profiles=JSON.parse(localStorage.getItem(ivProfileKey())||"[]").filter(p=>p.id!==profileId);localStorage.setItem(ivProfileKey(),JSON.stringify(profiles));renderSavedIVProfiles();}
function renderSavedIVProfiles(){const el=document.getElementById("ivSavedProfiles");if(!el)return;const profiles=JSON.parse(localStorage.getItem(ivProfileKey())||"[]");if(!profiles.length){el.innerHTML='<p class="smallText">No saved IV profiles yet.</p>';return;}el.innerHTML=profiles.map(p=>`<div class="plannerItem"><b>${p.pokemonName||p.pokemonId}</b><br><span class="smallText">Lv ${p.level||"?"} | ${p.nature||"unknown"} | saved ${new Date(p.created).toLocaleString()}</span><br><button class="miniButton" onclick="loadIVProfile('${p.id}')">Load</button> <button class="miniButton" onclick="deleteIVProfile('${p.id}')">Delete</button></div>`).join("");}


const EVO_MAP = {"001": "002", "002": "003", "004": "005", "005": "006", "007": "008", "008": "009", "010": "011", "011": "012", "013": "014", "014": "015", "016": "017", "017": "018", "019": "020", "021": "022", "023": "024", "025": "026", "027": "028", "029": "030", "030": "031", "032": "033", "033": "034", "035": "036", "037": "038", "039": "040", "041": "042", "042": "169", "043": "044", "044": "045", "046": "047", "048": "049", "050": "051", "052": "053", "054": "055", "056": "057", "058": "059", "060": "061", "061": "062", "063": "064", "064": "065", "066": "067", "067": "068", "069": "070", "070": "071", "072": "073", "074": "075", "075": "076", "077": "078", "079": "080", "081": "082", "084": "085", "086": "087", "088": "089", "090": "091", "092": "093", "093": "094", "096": "097", "098": "099", "100": "101", "102": "103", "104": "105", "109": "110", "111": "112", "113": "242", "116": "117", "117": "230", "118": "119", "120": "121", "123": "212", "125": "239", "126": "240", "129": "130", "133": "134", "137": "233", "138": "139", "140": "141", "147": "148", "148": "149", "152": "153", "153": "154", "155": "156", "156": "157", "158": "159", "159": "160", "161": "162", "163": "164", "165": "166", "167": "168", "170": "171", "172": "025", "173": "035", "174": "039", "175": "176", "177": "178", "179": "180", "180": "181", "183": "184", "187": "188", "188": "189", "191": "192", "194": "195", "204": "205", "209": "210", "216": "217", "218": "219", "220": "221", "223": "224", "228": "229", "231": "232", "236": "106", "246": "247", "247": "248"};
function myMonsKey(){return STORAGE_PREFIX+"my_mons_v1";}
function getMyMons(){try{return JSON.parse(localStorage.getItem(myMonsKey())||"[]");}catch(e){return[];}}
function setMyMons(mons){localStorage.setItem(myMonsKey(),JSON.stringify(mons));updateDexOwnershipFromMons();populateTeamBuilderSelectors();renderMyMons();updateAllTeamSlotSprites();analyzeTeam();}
function makeUid(){return"mon_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,8);}
function getSpeciesName(id){const c=document.querySelector(`.card[data-id="${id}"]`);return c?c.dataset.name:id;}
function getSpeciesPokeId(id){const c=document.querySelector(`.card[data-id="${id}"]`);return c?c.dataset.pokeid:"";}
function updateDexOwnershipFromMons(){const counts={};getMyMons().forEach(m=>{if(m.speciesId)counts[m.speciesId]=(counts[m.speciesId]||0)+1;});document.querySelectorAll(".card").forEach(card=>{const id=card.dataset.id,qty=counts[id]||0;const q=document.getElementById("qty_"+id),l=document.getElementById("living_"+id);if(q)q.value=qty;if(l)l.checked=qty>0;localStorage.setItem(key(id,"qty"),String(qty));localStorage.setItem(key(id,"living"),qty>0?"true":"false");});updateStats();if(typeof renderProgress==="function")renderProgress();}


function getAllSpeciesOptionData(){
  return Array.from(document.querySelectorAll(".card[data-id]")).map(card => {
    const id = card.dataset.id || "";
    const name = card.dataset.name || "";
    const display = "#" + id + " " + name;
    return {
      id,
      name,
      display,
      search: (id + " " + name + " " + display).toLowerCase()
    };
  }).sort((a,b) => Number(a.id) - Number(b.id));
}

function updateSpeciesDatalistForInput(inputOrId, datalistId){
  const input = typeof inputOrId === "string" ? document.getElementById(inputOrId) : inputOrId;
  const datalist = document.getElementById(datalistId);
  if(!datalist) return;

  const query = String(input && input.value ? input.value : "").trim().toLowerCase().replace(/^#/, "");
  const queryDigits = query.replace(/\D/g, "");
  const species = getAllSpeciesOptionData();
  const matches = !query ? species : species.filter(item => {
    const idNoPad = String(Number(item.id));
    return item.name.toLowerCase().includes(query) ||
      item.display.toLowerCase().includes(query) ||
      item.id.includes(queryDigits || query) ||
      idNoPad.includes(queryDigits || query);
  });

  datalist.innerHTML = matches.map(item => `<option value="${escapeHtml(item.display)}"></option>`).join("");
}

function speciesFilterMatches(id, name, rawSearch){
  const search = String(rawSearch || "").trim().toLowerCase();
  if(!search) return true;

  const cleanSearch = search.replace(/^#/, "");
  const speciesName = String(name || "").toLowerCase();
  const speciesId = String(id || "").padStart(3, "0");
  const speciesIdNoPad = String(Number(speciesId));
  const display = ("#" + speciesId + " " + speciesName).toLowerCase();
  const selectedId = monSpeciesIdFromInput(search);

  if(selectedId) return selectedId === speciesId;

  return speciesName.includes(cleanSearch) ||
    display.includes(search) ||
    speciesId.includes(cleanSearch) ||
    speciesIdNoPad.includes(cleanSearch);
}

function monSpeciesDisplayFromId(id){
  if(!id) return "";
  return "#" + id + " " + getSpeciesName(id);
}

function monSpeciesIdFromInput(value){
  const text = String(value || "").trim().toLowerCase();
  if(!text) return "";
  const hash = text.match(/#?(\d{1,3})/);
  if(hash){
    const id = hash[1].padStart(3, "0");
    if(document.querySelector(`.card[data-id="${id}"]`)) return id;
  }
  const card = Array.from(document.querySelectorAll(".card")).find(c =>
    (c.dataset.name || "").toLowerCase() === text ||
    ("#" + c.dataset.id + " " + c.dataset.name).toLowerCase() === text
  );
  return card ? card.dataset.id : "";
}

function monSpeciesInputChanged(){
  updateSpeciesDatalistForInput('monSpecies','monSpeciesOptions');
  populateMonAbilityDropdown();
}


let ACTIVE_MON_FORM_RETURN_UID = "";

function safeMonCardDomId(uid){
  return "myMonCard_" + String(uid || "").replace(/[^a-zA-Z0-9_-]/g,"_");
}

function setMyMonFormActive(isActive){
  document.body.classList.toggle("myMonFormActive", !!isActive);
  const filterPanel = document.getElementById("myMonsFilterPanel");
  if(filterPanel && isActive) filterPanel.open = false;
}

function scrollToElementWhenReady(el, block){
  if(!el) return;
  setTimeout(function(){
    try{el.scrollIntoView({behavior:"smooth", block:block || "start"});}
    catch(e){el.scrollIntoView(true);}
  }, 60);
}

function showMonFormPanel(returnUid){
  const p = document.getElementById("monFormPanel");
  ACTIVE_MON_FORM_RETURN_UID = returnUid || "";
  setMyMonFormActive(true);
  if(p){
    p.classList.remove("hidden");
    p.classList.add("formActiveFocus");
    p.style.display = "block";
    scrollToElementWhenReady(p, "start");
    setTimeout(function(){p.classList.remove("formActiveFocus");}, 1200);
  }
}

function hideMonFormPanel(){
  const p = document.getElementById("monFormPanel");
  if(p){
    p.classList.add("hidden");
    p.classList.remove("formActiveFocus");
    p.style.display = "none";
  }
  setMyMonFormActive(false);
}

function scrollToMyMonCard(uid){
  if(!uid) return;
  scrollToElementWhenReady(document.getElementById(safeMonCardDomId(uid)), "center");
}

function startAddMon(speciesId){
  const p=document.getElementById("monFormPanel");
  showMonFormPanel("");
  document.getElementById("monFormTitle").textContent="Add Mon";
  document.getElementById("monUid").value="";
  document.getElementById("monSpecies").value=monSpeciesDisplayFromId(speciesId||"");
  document.getElementById("monNickname").value="";
  document.getElementById("monNature").value="hardy";
  document.getElementById("monLevel").value="5";
  const shinyStatusEl=document.getElementById("monShinyStatus");
  if(shinyStatusEl) shinyStatusEl.value="normal";
  const abilityEl=document.getElementById("monAbility");
  if(abilityEl) abilityEl.innerHTML='<option value="">Select species first</option>';
  populateMonAbilityDropdown();
  Object.keys(STAT_LABELS).forEach(s=>{
    document.getElementById("monStat_"+s).value="";
    document.getElementById("monEv_"+s).value="0";
  });
  for(let i=0;i<4;i++){
    document.getElementById("monMoveName_"+i).value="";
    document.getElementById("monMoveType_"+i).value="";
  }
  ensureMoveOptionsLoaded(false);
  showTab("myMonsTab");
  scrollToElementWhenReady(p, "start");
}
function addMonFromDex(id){startAddMon(id);}
function cancelMonEdit(){hideMonFormPanel(); if(ACTIVE_MON_FORM_RETURN_UID) scrollToMyMonCard(ACTIVE_MON_FORM_RETURN_UID);}
async function myMonMoveChanged(i){
  const nameEl = document.getElementById("monMoveName_" + i);
  const typeEl = document.getElementById("monMoveType_" + i);
  const moveName = nameEl ? nameEl.value.trim() : "";

  if(!typeEl) return;

  if(!moveName){
    typeEl.value = "";
    if(nameEl) applyMoveMetaToFields(nameEl, typeEl, null);
    return;
  }

  typeEl.value = "loading...";
  const meta = await getMoveMeta(moveName);
  if(meta){
    applyMoveMetaToFields(nameEl, typeEl, meta);
  } else {
    typeEl.value = "";
    applyMoveMetaToFields(nameEl, typeEl, null);
  }
}

function collectMonForm(){
  const uid=document.getElementById("monUid").value||makeUid();
  const speciesId=monSpeciesIdFromInput(document.getElementById("monSpecies").value);
  const stats={},evs={},moves=[];
  const shinyStatusEl=document.getElementById("monShinyStatus");
  const shinyStatus=shinyStatusEl ? shinyStatusEl.value : "normal";
  const abilityEl=document.getElementById("monAbility");
  const abilityName=abilityEl ? abilityEl.value : "";
  const abilityDisplay=abilityEl && abilityEl.selectedOptions && abilityEl.selectedOptions[0] ? abilityEl.selectedOptions[0].textContent.replace(/ \(hidden\)$/i, "") : "";
  Object.keys(STAT_LABELS).forEach(s=>{
    stats[s]=document.getElementById("monStat_"+s).value||"";
    evs[s]=document.getElementById("monEv_"+s).value||"0";
  });
  for(let i=0;i<4;i++)moves.push({
    name:document.getElementById("monMoveName_"+i).value||"",
    type:document.getElementById("monMoveType_"+i).value||""
  });
  return{
    uid,
    speciesId,
    speciesName:getSpeciesName(speciesId),
    pokeid:getSpeciesPokeId(speciesId),
    nickname:document.getElementById("monNickname").value||"",
    nature:document.getElementById("monNature").value||"hardy",
    level:document.getElementById("monLevel").value||"",
    shinyStatus:shinyStatus === "shiny" ? "shiny" : "normal",
    ability: abilityName || "",
    abilityDisplay: abilityDisplay || displayAbilityName(abilityName),
    stats,
    evs,
    moves,
    updated:new Date().toISOString()
  };
}

async function ensureMonMoveTypesBeforeSave(){
  for(let i=0;i<4;i++){
    const nameEl = document.getElementById("monMoveName_" + i);
    const typeEl = document.getElementById("monMoveType_" + i);
    const moveName = nameEl ? nameEl.value.trim() : "";
    if(!typeEl) continue;

    if(!moveName){
      typeEl.value = "";
      if(nameEl) applyMoveMetaToFields(nameEl, typeEl, null);
      continue;
    }

    const meta = await getMoveMeta(moveName);
    if(meta){
      applyMoveMetaToFields(nameEl, typeEl, meta);
    } else if(!typeEl.value || typeEl.value === "loading..."){
      typeEl.value = "";
    }
  }
}

async function saveMonProfile(){
  await ensureMonMoveTypesBeforeSave();
  await populateMonAbilityDropdown();
  const mon=collectMonForm();
  if(!mon.speciesId){alert("Select a Pokémon species first.");return;}
  const mons=getMyMons();
  const idx=mons.findIndex(m=>m.uid===mon.uid);
  if(idx>=0) mons[idx]=mon; else mons.unshift(mon);
  localStorage.setItem(myMonsKey(), JSON.stringify(mons));
  updateDexOwnershipFromMons();
  populateTeamBuilderSelectors();
  renderMyMons();
  updateAllTeamSlotSprites();
  analyzeTeam();
  hideMonFormPanel();
  scrollToMyMonCard(mon.uid);
}

function editMon(uid){
  const m=getMyMons().find(x=>x.uid===uid);
  if(!m)return;
  showMonFormPanel(uid);
  document.getElementById("monFormTitle").textContent="Edit Mon";
  document.getElementById("monUid").value=m.uid;
  document.getElementById("monSpecies").value=monSpeciesDisplayFromId(m.speciesId||"");
  document.getElementById("monNickname").value=m.nickname||"";
  document.getElementById("monNature").value=m.nature||"hardy";
  document.getElementById("monLevel").value=m.level||"";
  const shinyStatusEl=document.getElementById("monShinyStatus");
  if(shinyStatusEl) shinyStatusEl.value=(m.shinyStatus === "shiny" || m.isShiny === true) ? "shiny" : "normal";
  populateMonAbilityDropdown(m.ability || "");
  Object.keys(STAT_LABELS).forEach(s=>{
    document.getElementById("monStat_"+s).value=m.stats?.[s]||"";
    document.getElementById("monEv_"+s).value=m.evs?.[s]||"0";
  });
  for(let i=0;i<4;i++){
    document.getElementById("monMoveName_"+i).value=m.moves?.[i]?.name||"";
    document.getElementById("monMoveType_"+i).value=m.moves?.[i]?.type||"";
  }
  showTab("myMonsTab");
  scrollToElementWhenReady(document.getElementById("monFormPanel"), "start");
}
function deleteMon(uid){
  const mon=getMyMons().find(m=>m.uid===uid);
  if(!mon) return;
  const label=`${mon.nickname?mon.nickname+" — ":""}#${mon.speciesId} ${mon.speciesName||getSpeciesName(mon.speciesId)}`;
  if(!confirm(`Confirm delete ${label}?`))return;
  for(let i=0;i<6;i++)if(localStorage.getItem(teamKey(i))===uid)localStorage.setItem(teamKey(i),"");
  setMyMons(getMyMons().filter(m=>m.uid!==uid));
}
function evolveMon(uid){
  const mons=getMyMons();
  const m=mons.find(x=>x.uid===uid);
  if(!m)return;
  const next=EVO_MAP[m.speciesId];
  if(!next){alert("No direct evolution configured for this Pokémon.");return;}
  const currentLabel=`${m.nickname?m.nickname+" — ":""}#${m.speciesId} ${m.speciesName||getSpeciesName(m.speciesId)}`;
  const nextLabel=`#${next} ${getSpeciesName(next)}`;
  if(!confirm(`Confirm, evolve ${currentLabel} into ${nextLabel}?`))return;
  m.speciesId=next;
  m.speciesName=getSpeciesName(next);
  m.pokeid=getSpeciesPokeId(next);
  m.ability="";
  m.abilityDisplay="";
  m.updated=new Date().toISOString();
  setMyMons(mons);
}

let MY_MONS_SORT = JSON.parse(localStorage.getItem(STORAGE_PREFIX + "my_mons_sort_v1") || '{"field":"dex","dir":"asc"}');

function setMyMonsSort(field){
  if(MY_MONS_SORT.field === field){
    MY_MONS_SORT.dir = MY_MONS_SORT.dir === "asc" ? "desc" : "asc";
  } else {
    MY_MONS_SORT.field = field;
    MY_MONS_SORT.dir = "asc";
  }
  localStorage.setItem(STORAGE_PREFIX + "my_mons_sort_v1", JSON.stringify(MY_MONS_SORT));
  renderMyMons();
}

function sortMyMonsList(mons){
  const dir = MY_MONS_SORT.dir === "desc" ? -1 : 1;
  const sorted = mons.slice();
  sorted.sort((a,b) => {
    let av, bv;
    if(MY_MONS_SORT.field === "alpha"){
      av = (a.nickname || a.speciesName || getSpeciesName(a.speciesId) || "").toLowerCase();
      bv = (b.nickname || b.speciesName || getSpeciesName(b.speciesId) || "").toLowerCase();
      return av.localeCompare(bv) * dir;
    }
    if(MY_MONS_SORT.field === "level"){
      av = parseInt(a.level || "0", 10) || 0;
      bv = parseInt(b.level || "0", 10) || 0;
      return ((av - bv) || ((parseInt(a.speciesId,10)||0) - (parseInt(b.speciesId,10)||0))) * dir;
    }
    av = parseInt(a.speciesId || "0", 10) || 0;
    bv = parseInt(b.speciesId || "0", 10) || 0;
    return ((av - bv) || (a.nickname || "").localeCompare(b.nickname || "")) * dir;
  });
  return sorted;
}


function populateMyMonsFilterDropdowns(){
  const types = ["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel"];

  const typeSelect = document.getElementById("myMonsTypeFilter");
  if(typeSelect && !typeSelect.dataset.built){
    typeSelect.innerHTML = '<option value="">Any type</option>' + types.map(t => `<option value="${t}">${t.charAt(0).toUpperCase()+t.slice(1)}</option>`).join("");
    typeSelect.dataset.built = "true";
  }

  const typeSelect2 = document.getElementById("myMonsTypeFilter2");
  if(typeSelect2 && !typeSelect2.dataset.built){
    typeSelect2.innerHTML = '<option value="">Second type optional</option>' + types.map(t => `<option value="${t}">${t.charAt(0).toUpperCase()+t.slice(1)}</option>`).join("");
    typeSelect2.dataset.built = "true";
  }

  const natureSelect = document.getElementById("myMonsNatureFilter");
  if(natureSelect && !natureSelect.dataset.built){
    const natures = ["adamant","bashful","bold","brave","calm","careful","docile","gentle","hardy","hasty","impish","jolly","lax","lonely","mild","modest","naive","naughty","quiet","quirky","rash","relaxed","sassy","serious","timid"];
    natureSelect.innerHTML = '<option value="">Any nature</option>' + natures.map(n => `<option value="${n}">${n.charAt(0).toUpperCase()+n.slice(1)}</option>`).join("");
    natureSelect.dataset.built = "true";
  }
}

function clearMyMonsFilters(){
  const search = document.getElementById("myMonsSearch");
  const type = document.getElementById("myMonsTypeFilter");
  const type2 = document.getElementById("myMonsTypeFilter2");
  const nature = document.getElementById("myMonsNatureFilter");
  const ability = document.getElementById("myMonsAbilityFilter");
  const oldMove = document.getElementById("myMonsMoveFilter");

  if(search) search.value = "";
  if(type) type.value = "";
  if(type2) type2.value = "";
  if(nature) nature.value = "";
  if(ability) ability.value = "";
  if(oldMove) oldMove.value = "";

  for(let i=0;i<4;i++){
    const move = document.getElementById("myMonsMoveFilter_" + i);
    if(move) move.value = "";
  }

  renderMyMons();
}

function getSpeciesTypesForMon(mon){
  const card = document.querySelector(`.card[data-id="${mon.speciesId}"]`);
  return card && card.dataset.types ? card.dataset.types.split(",").filter(Boolean) : [];
}


function getMyMonsMoveFilterValues(){
  const values = [];
  for(let i=0;i<4;i++){
    const el = document.getElementById("myMonsMoveFilter_" + i);
    const value = el ? el.value.trim() : "";
    const normalised = normaliseMoveName(value);
    if(normalised && !values.includes(normalised)) values.push(normalised);
  }

  // Backwards compatibility with the earlier single field.
  const oldEl = document.getElementById("myMonsMoveFilter");
  if(oldEl && oldEl.value.trim()){
    const normalised = normaliseMoveName(oldEl.value.trim());
    if(normalised && !values.includes(normalised)) values.push(normalised);
  }

  return values.slice(0,4);
}


function monMatchesMyMonsFilters(mon){
  const search = (document.getElementById("myMonsSearch")?.value || "").trim().toLowerCase();
  const type = document.getElementById("myMonsTypeFilter")?.value || "";
  const type2 = document.getElementById("myMonsTypeFilter2")?.value || "";
  const nature = document.getElementById("myMonsNatureFilter")?.value || "";
  const abilityFilter = normaliseAbilityName(document.getElementById("myMonsAbilityFilter")?.value || "");
  const selectedMoves = getMyMonsMoveFilterValues();

  const speciesName = (mon.speciesName || getSpeciesName(mon.speciesId) || "");

  if(search && !speciesFilterMatches(mon.speciesId || "", speciesName, search)) return false;
  if(nature && (mon.nature || "").toLowerCase() !== nature) return false;
  if(abilityFilter){
    const monAbility = normaliseAbilityName(mon.ability || "");
    const monAbilityDisplay = displayAbilityName(mon.ability || "").toLowerCase();
    const rawAbilityFilter = (document.getElementById("myMonsAbilityFilter")?.value || "").trim().toLowerCase();
    if(!(monAbility === abilityFilter || monAbility.includes(abilityFilter) || monAbilityDisplay.includes(rawAbilityFilter))) return false;
  }

  const types = getSpeciesTypesForMon(mon);

  if(type && !types.includes(type)) return false;
  if(type2 && !types.includes(type2)) return false;

  if(selectedMoves.length){
    const monMoves = (mon.moves || [])
      .map(m => normaliseMoveName(m.name || ""))
      .filter(Boolean);

    const hasAllMoves = selectedMoves.every(move => monMoves.includes(move));
    if(!hasAllMoves) return false;
  }

  return true;
}


function updateActiveMyMonsFilters(){
  const el = document.getElementById("activeMyMonsFilters");
  if(!el) return;

  const parts = [];
  const search = (document.getElementById("myMonsSearch")?.value || "").trim();
  const type = document.getElementById("myMonsTypeFilter")?.value || "";
  const type2 = document.getElementById("myMonsTypeFilter2")?.value || "";
  const nature = document.getElementById("myMonsNatureFilter")?.value || "";
  const ability = (document.getElementById("myMonsAbilityFilter")?.value || "").trim();
  const moves = typeof getMyMonsMoveFilterValues === "function" ? getMyMonsMoveFilterValues() : [];

  if(search) parts.push("Species: " + search);
  if(type) parts.push("Type 1: " + type);
  if(type2) parts.push("Type 2: " + type2);
  if(nature) parts.push("Nature: " + nature);
  if(ability) parts.push("Ability: " + ability);
  if(moves.length){
    const moveDisplays = [];
    for(let i=0;i<4;i++){
      const moveEl = document.getElementById("myMonsMoveFilter_" + i);
      if(moveEl && moveEl.value.trim()) moveDisplays.push(moveEl.value.trim());
    }
    parts.push("Moves: " + moveDisplays.join(" + "));
  }

  el.textContent = parts.length ? parts.join(" | ") : "None";
}


const EVOLUTION_REQUIREMENTS = {
  "001": "Evolves to Ivysaur at Lv16.",
  "002": "Evolves to Venusaur at Lv32.",
  "003": "Final evolution.",
  "004": "Evolves to Charmeleon at Lv16.",
  "005": "Evolves to Charizard at Lv36.",
  "006": "Final evolution.",
  "007": "Evolves to Wartortle at Lv16.",
  "008": "Evolves to Blastoise at Lv36.",
  "009": "Final evolution.",
  "010": "Evolves to Metapod at Lv7.",
  "011": "Evolves to Butterfree at Lv10.",
  "012": "Final evolution.",
  "013": "Evolves to Kakuna at Lv7.",
  "014": "Evolves to Beedrill at Lv10.",
  "015": "Final evolution.",
  "016": "Evolves to Pidgeotto at Lv18.",
  "017": "Evolves to Pidgeot at Lv36.",
  "018": "Final evolution.",
  "019": "Evolves to Raticate at Lv20.",
  "020": "Final evolution.",
  "021": "Evolves to Fearow at Lv20.",
  "022": "Final evolution.",
  "023": "Evolves to Arbok at Lv22.",
  "024": "Final evolution.",
  "025": "Evolves to Raichu with Thunder Stone.",
  "026": "Final evolution.",
  "027": "Evolves to Sandslash at Lv22.",
  "028": "Final evolution.",
  "029": "Evolves to Nidorina at Lv16.",
  "030": "Evolves to Nidoqueen with Moon Stone.",
  "031": "Final evolution.",
  "032": "Evolves to Nidorino at Lv16.",
  "033": "Evolves to Nidoking with Moon Stone.",
  "034": "Final evolution.",
  "035": "Evolves to Clefable with Moon Stone.",
  "036": "Final evolution.",
  "037": "Evolves to Ninetales with Fire Stone.",
  "038": "Final evolution.",
  "039": "Evolves to Wigglytuff with Moon Stone.",
  "040": "Final evolution.",
  "041": "Evolves to Golbat at Lv22.",
  "042": "Evolves to Crobat by high friendship after National Dex.",
  "043": "Evolves to Gloom at Lv21.",
  "044": "Evolves to Vileplume with Leaf Stone, or Bellossom with Sun Stone after National Dex.",
  "045": "Final evolution.",
  "046": "Evolves to Parasect at Lv24.",
  "047": "Final evolution.",
  "048": "Evolves to Venomoth at Lv31.",
  "049": "Final evolution.",
  "050": "Evolves to Dugtrio at Lv26.",
  "051": "Final evolution.",
  "052": "Evolves to Persian at Lv28.",
  "053": "Final evolution.",
  "054": "Evolves to Golduck at Lv33.",
  "055": "Final evolution.",
  "056": "Evolves to Primeape at Lv28.",
  "057": "Final evolution.",
  "058": "Evolves to Arcanine with Fire Stone.",
  "059": "Final evolution.",
  "060": "Evolves to Poliwhirl at Lv25.",
  "061": "Evolves to Poliwrath with Water Stone, or Politoed by King's Rock trade after National Dex.",
  "062": "Final evolution.",
  "063": "Evolves to Kadabra at Lv16.",
  "064": "Evolves to Alakazam by trade.",
  "065": "Final evolution.",
  "066": "Evolves to Machoke at Lv28.",
  "067": "Evolves to Machamp by trade.",
  "068": "Final evolution.",
  "069": "Evolves to Weepinbell at Lv21.",
  "070": "Evolves to Victreebel with Leaf Stone.",
  "071": "Final evolution.",
  "072": "Evolves to Tentacruel at Lv30.",
  "073": "Final evolution.",
  "074": "Evolves to Graveler at Lv25.",
  "075": "Evolves to Golem by trade.",
  "076": "Final evolution.",
  "077": "Evolves to Rapidash at Lv40.",
  "078": "Final evolution.",
  "079": "Evolves to Slowbro at Lv37, or Slowking by King's Rock trade after National Dex.",
  "080": "Final evolution.",
  "081": "Evolves to Magneton at Lv30.",
  "082": "Final evolution in FireRed/LeafGreen.",
  "083": "Does not evolve in FireRed/LeafGreen.",
  "084": "Evolves to Dodrio at Lv31.",
  "085": "Final evolution.",
  "086": "Evolves to Dewgong at Lv34.",
  "087": "Final evolution.",
  "088": "Evolves to Muk at Lv38.",
  "089": "Final evolution.",
  "090": "Evolves to Cloyster with Water Stone.",
  "091": "Final evolution.",
  "092": "Evolves to Haunter at Lv25.",
  "093": "Evolves to Gengar by trade.",
  "094": "Final evolution.",
  "095": "Does not evolve in FireRed/LeafGreen.",
  "096": "Evolves to Hypno at Lv26.",
  "097": "Final evolution.",
  "098": "Evolves to Kingler at Lv28.",
  "099": "Final evolution.",
  "100": "Evolves to Electrode at Lv30.",
  "101": "Final evolution.",
  "102": "Evolves to Exeggutor with Leaf Stone.",
  "103": "Final evolution.",
  "104": "Evolves to Marowak at Lv28.",
  "105": "Final evolution.",
  "106": "Final evolution.",
  "107": "Final evolution.",
  "108": "Does not evolve in FireRed/LeafGreen.",
  "109": "Evolves to Weezing at Lv35.",
  "110": "Final evolution.",
  "111": "Evolves to Rhydon at Lv42.",
  "112": "Final evolution in FireRed/LeafGreen.",
  "113": "Evolves to Blissey by high friendship after National Dex.",
  "114": "Does not evolve in FireRed/LeafGreen.",
  "115": "Does not evolve in FireRed/LeafGreen.",
  "116": "Evolves to Seadra at Lv32.",
  "117": "Evolves to Kingdra by Dragon Scale trade after National Dex.",
  "118": "Evolves to Seaking at Lv33.",
  "119": "Final evolution.",
  "120": "Evolves to Starmie with Water Stone.",
  "121": "Final evolution.",
  "122": "Does not evolve in FireRed/LeafGreen.",
  "123": "Evolves to Scizor by Metal Coat trade after National Dex.",
  "124": "Does not evolve in FireRed/LeafGreen.",
  "125": "Does not evolve in FireRed/LeafGreen.",
  "126": "Does not evolve in FireRed/LeafGreen.",
  "127": "Does not evolve in FireRed/LeafGreen.",
  "128": "Does not evolve in FireRed/LeafGreen.",
  "129": "Evolves to Gyarados at Lv20.",
  "130": "Final evolution.",
  "131": "Does not evolve in FireRed/LeafGreen.",
  "132": "Does not evolve in FireRed/LeafGreen.",
  "133": "Evolves with Water Stone, Thunder Stone, Fire Stone, high friendship day/night in later compatible games.",
  "134": "Final evolution.",
  "135": "Final evolution.",
  "136": "Final evolution.",
  "137": "Evolves to Porygon2 by Up-Grade trade after National Dex.",
  "138": "Evolves to Omastar at Lv40.",
  "139": "Final evolution.",
  "140": "Evolves to Kabutops at Lv40.",
  "141": "Final evolution.",
  "142": "Does not evolve in FireRed/LeafGreen.",
  "143": "Does not evolve in FireRed/LeafGreen.",
  "144": "Legendary Pokémon; does not evolve.",
  "145": "Legendary Pokémon; does not evolve.",
  "146": "Legendary Pokémon; does not evolve.",
  "147": "Evolves to Dragonair at Lv30.",
  "148": "Evolves to Dragonite at Lv55.",
  "149": "Final evolution.",
  "150": "Legendary Pokémon; does not evolve.",
  "151": "Mythical Pokémon; does not evolve.",
  "152": "Evolves to Bayleef at Lv16.",
  "153": "Evolves to Meganium at Lv32.",
  "154": "Final evolution.",
  "155": "Evolves to Quilava at Lv14.",
  "156": "Evolves to Typhlosion at Lv36.",
  "157": "Final evolution.",
  "158": "Evolves to Croconaw at Lv18.",
  "159": "Evolves to Feraligatr at Lv30.",
  "160": "Final evolution.",
  "161": "Evolves to Furret at Lv15.",
  "162": "Final evolution.",
  "163": "Evolves to Noctowl at Lv20.",
  "164": "Final evolution.",
  "165": "Evolves to Ledian at Lv18.",
  "166": "Final evolution.",
  "167": "Evolves to Ariados at Lv22.",
  "168": "Final evolution.",
  "169": "Final evolution.",
  "170": "Evolves to Lanturn at Lv27.",
  "171": "Final evolution.",
  "172": "Evolves to Pikachu by high friendship.",
  "173": "Evolves to Clefairy by high friendship.",
  "174": "Evolves to Jigglypuff by high friendship.",
  "175": "Evolves to Togetic by high friendship.",
  "176": "Final evolution in FireRed/LeafGreen.",
  "177": "Evolves to Xatu at Lv25.",
  "178": "Final evolution.",
  "179": "Evolves to Flaaffy at Lv15.",
  "180": "Evolves to Ampharos at Lv30.",
  "181": "Final evolution.",
  "182": "Final evolution.",
  "183": "Evolves to Azumarill at Lv18.",
  "184": "Final evolution.",
  "185": "Does not evolve in FireRed/LeafGreen.",
  "186": "Final evolution.",
  "187": "Evolves to Skiploom at Lv18.",
  "188": "Evolves to Jumpluff at Lv27.",
  "189": "Final evolution.",
  "190": "Does not evolve in FireRed/LeafGreen.",
  "191": "Evolves to Sunflora with Sun Stone.",
  "192": "Final evolution.",
  "193": "Does not evolve in FireRed/LeafGreen.",
  "194": "Evolves to Quagsire at Lv20.",
  "195": "Final evolution.",
  "196": "Final evolution.",
  "197": "Final evolution.",
  "198": "Does not evolve in FireRed/LeafGreen.",
  "199": "Final evolution.",
  "200": "Evolves to Misdreavus in later generations only; no evolution in FireRed/LeafGreen.",
  "201": "Does not evolve in FireRed/LeafGreen.",
  "202": "Does not evolve in FireRed/LeafGreen.",
  "203": "Does not evolve in FireRed/LeafGreen.",
  "204": "Evolves to Forretress at Lv31.",
  "205": "Final evolution.",
  "206": "Does not evolve in FireRed/LeafGreen.",
  "207": "Evolves to Gliscor in later generations only; no evolution in FireRed/LeafGreen.",
  "208": "Final evolution.",
  "209": "Evolves to Granbull at Lv23.",
  "210": "Final evolution.",
  "211": "Does not evolve in FireRed/LeafGreen.",
  "212": "Final evolution.",
  "213": "Does not evolve in FireRed/LeafGreen.",
  "214": "Does not evolve in FireRed/LeafGreen.",
  "215": "Evolves to Weavile in later generations only; no evolution in FireRed/LeafGreen.",
  "216": "Evolves to Ursaring at Lv30.",
  "217": "Final evolution.",
  "218": "Evolves to Magcargo at Lv38.",
  "219": "Final evolution.",
  "220": "Evolves to Piloswine at Lv33.",
  "221": "Final evolution in FireRed/LeafGreen.",
  "222": "Does not evolve in FireRed/LeafGreen.",
  "223": "Evolves to Octillery at Lv25.",
  "224": "Final evolution.",
  "225": "Does not evolve in FireRed/LeafGreen.",
  "226": "Does not evolve in FireRed/LeafGreen.",
  "227": "Does not evolve in FireRed/LeafGreen.",
  "228": "Evolves to Houndoom at Lv24.",
  "229": "Final evolution.",
  "230": "Final evolution.",
  "231": "Evolves to Donphan at Lv25.",
  "232": "Final evolution.",
  "233": "Final evolution.",
  "234": "Does not evolve in FireRed/LeafGreen.",
  "235": "Does not evolve in FireRed/LeafGreen.",
  "236": "Evolves to Hitmonlee, Hitmonchan, or Hitmontop at Lv20 depending on stats.",
  "237": "Final evolution.",
  "238": "Evolves to Jynx at Lv30.",
  "239": "Evolves to Electabuzz at Lv30.",
  "240": "Evolves to Magmar at Lv30.",
  "241": "Does not evolve in FireRed/LeafGreen.",
  "242": "Final evolution.",
  "243": "Legendary Pokémon; does not evolve.",
  "244": "Legendary Pokémon; does not evolve.",
  "245": "Legendary Pokémon; does not evolve.",
  "246": "Evolves to Pupitar at Lv30.",
  "247": "Evolves to Tyranitar at Lv55.",
  "248": "Final evolution.",
  "249": "Legendary Pokémon; does not evolve.",
  "250": "Legendary Pokémon; does not evolve.",
  "251": "Mythical Pokémon; does not evolve."
};

function evolutionRequirementText(mon){
  if(!mon || !mon.speciesId) return "";
  return EVOLUTION_REQUIREMENTS[mon.speciesId] || "Evolution requirement not listed.";
}


const MY_MON_RATING_CACHE_KEY = STORAGE_PREFIX + "my_mon_rating_species_cache_v1";

function getMyMonRatingSpeciesCache(){try{return JSON.parse(localStorage.getItem(MY_MON_RATING_CACHE_KEY)||"{}");}catch(e){return{};}}
function setMyMonRatingSpeciesCache(cache){try{localStorage.setItem(MY_MON_RATING_CACHE_KEY,JSON.stringify(cache));}catch(e){}}
function getCachedSpeciesRatingData(speciesId){
  if(!speciesId)return null;
  const cache=getMyMonRatingSpeciesCache();
  if(cache[speciesId]&&cache[speciesId].baseStats)return cache[speciesId];
  try{
    const payload=JSON.parse(localStorage.getItem(dataKey(speciesId))||"null");
    if(payload&&payload.baseStats){
      const card=document.querySelector(`.card[data-id="${speciesId}"]`);
      const merged={speciesId:speciesId,pokeid:card?card.dataset.pokeid:"",name:card?card.dataset.name:getSpeciesName(speciesId),types:payload.types||(card&&card.dataset.types?card.dataset.types.split(",").filter(Boolean):[]),baseStats:payload.baseStats,cachedAt:payload.cachedAt||new Date().toISOString()};
      cache[speciesId]=merged;setMyMonRatingSpeciesCache(cache);return merged;
    }
  }catch(e){}
  return null;
}
async function ensureSpeciesRatingData(speciesId){
  if(!speciesId||getCachedSpeciesRatingData(speciesId))return false;
  const card=document.querySelector(`.card[data-id="${speciesId}"]`);
  if(!card||!card.dataset.pokeid)return;
  try{
    const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${card.dataset.pokeid}/`);
    if(!response.ok)throw new Error("rating species request failed");
    const data=await response.json();
    const baseStats={};
    (data.stats||[]).forEach(s=>{if(s&&s.stat&&s.stat.name)baseStats[s.stat.name]=s.base_stat||0;});
    const types=(data.types||[]).sort((a,b)=>(a.slot||0)-(b.slot||0)).map(t=>t.type.name);
    const cache=getMyMonRatingSpeciesCache();
    cache[speciesId]={speciesId:speciesId,pokeid:card.dataset.pokeid,name:card.dataset.name,types:types,baseStats:baseStats,cachedAt:new Date().toISOString()};
    setMyMonRatingSpeciesCache(cache);
    return true;
  }catch(e){}
  return false;
}
function ratingBand(score){if(score===null||score===undefined||isNaN(score))return"Unavailable";if(score>=90)return"Excellent";if(score>=80)return"Very Good";if(score>=70)return"Good";if(score>=60)return"Usable";if(score>=45)return"Weak";return"Poor";}
function formatRatingScore(score){return score===null||score===undefined||isNaN(score)?"Unavailable":`${Math.round(score)}/100 (${ratingBand(score)})`;}
function inferSpeciesRole(baseStats){
  if(!baseStats)return null;
  const atk=baseStats.attack||0,spa=baseStats["special-attack"]||0,def=baseStats.defense||0,spd=baseStats["special-defense"]||0,speed=baseStats.speed||0,hp=baseStats.hp||0;
  const roleCore=inferAttackRoleFromValues(atk,spa,speed,"species base stats");
  const bulk=hp+def+spd,defensive=bulk>=230&&Math.max(atk,spa)<90,fast=speed>=90;
  const keyStats=[];
  if(roleCore.preferredAttack==="special")keyStats.push("special-attack");else if(roleCore.preferredAttack==="physical")keyStats.push("attack");else keyStats.push("attack","special-attack");
  if(fast)keyStats.push("speed");if(defensive)keyStats.push("hp","defense","special-defense");
  const roleLabel=defensive?(fast?"fast defensive/support":"defensive/support"):fast?(roleCore.preferredAttack==="special"?"fast special attacker":roleCore.preferredAttack==="physical"?"fast physical attacker":"fast mixed attacker"):roleCore.roleLabel;
  return{preferredAttack:roleCore.preferredAttack,keyStats:Array.from(new Set(keyStats)),roleLabel:roleLabel,fast:fast,defensive:defensive,phys:roleCore.preferredAttack==="physical",special:roleCore.preferredAttack==="special",mixed:roleCore.preferredAttack==="mixed",source:"species",sourceLabel:"species base stats",attackValue:atk,specialAttackValue:spa,speedValue:speed};
}
function inferAttackRoleFromValues(atk,spa,speed,sourceLabel){
  atk=parseInt(atk,10)||0;spa=parseInt(spa,10)||0;speed=parseInt(speed,10)||0;
  let preferredAttack="mixed";
  if(atk>0&&spa>0){
    if(atk>=spa*1.15)preferredAttack="physical";
    else if(spa>=atk*1.15)preferredAttack="special";
  }else if(atk>0){preferredAttack="physical";}else if(spa>0){preferredAttack="special";}
  const roleLabel=preferredAttack==="physical"?"physical attacker":preferredAttack==="special"?"special attacker":"mixed attacker";
  return{preferredAttack:preferredAttack,roleLabel:roleLabel,keyStats:preferredAttack==="physical"?["attack","speed"]:preferredAttack==="special"?["special-attack","speed"]:["attack","special-attack","speed"],fast:speed>=90,defensive:false,phys:preferredAttack==="physical",special:preferredAttack==="special",mixed:preferredAttack==="mixed",sourceLabel:sourceLabel,attackValue:atk,specialAttackValue:spa,speedValue:speed};
}
function hasEnteredRoleStats(mon){
  if(!mon||!mon.stats)return false;
  return ["attack","special-attack","speed"].every(function(stat){return parseInt(mon.stats[stat]||"",10)>0;});
}
function inferHybridRole(mon,speciesData){
  if(hasEnteredRoleStats(mon)){
    const actual=inferAttackRoleFromValues(mon.stats.attack,mon.stats["special-attack"],mon.stats.speed,"entered stats");
    actual.source="entered";
    actual.sourceLabel="entered stats";
    return actual;
  }
  return speciesData&&speciesData.baseStats?inferSpeciesRole(speciesData.baseStats):null;
}
function scoreSpeciesRole(baseStats,role){
  if(!baseStats||!role)return{score:null,missing:true,note:"Missing species base stats."};
  const best=Math.max(baseStats.attack||0,baseStats["special-attack"]||0,baseStats.speed||0,baseStats.hp||0,baseStats.defense||0,baseStats["special-defense"]||0);
  const bst=Object.keys(STAT_LABELS).reduce((sum,k)=>sum+(baseStats[k]||0),0);let score=65;
  if(best>=120)score+=18;else if(best>=100)score+=14;else if(best>=85)score+=9;else if(best>=70)score+=4;
  if(bst>=500)score+=10;else if(bst>=430)score+=6;else if(bst<300)score-=8;if(role.fast||role.defensive||role.special||role.phys)score+=5;
  return{score:Math.max(35,Math.min(100,score)),missing:false,note:`Species role clarity: ${role.roleLabel} from species base stats.`};
}
function scoreNatureFit(nature,role){
  if(!nature)return{score:null,missing:true,note:"Missing nature."};if(!role)return{score:null,missing:true,note:"Missing role data."};
  const mods=NATURE_MODS[String(nature).toLowerCase()]||{};const boosted=Object.keys(mods).find(k=>mods[k]>1);const lowered=Object.keys(mods).find(k=>mods[k]<1);
  if(!boosted&&!lowered)return{score:72,missing:false,note:"Neutral nature: no stat bonus or penalty."};let score=72;const key=new Set(role.keyStats||[]),pref=role.preferredAttack;
  if(boosted&&key.has(boosted))score+=22;else if(boosted==="speed"&&role.fast)score+=18;else if(boosted==="defense"||boosted==="special-defense"||boosted==="hp")score+=role.defensive?16:6;else score+=4;
  if(lowered&&key.has(lowered))score-=28;if(pref==="physical"&&lowered==="attack")score-=25;if(pref==="special"&&lowered==="special-attack")score-=25;if(lowered==="speed"&&role.fast)score-=24;
  if((pref==="physical"&&lowered==="special-attack")||(pref==="special"&&lowered==="attack"))score+=8;
  return{score:Math.max(20,Math.min(100,score)),missing:false,note:`Boosts ${boosted?STAT_LABELS[boosted]:"none"}; lowers ${lowered?STAT_LABELS[lowered]:"none"}.`};
}
function getPossibleAbilityCount(mon){
  if(!mon||!mon.speciesId)return 0;
  const card=document.querySelector(`.card[data-id="${mon.speciesId}"]`);
  const pokeid=card&&card.dataset&&card.dataset.pokeid?String(card.dataset.pokeid):String(parseInt(mon.speciesId,10)||mon.speciesId);
  const cache=(typeof getPokemonAbilityCache==="function")?getPokemonAbilityCache():{};
  if(Array.isArray(cache[pokeid]))return cache[pokeid].filter(a=>a&&a.name).length;
  try{
    const payload=JSON.parse(localStorage.getItem(dataKey(mon.speciesId))||"null");
    if(payload&&Array.isArray(payload.abilities))return normalisePokemonAbilityList(payload.abilities).length;
  }catch(e){}
  return 0;
}
function scoreAbilitySynergy(mon,role){
  if(!mon||!mon.ability)return{score:null,missing:true,note:"Missing selected ability."};const ability=normaliseAbilityName(mon.ability);
  const possibleCount=getPossibleAbilityCount(mon);
  const highValue={levitate:"Grants a Ground immunity.",intimidate:"Lowers opposing Attack on entry.","natural-cure":"Cures status on switching.","volt-absorb":"Turns Electric hits into healing.","water-absorb":"Turns Water hits into healing.","flash-fire":"Grants Fire immunity and boosts Fire moves.","thick-fat":"Softens Fire and Ice damage.",guts:"Can turn status into an Attack boost.","huge-power":"Doubles Attack.","pure-power":"Doubles Attack.",chlorophyll:"Can double Speed in sun.","swift-swim":"Can double Speed in rain.","rock-head":"Prevents recoil damage.",sturdy:"Prevents one-hit KO moves in Gen 3.","marvel-scale":"Boosts Defense while statused.","serene-grace":"Doubles secondary effect chances."};
  if(possibleCount===1&&!highValue[ability])return{score:75,missing:false,note:`${displayAbilityName(ability)} is this species' fixed ability; treated as neutral.`};
  if(highValue[ability])return{score:94,missing:false,note:highValue[ability]};
  if(role&&role.defensive&&["insomnia","early-bird","shed-skin","immunity","own-tempo","keen-eye"].includes(ability))return{score:84,missing:false,note:"Useful defensive/status utility."};
  return{score:75,missing:false,note:"No major rating modifier recognised; treated as neutral."};
}
function monMoveMetaFromCache(move){
  const name=normaliseMoveName(move&&move.name||"");if(!name)return null;const meta=getMoveMetaCache()[name]||getMoveCache()[name]||null;
  return{name:name,display:move.name||displayMoveName(name),type:(meta&&meta.type)||move.type||"",power:meta&&typeof meta.power!=="undefined"?meta.power:(parseInt(move&&move.power||"0",10)||0),accuracy:meta&&meta.accuracy?meta.accuracy:(parseInt(move&&move.accuracy||"100",10)||100),category:meta&&meta.category?meta.category:(move&&move.category||"")};
}
async function ensureMoveRatingMeta(mon){const moves=(mon&&mon.moves||[]).filter(m=>m&&m.name);let changed=false;for(const move of moves){const meta=monMoveMetaFromCache(move);if(!meta||!meta.type||(!meta.category&&meta.power===0)){const loaded=await getMoveMeta(move.name);if(loaded)changed=true;}}return changed;}
function moveRatingNote(move,types,role){
  const parts=[];const isDamaging=(move.power||0)>0;
  if(isDamaging&&types.includes(move.type))parts.push("STAB ✔");
  if(isDamaging&&role&&role.preferredAttack!=="mixed"&&move.category&&move.category!==role.preferredAttack)parts.push("opposes dominant stat ⚠");
  if(isDamaging&&role&&(role.preferredAttack==="mixed"||!move.category||move.category===role.preferredAttack))parts.push("matches role ✔");
  if((move.accuracy||100)<80)parts.push("low accuracy ⚠");
  if(movePracticalityModifier(move.name)<.8)parts.push("practicality penalty ⚠");
  if(!isDamaging)parts.push("status / utility");
  return `${displayMoveName(move.name)}: ${parts.join(", ")||"neutral"}`;
}
function scoreMoveset(mon,speciesData,role){
  const savedMoves=(mon.moves||[]).filter(m=>m&&String(m.name||"").trim());if(!savedMoves.length)return{score:null,missing:true,note:"Missing moves."};
  if(!speciesData||!speciesData.types||!role)return{score:null,missing:true,note:"Missing species data."};const metas=savedMoves.map(monMoveMetaFromCache);
  if(metas.some(m=>!m||!m.type||(!m.category&&m.power===0)))return{score:null,missing:true,note:"Missing move metadata; open/re-save moves or allow metadata to load."};
  const types=speciesData.types||[],moveCount=metas.length,completenessCap=[0,40,60,80,100][Math.min(4,moveCount)];let score=45;const damaging=metas.filter(m=>(m.power||0)>0),status=metas.filter(m=>(m.power||0)===0),stab=damaging.filter(m=>types.includes(m.type));
  const coverageTypes=Array.from(new Set(damaging.map(m=>m.type)));const preferredDamaging=damaging.filter(m=>role.preferredAttack==="mixed"||!m.category||m.category===role.preferredAttack);const offRoleDamaging=damaging.filter(m=>role.preferredAttack!=="mixed"&&m.category&&m.category!==role.preferredAttack);
  let alignmentTotal=0,alignmentCount=0;
  damaging.forEach(function(m){let mod=1;if(role.preferredAttack!=="mixed"&&m.category){mod=m.category===role.preferredAttack?1.1:.75;}alignmentTotal+=mod;alignmentCount++;});
  const alignmentModifier=alignmentCount?alignmentTotal/alignmentCount:1;
  const bestPower=damaging.reduce((max,m)=>Math.max(max,(m.power||0)*movePracticalityModifier(m.name)*((m.accuracy||100)/100)),0);
  if(stab.length)score+=18;if(stab.length>=2)score+=5;if(coverageTypes.length>=2)score+=8;if(coverageTypes.length>=3)score+=8;if(coverageTypes.length>=4)score+=4;if(preferredDamaging.length)score+=12;if(offRoleDamaging.length>=2)score-=12;if(bestPower>=90)score+=10;else if(bestPower>=70)score+=6;else if(bestPower<45&&damaging.length)score-=8;if(status.length===1)score+=3;if(status.length>=3)score-=8;const duplicateTypePenalty=damaging.length-coverageTypes.length;if(duplicateTypePenalty>1)score-=duplicateTypePenalty*4;score-=damaging.filter(m=>(m.accuracy||100)<80).length*4;
  score=score*alignmentModifier;
  score=Math.max(20,Math.min(completenessCap,score));
  const notes=metas.map(m=>moveRatingNote(m,types,role));
  if(!stab.length)notes.push("No STAB moves ✖");
  if(coverageTypes.length<2)notes.push("Limited coverage ✖");
  notes.push(`Completeness cap: ${moveCount} move${moveCount===1?"":"s"} = max ${completenessCap}/100.`);
  return{score:score,missing:false,note:notes.join(" | ")};
}
function scoreIVQuality(mon,speciesData,role){
  if(!mon||!mon.stats||!speciesData||!speciesData.baseStats||!mon.level)return{score:null,optional:true,note:"Not entered; excluded from overall."};const level=parseInt(mon.level,10)||0;if(!level)return{score:null,optional:true,note:"Level missing; excluded from overall."};
  const availableStats=Object.keys(STAT_LABELS).filter(stat=>parseInt(mon.stats[stat]||"",10));if(availableStats.length<6)return{score:null,optional:true,note:"Incomplete IV stats; excluded from overall."};let totalWeight=0,weighted=0;const keyStats=new Set(role&&role.keyStats||[]);
  availableStats.forEach(stat=>{const observed=parseInt(mon.stats[stat]||"",10);const ev=Math.max(0,Math.min(255,parseInt(mon.evs&&mon.evs[stat]||"0",10)||0));const base=speciesData.baseStats[stat];if(!observed||!base)return;const natureMod=stat==="hp"?1:((NATURE_MODS[mon.nature||"hardy"]||{})[stat]||1);const possible=possibleIVsForStat(stat,observed,base,ev,level,natureMod);if(!possible.length)return;const midpoint=(Math.min(...possible)+Math.max(...possible))/2;const statScore=midpoint/31*100;const weight=keyStats.has(stat)?1.35:1;weighted+=statScore*weight;totalWeight+=weight;});
  if(!totalWeight)return{score:null,optional:true,note:"Could not derive IVs; excluded from overall."};return{score:Math.max(0,Math.min(100,weighted/totalWeight)),optional:false,note:"Weighted toward this species' key stats."};
}
function calculateMyMonRating(mon){
  const speciesData=getCachedSpeciesRatingData(mon.speciesId);const role=inferHybridRole(mon,speciesData);
  const speciesRole=speciesData&&speciesData.baseStats?inferSpeciesRole(speciesData.baseStats):role;
  const components={moveset:scoreMoveset(mon,speciesData,role),nature:scoreNatureFit(mon.nature,role),ivs:scoreIVQuality(mon,speciesData,role),ability:scoreAbilitySynergy(mon,role),speciesRole:scoreSpeciesRole(speciesData&&speciesData.baseStats,speciesRole)};
  const required=[components.moveset,components.nature,components.ability,components.speciesRole];const missingRequired=required.some(c=>c&&c.missing);let overall=null;
  if(!missingRequired){const weights={moveset:.35,nature:.20,ivs:.20,ability:.15,speciesRole:.10};let totalWeight=0,weighted=0;Object.keys(weights).forEach(k=>{const c=components[k];if(!c||c.score===null||c.score===undefined||isNaN(c.score))return;weighted+=c.score*weights[k];totalWeight+=weights[k];});if(totalWeight)overall=weighted/totalWeight;}
  return{overall:overall,components:components,speciesData:speciesData,role:role};
}
function calculateTeamSlotRating(slotInfo){
  const speciesId=slotInfo&&slotInfo.speciesId?slotInfo.speciesId:"";
  if(!speciesId)return null;
  const speciesData=getCachedSpeciesRatingData(speciesId);
  const baseMon=slotInfo.mon?Object.assign({},slotInfo.mon):{uid:"team_species_"+(slotInfo.slot||0),speciesId:speciesId,speciesName:getSpeciesName(speciesId),level:"",nature:"hardy",ability:""};
  baseMon.speciesId=speciesId;
  baseMon.moves=slotInfo.moves||[];
  if(slotInfo.mode==="species"){baseMon.nature="hardy";baseMon.stats={};baseMon.evs={};baseMon.ability="";}
  const role=slotInfo.mode==="species"&&speciesData&&speciesData.baseStats?inferSpeciesRole(speciesData.baseStats):inferHybridRole(baseMon,speciesData);
  const speciesRole=speciesData&&speciesData.baseStats?inferSpeciesRole(speciesData.baseStats):role;
  const components={moveset:scoreMoveset(baseMon,speciesData,role),nature:slotInfo.mode==="species"?{score:72,missing:false,note:"Neutral nature assumed for species mode."}:scoreNatureFit(baseMon.nature,role),ivs:slotInfo.mode==="species"?{score:null,optional:true,note:"Species mode uses base stats; IVs excluded."}:scoreIVQuality(baseMon,speciesData,role),ability:slotInfo.mode==="species"?{score:75,missing:false,note:"Species mode has no selected individual ability; neutral assumption used."}:scoreAbilitySynergy(baseMon,role),speciesRole:scoreSpeciesRole(speciesData&&speciesData.baseStats,speciesRole)};
  const required=[components.moveset,components.nature,components.ability,components.speciesRole];
  const missingRequired=required.some(c=>c&&c.missing);
  let overall=null;
  if(!missingRequired){const weights={moveset:.35,nature:.20,ivs:.20,ability:.15,speciesRole:.10};let totalWeight=0,weighted=0;Object.keys(weights).forEach(function(k){const c=components[k];if(!c||c.score===null||c.score===undefined||isNaN(c.score))return;weighted+=c.score*weights[k];totalWeight+=weights[k];});if(totalWeight)overall=weighted/totalWeight;}
  return{overall:overall,components:components,speciesData:speciesData,role:role,mode:slotInfo.mode,slot:slotInfo.slot,mon:slotInfo.mon,speciesId:speciesId,label:slotInfo.label};
}
function getTeamSlotSelectedMoves(slot){
  const moves=[];
  for(let j=0;j<4;j++){const nameEl=document.getElementById(`teamMoveName_${slot}_${j}`);const typeEl=document.getElementById(`teamMoveType_${slot}_${j}`);const name=nameEl?nameEl.value.trim():"";if(!name)continue;moves.push({name:name,type:typeEl?typeEl.value:"",power:nameEl&&nameEl.dataset?nameEl.dataset.power:"",accuracy:nameEl&&nameEl.dataset?nameEl.dataset.accuracy:"",category:nameEl&&nameEl.dataset?nameEl.dataset.category:""});}
  return moves;
}
let TEAM_RATING_PRIME_IN_PROGRESS=false;
function schedulePrimeTeamRatingData(){
  if(TEAM_RATING_PRIME_IN_PROGRESS)return;
  TEAM_RATING_PRIME_IN_PROGRESS=true;
  setTimeout(async function(){let changed=false;try{const selected=typeof getSelectedTeamCards==="function"?getSelectedTeamCards():[];for(const item of selected){changed=(await ensureSpeciesRatingData(item.card.dataset.id))||changed;const temp={speciesId:item.card.dataset.id,moves:getTeamSlotSelectedMoves(item.slot)};changed=(await ensureMoveRatingMeta(temp))||changed;}}catch(e){}TEAM_RATING_PRIME_IN_PROGRESS=false;if(changed&&typeof analyzeTeam==="function")analyzeTeam();},80);
}
function componentDisplay(component,optionalLabel){if(!component)return'<span class="ratingMissing">Missing</span>';if(component.missing)return'<span class="ratingMissing">Missing</span>';if(component.score===null||component.score===undefined||isNaN(component.score))return optionalLabel||"Not entered";return`${Math.round(component.score)}/100`;}
function renderMyMonRating(mon){
  const rating=calculateMyMonRating(mon),c=rating.components,overallText=formatRatingScore(rating.overall),safeUid=escapeHtml(mon.uid||"");
  const roleLine=rating.role?`Role: ${rating.role.roleLabel} (from ${rating.role.sourceLabel||"species base stats"}).`:"Role: Missing species/stat data.";
  const moveNotes=c.moveset&&c.moveset.note?c.moveset.note.split(" | ").map(n=>`<li>${escapeHtml(n)}</li>`).join(""):"<li>Missing</li>";
  return `<details class="myMonRatingDetails" ontoggle="if(!this.open)return; primeMyMonRating('${safeUid}')"><summary class="myMonRatingSummary">Rating: ${overallText}</summary><div class="myMonRatingBreakdown"><div class="myMonRatingRow"><span>Moveset quality</span><b>${componentDisplay(c.moveset)}</b></div><div class="myMonRatingRow"><span>Nature fit</span><b>${componentDisplay(c.nature)}</b></div><div class="myMonRatingRow"><span>IV quality</span><b>${componentDisplay(c.ivs,"Not entered")}</b></div><div class="myMonRatingRow"><span>Ability synergy</span><b>${componentDisplay(c.ability)}</b></div><div class="myMonRatingRow"><span>Species role clarity</span><b>${componentDisplay(c.speciesRole)}</b></div><div class="myMonRatingNotes"><b>${escapeHtml(roleLine)}</b><div><b>Moves:</b></div><ul>${moveNotes}</ul><div><b>Nature:</b> ${escapeHtml(c.nature&&c.nature.note?c.nature.note:"Missing")}</div><div><b>Ability:</b> ${escapeHtml(c.ability&&c.ability.note?c.ability.note:"Missing")}</div><div><b>Species role clarity:</b> ${escapeHtml(c.speciesRole&&c.speciesRole.note?c.speciesRole.note:"Missing")}</div><div><b>IVs:</b> ${escapeHtml(c.ivs&&c.ivs.note?c.ivs.note:"Not entered; excluded from overall.")}</div></div></div></details>`;
}
let MY_MON_RATING_PRIME_IN_PROGRESS=false;
async function primeMyMonRating(uid){if(MY_MON_RATING_PRIME_IN_PROGRESS)return;const mon=getMyMons().find(m=>m.uid===uid);if(!mon)return;MY_MON_RATING_PRIME_IN_PROGRESS=true;let changed=false;changed=(await ensureSpeciesRatingData(mon.speciesId))||changed;changed=(await ensureMoveRatingMeta(mon))||changed;MY_MON_RATING_PRIME_IN_PROGRESS=false;if(changed)renderMyMons();}
function schedulePrimeVisibleMyMonRatings(mons){setTimeout(async function(){const list=(mons||[]).slice(0,30);let changed=false;for(const mon of list){changed=(await ensureSpeciesRatingData(mon.speciesId))||changed;changed=(await ensureMoveRatingMeta(mon))||changed;}if(changed)renderMyMons();},50);}

function renderMyMons(){
  populateMyMonsFilterDropdowns();
  updateActiveMyMonsFilters();

  const el=document.getElementById("myMonsList");
  const status=document.getElementById("myMonsSortStatus");
  if(!el)return;

  let mons=getMyMons().filter(monMatchesMyMonsFilters);
  mons=sortMyMonsList(mons);

  if(status){
    const label = MY_MONS_SORT.field === "alpha" ? "Alphabetical" : MY_MONS_SORT.field === "level" ? "Level" : "Pokédex No.";
    status.textContent = `Current: ${label} ${MY_MONS_SORT.dir === "asc" ? "ascending" : "descending"} | Showing ${mons.length}/${getMyMons().length}`;
  }

  if(!mons.length){
    el.innerHTML='<p class="smallText">No saved Mon profiles match the current filters.</p>';
    return;
  }

  if(typeof schedulePrimeVisibleMyMonRatings === "function") schedulePrimeVisibleMyMonRatings(mons);

  el.innerHTML=mons.map(m=>{
    const speciesName=m.speciesName||getSpeciesName(m.speciesId);
    const label=`${m.nickname?m.nickname+" — ":""}#${m.speciesId} ${speciesName}`;
    const moves=(m.moves||[]).filter(x=>x.name).map(x=>`${x.name}${x.type?" ("+x.type+")":""}`).join(", ")||"No moves saved";
    const abilityLabel=m.ability ? (m.abilityDisplay || displayAbilityName(m.ability)) : "No ability selected";
    const evoReq=evolutionRequirementText(m);
    const spriteUrl=monSpriteUrl(m);
    const shinyLabel=monIsShiny(m) ? " | Shiny" : " | Normal";
    return`<div class="monCard" id="${safeMonCardDomId(m.uid)}" data-mon-uid="${escapeHtml(m.uid || "")}" style="--mon-sprite:url('${spriteUrl}')">
      <div class="monCardTitle">${label}</div>
      <div class="monMeta">Lv ${m.level||"?"} | ${m.nature||"unknown nature"}${shinyLabel}</div>
      <div class="monMeta"><b>Ability:</b> ${escapeHtml(abilityLabel)}</div>
      <div class="monMeta"><b>Evolution:</b> ${evoReq}</div>
      <div class="monMeta"><b>Moves:</b> ${moves}</div>
      ${renderMyMonRating(m)}
      <button class="miniButton" onclick="editMon('${m.uid}')">Edit</button>
      <button class="miniButton" onclick="evolveMon('${m.uid}')">Evolve</button>
      <button class="miniButton" onclick="deleteMon('${m.uid}')">Delete</button>
      <button class="miniButton" onclick="filterDexToSpecies('${m.speciesId}')">Dex</button>
    </div>`;
  }).join("");
}
function exportMyMons(){const blob=new Blob([JSON.stringify(getMyMons(),null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="leafgreen_my_mons.json";a.click();URL.revokeObjectURL(a.href);}
function importMyMons(event){const file=event.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=function(){try{const data=JSON.parse(reader.result);if(!Array.isArray(data))throw new Error("Expected array");setMyMons(data);alert("My Mon's imported.");}catch(e){alert("Could not import My Mon's JSON.");}};reader.readAsText(file);}


function teamSaveKey(){ return STORAGE_PREFIX + "saved_teams_v3"; }
function currentTeamIdKey(){ return STORAGE_PREFIX + "current_team_id_v3"; }
function getSavedTeams(){ try{return JSON.parse(localStorage.getItem(teamSaveKey())||"[]");}catch(e){return [];} }
function setSavedTeams(teams){ localStorage.setItem(teamSaveKey(), JSON.stringify(teams)); populateTeamLoadSelect(); }
function makeTeamUid(){ return "team_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2,8); }

function renderTeamBuilder(){
  populateTeamBuilderSelectors();
  populateTeamLoadSelect();
  updateAllTeamSlotSprites();
  analyzeTeam();
}

function populateTeamLoadSelect(){
  const sel=document.getElementById("teamLoadSelect");
  if(!sel) return;
  const current=localStorage.getItem(currentTeamIdKey()) || "";
  const teams=getSavedTeams();
  sel.innerHTML='<option value="">Select saved team...</option>' + teams.map(t=>`<option value="${t.uid}">${t.name || "Unnamed team"}</option>`).join("");
  if(current && teams.some(t=>t.uid===current)) sel.value=current;
}

function teamKey(slot){ return STORAGE_PREFIX + "team_slot_v3_" + slot; }

function getSlotMode(slot){
  const checked=document.querySelector(`input[name="teamMode_${slot}"]:checked`);
  return checked ? checked.value : "mon";
}

function setSlotMode(slot, mode){
  const radio=document.querySelector(`input[name="teamMode_${slot}"][value="${mode}"]`);
  if(radio) radio.checked=true;
  teamModeChanged(slot, false);
}

function teamModeChanged(slot, shouldAnalyse=true){
  const mode=getSlotMode(slot);
  const box=document.getElementById("teamSlotBox_"+slot);
  const monSel=document.getElementById("teamMonSelect_"+slot);
  const speciesSel=document.getElementById("teamSpeciesSelect_"+slot);
  if(box){
    box.classList.toggle("mode-mon", mode==="mon");
    box.classList.toggle("mode-species", mode==="species");
  }
  if(monSel) monSel.classList.toggle("hidden", mode!=="mon");
  if(speciesSel) speciesSel.classList.toggle("hidden", mode!=="species");
  if(mode==="mon") prefillTeamMovesFromMon(slot);
  updateTeamSlotSprite(slot);
  if(shouldAnalyse) analyzeTeam();
}

function populateTeamBuilderSelectors(){
  const mons=getMyMons();

  // Preserve current selections before rebuilding options.
  const selectedBySlot=[];
  for(let i=0;i<6;i++){
    const monSel=document.getElementById("teamMonSelect_"+i);
    selectedBySlot[i]=monSel ? monSel.value : "";
  }

  for(let i=0;i<6;i++){
    const monSel=document.getElementById("teamMonSelect_"+i);
    if(monSel){
      const current=selectedBySlot[i] || "";
      const usedElsewhere=new Set(selectedBySlot.filter((uid,idx)=>idx!==i && uid));
      monSel.innerHTML='<option value="">None</option>' + mons
        .filter(m => !usedElsewhere.has(m.uid) || m.uid===current)
        .map(m=>{
          const label=`${m.nickname?m.nickname+" — ":""}#${m.speciesId} ${m.speciesName||getSpeciesName(m.speciesId)}`;
          return `<option value="${m.uid}">${label}</option>`;
        }).join("");
      if(mons.some(m=>m.uid===current)) monSel.value=current;
    }
    teamModeChanged(i, false);
  }
}

function teamSlotSelectionChanged(slot){
  if(getSlotMode(slot)==="mon") prefillTeamMovesFromMon(slot);
  updateTeamSlotSprite(slot);
  populateTeamBuilderSelectors();
  updateAllTeamSlotSprites();
  analyzeTeam();
}

function getTeamMon(slot){
  const monSel=document.getElementById("teamMonSelect_"+slot);
  const uid=monSel ? monSel.value : "";
  return getMyMons().find(m=>m.uid===uid) || null;
}

function getTeamSpeciesId(slot){
  if(getSlotMode(slot)==="mon"){
    const mon=getTeamMon(slot);
    return mon ? mon.speciesId : "";
  }
  const speciesSel=document.getElementById("teamSpeciesSelect_"+slot);
  return speciesSel ? speciesSel.value : "";
}

function prefillTeamMovesFromMon(slot){
  const mon=getTeamMon(slot);
  for(let j=0;j<4;j++){
    const nameEl=document.getElementById(`teamMoveName_${slot}_${j}`);
    const typeEl=document.getElementById(`teamMoveType_${slot}_${j}`);
    if(!nameEl || !typeEl) continue;
    nameEl.value = mon?.moves?.[j]?.name || "";
    typeEl.value = mon?.moves?.[j]?.type || "";

    if(nameEl.value){
      getMoveMeta(nameEl.value).then(meta => {
        if(meta) applyMoveMetaToFields(nameEl, typeEl, meta);
        analyzeTeam();
      });
    } else {
      applyMoveMetaToFields(nameEl, typeEl, null);
    }
  }
  updateTeamSlotSprite(slot);
}

async function teamMoveChanged(slot, move){
  const nameEl = document.getElementById(`teamMoveName_${slot}_${move}`);
  const typeEl = document.getElementById(`teamMoveType_${slot}_${move}`);
  const moveName = nameEl ? nameEl.value.trim() : "";

  if(typeEl){
    if(!moveName){
      typeEl.value = "";
      if(nameEl) applyMoveMetaToFields(nameEl, typeEl, null);
    } else {
      typeEl.value = "loading...";
      const meta = await getMoveMeta(moveName);
      if(meta){
        applyMoveMetaToFields(nameEl, typeEl, meta);
      } else {
        typeEl.value = "";
        applyMoveMetaToFields(nameEl, typeEl, null);
      }
    }
  }

  analyzeTeam();
}

function getSelectedTeamCards(){
  const selected=[];
  for(let i=0;i<6;i++){
    const speciesId=getTeamSpeciesId(i);
    if(!speciesId) continue;
    const card=document.querySelector(`.card[data-id="${speciesId}"]`);
    if(card) selected.push({slot:i, card, mon:getTeamMon(i), mode:getSlotMode(i)});
  }
  return selected;
}

function getTeamMoveTypes(){
  const types=new Set();
  for(let i=0;i<6;i++){
    for(let j=0;j<4;j++){
      const typeEl=document.getElementById(`teamMoveType_${i}_${j}`);
      if(typeEl && typeEl.value) types.add(typeEl.value);
    }
  }
  return types;
}

function captureCurrentTeamSlots(){
  const slots=[];
  for(let i=0;i<6;i++){
    const moves=[];
    for(let j=0;j<4;j++){
      const nameEl = document.getElementById(`teamMoveName_${i}_${j}`);
      const typeEl = document.getElementById(`teamMoveType_${i}_${j}`);
      moves.push({
        name:nameEl?.value || "",
        type:typeEl?.value || "",
        power:nameEl?.dataset?.power || "",
        accuracy:nameEl?.dataset?.accuracy || "",
        category:nameEl?.dataset?.category || ""
      });
    }
    slots.push({
      mode:getSlotMode(i),
      monUid:document.getElementById("teamMonSelect_"+i)?.value || "",
      speciesId:document.getElementById("teamSpeciesSelect_"+i)?.value || "",
      moves
    });
  }
  return slots;
}

function applyTeamSlots(slots){
  for(let i=0;i<6;i++){
    const slot=slots?.[i] || {mode:"mon",monUid:"",speciesId:"",moves:[]};
    setSlotMode(i, slot.mode || "mon");
    const monSel=document.getElementById("teamMonSelect_"+i);
    const speciesSel=document.getElementById("teamSpeciesSelect_"+i);
    if(monSel) monSel.value=slot.monUid || "";
    if(speciesSel) speciesSel.value=slot.speciesId || "";

    if((slot.mode || "mon")==="mon" && slot.monUid){
      prefillTeamMovesFromMon(i);
    } else {
      for(let j=0;j<4;j++){
        const nameEl = document.getElementById(`teamMoveName_${i}_${j}`);
        const typeEl = document.getElementById(`teamMoveType_${i}_${j}`);
        if(!nameEl || !typeEl) continue;

        nameEl.value = slot.moves?.[j]?.name || "";
        typeEl.value = slot.moves?.[j]?.type || "";
        nameEl.dataset.power = slot.moves?.[j]?.power || "";
        nameEl.dataset.accuracy = slot.moves?.[j]?.accuracy || "";
        nameEl.dataset.category = slot.moves?.[j]?.category || "";

        if(nameEl.value && (!nameEl.dataset.power || !nameEl.dataset.category)){
          getMoveMeta(nameEl.value).then(meta => {
            if(meta) applyMoveMetaToFields(nameEl, typeEl, meta);
            analyzeTeam();
          });
        }
      }
    }
  }
  populateTeamBuilderSelectors();
  analyzeTeam();
}

function newTeam(){
  localStorage.removeItem(currentTeamIdKey());
  const loadSel=document.getElementById("teamLoadSelect");
  if(loadSel) loadSel.value="";
  clearTeamSlots(false);
}

function clearTeamSlots(clearCurrent=true){
  if(clearCurrent) localStorage.removeItem(currentTeamIdKey());
  for(let i=0;i<6;i++){
    setSlotMode(i, "mon");
    const monSel=document.getElementById("teamMonSelect_"+i);
    const speciesSel=document.getElementById("teamSpeciesSelect_"+i);
    if(monSel) monSel.value="";
    if(speciesSel) speciesSel.value="";
    for(let j=0;j<4;j++){
      document.getElementById(`teamMoveName_${i}_${j}`).value="";
      document.getElementById(`teamMoveType_${i}_${j}`).value="";
    }
    updateTeamSlotSprite(i);
  }
  analyzeTeam();
}


function renameCurrentTeam(){
  const uid = localStorage.getItem(currentTeamIdKey()) || "";
  if(!uid){
    alert("Load a saved team first, then rename it.");
    return;
  }

  const teams = getSavedTeams();
  const team = teams.find(t => t.uid === uid);
  if(!team){
    alert("Loaded team could not be found.");
    return;
  }

  const currentName = team.name || "Unnamed team";
  const newName = prompt("Rename team:", currentName);
  if(!newName || !newName.trim()) return;

  team.name = newName.trim();
  team.updated = new Date().toISOString();
  setSavedTeams(teams);

  const loadSel = document.getElementById("teamLoadSelect");
  if(loadSel) loadSel.value = uid;

  alert("Team renamed.");
}


function deleteCurrentTeam(){
  const uid=localStorage.getItem(currentTeamIdKey()) || "";
  if(!uid){
    alert("No saved team is currently loaded.");
    return;
  }

  const teams=getSavedTeams();
  const team=teams.find(t=>t.uid===uid);
  if(!team){
    alert("Loaded team could not be found.");
    return;
  }

  if(!confirm(`Delete team "${team.name || "Unnamed team"}"?`)) return;

  const remaining=teams.filter(t=>t.uid!==uid);
  setSavedTeams(remaining);
  localStorage.removeItem(currentTeamIdKey());

  const loadSel=document.getElementById("teamLoadSelect");
  if(loadSel) loadSel.value="";

  clearTeamSlots(false);
  alert("Team deleted.");
}

function cloneCurrentTeam(){
  const currentId = localStorage.getItem(currentTeamIdKey()) || "";
  if(!currentId){
    alert("Load or save a team first, then clone it.");
    return;
  }

  const team = getSavedTeams().find(t => t.uid === currentId);
  if(!team){
    alert("No loaded team found to clone.");
    return;
  }

  // Keep current slots exactly as-is, but clear loaded team identity.
  localStorage.removeItem(currentTeamIdKey());
  const loadSel=document.getElementById("teamLoadSelect");
  if(loadSel) loadSel.value="";
  alert(`Cloned "${team.name || "Unnamed team"}". Make any edits, then click Save Team to save as a new team.`);
}

function saveCurrentTeam(){
  let teams=getSavedTeams();
  let uid=localStorage.getItem(currentTeamIdKey()) || "";
  let existing=uid ? teams.find(t=>t.uid===uid) : null;

  let name = "";
  if(existing){
    const ok = confirm(`Save changes to team "${existing.name || "Unnamed team"}"?`);
    if(!ok) return;
    name = existing.name || "Unnamed team";
  } else {
    name = prompt("Team name?");
    if(!name) return;
    uid = makeTeamUid();
  }

  const team={uid, name, slots:captureCurrentTeamSlots(), updated:new Date().toISOString()};
  const idx=teams.findIndex(t=>t.uid===uid);
  if(idx>=0) teams[idx]=team; else teams.unshift(team);

  localStorage.setItem(currentTeamIdKey(), uid);
  setSavedTeams(teams);

  const loadSel=document.getElementById("teamLoadSelect");
  if(loadSel) loadSel.value=uid;
  alert("Team saved.");
}

function loadSelectedTeam(){
  const sel=document.getElementById("teamLoadSelect");
  const uid=sel ? sel.value : "";
  if(!uid) return;
  const team=getSavedTeams().find(t=>t.uid===uid);
  if(!team) return;
  localStorage.setItem(currentTeamIdKey(), uid);
  populateTeamBuilderSelectors();
  applyTeamSlots(team.slots || []);
  populateTeamBuilderSelectors();
  analyzeTeam();
}


function getTeamMoveDetails(){
  const moves=[];
  for(let i=0;i<6;i++){
    const speciesId=getTeamSpeciesId(i);
    const card=speciesId ? document.querySelector(`.card[data-id="${speciesId}"]`) : null;
    const pokemonName=card ? card.dataset.name : "";
    const pokemonTypes=card && card.dataset.types ? card.dataset.types.split(",").filter(Boolean) : [];

    for(let j=0;j<4;j++){
      const nameEl=document.getElementById(`teamMoveName_${i}_${j}`);
      const typeEl=document.getElementById(`teamMoveType_${i}_${j}`);
      const name=nameEl ? nameEl.value.trim() : "";
      if(!name) continue;

      moves.push({
        slot:i,
        pokemon:pokemonName || `Slot ${i+1}`,
        pokemonTypes,
        name,
        type:typeEl ? typeEl.value : "",
        power:parseInt(nameEl?.dataset?.power || "0",10) || 0,
        accuracy:parseInt(nameEl?.dataset?.accuracy || "100",10) || 100,
        category:nameEl?.dataset?.category || ""
      });
    }
  }
  return moves;
}

function displayTypeName(type){
  if(!type) return "Unknown";
  return String(type).split("-").map(function(part){
    return part ? part.charAt(0).toUpperCase() + part.slice(1) : part;
  }).join(" ");
}

function moveEffectivenessAgainstType(moveType, defenderType){
  if(!moveType || !defenderType) return 1;
  const atk = ATTACK_EFFECT[moveType];
  if(!atk) return 1;
  if((atk.none || atk.immune || []).includes(defenderType)) return 0;
  if((atk.super || []).includes(defenderType)) return 2;
  if((atk.notvery || atk.notVery || atk.resist || []).includes(defenderType)) return 0.5;
  return 1;
}

function scoreEffectivenessWeight(effectiveness){
  if(effectiveness <= 0) return 0;
  if(effectiveness >= 4) return 4.5;
  if(effectiveness >= 2) return 2.2;
  if(effectiveness <= 0.25) return 0.15;
  if(effectiveness <= 0.5) return 0.4;
  return 1;
}


function getTeamRatingOffensiveProfile(rating){
  const moves=((rating&&rating.mon&&rating.mon.moves)||[]).filter(function(m){return m&&m.name;});
  const damaging=moves.map(monMoveMetaFromCache).filter(function(m){return m&&m.type&&(parseInt(m.power||"0",10)||0)>0;});
  const attackTypes=Array.from(new Set(damaging.map(function(m){return m.type;}))).sort();
  const stabTypes=rating&&rating.speciesData&&Array.isArray(rating.speciesData.types)?rating.speciesData.types:[];
  const preferred=rating&&rating.role&&rating.role.preferredAttack?rating.role.preferredAttack:"other";
  return{attackTypes:attackTypes,stabTypes:stabTypes,preferred:preferred};
}

function buildRoleRedundancyInsights(ratings){
  const available=(ratings||[]).filter(function(r){return r&&r.speciesId&&r.role&&r.role.preferredAttack&&r.role.preferredAttack!=="other";});
  const warnings=[];
  for(let i=0;i<available.length;i++){
    for(let j=i+1;j<available.length;j++){
      const a=available[i],b=available[j];
      const ap=getTeamRatingOffensiveProfile(a),bp=getTeamRatingOffensiveProfile(b);
      if(ap.preferred!==bp.preferred)continue;
      const sharedAttack=ap.attackTypes.filter(function(t){return bp.attackTypes.includes(t);});
      const sharedStab=ap.stabTypes.filter(function(t){return bp.stabTypes.includes(t);});
      const bothLimited=ap.attackTypes.length<=2&&bp.attackTypes.length<=2;
      const bothLowRated=(a.overall!==null&&b.overall!==null&&a.overall<70&&b.overall<70);
      if(sharedAttack.length>=2 || (sharedAttack.length>=1&&sharedStab.length>=1&&bothLimited) || (sharedAttack.length>=1&&sharedStab.length>=1&&bothLowRated)){
        warnings.push(`${a.label} and ${b.label} both look like ${ap.preferred} attackers with overlapping ${sharedAttack.map(displayTypeName).join("/")||"move"} coverage.`);
      }
    }
  }
  return warnings.slice(0,5);
}


function getTeamRatingSpeedInfo(rating){
  if(!rating)return null;
  const mon=rating.mon||null;
  const actualSpeed=mon&&mon.stats?parseInt(mon.stats.speed||"",10):0;
  const baseSpeed=rating.speciesData&&rating.speciesData.baseStats?parseInt(rating.speciesData.baseStats.speed||"0",10):0;
  const usingActual=actualSpeed>0;
  const value=usingActual?actualSpeed:baseSpeed;
  if(!value)return null;
  return{
    label:rating.label||getSpeciesName(rating.speciesId),
    value:value,
    source:usingActual?"entered Speed":"base Speed",
    mode:rating.mode,
    overall:rating.overall,
    role:rating.role&&rating.role.roleLabel?rating.role.roleLabel:"unclear role"
  };
}

function buildSpeedTierInsights(ratings){
  const speedInfos=(ratings||[]).map(getTeamRatingSpeedInfo).filter(Boolean).sort(function(a,b){return b.value-a.value;});
  const warnings=[];
  const notes=[];
  if(!speedInfos.length){
    return{warnings:["Speed data is not available yet; this will update once species/stat data has loaded."],notes:[],leaders:[]};
  }
  const enteredCount=speedInfos.filter(function(s){return s.source==="entered Speed";}).length;
  const baseCount=speedInfos.length-enteredCount;
  const leaders=speedInfos.slice(0,3);
  const fastest=leaders[0];
  const lowBaseCount=speedInfos.filter(function(s){return s.source==="base Speed"&&s.value<70;}).length;
  const highBaseCount=speedInfos.filter(function(s){return s.source==="base Speed"&&s.value>=90;}).length;
  const lowEnteredCount=speedInfos.filter(function(s){return s.source==="entered Speed"&&s.value<80;}).length;
  if(baseCount&&enteredCount)notes.push("Speed view mixes entered Speed stats and species base Speed estimates, so use it as a practical guide rather than a strict speed-order calculator.");
  if(baseCount&&!enteredCount){
    if(highBaseCount===0)warnings.push("No naturally fast Pokémon detected by base Speed; faster opponents may often move first.");
    if(lowBaseCount>=Math.max(3,Math.ceil(speedInfos.length/2)))warnings.push("Several selected Pokémon have low base Speed; consider at least one faster pivot or reliable bulky answer.");
  }
  if(enteredCount&&!baseCount&&lowEnteredCount>=Math.max(3,Math.ceil(speedInfos.length/2)))warnings.push("Several selected Pokémon have low entered Speed values; this team may struggle to act first without bulk or status support.");
  if(fastest&&fastest.overall!==null&&fastest.overall!==undefined&&!isNaN(fastest.overall)&&fastest.overall<65){
    warnings.push(`Your fastest listed option is ${fastest.label}, but its overall rating is only ${Math.round(fastest.overall)}/100; speed advantage may not translate into reliable performance.`);
  }
  const verySlow=speedInfos.filter(function(s){return s.source==="base Speed"?s.value<50:s.value<60;});
  if(verySlow.length>=2)warnings.push(`${verySlow.length} selected Pokémon appear very slow relative to their data source; watch for matchups where they need to take a hit before acting.`);
  return{warnings:warnings.slice(0,5),notes:notes,leaders:leaders};
}


function getTeamRatingDefensiveProfile(rating){
  if(!rating||!rating.speciesData||!Array.isArray(rating.speciesData.types))return null;
  const baseStats=rating.speciesData.baseStats||{};
  const types=rating.speciesData.types.filter(Boolean);
  if(!types.length)return null;
  const baseBulk=(parseInt(baseStats.hp||"0",10)||0)+(parseInt(baseStats.defense||"0",10)||0)+(parseInt(baseStats["special-defense"]||"0",10)||0);
  const weaknesses=[];
  const resistances=[];
  const immunities=[];
  Object.keys(ATTACK_EFFECT||{}).forEach(function(attackType){
    let multiplier=1;
    types.forEach(function(defType){multiplier*=moveEffectivenessAgainstType(attackType,defType);});
    if(multiplier===0)immunities.push(attackType);
    else if(multiplier>1)weaknesses.push({type:attackType,multiplier:multiplier});
    else if(multiplier<1)resistances.push({type:attackType,multiplier:multiplier});
  });
  return{
    label:rating.label||getSpeciesName(rating.speciesId),
    types:types,
    baseBulk:baseBulk,
    weaknesses:weaknesses,
    resistances:resistances,
    immunities:immunities,
    overall:rating.overall,
    movesetScore:rating.components&&rating.components.moveset?rating.components.moveset.score:null,
    role:rating.role&&rating.role.preferredAttack?rating.role.preferredAttack:"other"
  };
}

function mapBaseBulkToScore(baseBulk){
  if(!baseBulk)return 50;
  if(baseBulk>=300)return 92;
  if(baseBulk>=270)return 84;
  if(baseBulk>=240)return 76;
  if(baseBulk>=210)return 66;
  if(baseBulk>=180)return 55;
  if(baseBulk>=150)return 44;
  return 34;
}

function buildOffensiveDefensiveBalanceInsights(ratings){
  const available=(ratings||[]).filter(function(r){return r&&r.speciesId;});
  if(!available.length)return{offenseScore:null,defenseScore:null,balanceLabel:"Unavailable",warnings:["No team rating data is available yet."],notes:[]};
  const moveScores=available.map(function(r){return r.components&&r.components.moveset?r.components.moveset.score:null;}).filter(function(v){return v!==null&&v!==undefined&&!isNaN(v);});
  const avgMoveScore=moveScores.length?moveScores.reduce(function(s,v){return s+v;},0)/moveScores.length:null;
  const profiles=available.map(getTeamRatingOffensiveProfile).filter(Boolean);
  const attackTypes=Array.from(new Set([].concat.apply([],profiles.map(function(p){return p.attackTypes||[];}))));
  const physicalCount=available.filter(function(r){return r.role&&r.role.preferredAttack==="physical";}).length;
  const specialCount=available.filter(function(r){return r.role&&r.role.preferredAttack==="special";}).length;
  const mixedCount=available.filter(function(r){return r.role&&r.role.preferredAttack==="mixed";}).length;
  let roleScore=55;
  if(physicalCount&&specialCount)roleScore+=24;
  else if(mixedCount&&available.length>=2)roleScore+=12;
  if(physicalCount>=2&&specialCount>=2)roleScore+=8;
  if(physicalCount>=4&&specialCount===0)roleScore-=16;
  if(specialCount>=4&&physicalCount===0)roleScore-=16;
  const coverageScore=Math.max(35,Math.min(100,45+(attackTypes.length*7)));
  const offenseScore=Math.round(((avgMoveScore===null?60:avgMoveScore)*0.55)+(roleScore*0.25)+(coverageScore*0.20));

  const defensiveProfiles=available.map(getTeamRatingDefensiveProfile).filter(Boolean);
  const avgBulk=defensiveProfiles.length?defensiveProfiles.reduce(function(s,p){return s+p.baseBulk;},0)/defensiveProfiles.length:0;
  const bulkScore=mapBaseBulkToScore(avgBulk);
  const typeCounts={};
  Object.keys(ATTACK_EFFECT||{}).forEach(function(type){typeCounts[type]={weak:0,resist:0,immune:0,neutral:0};});
  defensiveProfiles.forEach(function(p){
    Object.keys(typeCounts).forEach(function(type){
      let multiplier=1;
      p.types.forEach(function(defType){multiplier*=moveEffectivenessAgainstType(type,defType);});
      if(multiplier===0)typeCounts[type].immune++;
      else if(multiplier>1)typeCounts[type].weak++;
      else if(multiplier<1)typeCounts[type].resist++;
      else typeCounts[type].neutral++;
    });
  });
  const sharedWeaknesses=Object.keys(typeCounts).filter(function(type){return typeCounts[type].weak>=3;}).sort(function(a,b){return typeCounts[b].weak-typeCounts[a].weak;});
  const wellCovered=Object.keys(typeCounts).filter(function(type){return (typeCounts[type].resist+typeCounts[type].immune)>=2;}).length;
  const poorCovered=Object.keys(typeCounts).filter(function(type){return typeCounts[type].weak>=2&&(typeCounts[type].resist+typeCounts[type].immune)===0;});
  const defenseScore=Math.round(Math.max(25,Math.min(100,bulkScore+(wellCovered*1.2)-(sharedWeaknesses.length*7)-(poorCovered.length*5))));
  const warnings=[];
  const notes=[];
  if(avgMoveScore!==null&&avgMoveScore<60)warnings.push("Offensive pressure is limited by low average moveset quality; selected moves may not reliably convert coverage into wins.");
  if(attackTypes.length<4&&available.length>=4)warnings.push("Move coverage is narrow across the team; several matchups may rely on the same few attacking types.");
  if((physicalCount===0||specialCount===0)&&available.length>=3)warnings.push("Offensive balance is one-sided; some opponents may wall the team through their stronger defensive stat.");
  if(sharedWeaknesses.length)warnings.push("Shared defensive weakness detected: "+sharedWeaknesses.slice(0,3).map(function(t){return `${displayTypeName(t)} (${typeCounts[t].weak} weak)`;}).join(", ")+".");
  if(poorCovered.length)warnings.push("No strong team switch-in detected for: "+poorCovered.slice(0,3).map(displayTypeName).join(", ")+".");
  const lowBulk=defensiveProfiles.filter(function(p){return p.baseBulk&&p.baseBulk<190;});
  if(lowBulk.length>=Math.max(2,Math.ceil(defensiveProfiles.length/2)))warnings.push("Several selected Pokémon have low base defensive bulk; avoid relying on repeated switch-ins.");
  if(offenseScore>=75&&defenseScore<55)notes.push("Team profile looks offensively strong but defensively fragile.");
  else if(defenseScore>=75&&offenseScore<60)notes.push("Team profile looks defensively stable but may lack immediate offensive pressure.");
  else if(offenseScore>=65&&defenseScore>=65)notes.push("Offensive and defensive balance looks healthy from current ratings and type data.");
  else notes.push("Balance is serviceable but has clear improvement room in either move quality, role split, or defensive coverage.");
  notes.push(`Detected attacking move types: ${attackTypes.length?attackTypes.map(displayTypeName).join(", "):"none yet"}.`);
  if(defensiveProfiles.length<available.length)notes.push("Some defensive data is still loading, so this balance view may update after species data is cached.");
  return{offenseScore:offenseScore,defenseScore:defenseScore,balanceLabel:offenseScore>=defenseScore+18?"Offense-leaning":defenseScore>=offenseScore+18?"Defense-leaning":"Balanced / mixed",warnings:warnings.slice(0,6),notes:notes};
}

function movePracticalityModifier(moveName){
  const key = String(moveName || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const modifiers = {
    solarbeam: 0.5,
    fly: 0.5,
    dig: 0.5,
    dive: 0.5,
    bounce: 0.5,
    skyattack: 0.5,
    razorwind: 0.5,
    skullbash: 0.5,
    hyperbeam: 0.85,
    blastburn: 0.85,
    frenzyplant: 0.85,
    hydrocannon: 0.85
  };
  return modifiers[key] || 1;
}

function scoreMoveForDefenderType(move, defenderType){
  if(!move.type) return 0;
  const rawEffectiveness = moveEffectivenessAgainstType(move.type, defenderType);

  // For the Team Analysis counter table, only true counters should qualify.
  // Neutral damage is still useful in battle, but treating it as a "counter"
  // caused the "Types to be wary of offensively" section to incorrectly show None.
  if(rawEffectiveness <= 1) return 0;

  const effectiveness = scoreEffectivenessWeight(rawEffectiveness);
  if(effectiveness === 0) return 0;

  const power = move.power || (move.category === "status" ? 0 : 1);
  if(!power) return 0;

  const modifier = movePracticalityModifier(move.name);
  const stab = move.pokemonTypes && move.pokemonTypes.includes(move.type) ? 1.5 : 1;
  const accuracy = Math.max(1, move.accuracy || 100) / 100;

  return Math.round(power * modifier * effectiveness * stab * accuracy);
}

function getDefensiveMultiplierAgainstAttackType(pokemonTypes, attackType){
  if(!pokemonTypes || !pokemonTypes.length || !attackType) return 1;
  let multiplier=1;
  pokemonTypes.forEach(function(defType){
    multiplier *= moveEffectivenessAgainstType(attackType, defType);
  });
  return multiplier;
}

function counterSafetyInfo(pokemonTypes, attackType){
  const multiplier=getDefensiveMultiplierAgainstAttackType(pokemonTypes, attackType);
  if(multiplier===0) return {multiplier:multiplier, factor:1.25, label:"immune to likely STAB"};
  if(multiplier<=0.25) return {multiplier:multiplier, factor:1.18, label:"strongly resists likely STAB"};
  if(multiplier<1) return {multiplier:multiplier, factor:1.10, label:"resists likely STAB"};
  if(multiplier>=4) return {multiplier:multiplier, factor:0.45, label:"very weak to likely STAB"};
  if(multiplier>1) return {multiplier:multiplier, factor:0.68, label:"weak to likely STAB"};
  return {multiplier:multiplier, factor:1, label:"neutral to likely STAB"};
}

function ratingCounterFactor(rating){
  if(!rating || rating.overall===null || rating.overall===undefined || isNaN(rating.overall)) return 0.90;
  return Math.max(0.55, Math.min(1.25, 0.55 + (rating.overall/100*0.70)));
}

function scoreMoveForDefenderTypeRatingAware(move, defenderType, rating){
  const baseScore=scoreMoveForDefenderType(move, defenderType);
  const ratingFactor=ratingCounterFactor(rating);
  const safety=counterSafetyInfo(move.pokemonTypes||[], defenderType);
  if(!baseScore) return {score:0, baseScore:0, ratingFactor:ratingFactor, safety:safety};
  const finalScore=Math.round(baseScore * ratingFactor * safety.factor);
  return {score:finalScore, baseScore:baseScore, ratingFactor:ratingFactor, safety:safety};
}

function buildRatingAwareCoverageGapInsights(bestCounters, allTypes){
  const hard=[];
  const risky=[];
  const lowConfidence=[];
  (allTypes||[]).forEach(function(type){
    const best=bestCounters[type];
    if(!best){hard.push(type);return;}
    if(best.adjustedScore.score<55) lowConfidence.push(type);
    if(best.adjustedScore.safety && best.adjustedScore.safety.multiplier>1) risky.push(displayTypeName(type)+" ("+best.move.pokemon+")");
  });
  const notes=[];
  if(hard.length) notes.push("No damaging assigned super-effective counter for: "+hard.slice(0,6).map(displayTypeName).join(", ")+(hard.length>6?"…":"")+".");
  if(lowConfidence.length) notes.push("Low-confidence counters after rating/safety adjustment for: "+lowConfidence.slice(0,6).map(displayTypeName).join(", ")+(lowConfidence.length>6?"…":"")+".");
  if(risky.length) notes.push("Best counter may be defensively risky against likely same-type attacks: "+risky.slice(0,5).join(", ")+(risky.length>5?"…":"")+".");
  return notes;
}

function buildTeamQualityAnalysis(selected){
  if(!selected||!selected.length)return "";
  const ratings=selected.map(function(item){
    const speciesId=item.card&&item.card.dataset?item.card.dataset.id:"";
    const monLabel=item.mon?`${item.mon.nickname?item.mon.nickname+" — ":""}#${item.mon.speciesId} ${item.mon.speciesName||getSpeciesName(item.mon.speciesId)}`:`${"#"+speciesId+" "+(item.card.dataset.name||getSpeciesName(speciesId))}`;
    return calculateTeamSlotRating({slot:item.slot,mode:item.mode,mon:item.mon,speciesId:speciesId,moves:getTeamSlotSelectedMoves(item.slot),label:monLabel});
  }).filter(Boolean);
  const available=ratings.filter(r=>r.overall!==null&&r.overall!==undefined&&!isNaN(r.overall));
  const avg=available.length?available.reduce((s,r)=>s+r.overall,0)/available.length:null;
  const weakest=available.length?available.slice().sort((a,b)=>a.overall-b.overall)[0]:null;
  const moveScores=ratings.map(r=>r.components&&r.components.moveset?r.components.moveset.score:null).filter(v=>v!==null&&v!==undefined&&!isNaN(v));
  const avgMoves=moveScores.length?moveScores.reduce((s,v)=>s+v,0)/moveScores.length:null;
  const roleGroups={physical:[],special:[],mixed:[],other:[]};
  ratings.forEach(function(r){const role=r.role&&r.role.preferredAttack?r.role.preferredAttack:"other";const bucket=roleGroups[role]||roleGroups.other;bucket.push(`${escapeHtml(r.label||getSpeciesName(r.speciesId))} ${r.overall!==null&&r.overall!==undefined&&!isNaN(r.overall)?`(${Math.round(r.overall)})`:"(Unavailable)"}`);});
  const missing=[];
  ratings.forEach(function(r){const c=r.components||{};if(c.moveset&&c.moveset.missing)missing.push(`${r.label}: moveset ${c.moveset.note||"missing"}`);if(c.speciesRole&&c.speciesRole.missing)missing.push(`${r.label}: species role data missing`);if(c.nature&&c.nature.missing)missing.push(`${r.label}: nature missing`);if(c.ability&&c.ability.missing)missing.push(`${r.label}: ability missing`);});
  const incompleteMoves=ratings.filter(r=>r.components&&r.components.moveset&&r.components.moveset.note&&/Completeness cap: [123] move/.test(r.components.moveset.note)).length;
  const speciesModeCount=ratings.filter(r=>r.mode==="species").length;
  const rows=ratings.map(function(r){const scoreText=formatRatingScore(r.overall);const modeText=r.mode==="species"?"Species mode estimate: base stats + neutral nature + selected moves":"My Mon: entered stats/nature/ability + selected team moves";const roleText=r.role?`${r.role.roleLabel} from ${r.role.sourceLabel||"species base stats"}`:"role still loading";const moveText=r.components&&r.components.moveset?componentDisplay(r.components.moveset):"Unavailable";return `<div class="smallText"><b>${escapeHtml(r.label||getSpeciesName(r.speciesId))}</b>: ${scoreText} <span class="smallText">— ${escapeHtml(modeText)}; ${escapeHtml(roleText)}; moveset ${moveText}</span></div>`;}).join("");
  function roleLine(label,arr){return `<div class="smallText"><b>${label}</b>: ${arr.length?arr.join(", "):"None"}</div>`;}
  const notes=[];
  const roleWarnings=[];
  const activeRoles={
    physical:roleGroups.physical.length,
    special:roleGroups.special.length,
    mixed:roleGroups.mixed.length,
    other:roleGroups.other.length
  };
  const attackerCount=activeRoles.physical+activeRoles.special+activeRoles.mixed;
  if(attackerCount>=2){
    if(activeRoles.physical===0)roleWarnings.push("No clear physical attacker detected; physically bulky opponents may be harder to deal with.");
    if(activeRoles.special===0)roleWarnings.push("No clear special attacker detected; physically defensive opponents may be harder to break.");
  }
  if(activeRoles.physical>=4&&activeRoles.special===0)roleWarnings.push("Team leans heavily physical; consider adding at least one special attacker.");
  if(activeRoles.special>=4&&activeRoles.physical===0)roleWarnings.push("Team leans heavily special; consider adding at least one physical attacker.");
  if(activeRoles.mixed>=4)roleWarnings.push("Most selected Pokémon are mixed/unclear roles; this can be flexible, but may also indicate unfocused movesets or close attacking stats.");
  if(activeRoles.other>0)roleWarnings.push(`${activeRoles.other} selected slot${activeRoles.other===1?" has":"s have"} unclear role data; role coverage may update once species/stat data is available.`);
  let redundancyWarnings=[];
  let speedInsights={warnings:["Speed insight could not be calculated for the current team."],notes:[],leaders:[]};
  let balanceInsights={offenseScore:null,defenseScore:null,balanceLabel:"Unavailable",warnings:["Offensive / defensive balance could not be calculated for the current team."],notes:[]};
  try{ redundancyWarnings=buildRoleRedundancyInsights(ratings); }catch(e){ console.error("Team redundancy insight failed", e); }
  try{ speedInsights=buildSpeedTierInsights(ratings); }catch(e){ console.error("Team speed insight failed", e); }
  try{ balanceInsights=buildOffensiveDefensiveBalanceInsights(ratings); }catch(e){ console.error("Team balance insight failed", e); }

  if(weakest)notes.push(`Weakest current rating: ${weakest.label} (${Math.round(weakest.overall)}/100).`);
  if(incompleteMoves)notes.push(`${incompleteMoves} selected Pokémon have incomplete selected movesets, so moveset caps are being applied.`);
  if(speciesModeCount)notes.push(`${speciesModeCount} slot${speciesModeCount===1?"":"s"} use species-mode estimates with base stats, neutral nature, and the moves currently selected in Team Builder.`);
  if(missing.length)notes.push("Some rating inputs are still loading or unavailable; the Team Rating will update as cached move/species metadata becomes available.");
  return `<div class="analysisBlock"><b>Team Quality</b><br>
    <div class="smallText"><b>Team Rating:</b> ${avg===null?"Unavailable / still loading":formatRatingScore(avg)}</div>
    <div class="smallText"><b>Average moveset quality:</b> ${avgMoves===null?"Unavailable":Math.round(avgMoves)+"/100"}</div>
    ${rows}
    <div style="margin-top:6px">${roleLine("Physical attackers",roleGroups.physical)}${roleLine("Special attackers",roleGroups.special)}${roleLine("Mixed attackers",roleGroups.mixed)}${roleLine("Other/unclear",roleGroups.other)}</div>
    ${roleWarnings.length?`<div class="smallText" style="margin-top:6px"><b>Role coverage warnings:</b><br>${roleWarnings.map(n=>"⚠ "+escapeHtml(n)).join("<br>")}</div>`:`<div class="smallText" style="margin-top:6px"><b>Role coverage warnings:</b> None</div>`}
    ${redundancyWarnings.length?`<div class="smallText" style="margin-top:6px"><b>Role redundancy warnings:</b><br>${redundancyWarnings.map(n=>"⚠ "+escapeHtml(n)).join("<br>")}</div>`:`<div class="smallText" style="margin-top:6px"><b>Role redundancy warnings:</b> None</div>`}
    <div class="smallText" style="margin-top:6px"><b>Speed tier insights:</b><br>${speedInsights.leaders.length?"Fastest listed: "+speedInsights.leaders.map(s=>`${escapeHtml(s.label)} (${s.value} ${escapeHtml(s.source)})`).join(", "):"Unavailable"}${speedInsights.warnings.length?"<br>"+speedInsights.warnings.map(n=>"⚠ "+escapeHtml(n)).join("<br>"):"<br>No major speed warnings."}${speedInsights.notes.length?"<br>"+speedInsights.notes.map(n=>escapeHtml(n)).join("<br>"):""}</div>
    <div class="smallText" style="margin-top:6px"><b>Offensive / defensive balance:</b><br>Profile: ${escapeHtml(balanceInsights.balanceLabel)}<br>Offensive pressure: ${balanceInsights.offenseScore===null?"Unavailable":balanceInsights.offenseScore+"/100"}<br>Defensive stability: ${balanceInsights.defenseScore===null?"Unavailable":balanceInsights.defenseScore+"/100"}${balanceInsights.warnings.length?"<br>"+balanceInsights.warnings.map(n=>"⚠ "+escapeHtml(n)).join("<br>"):"<br>No major balance warnings."}${balanceInsights.notes.length?"<br>"+balanceInsights.notes.map(n=>escapeHtml(n)).join("<br>"):""}</div>
    ${notes.length?`<div class="smallText" style="margin-top:6px">${notes.map(n=>escapeHtml(n)).join("<br>")}</div>`:""}
  </div>`;
}

function analyzeTeam(){
  const el=document.getElementById("teamAnalysis");
  if(!el) return;

  const selected=getSelectedTeamCards();
  if(!selected.length){
    el.innerHTML='<p class="smallText">Select Pokémon to analyse team coverage.</p>';
    return;
  }

  const teamTypes=new Set();
  const weaknessCounts={};
  const resistCounts={};
  const immuneCounts={};
  const offensiveTypes=getTeamMoveTypes();
  const moves=getTeamMoveDetails();

  const abilityNotes=[];

  selected.forEach(({card, mon})=>{
    const types=(card.dataset.types||"").split(",").filter(Boolean);
    types.forEach(t=>teamTypes.add(t));

    const multiplier={};
    Object.keys(TYPE_CHART).forEach(atk=>multiplier[atk]=1);

    types.forEach(defType=>{
      const chart=TYPE_CHART[defType];
      if(!chart) return;
      chart.weak.forEach(t=>multiplier[t]*=2);
      chart.resist.forEach(t=>multiplier[t]*=0.5);
      chart.immune.forEach(t=>multiplier[t]=0);
    });

    const notes = applyAbilityDefensiveAdjustments(multiplier, mon);
    if(notes.length){
      const monLabel = mon ? `${mon.nickname?mon.nickname+" — ":""}#${mon.speciesId} ${mon.speciesName||getSpeciesName(mon.speciesId)}` : card.dataset.name;
      notes.forEach(note => abilityNotes.push(`${monLabel}: ${note}`));
    }

    Object.keys(multiplier).forEach(atk=>{
      if(multiplier[atk]===0) immuneCounts[atk]=(immuneCounts[atk]||0)+1;
      else if(multiplier[atk]>1) weaknessCounts[atk]=(weaknessCounts[atk]||0)+1;
      else if(multiplier[atk]<1) resistCounts[atk]=(resistCounts[atk]||0)+1;
    });
  });

  const allTypes=Object.keys(TYPE_CHART);
  const canCounter={};
  const hardToCounter=[];
  const bestCounters={};
  const ratingsBySlot={};
  selected.forEach(function(item){
    const speciesId=item.card&&item.card.dataset?item.card.dataset.id:"";
    const monLabel=item.mon?`${item.mon.nickname?item.mon.nickname+" — ":""}#${item.mon.speciesId} ${item.mon.speciesName||getSpeciesName(item.mon.speciesId)}`:`${"#"+speciesId+" "+(item.card.dataset.name||getSpeciesName(speciesId))}`;
    ratingsBySlot[item.slot]=calculateTeamSlotRating({slot:item.slot,mode:item.mode,mon:item.mon,speciesId:speciesId,moves:getTeamSlotSelectedMoves(item.slot),label:monLabel});
  });

  allTypes.forEach(defType=>{
    const counters=Array.from(offensiveTypes).filter(atk=>ATTACK_EFFECT[atk] && ATTACK_EFFECT[atk].super.includes(defType));
    canCounter[defType]=counters;

    const ranked=moves
      .map(move=>({move,adjustedScore:scoreMoveForDefenderTypeRatingAware(move,defType,ratingsBySlot[move.slot])}))
      .filter(x=>x.adjustedScore.score>0)
      .sort((a,b)=>b.adjustedScore.score-a.adjustedScore.score || b.adjustedScore.baseScore-a.adjustedScore.baseScore);

    bestCounters[defType]=ranked[0] || null;
    if(!bestCounters[defType]) hardToCounter.push(defType);
  });

  function pills(obj,min){
    return Object.keys(obj)
      .filter(k=>obj[k]>=min)
      .sort((a,b)=>obj[b]-obj[a]||a.localeCompare(b))
      .map(k=>`<span class="typePill">${k} ×${obj[k]}</span>`)
      .join(" ") || '<span class="smallText">None</span>';
  }

  function typeList(arr){
    return arr.length ? arr.sort().map(t=>`<span class="typePill">${t}</span>`).join(" ") : '<span class="smallText">None</span>';
  }

  function abilityRows(){
    return abilityNotes.length ? abilityNotes.map(n => `<div class="smallText">${escapeHtml(n)}</div>`).join("") : '<span class="smallText">None selected/relevant</span>';
  }

  function counterRows(){
    return allTypes.sort().map(t=>{
      const best=bestCounters[t];
      if(best){
        const m=best.move;
        const modifier = movePracticalityModifier(m.name);
        const practical = modifier !== 1 ? `, practical ×${modifier}` : "";
        const meta = `${displayTypeName(m.type || "?")}${m.power ? `, ${m.power} power` : ""}${m.accuracy ? `, ${m.accuracy}% acc` : ""}${m.category ? `, ${m.category}` : ""}${practical}`;
        const rating=ratingsBySlot[m.slot];
        const ratingText=rating&&rating.overall!==null&&rating.overall!==undefined&&!isNaN(rating.overall)?`, mon rating ${Math.round(rating.overall)}/100`:`, mon rating unavailable`;
        const safetyText=best.adjustedScore.safety?`, ${best.adjustedScore.safety.label}`:"";
        return `<div class="smallText"><b>${displayTypeName(t)}</b>: ${escapeHtml(m.pokemon)} — ${escapeHtml(m.name)} <span class="smallText">(${meta}; move score ${best.adjustedScore.baseScore}${ratingText}${safetyText}; final ${best.adjustedScore.score})</span></div>`;
      }
      return `<div class="smallText"><b>${displayTypeName(t)}</b>: no damaging assigned move</div>`;
    }).join("");
  }

  const coverageGapNotes=buildRatingAwareCoverageGapInsights(bestCounters, allTypes);
  const missingMeta = moves.filter(m => m.name && (!m.type || (!m.power && m.category !== "status"))).length;
  const teamQualityHtml = buildTeamQualityAnalysis(selected);
  if(teamQualityHtml.indexOf("still loading")!==-1 || teamQualityHtml.indexOf("Unavailable")!==-1) schedulePrimeTeamRatingData();

  el.innerHTML=`
    ${teamQualityHtml}
    <div class="analysisBlock"><b>Team Pokémon types</b><br>${typeList(Array.from(teamTypes))}</div>
    <div class="analysisBlock"><b>Assigned move types</b><br>${typeList(Array.from(offensiveTypes))}</div>
    <div class="analysisBlock"><b>Ability-based defensive adjustments</b><br>${abilityRows()}</div>
    ${missingMeta ? `<div class="analysisBlock"><b>Move metadata loading</b><br><span class="smallText">${missingMeta} move(s) still need metadata. Re-select or wait briefly after choosing moves.</span></div>` : ""}
    <div class="analysisBlock"><b>Best actual move counters by defending type</b><br>${counterRows()}${coverageGapNotes.length?`<div class="smallText" style="margin-top:6px"><b>Rating-aware coverage notes:</b><br>${coverageGapNotes.map(n=>"⚠ "+escapeHtml(n)).join("<br>")}</div>`:""}</div>
    <div class="analysisBlock"><b>Types to be wary of offensively</b><br>${typeList(hardToCounter)}<br><span class="smallText">Types where no selected damaging move is super-effective. Neutral hits no longer count as counters here. The counter table above uses move power, accuracy, category, STAB, type effectiveness, Pokémon rating, and whether the recommended Pokémon safely handles likely same-type attacks.</span></div>
    <div class="analysisBlock"><b>Repeated defensive weaknesses</b><br>${pills(weaknessCounts,2)}</div>
    <div class="analysisBlock"><b>All defensive weaknesses</b><br>${pills(weaknessCounts,1)}</div>
    <div class="analysisBlock"><b>Defensive resistances</b><br>${pills(resistCounts,1)}</div>
    <div class="analysisBlock"><b>Defensive immunities</b><br>${pills(immuneCounts,1)}</div>
  `;
}


function gameVersionKey(){ return STORAGE_PREFIX + "game_version"; }
function getGameVersion(){ return localStorage.getItem(gameVersionKey()) || "leafgreen"; }
function getGameVersionLabel(){ return getGameVersion()==="firered" ? "FireRed" : "LeafGreen"; }

function setGameVersion(version){
  if(version !== "leafgreen" && version !== "firered") return;
  localStorage.setItem(gameVersionKey(), version);
  localStorage.setItem(STORAGE_PREFIX + "game_version", version);
  applyGameVersionTheme();

  // Clear only the in-memory encounter table so the selected version can load its own cache/data.
  ENCOUNTER_LOCATION_DATA = null;
  initLocations();
  renderLocationView();
}


function getFlexBrandHtml(){
  const version = (typeof getGameVersion === "function" ? getGameVersion() : "leafgreen");
  const versionLabel = version === "firered" ? "FireRed" : "LeafGreen";
  const versionClass = version === "firered" ? "firered" : "leafgreen";
  return '<span class="flexBrandF">F</span><span class="flexBrandL">L</span>éX: <span class="flexBrandVersion ' + versionClass + '">' + versionLabel + '</span>';
}

function getFlexBootBrandHtml(){
  return '<span class="flexBrandF">F</span><span class="flexBrandL">L</span>éX';
}

function updateFlexBranding(){
  const title = document.querySelector("h1");
  if(title) title.innerHTML = getFlexBrandHtml();
  document.querySelectorAll(".pokedexBootTitle").forEach(function(el){
    el.innerHTML = getFlexBootBrandHtml();
  });
}

function applyGameVersionTheme(){
  const version = getGameVersion();
  document.body.classList.toggle("version-leafgreen", version==="leafgreen");
  document.body.classList.toggle("version-firered", version==="firered");

  document.querySelectorAll('input[name="gameVersion"]').forEach(r => {
    r.checked = r.value === version;
  });

  updateFlexBranding();
}

function confirmResetArea(label){
  return confirm("Confirm reset " + label + "? This clears saved " + label + " data from this browser.");
}


function trackerBackupPrefixes(){
  return [STORAGE_PREFIX, DATA_PREFIX];
}

function isTrackerBackupKey(storageKey){
  return trackerBackupPrefixes().some(function(prefix){
    return storageKey && storageKey.indexOf(prefix) === 0;
  });
}

function exportAllTrackerData(){
  const prefixes = trackerBackupPrefixes();
  const data = {
    app: "pokemon-living-dex",
    version: 2,
    exportedAt: new Date().toISOString(),
    storagePrefixes: prefixes,
    storagePrefix: STORAGE_PREFIX,
    dataPrefix: DATA_PREFIX,
    localStorage: {}
  };

  for(let i=0;i<localStorage.length;i++){
    const k = localStorage.key(i);
    if(isTrackerBackupKey(k)){
      data.localStorage[k] = localStorage.getItem(k);
    }
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pokemon_living_dex_backup.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

function importAllTrackerData(event){
  const file = event.target.files && event.target.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = function(){
    try{
      const data = JSON.parse(reader.result);
      if(!data || !data.localStorage || typeof data.localStorage !== "object"){
        throw new Error("Invalid backup file.");
      }

      if(!confirm("Restore all tracker data from this backup? This will replace existing saved tracker data and cached PokéAPI data in this browser.")){
        event.target.value = "";
        return;
      }

      const keysToRemove = [];
      for(let i=0;i<localStorage.length;i++){
        const k = localStorage.key(i);
        if(isTrackerBackupKey(k)) keysToRemove.push(k);
      }
      keysToRemove.forEach(function(k){ localStorage.removeItem(k); });

      Object.keys(data.localStorage).forEach(function(k){
        if(isTrackerBackupKey(k)){
          localStorage.setItem(k, data.localStorage[k]);
        }
      });

      alert("Backup restored. The page will reload now.");
      location.reload();
    }catch(e){
      alert("Could not restore backup. The file may not be a valid tracker backup.");
    }finally{
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}


function resetDexData(){
  if(!confirmResetArea("Dex")) return;
  for(let i=1;i<=386;i++){
    const id=String(i).padStart(3,"0");
    localStorage.removeItem(key(id,"dex"));
    localStorage.removeItem(key(id,"living"));
    localStorage.removeItem(key(id,"qty"));
    const dex=document.getElementById("dex_"+id);
    if(dex) dex.checked=false;
  }
  localStorage.removeItem(unownVariantsKey());
  updateUnownVariantUi();
  updateDexOwnershipFromMons();
  updateStats();
  applyFilter();
  alert("Dex data reset.");
}

function resetMyMonsData(){
  if(!confirmResetArea("My Mon's")) return;
  localStorage.removeItem(myMonsKey());
  updateDexOwnershipFromMons();
  renderMyMons();
  populateTeamBuilderSelectors();
  analyzeTeam();
  alert("My Mon's data reset.");
}

function resetTeamBuilderData(){
  if(!confirmResetArea("Team Builder")) return;
  localStorage.removeItem(teamSaveKey());
  localStorage.removeItem(currentTeamIdKey());
  for(let i=0;i<6;i++){
    localStorage.removeItem(teamKey(i));
  }
  populateTeamLoadSelect();
  clearTeamSlots(false);
  alert("Team Builder data reset.");
}


function populateTypeDropdowns(){
  const typeOrder = ["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel"];
  const selects = [document.getElementById("typeFilter1"), document.getElementById("typeFilter2")].filter(Boolean);
  if(!selects.length) return;

  selects.forEach((select, index) => {
    const current = select.value;
    const firstLabel = index === 0 ? "Type" : "Additional Type";
    select.innerHTML = `<option value="">${firstLabel}</option>` +
      typeOrder.map(t => `<option value="${t}">${t[0].toUpperCase() + t.slice(1)}</option>`).join("");
    select.value = current;
  });
}

function clearTextAndTypeFilters(){
  const searchEl = document.getElementById("nameSearch");
  const type1El = document.getElementById("typeFilter1");
  const type2El = document.getElementById("typeFilter2");
  if(searchEl) searchEl.value = "";
  if(type1El) type1El.value = "";
  if(type2El) type2El.value = "";
  applyFilter();
}

populateTypeDropdowns();
ensureAbilityOptionsLoaded(false);
initLocations();
function updateBottomProgressVisibility(){
  const bar = document.getElementById("bottomProgressBar");
  const header = document.querySelector("header");
  const tabs = document.querySelector(".tabBar");
  if(!bar || !header || !tabs) return;
  const threshold = Math.max(24, header.offsetHeight - tabs.offsetHeight);
  const visible = window.scrollY > threshold;
  if(visible){
    bar.classList.add("visible");
    header.classList.add("headerFaded");
  }else{
    bar.classList.remove("visible");
    header.classList.remove("headerFaded");
  }
}

window.addEventListener("scroll", updateBottomProgressVisibility, {passive:true});
window.addEventListener("resize", updateBottomProgressVisibility);

init();
renderProgress();
renderTeamBuilder();


/* FireRed/LeafGreen Dex display override - added safely without touching tab navigation */
const FR_DEX_OBTAIN_OVERRIDES_SAFE = {"023": "Catchable: yes in FireRed. Best: Routes 4, 8, 9, 10, 11, 23. Evolves to Arbok at Lv22.", "024": "Catchable: yes in FireRed. Best: Victory Road, or evolve Ekans at Lv22.", "027": "Not obtainable in FireRed wild. Trade from LeafGreen. Evolves to Sandslash at Lv22.", "028": "Not obtainable in FireRed wild. Trade from LeafGreen or evolve Sandshrew at Lv22.", "037": "Not obtainable in FireRed wild. Trade from LeafGreen. Evolves with Fire Stone.", "038": "Not obtainable in FireRed wild. Use Fire Stone on Vulpix traded from LeafGreen.", "043": "Catchable: yes in FireRed. Best: Routes 5-8, 12-15. Evolves to Gloom at Lv21.", "044": "Catchable: yes in FireRed. Best: Routes 12-15, or evolve Oddish at Lv21. Evolves with Leaf Stone or Sun Stone.", "045": "Catchable: no wild. Use Leaf Stone on Gloom.", "052": "Not obtainable in FireRed wild. Trade from LeafGreen. Evolves to Persian at Lv28.", "053": "Not obtainable in FireRed wild. Trade from LeafGreen or evolve Meowth at Lv28.", "054": "Catchable: yes in FireRed. Best: Seafoam Islands, Cape Brink, Berry Forest. Evolves to Golduck at Lv33.", "055": "Catchable: yes in FireRed. Best: Seafoam/Cape Brink, or evolve Psyduck at Lv33.", "058": "Catchable: yes in FireRed. Best: Routes 7-8 or Pokémon Mansion. Evolves with Fire Stone.", "059": "Catchable: no wild. Use Fire Stone on Growlithe.", "069": "Not obtainable in FireRed wild. Trade from LeafGreen. Evolves to Weepinbell at Lv21.", "070": "Not obtainable in FireRed wild. Trade from LeafGreen or evolve Bellsprout at Lv21. Evolves with Leaf Stone.", "071": "Not obtainable in FireRed wild. Use Leaf Stone on Weepinbell traded from LeafGreen.", "079": "Not obtainable in FireRed wild. Trade from LeafGreen. Evolves to Slowbro at Lv37 or Slowking by King's Rock trade.", "080": "Not obtainable in FireRed wild. Trade from LeafGreen or evolve Slowpoke at Lv37.", "090": "Catchable: yes in FireRed. Best: fishing with Super Rod on sea routes/caves. Evolves with Water Stone.", "091": "Catchable: no wild. Use Water Stone on Shellder.", "120": "Not obtainable in FireRed wild. Trade from LeafGreen. Evolves with Water Stone.", "121": "Not obtainable in FireRed wild. Use Water Stone on Staryu traded from LeafGreen.", "123": "Catchable: yes in FireRed. Best: Safari Zone. Evolves to Scizor by Metal Coat trade after National Dex.", "125": "Catchable: yes in FireRed. Best: Power Plant.", "126": "Not obtainable in FireRed wild. Trade from LeafGreen or evolve Magby from another game.", "127": "Not obtainable in FireRed wild. Trade from LeafGreen.", "165": "Catchable: yes in FireRed after National Dex. Best: Pattern Bush. Evolves to Ledian at Lv18.", "166": "Catchable: yes in FireRed after National Dex. Best: Pattern Bush, or evolve Ledyba at Lv18.", "167": "Not obtainable in FireRed wild. Trade from LeafGreen. Evolves to Ariados at Lv22.", "168": "Not obtainable in FireRed wild. Trade from LeafGreen or evolve Spinarak at Lv22.", "200": "Not obtainable in FireRed wild. Trade from LeafGreen.", "211": "Catchable: yes in FireRed after National Dex. Best: fishing in Sevii Islands.", "215": "Not obtainable in FireRed wild. Trade from LeafGreen.", "223": "Not obtainable in FireRed wild. Trade from LeafGreen. Evolves to Octillery at Lv25.", "224": "Not obtainable in FireRed wild. Trade from LeafGreen or evolve Remoraid at Lv25.", "225": "Catchable: yes in FireRed after National Dex. Sevii Islands.", "226": "Not obtainable in FireRed wild. Trade from LeafGreen."};
const VERSION_EXCLUSIVE_SAFE = {
  leafgreen: new Set(["027","028","037","038","052","053","069","070","071","079","080","120","121","126","127","167","168","198","200","215","223","224","226"]),
  firered: new Set(["023","024","043","044","045","054","055","058","059","090","091","123","125","165","166","198","211","225","227"])
};
const TRADE_REQUIRED_SAFE = new Set(["065","068","076","094","186","199","208","212","230","233"]);
const EVENT_EXTERNAL_SAFE = new Set(["151","249","250","251","152","153","154","155","156","157","158","159","160","179","180","181","185","191","192","194","195","203","204","205","207","209","210","213","214","216","217","222","228","229","231","232","234","235","241","246","247","248","252","253","254","255","256","257","258","259","260","261","262","263","264","265","266","267","268","269","270","271","272","273","274","275","276","277","278","279","280","281","282","283","284","285","286","287","288","289","290","291","292","293","294","295","296","297","298","299","300","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","341","342","343","344","345","346","347","348","349","350","351","352","353","354","355","356","357","358","359","360","361","362","363","364","365","366","367","368","369","370","371","372","373","374","375","376","377","378","379","380","381","382","383","384","385","386"]);

function safeGameLabel(){
  return getGameVersion()==="firered" ? "FireRed" : "LeafGreen";
}

function safeOtherGameLabel(){
  return getGameVersion()==="firered" ? "LeafGreen" : "FireRed";
}

function initialiseOriginalObtainTextSafe(){
  document.querySelectorAll(".card").forEach(card => {
    const obtain = card.querySelector(".obtain");
    if(obtain && !obtain.dataset.originalLeafgreen){
      obtain.dataset.originalLeafgreen = obtain.textContent.trim();
    }
  });
}

function obtainTextForVersionSafe(id){
  const card = document.querySelector(`.card[data-id="${id}"]`);
  const obtain = card ? card.querySelector(".obtain") : null;
  const lg = obtain ? (obtain.dataset.originalLeafgreen || obtain.textContent.trim()) : "";
  if(getGameVersion()==="firered"){
    return FR_DEX_OBTAIN_OVERRIDES_SAFE[id] || lg.replaceAll("LeafGreen","FireRed").replaceAll("FireRed wild. Trade from FireRed","FireRed wild. Trade from LeafGreen");
  }
  return lg;
}

function applyDexVersionDisplaySafe(){
  initialiseOriginalObtainTextSafe();
  const label = safeGameLabel();

  updateFlexBranding();

  document.querySelectorAll("button").forEach(btn => {
    if(btn.textContent.includes("Missing + LeafGreen obtainable") || btn.textContent.includes("Missing + FireRed obtainable")){
      btn.textContent = `Missing + ${label} obtainable`;
    }
  });

  document.querySelectorAll(".obtainDetails summary").forEach(s => {
    s.textContent = `${label} obtain method`;
  });

  document.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    const obtain = card.querySelector(".obtain");
    const badge = card.querySelector(".badge");
    const text = obtainTextForVersionSafe(id);
    if(obtain) obtain.textContent = text;

    if(!badge) return;

    const lower = text.toLowerCase();
    let badgeText = `${label} obtainable`;
    let badgeClass = "badge ";

    if(TRADE_REQUIRED_SAFE.has(id)){
      badgeText = "Trade/special required";
      badgeClass = "badge trade";
    } else if(EVENT_EXTERNAL_SAFE.has(id)){
      badgeText = "Unavailable / special";
      badgeClass = "badge no";
    } else if(lower.startsWith("not obtainable") || lower.includes("trade from " + safeOtherGameLabel().toLowerCase())){
      badgeText = "Unavailable / special";
      badgeClass = "badge no";
    }

    badge.className = badgeClass;
    badge.textContent = badgeText;
  });

  try { renderProgress(); } catch(e) {}
  try { applyFilter(); } catch(e) {}
}

const originalSetGameVersionSafe = setGameVersion;
setGameVersion = function(version){
  originalSetGameVersionSafe(version);
  applyDexVersionDisplaySafe();
};

document.addEventListener("DOMContentLoaded", function(){
  setTimeout(applyDexVersionDisplaySafe, 0);
});
setTimeout(applyDexVersionDisplaySafe, 0);


/* Persistent game-version boot fix */
function bootApplySavedGameVersion(){
  try{
    if(typeof applyGameVersionTheme === "function") applyGameVersionTheme();
    if(typeof applyDexVersionDisplaySafe === "function") applyDexVersionDisplaySafe();

    const version = (typeof getGameVersion === "function") ? getGameVersion() : (localStorage.getItem(STORAGE_PREFIX + "game_version") || "leafgreen");
    document.body.classList.toggle("version-leafgreen", version === "leafgreen");
    document.body.classList.toggle("version-firered", version === "firered");

    document.querySelectorAll('input[name="gameVersion"]').forEach(r => {
      r.checked = r.value === version;
    });
  }catch(e){}
}

document.addEventListener("DOMContentLoaded", bootApplySavedGameVersion);
window.addEventListener("load", bootApplySavedGameVersion);
setTimeout(bootApplySavedGameVersion, 0);
setTimeout(bootApplySavedGameVersion, 250);


/* Safe move-index settings/autobuild patch */
function updateMoveIndexStatusSafe(){
  try{
    const el = document.getElementById("moveIndexStatus");
    if(!el) return;

    if(typeof DEX_MOVE_REFERENCE_BUILDING !== "undefined" && DEX_MOVE_REFERENCE_BUILDING){
      el.textContent = `Building ${DEX_MOVE_REFERENCE_PROGRESS.done}/${DEX_MOVE_REFERENCE_PROGRESS.total}`;
    } else if(typeof dexMoveReferenceReady === "function" && dexMoveReferenceReady()){
      el.textContent = "Move index built";
    } else {
      el.textContent = "Move index not built";
    }
  }catch(e){}
}

if(typeof buildDexMoveReferenceIndex === "function" && !buildDexMoveReferenceIndex._safeSettingsWrapped){
  const originalBuildDexMoveReferenceIndexSafe = buildDexMoveReferenceIndex;
  buildDexMoveReferenceIndex = async function(force){
    const result = await originalBuildDexMoveReferenceIndexSafe(force);
    updateMoveIndexStatusSafe();
    return result;
  };
  buildDexMoveReferenceIndex._safeSettingsWrapped = true;
}

if(typeof scheduleDexMoveFilter === "function" && !scheduleDexMoveFilter._safeAutoBuildWrapped){
  scheduleDexMoveFilter = function(){
    clearTimeout(DEX_MOVE_FILTER_TIMER);
    if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();

    DEX_MOVE_FILTER_TIMER = setTimeout(async function(){
      const move = document.getElementById("dexMoveFilter")?.value || "";
      const apiName = typeof dexNormaliseMoveName === "function" ? dexNormaliseMoveName(move) : "";

      if(apiName && typeof dexMoveReferenceReady === "function" && !dexMoveReferenceReady()){
        if(typeof DEX_MOVE_REFERENCE_BUILDING === "undefined" || !DEX_MOVE_REFERENCE_BUILDING){
          await buildDexMoveReferenceIndex(false);
        }
      }

      if(typeof applyFilter === "function") applyFilter();
      updateMoveIndexStatusSafe();
    }, 200);
  };
  scheduleDexMoveFilter._safeAutoBuildWrapped = true;
}

if(typeof dexMoveIndexStatusText === "function" && !dexMoveIndexStatusText._safeStatusWrapped){
  const originalDexMoveIndexStatusTextSafe = dexMoveIndexStatusText;
  dexMoveIndexStatusText = function(){
    updateMoveIndexStatusSafe();
    if(typeof DEX_MOVE_REFERENCE_BUILDING !== "undefined" && DEX_MOVE_REFERENCE_BUILDING){
      return ` (building ${DEX_MOVE_REFERENCE_PROGRESS.done}/${DEX_MOVE_REFERENCE_PROGRESS.total})`;
    }
    if(typeof dexMoveReferenceReady === "function" && !dexMoveReferenceReady()){
      return " (index not built)";
    }
    return originalDexMoveIndexStatusTextSafe();
  };
  dexMoveIndexStatusText._safeStatusWrapped = true;
}

document.addEventListener("DOMContentLoaded", updateMoveIndexStatusSafe);
window.addEventListener("load", updateMoveIndexStatusSafe);
setTimeout(updateMoveIndexStatusSafe, 0);


/* Swipe between tabs */
const TAB_SWIPE_ORDER = ["dexTab","locationTab","progressTab","myMonsTab","teamTab","ivTab","settingsTab"];
let tabSwipeStartX = 0;
let tabSwipeStartY = 0;
let tabSwipeStartTime = 0;
let tabSwipeTracking = false;
let tabSwipeDirection = 0;
const TAB_SWIPE_THRESHOLD = 110;
const TAB_SWIPE_MAX_VISUAL = 150;

function getActiveTabId(){
  const active = document.querySelector(".tabPage.active");
  return active ? active.id : "dexTab";
}

function getTabButtonLabel(tabId){
  const btn = document.querySelector(`.tabButton[data-tab="${tabId}"]`);
  return btn ? btn.textContent.trim() : "";
}

function resetSwipeVisual(){
  const active = document.querySelector(".tabPage.active");
  if(active){
    active.style.transform = "";
    active.style.opacity = "";
  }

  document.body.classList.remove("swiping-tab");
}

function updateSwipeVisual(dx){
  const active = document.querySelector(".tabPage.active");

  const current = getActiveTabId();
  const index = TAB_SWIPE_ORDER.indexOf(current);
  const direction = dx < 0 ? 1 : -1;
  const nextIndex = index + direction;

  if(index === -1 || nextIndex < 0 || nextIndex >= TAB_SWIPE_ORDER.length){
    resetSwipeVisual();
    return;
  }

  tabSwipeDirection = direction;
  const absDx = Math.abs(dx);
  const visualDx = Math.max(-TAB_SWIPE_MAX_VISUAL, Math.min(TAB_SWIPE_MAX_VISUAL, dx * 0.45));
  const progress = Math.min(1, absDx / TAB_SWIPE_THRESHOLD);

  document.body.classList.add("swiping-tab");

  if(active){
    active.style.transform = `translateX(${visualDx}px)`;
    active.style.opacity = String(1 - (progress * 0.18));
  }
}

function swipeToAdjacentTab(direction){
  const current = getActiveTabId();
  const index = TAB_SWIPE_ORDER.indexOf(current);
  if(index === -1) return;

  const nextIndex = index + direction;
  if(nextIndex < 0 || nextIndex >= TAB_SWIPE_ORDER.length) return;

  resetSwipeVisual();
  showTab(TAB_SWIPE_ORDER[nextIndex]);

  const activeButton = document.querySelector(`.tabButton[data-tab="${TAB_SWIPE_ORDER[nextIndex]}"]`);
  if(activeButton && activeButton.scrollIntoView){
    activeButton.scrollIntoView({behavior:"smooth", inline:"center", block:"nearest"});
  }

  window.scrollTo({top:0, behavior:"smooth"});
}

function shouldIgnoreSwipeTarget(target){
  if(!target) return false;
  return !!target.closest("input, textarea, select, button, label, summary, details, .locSummaryLink");
}

document.addEventListener("touchstart", function(e){
  if(!e.touches || e.touches.length !== 1) return;
  if(shouldIgnoreSwipeTarget(e.target)) return;

  tabSwipeStartX = e.touches[0].clientX;
  tabSwipeStartY = e.touches[0].clientY;
  tabSwipeStartTime = Date.now();
  tabSwipeTracking = true;
  tabSwipeDirection = 0;
}, {passive:true});

document.addEventListener("touchmove", function(e){
  if(!tabSwipeTracking || !e.touches || e.touches.length !== 1) return;

  const dx = e.touches[0].clientX - tabSwipeStartX;
  const dy = e.touches[0].clientY - tabSwipeStartY;

  if(Math.abs(dx) < 18 && Math.abs(dy) < 18) return;

  // Vertical scroll wins unless the gesture is clearly horizontal.
  if(Math.abs(dx) < Math.abs(dy) * 1.25){
    resetSwipeVisual();
    tabSwipeTracking = false;
    return;
  }

  updateSwipeVisual(dx);
}, {passive:true});

document.addEventListener("touchend", function(e){
  if(!tabSwipeStartTime || !e.changedTouches || e.changedTouches.length !== 1){
    resetSwipeVisual();
    return;
  }

  const dx = e.changedTouches[0].clientX - tabSwipeStartX;
  const dy = e.changedTouches[0].clientY - tabSwipeStartY;
  const elapsed = Date.now() - tabSwipeStartTime;

  tabSwipeStartTime = 0;
  tabSwipeTracking = false;

  const validSwipe = Math.abs(dx) >= TAB_SWIPE_THRESHOLD &&
    Math.abs(dx) >= Math.abs(dy) * 1.35;

  if(validSwipe){
    swipeToAdjacentTab(dx < 0 ? 1 : -1);
  } else {
    resetSwipeVisual();
  }
}, {passive:true});

document.addEventListener("touchcancel", function(){
  tabSwipeStartTime = 0;
  tabSwipeTracking = false;
  resetSwipeVisual();
}, {passive:true});


/* Cross-navigation buttons: Dex <-> My Mon's */
function speciesFilterDisplayValue(speciesId){
  speciesId = String(speciesId || "").padStart(3, "0");
  if(typeof monSpeciesDisplayFromId === "function") return monSpeciesDisplayFromId(speciesId);
  const card = document.querySelector('.card[data-id="' + speciesId + '"]');
  return card ? ("#" + speciesId + " " + (card.dataset.name || "")) : speciesId;
}

function filterMyMonsToSpecies(speciesId){
  speciesId = String(speciesId || "").padStart(3, "0");
  const search = document.getElementById("myMonsSearch");
  const type = document.getElementById("myMonsTypeFilter");
  const type2 = document.getElementById("myMonsTypeFilter2");
  const nature = document.getElementById("myMonsNatureFilter");
  const ability = document.getElementById("myMonsAbilityFilter");
  const oldMove = document.getElementById("myMonsMoveFilter");

  if(search) search.value = speciesFilterDisplayValue(speciesId);
  if(type) type.value = "";
  if(type2) type2.value = "";
  if(nature) nature.value = "";
  if(ability) ability.value = "";
  if(oldMove) oldMove.value = "";
  for(let i = 0; i < 4; i++){
    const move = document.getElementById("myMonsMoveFilter_" + i);
    if(move) move.value = "";
  }

  if(typeof showTab === "function") showTab("myMonsTab");
  if(typeof updateSpeciesDatalistForInput === "function" && search) updateSpeciesDatalistForInput(search, "myMonsSpeciesFilterOptions");
  if(typeof renderMyMons === "function") renderMyMons();
  setTimeout(function(){
    const list = document.getElementById("myMonsList");
    if(list) list.scrollIntoView({behavior:"smooth", block:"start"});
  }, 50);
}

function filterDexToSpecies(speciesId){
  speciesId = String(speciesId || "").padStart(3, "0");
  if(typeof clearDexFilters === "function") clearDexFilters();
  currentFilter = "all";

  const search = document.getElementById("nameSearch");
  if(search) search.value = speciesFilterDisplayValue(speciesId);
  if(typeof updateSpeciesDatalistForInput === "function" && search) updateSpeciesDatalistForInput(search, "dexSpeciesFilterOptions");

  if(typeof showTab === "function") showTab("dexTab");
  if(typeof applyFilter === "function") applyFilter();
  setTimeout(function(){
    const card = document.querySelector('.card[data-id="' + speciesId + '"]');
    if(card) card.scrollIntoView({behavior:"smooth", block:"center"});
  }, 50);
}

function updateDexMyMonButtonStates(){
  document.querySelectorAll(".dexMyMonsButton").forEach(function(btn){
    const id = btn.dataset.speciesId;
    const qtyEl = document.getElementById("qty_" + id);
    const qty = qtyEl ? (parseInt(qtyEl.value, 10) || 0) : 0;
    btn.disabled = qty <= 0;
    btn.title = qty > 0 ? "View saved " + speciesFilterDisplayValue(id) + " profiles" : "No saved My Mon profiles for this species";
  });
}

function addDexMyMonButtons(){
  document.querySelectorAll(".card").forEach(function(card){
    const id = card.dataset.id;
    if(!id || card.querySelector(".dexMyMonsButton")) return;
    const row = card.querySelector(".extraTrack");
    if(!row) return;
    const addBtn = Array.from(row.querySelectorAll("button")).find(function(btn){ return (btn.textContent || "").trim() === "Add Mon"; });
    if(!addBtn) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "miniButton dexMyMonsButton";
    btn.dataset.speciesId = id;
    btn.textContent = "My Mon";
    btn.onclick = function(){ filterMyMonsToSpecies(id); };
    addBtn.insertAdjacentElement("afterend", btn);
  });
  updateDexMyMonButtonStates();
}

if(typeof updateDexOwnershipFromMons === "function" && !updateDexOwnershipFromMons._crossNavWrapped){
  const originalUpdateDexOwnershipFromMons = updateDexOwnershipFromMons;
  updateDexOwnershipFromMons = function(){
    const result = originalUpdateDexOwnershipFromMons.apply(this, arguments);
    addDexMyMonButtons();
    updateDexMyMonButtonStates();
    return result;
  };
  updateDexOwnershipFromMons._crossNavWrapped = true;
}

document.addEventListener("DOMContentLoaded", function(){
  if(typeof updateDexOwnershipFromMons === "function") updateDexOwnershipFromMons();
  addDexMyMonButtons();
  updateDexMyMonButtonStates();
});
window.addEventListener("load", function(){
  if(typeof updateDexOwnershipFromMons === "function") updateDexOwnershipFromMons();
  addDexMyMonButtons();
  updateDexMyMonButtonStates();
});
setTimeout(function(){ addDexMyMonButtons(); updateDexMyMonButtonStates(); }, 0);
setTimeout(function(){ addDexMyMonButtons(); updateDexMyMonButtonStates(); }, 300);


/* Tutor + Egg move display/filter enhancement */
(function(){
  const MOVE_REFERENCE_SCHEMA = "frlg_tutor_egg_v1";
  const RAW_POKEMON_CACHE_PREFIX = STORAGE_PREFIX + "raw_pokemon_v1_";
  const RAW_SPECIES_CACHE_PREFIX = STORAGE_PREFIX + "raw_species_v1_";
  const RAW_MOVE_CACHE_PREFIX = STORAGE_PREFIX + "raw_move_v1_";
  const EGG_DONOR_CACHE_PREFIX = STORAGE_PREFIX + "egg_donors_v1_";

  function injectEggMoveStyles(){
    if(document.getElementById("eggMoveStyles")) return;
    const style = document.createElement("style");
    style.id = "eggMoveStyles";
    style.textContent = '.eggMoveButton{border:0;background:transparent;color:var(--blue);padding:0;margin:0;cursor:pointer;font:inherit;text-align:left;text-decoration:underline;text-decoration-style:dotted}.eggMoveButton:hover{background:transparent;color:#1d4ed8}.eggDonorRow{margin:3px 0 6px 18px;padding:5px 8px;border-left:3px solid var(--version-border,#bfdbfe);background:#f9fafb;border-radius:6px;color:#374151;font-size:12px;line-height:1.35}.eggDonorRow.hidden{display:none!important}';
    document.head.appendChild(style);
  }
  function safeJsonParse(value, fallback){ try{return JSON.parse(value);}catch(e){return fallback;} }
  function getCachedJson(key){ const raw = localStorage.getItem(key); return raw ? safeJsonParse(raw, null) : null; }
  function setCachedJson(key, value){ try{localStorage.setItem(key, JSON.stringify(value));}catch(e){} }
  function pokemonIdFromUrl(url){ const m = String(url || "").match(/\/pokemon\/(\d+)\/?$/); return m ? parseInt(m[1],10) : 0; }
  function displaySpeciesNameById(id, fallback){
    const padded = String(id).padStart(3,"0");
    const card = document.querySelector('.card[data-id="' + padded + '"]');
    const name = card && card.dataset && card.dataset.name ? card.dataset.name : (fallback || "");
    return "#" + padded + " " + (name || formatMoveName(String(fallback || "pokemon")));
  }
  async function fetchJsonCached(url, key){
    const cached = getCachedJson(key); if(cached) return cached;
    const response = await fetch(url); if(!response.ok) throw new Error("PokéAPI request failed");
    const data = await response.json(); setCachedJson(key, data); return data;
  }
  async function fetchRawPokemonById(id){ return fetchJsonCached("https://pokeapi.co/api/v2/pokemon/" + parseInt(id,10) + "/", RAW_POKEMON_CACHE_PREFIX + parseInt(id,10)); }
  async function fetchRawSpeciesById(id){ return fetchJsonCached("https://pokeapi.co/api/v2/pokemon-species/" + parseInt(id,10) + "/", RAW_SPECIES_CACHE_PREFIX + parseInt(id,10)); }
  async function fetchRawMoveByName(moveName){ const apiName = dexNormaliseMoveName(moveName); return fetchJsonCached("https://pokeapi.co/api/v2/move/" + apiName + "/", RAW_MOVE_CACHE_PREFIX + apiName); }

  function frlgMoveDetailMethod(detail){
    if(!detail || !detail.version_group || !detail.move_learn_method) return "";
    if(detail.version_group.name !== "firered-leafgreen") return "";
    return detail.move_learn_method.name || "";
  }
  function frlgAnyMoveAllowed(detail){ const method = frlgMoveDetailMethod(detail); return method === "level-up" || method === "machine" || method === "tutor" || method === "egg"; }
  function frlgDirectDonorMoveAllowed(detail){ const method = frlgMoveDetailMethod(detail); return method === "level-up" || method === "machine" || method === "tutor"; }

  window.frlgNonEggMoveAllowed = frlgAnyMoveAllowed;
  window.cardMoveListFromPokemonData = function(data){
    return (data.moves || [])
      .filter(function(moveRecord){ return (moveRecord.version_group_details || []).some(frlgAnyMoveAllowed); })
      .map(function(moveRecord){ return dexNormaliseMoveName(moveRecord.move && moveRecord.move.name ? moveRecord.move.name : ""); })
      .filter(Boolean);
  };

  function invalidateOldMoveReferenceIndexIfNeeded(){
    const meta = getCachedJson(DEX_MOVE_REFERENCE_META_KEY) || {};
    if(meta.schema === MOVE_REFERENCE_SCHEMA) return;
    try{ localStorage.removeItem(DEX_MOVE_REFERENCE_KEY); DEX_MOVE_REFERENCE_INDEX = {}; localStorage.setItem(DEX_MOVE_REFERENCE_META_KEY, JSON.stringify({schema:MOVE_REFERENCE_SCHEMA, count:0, builtAt:null})); }
    catch(e){ DEX_MOVE_REFERENCE_INDEX = {}; }
  }
  invalidateOldMoveReferenceIndexIfNeeded();
  window.saveDexMoveReferenceIndex = function(){
    try{
      localStorage.setItem(DEX_MOVE_REFERENCE_KEY, JSON.stringify(DEX_MOVE_REFERENCE_INDEX));
      localStorage.setItem(DEX_MOVE_REFERENCE_META_KEY, JSON.stringify({schema:MOVE_REFERENCE_SCHEMA,builtAt:new Date().toISOString(),count:Object.keys(DEX_MOVE_REFERENCE_INDEX || {}).length}));
    }catch(e){}
  };

  function payloadHasTutorEggMoveData(payload){ return payload && payload.moveSchemaVersion === MOVE_REFERENCE_SCHEMA && Array.isArray(payload.tutorMoves) && Array.isArray(payload.eggMoves); }

  window.fetchPokemonData = async function(pokeid){
    const data = await fetchRawPokemonById(pokeid);
    const types = data.types.sort(function(a,b){return a.slot-b.slot;}).map(function(t){return t.type.name;});
    const abilities = (data.abilities || []).filter(function(a){return !a.is_hidden;}).map(function(a){return {name:a.ability && a.ability.name ? a.ability.name : "", hidden:!!a.is_hidden};}).filter(function(a){return a.name;}).sort(function(a,b){return displayAbilityName(a.name).localeCompare(displayAbilityName(b.name));});
    const levelMap = new Map(), machineMap = new Map(), tutorMap = new Map(), eggMap = new Map();
    (data.moves || []).forEach(function(moveEntry){
      const moveName = moveEntry.move && moveEntry.move.name ? moveEntry.move.name : ""; if(!moveName) return;
      (moveEntry.version_group_details || []).forEach(function(vgd){
        const method = frlgMoveDetailMethod(vgd); if(!method) return;
        if(method === "level-up"){ const level = vgd.level_learned_at || 0; const existing = levelMap.get(moveName); if(existing === undefined || level < existing) levelMap.set(moveName, level); }
        if(method === "machine") machineMap.set(moveName, true);
        if(method === "tutor") tutorMap.set(moveName, true);
        if(method === "egg") eggMap.set(moveName, true);
      });
    });
    const levelMoves = Array.from(levelMap.entries()).map(function(x){return {name:x[0], level:x[1]};}).sort(function(a,b){return a.level-b.level || a.name.localeCompare(b.name);});
    const machineMoves = Array.from(machineMap.keys()).map(function(name){return {name:name};}).sort(function(a,b){return machineSortValue(a.name)-machineSortValue(b.name) || a.name.localeCompare(b.name);});
    const tutorMoves = Array.from(tutorMap.keys()).map(function(name){return {name:name};}).sort(function(a,b){return formatMoveName(a.name).localeCompare(formatMoveName(b.name));});
    const eggMoves = Array.from(eggMap.keys()).map(function(name){return {name:name};}).sort(function(a,b){return formatMoveName(a.name).localeCompare(formatMoveName(b.name));});
    return {types:types, abilities:abilities, levelMoves:levelMoves, machineMoves:machineMoves, tutorMoves:tutorMoves, eggMoves:eggMoves, moveSchemaVersion:MOVE_REFERENCE_SCHEMA, cachedAt:new Date().toISOString()};
  };

  window.renderMoves = function(id, payload){
    injectEggMoveStyles();
    const el = document.getElementById("moves_" + id); if(!el) return;
    const card = document.querySelector('.card[data-id="' + id + '"]');
    const pokeid = card && card.dataset && card.dataset.pokeid ? card.dataset.pokeid : String(parseInt(id,10));
    const levelMoves = payload.levelMoves || [], machineMoves = payload.machineMoves || [], tutorMoves = payload.tutorMoves || [], eggMoves = payload.eggMoves || [];
    const levelHtml = levelMoves.length ? '<ul class="move-list">' + levelMoves.map(function(m){return '<li>Lv ' + m.level + ': ' + formatMoveName(m.name) + '</li>';}).join("") + '</ul>' : '<div class="loading">No level-up moves listed for FireRed/LeafGreen.</div>';
    const machineHtml = machineMoves.length ? '<ul class="move-list">' + machineMoves.map(function(m){return '<li>' + formatMachineMove(m.name) + '</li>';}).join("") + '</ul>' : '<div class="loading">No TM/HM moves listed for FireRed/LeafGreen.</div>';
    const tutorHtml = tutorMoves.length ? '<ul class="move-list">' + tutorMoves.map(function(m){return '<li>' + formatMoveName(m.name) + '</li>';}).join("") + '</ul>' : '<div class="loading">No move tutor moves listed for FireRed/LeafGreen.</div>';
    const eggHtml = eggMoves.length ? '<ul class="move-list">' + eggMoves.map(function(m){return '<li><button type="button" class="eggMoveButton" data-pokeid="' + pokeid + '" data-move="' + m.name + '">' + formatMoveName(m.name) + '</button><div class="eggDonorRow hidden" data-pokeid="' + pokeid + '" data-move="' + m.name + '"></div></li>';}).join("") + '</ul>' : '<div class="loading">No egg moves listed for FireRed/LeafGreen.</div>';
    el.innerHTML = '<div class="move-section"><div class="move-title">Level-up moves</div>' + levelHtml + '</div><div class="move-section"><div class="move-title">TM/HM compatible moves</div>' + machineHtml + '</div><div class="move-section"><div class="move-title">Move tutor moves</div>' + tutorHtml + '</div><div class="move-section"><div class="move-title">Egg moves</div>' + eggHtml + '</div>';
    bindEggMoveButtons(el);
  };

  window.loadPokemonData = async function(id, pokeid){
    const movesEl = document.getElementById("moves_" + id);
    const cached = localStorage.getItem(dataKey(id));
    if(cached){
      try{ const payload = JSON.parse(cached); if(payloadHasTutorEggMoveData(payload)){ renderTypes(id, payload.types); renderMoves(id, payload); return payload; } }catch(e){}
    }
    if(movesEl) movesEl.innerHTML = '<span class="loading">Loading from PokéAPI...</span>';
    try{ const payload = await fetchPokemonData(pokeid); localStorage.setItem(dataKey(id), JSON.stringify(payload)); renderTypes(id, payload.types); renderMoves(id, payload); return payload; }
    catch(e){ if(movesEl) movesEl.innerHTML = '<span class="error">Could not load move data. Check internet access, then collapse/reopen this section.</span>'; const typeEl = document.getElementById("types_"+id); if(typeEl && typeEl.textContent.includes("loading")) typeEl.innerHTML = '<span class="type error">type unavailable</span>'; }
  };

  window.loadTypesOnly = async function(id, pokeid){
    const cached = localStorage.getItem(dataKey(id));
    if(cached){ try{ const payload = JSON.parse(cached); if(payload && payload.types){ renderTypes(id, payload.types); return; } }catch(e){} }
    try{ const payload = await fetchPokemonData(pokeid); localStorage.setItem(dataKey(id), JSON.stringify(payload)); renderTypes(id, payload.types); }
    catch(e){ const el = document.getElementById("types_"+id); if(el) el.innerHTML = '<span class="type error">type unavailable</span>'; }
  };

  function bindEggMoveButtons(container){
    Array.from(container.querySelectorAll(".eggMoveButton")).forEach(function(btn){
      btn.addEventListener("click", function(){ toggleEggMoveDonors(btn.dataset.pokeid, btn.dataset.move, btn); });
    });
  }
  function pokemonCanDirectlyPassMove(rawPokemon, moveName){
    const wanted = dexNormaliseMoveName(moveName);
    return (rawPokemon.moves || []).some(function(moveEntry){
      const name = dexNormaliseMoveName(moveEntry.move && moveEntry.move.name ? moveEntry.move.name : "");
      if(name !== wanted) return false;
      return (moveEntry.version_group_details || []).some(frlgDirectDonorMoveAllowed);
    });
  }
  async function getEggGroupsForPokemonId(pokemonId){ const species = await fetchRawSpeciesById(pokemonId); return (species.egg_groups || []).map(function(g){return g.name;}).filter(Boolean); }
  function eggGroupsCompatible(a, b){
    const aClean = (a || []).filter(function(g){return g && g !== "no-eggs" && g !== "ditto";});
    const bClean = (b || []).filter(function(g){return g && g !== "no-eggs" && g !== "ditto";});
    return aClean.some(function(g){return bClean.includes(g);});
  }
  async function findEggMoveDonors(targetPokemonId, moveName){
    const targetId = parseInt(targetPokemonId,10), apiMove = dexNormaliseMoveName(moveName), cacheKey = EGG_DONOR_CACHE_PREFIX + targetId + "_" + apiMove;
    const cached = getCachedJson(cacheKey); if(cached) return cached;
    const targetGroups = await getEggGroupsForPokemonId(targetId);
    const moveData = await fetchRawMoveByName(apiMove);
    const candidateIds = Array.from(new Set((moveData.learned_by_pokemon || []).map(function(p){return pokemonIdFromUrl(p.url);}).filter(function(id){return id > 0 && id <= 386 && id !== targetId;}))).sort(function(a,b){return a-b;});
    const donors = [];
    for(let i=0;i<candidateIds.length;i++){
      const candidateId = candidateIds[i];
      try{
        const rawPokemon = await fetchRawPokemonById(candidateId);
        if(!pokemonCanDirectlyPassMove(rawPokemon, apiMove)) continue;
        const candidateGroups = await getEggGroupsForPokemonId(candidateId);
        if(!eggGroupsCompatible(targetGroups, candidateGroups)) continue;
        donors.push({id:candidateId, name:rawPokemon.name});
      }catch(e){}
    }
    setCachedJson(cacheKey, donors);
    return donors;
  }
  window.toggleEggMoveDonors = async function(pokeid, moveName, button){
    const row = button && button.parentNode ? button.parentNode.querySelector('.eggDonorRow[data-move="' + moveName + '"]') : null; if(!row) return;
    if(!row.classList.contains("hidden")){ row.classList.add("hidden"); return; }
    row.classList.remove("hidden"); if(row.dataset.loaded === "1") return;
    row.textContent = "Loading compatible egg move donors...";
    try{ const donors = await findEggMoveDonors(pokeid, moveName); row.dataset.loaded = "1"; row.textContent = donors.length ? ("Can be acquired from: " + donors.map(function(d){return displaySpeciesNameById(d.id, d.name);}).join(", ")) : "No direct compatible FireRed/LeafGreen donor found in the all Gen 3 Pokémon."; }
    catch(e){ row.textContent = "Could not load egg move donors. Check internet access and try again."; }
  };
  document.addEventListener("toggle", function(evt){ const detail = evt.target; if(detail && detail.classList && detail.classList.contains("movesDetails") && !detail.open){ Array.from(detail.querySelectorAll(".eggDonorRow")).forEach(function(row){row.classList.add("hidden");}); } }, true);
  function updateMoveSectionSummaries(){ document.querySelectorAll(".movesDetails > summary").forEach(function(summary){ summary.textContent = "Moves: level-up + TM/HM + tutor + egg"; }); }
  document.addEventListener("DOMContentLoaded", updateMoveSectionSummaries); window.addEventListener("load", updateMoveSectionSummaries); setTimeout(updateMoveSectionSummaries, 0);
})();


/* Move section load stability patch */
(function(){
  function payloadHasExpandedMoveData(payload){
    return payload && Array.isArray(payload.levelMoves) && Array.isArray(payload.machineMoves) && Array.isArray(payload.tutorMoves) && Array.isArray(payload.eggMoves);
  }

  function safeRenderTypesForMoveLoad(id, payload){
    try{
      if(typeof renderTypes === "function") renderTypes(id, payload && payload.types ? payload.types : []);
    }catch(e){
      console.warn("Type/filter refresh failed after move load", e);
      try{
        const card = document.querySelector('.card[data-id="' + id + '"]');
        if(card && payload && payload.types) card.dataset.types = payload.types.join(",");
        const el = document.getElementById("types_" + id);
        if(el && payload && payload.types && payload.types.length){
          el.innerHTML = payload.types.map(function(t){return '<span class="type">' + t + '</span>';}).join("");
        }
      }catch(ignore){}
    }
  }

  function safeRenderMovesForMoveLoad(id, payload, movesEl){
    try{
      if(typeof window.renderMoves === "function"){
        window.renderMoves(id, payload);
        return true;
      }
    }catch(e){
      console.error("Move render failed", e);
      if(movesEl){
        movesEl.innerHTML = '<span class="error">Could not render move data: ' + String(e && e.message ? e.message : e).replace(/</g,"&lt;") + '</span>';
      }
      return false;
    }
    return false;
  }

  window.loadPokemonData = async function(id, pokeid){
    const movesEl = document.getElementById("moves_" + id);
    const cachedRaw = localStorage.getItem(dataKey(id));

    if(cachedRaw){
      try{
        const cachedPayload = JSON.parse(cachedRaw);
        if(payloadHasExpandedMoveData(cachedPayload)){
          safeRenderTypesForMoveLoad(id, cachedPayload);
          safeRenderMovesForMoveLoad(id, cachedPayload, movesEl);
          return cachedPayload;
        }
      }catch(e){}
    }

    if(movesEl) movesEl.innerHTML = '<span class="loading">Loading from PokéAPI...</span>';

    let payload;
    try{
      payload = await window.fetchPokemonData(pokeid);
      localStorage.setItem(dataKey(id), JSON.stringify(payload));
    }catch(e){
      console.error("Move data fetch failed", e);
      if(movesEl) movesEl.innerHTML = '<span class="error">Could not load move data. Check internet access, then collapse/reopen this section.</span>';
      const typeEl = document.getElementById("types_" + id);
      if(typeEl && typeEl.textContent.includes("loading")) typeEl.innerHTML = '<span class="type error">type unavailable</span>';
      return null;
    }

    safeRenderTypesForMoveLoad(id, payload);
    safeRenderMovesForMoveLoad(id, payload, movesEl);
    return payload;
  };
})();

/* Move loader repair patch - keep tutor/egg rendering but remove fragile intermediate fetch path */
(function(){
  const REPAIRED_MOVE_SCHEMA = "frlg_tutor_egg_repair_v1";

  function normaliseMoveNameForRepair(name){
    if(typeof dexNormaliseMoveName === "function") return dexNormaliseMoveName(name);
    return String(name || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function frlgMethod(detail){
    if(!detail || !detail.version_group || !detail.move_learn_method) return "";
    if(detail.version_group.name !== "firered-leafgreen") return "";
    return detail.move_learn_method.name || "";
  }

  function parsePokemonMovePayload(data){
    const types = (data.types || []).slice().sort(function(a,b){ return (a.slot || 0) - (b.slot || 0); }).map(function(t){ return t.type && t.type.name ? t.type.name : ""; }).filter(Boolean);
    const abilities = (data.abilities || []).filter(function(a){ return !a.is_hidden; }).map(function(a){ return {name:a.ability && a.ability.name ? a.ability.name : "", hidden:!!a.is_hidden}; }).filter(function(a){ return a.name; }).sort(function(a,b){
      const da = typeof displayAbilityName === "function" ? displayAbilityName(a.name) : a.name;
      const db = typeof displayAbilityName === "function" ? displayAbilityName(b.name) : b.name;
      return da.localeCompare(db);
    });
    const levelMap = new Map(), machineMap = new Map(), tutorMap = new Map(), eggMap = new Map();
    (data.moves || []).forEach(function(moveEntry){
      const moveName = moveEntry.move && moveEntry.move.name ? normaliseMoveNameForRepair(moveEntry.move.name) : "";
      if(!moveName) return;
      (moveEntry.version_group_details || []).forEach(function(detail){
        const method = frlgMethod(detail);
        if(!method) return;
        if(method === "level-up"){
          const level = detail.level_learned_at || 0;
          const existing = levelMap.get(moveName);
          if(existing === undefined || level < existing) levelMap.set(moveName, level);
        }else if(method === "machine") machineMap.set(moveName, true);
        else if(method === "tutor") tutorMap.set(moveName, true);
        else if(method === "egg") eggMap.set(moveName, true);
      });
    });
    const levelMoves = Array.from(levelMap.entries()).map(function(entry){ return {name:entry[0], level:entry[1]}; }).sort(function(a,b){ return a.level - b.level || a.name.localeCompare(b.name); });
    const machineMoves = Array.from(machineMap.keys()).map(function(name){ return {name:name}; }).sort(function(a,b){
      const av = typeof machineSortValue === "function" ? machineSortValue(a.name) : 999;
      const bv = typeof machineSortValue === "function" ? machineSortValue(b.name) : 999;
      return av - bv || a.name.localeCompare(b.name);
    });
    const tutorMoves = Array.from(tutorMap.keys()).map(function(name){ return {name:name}; }).sort(function(a,b){
      const fa = typeof formatMoveName === "function" ? formatMoveName(a.name) : a.name;
      const fb = typeof formatMoveName === "function" ? formatMoveName(b.name) : b.name;
      return fa.localeCompare(fb);
    });
    const eggMoves = Array.from(eggMap.keys()).map(function(name){ return {name:name}; }).sort(function(a,b){
      const fa = typeof formatMoveName === "function" ? formatMoveName(a.name) : a.name;
      const fb = typeof formatMoveName === "function" ? formatMoveName(b.name) : b.name;
      return fa.localeCompare(fb);
    });
    return {types:types, abilities:abilities, levelMoves:levelMoves, machineMoves:machineMoves, tutorMoves:tutorMoves, eggMoves:eggMoves, moveSchemaVersion:REPAIRED_MOVE_SCHEMA, cachedAt:new Date().toISOString()};
  }

  function payloadHasExpandedMoveData(payload){
    return payload && Array.isArray(payload.levelMoves) && Array.isArray(payload.machineMoves) && Array.isArray(payload.tutorMoves) && Array.isArray(payload.eggMoves);
  }

  window.fetchPokemonData = async function(pokeid){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + parseInt(pokeid,10) + "/");
    if(!response.ok) throw new Error("PokéAPI Pokémon request failed: HTTP " + response.status);
    const data = await response.json();
    return parsePokemonMovePayload(data);
  };

  window.cardMoveListFromPokemonData = function(data){
    const payload = parsePokemonMovePayload(data);
    return Array.from(new Set([].concat(payload.levelMoves.map(function(m){return m.name;}), payload.machineMoves.map(function(m){return m.name;}), payload.tutorMoves.map(function(m){return m.name;}), payload.eggMoves.map(function(m){return m.name;}))));
  };

  window.loadPokemonData = async function(id, pokeid){
    const movesEl = document.getElementById("moves_" + id);
    const cachedRaw = localStorage.getItem(dataKey(id));
    if(cachedRaw){
      try{
        const cachedPayload = JSON.parse(cachedRaw);
        if(payloadHasExpandedMoveData(cachedPayload)){
          try{ if(typeof renderTypes === "function") renderTypes(id, cachedPayload.types || []); }catch(typeErr){ console.warn("Type render failed during cached move load", typeErr); }
          try{ if(typeof window.renderMoves === "function") window.renderMoves(id, cachedPayload); }catch(renderErr){ console.error("Cached move render failed", renderErr); if(movesEl) movesEl.innerHTML = '<span class="error">Could not render cached move data: ' + String(renderErr && renderErr.message ? renderErr.message : renderErr).replace(/</g,"&lt;") + '</span>'; }
          return cachedPayload;
        }
      }catch(parseErr){ console.warn("Cached move payload could not be parsed", parseErr); }
    }
    if(movesEl) movesEl.innerHTML = '<span class="loading">Loading from PokéAPI...</span>';
    try{
      const payload = await window.fetchPokemonData(pokeid);
      try{ localStorage.setItem(dataKey(id), JSON.stringify(payload)); }catch(storageErr){ console.warn("Could not cache expanded move payload", storageErr); }
      try{ if(typeof renderTypes === "function") renderTypes(id, payload.types || []); }catch(typeErr){ console.warn("Type render failed after move load", typeErr); }
      try{ if(typeof window.renderMoves === "function") window.renderMoves(id, payload); }catch(renderErr){ console.error("Move render failed", renderErr); if(movesEl) movesEl.innerHTML = '<span class="error">Could not render move data: ' + String(renderErr && renderErr.message ? renderErr.message : renderErr).replace(/</g,"&lt;") + '</span>'; }
      return payload;
    }catch(fetchErr){
      console.error("Move data fetch/parse failed", fetchErr);
      if(movesEl) movesEl.innerHTML = '<span class="error">Could not load move data: ' + String(fetchErr && fetchErr.message ? fetchErr.message : fetchErr).replace(/</g,"&lt;") + '</span>';
      const typeEl = document.getElementById("types_" + id);
      if(typeEl && typeEl.textContent.indexOf("loading") >= 0) typeEl.innerHTML = '<span class="type error">type unavailable</span>';
      return null;
    }
  };
})();


/* Egg move donor compatibility repair */
(function(){
  const EGG_DONOR_CACHE_PREFIX_V2 = STORAGE_PREFIX + "egg_donors_v2_";
  const RAW_SPECIES_CACHE_PREFIX_V2 = STORAGE_PREFIX + "raw_species_v1_";
  const RAW_POKEMON_CACHE_PREFIX_V2 = STORAGE_PREFIX + "raw_pokemon_v1_";
  const RAW_MOVE_CACHE_PREFIX_V2 = STORAGE_PREFIX + "raw_move_v1_";
  const RAW_EVO_CHAIN_CACHE_PREFIX_V2 = STORAGE_PREFIX + "raw_evolution_chain_v1_";
  function safeJsonParseLocal(value, fallback){ try{return JSON.parse(value);}catch(e){return fallback;} }
  function getCachedJsonLocal(key){ const raw = localStorage.getItem(key); return raw ? safeJsonParseLocal(raw, null) : null; }
  function setCachedJsonLocal(key, value){ try{localStorage.setItem(key, JSON.stringify(value));}catch(e){} }
  function normaliseMoveForDonorFix(name){ if(typeof dexNormaliseMoveName === "function") return dexNormaliseMoveName(name); return String(name || "").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""); }
  function idFromUrlLocal(url, segment){ const re = new RegExp("/" + segment + "/(\\d+)/?$"); const m = String(url || "").match(re); return m ? parseInt(m[1],10) : 0; }
  function pokemonIdFromUrlLocal(url){ return idFromUrlLocal(url, "pokemon"); }
  function speciesIdFromUrlLocal(url){ return idFromUrlLocal(url, "pokemon-species"); }
  function displayTextForDonorFix(name){ return typeof formatMoveName === "function" ? formatMoveName(name) : String(name || "").replace(/-/g," ").replace(/\b\w/g,function(c){return c.toUpperCase();}); }
  function speciesDisplayForDonorFix(id, fallback){ const padded = String(id).padStart(3,"0"); const card = document.querySelector('.card[data-id="' + padded + '"]'); const name = card && card.dataset && card.dataset.name ? card.dataset.name : displayTextForDonorFix(fallback || "pokemon"); return "#" + padded + " " + name; }
  async function fetchJsonCachedLocal(url, key){ const cached = getCachedJsonLocal(key); if(cached) return cached; const response = await fetch(url); if(!response.ok) throw new Error("PokéAPI request failed: HTTP " + response.status); const data = await response.json(); setCachedJsonLocal(key, data); return data; }
  async function fetchRawPokemonLocal(id){ return fetchJsonCachedLocal("https://pokeapi.co/api/v2/pokemon/" + parseInt(id,10) + "/", RAW_POKEMON_CACHE_PREFIX_V2 + parseInt(id,10)); }
  async function fetchRawSpeciesLocal(id){ return fetchJsonCachedLocal("https://pokeapi.co/api/v2/pokemon-species/" + parseInt(id,10) + "/", RAW_SPECIES_CACHE_PREFIX_V2 + parseInt(id,10)); }
  async function fetchRawMoveLocal(moveName){ const apiName = normaliseMoveForDonorFix(moveName); return fetchJsonCachedLocal("https://pokeapi.co/api/v2/move/" + apiName + "/", RAW_MOVE_CACHE_PREFIX_V2 + apiName); }
  async function fetchEvolutionChainLocal(url){ const chainId = idFromUrlLocal(url, "evolution-chain"); return fetchJsonCachedLocal(url, RAW_EVO_CHAIN_CACHE_PREFIX_V2 + chainId); }
  function eggGroupsFromSpecies(species){ return (species && species.egg_groups || []).map(function(g){return g && g.name ? g.name : "";}).filter(Boolean); }
  function cleanEggGroups(groups){ return (groups || []).filter(function(g){ return g && g !== "no-eggs" && g !== "ditto"; }); }
  function hasBreedableGroup(groups){ return cleanEggGroups(groups).length > 0; }
  function groupsOverlap(a,b){ const bClean = cleanEggGroups(b); return cleanEggGroups(a).some(function(g){ return bClean.indexOf(g) >= 0; }); }
  function collectSpeciesIdsFromChainNode(node, ids){ if(!node) return; const id = speciesIdFromUrlLocal(node.species && node.species.url ? node.species.url : ""); if(id > 0 && id <= 386) ids.push(id); (node.evolves_to || []).forEach(function(child){ collectSpeciesIdsFromChainNode(child, ids); }); }
  async function getEffectiveBreedingEggGroups(targetPokemonId){
    const targetId = parseInt(targetPokemonId,10); const targetSpecies = await fetchRawSpeciesLocal(targetId); const targetGroups = eggGroupsFromSpecies(targetSpecies);
    if(hasBreedableGroup(targetGroups)) return cleanEggGroups(targetGroups);
    if(!targetSpecies.evolution_chain || !targetSpecies.evolution_chain.url) return [];
    const chain = await fetchEvolutionChainLocal(targetSpecies.evolution_chain.url); const chainIds = []; collectSpeciesIdsFromChainNode(chain.chain, chainIds);
    const groupSet = {}; const uniqueIds = Array.from(new Set(chainIds)).sort(function(a,b){return a-b;});
    for(let i=0;i<uniqueIds.length;i++){ const sid = uniqueIds[i]; if(sid === targetId) continue; try{ const species = await fetchRawSpeciesLocal(sid); cleanEggGroups(eggGroupsFromSpecies(species)).forEach(function(g){ groupSet[g] = true; }); }catch(e){} }
    return Object.keys(groupSet).sort();
  }
  function moveLearnMethodForFRLG(detail){ if(!detail || !detail.version_group || !detail.move_learn_method) return ""; if(detail.version_group.name !== "firered-leafgreen") return ""; return detail.move_learn_method.name || ""; }
  function pokemonLearnsMoveDirectlyInFRLG(rawPokemon, moveName){ const wanted = normaliseMoveForDonorFix(moveName); return (rawPokemon.moves || []).some(function(moveEntry){ const name = normaliseMoveForDonorFix(moveEntry.move && moveEntry.move.name ? moveEntry.move.name : ""); if(name !== wanted) return false; return (moveEntry.version_group_details || []).some(function(detail){ const method = moveLearnMethodForFRLG(detail); return method === "level-up" || method === "machine" || method === "tutor"; }); }); }
  function speciesCanBeMaleParent(species){ if(!species) return true; return !(species.gender_rate === -1 || species.gender_rate === 8); }
  async function findEggMoveDonorsFixed(targetPokemonId, moveName){
    const targetId = parseInt(targetPokemonId,10); const apiMove = normaliseMoveForDonorFix(moveName); const cacheKey = EGG_DONOR_CACHE_PREFIX_V2 + targetId + "_" + apiMove; const cached = getCachedJsonLocal(cacheKey); if(cached) return cached;
    const targetGroups = await getEffectiveBreedingEggGroups(targetId); const moveData = await fetchRawMoveLocal(apiMove);
    const candidateIds = Array.from(new Set((moveData.learned_by_pokemon || []).map(function(p){return pokemonIdFromUrlLocal(p.url);}).filter(function(id){return id > 0 && id <= 386 && id !== targetId;}))).sort(function(a,b){return a-b;});
    const donors = [];
    for(let i=0;i<candidateIds.length;i++){ const candidateId = candidateIds[i]; try{ const rawPokemon = await fetchRawPokemonLocal(candidateId); if(!pokemonLearnsMoveDirectlyInFRLG(rawPokemon, apiMove)) continue; const candidateSpecies = await fetchRawSpeciesLocal(candidateId); if(!speciesCanBeMaleParent(candidateSpecies)) continue; if(!groupsOverlap(targetGroups, eggGroupsFromSpecies(candidateSpecies))) continue; donors.push({id:candidateId, name:rawPokemon.name}); }catch(e){} }
    setCachedJsonLocal(cacheKey, donors); return donors;
  }
  window.toggleEggMoveDonors = async function(pokeid, moveName, button){ const li = button && button.closest ? button.closest("li") : null; const row = li ? li.querySelector(".eggDonorRow") : null; if(!row) return; if(!row.classList.contains("hidden")){ row.classList.add("hidden"); return; } row.classList.remove("hidden"); if(row.dataset.loaded === "1") return; row.textContent = "Loading compatible egg move donors..."; try{ const donors = await findEggMoveDonorsFixed(pokeid, moveName); row.dataset.loaded = "1"; row.textContent = donors.length ? ("Can be acquired from: " + donors.map(function(d){return speciesDisplayForDonorFix(d.id, d.name);}).join(", ")) : "No compatible direct FireRed/LeafGreen male donor found in the all Gen 3 Pokémon."; }catch(e){ row.textContent = "Could not load egg move donors: " + String(e && e.message ? e.message : e); } };
})();


/* Evolution-line egg move inheritance patch
   Treats egg moves as applying across a Pokémon's evolution line so evolved forms
   show/filter against egg moves that are present on their hatchable base form. */
(function(){
  const EVO_LINE_EGG_SCHEMA = "frlg_tutor_egg_evoline_v1";
  const RAW_SPECIES_CACHE_PREFIX_EGG_LINE = STORAGE_PREFIX + "raw_species_v1_";
  const RAW_POKEMON_CACHE_PREFIX_EGG_LINE = STORAGE_PREFIX + "raw_pokemon_v1_";
  const RAW_EVO_CHAIN_CACHE_PREFIX_EGG_LINE = STORAGE_PREFIX + "raw_evolution_chain_v1_";
  const MOVE_INDEX_EGG_LINE_SCHEMA = "frlg_move_index_evoline_egg_v1";
  const previousFetchPokemonData = window.fetchPokemonData;

  function safeParseJsonEggLine(value, fallback){ try{return JSON.parse(value);}catch(e){return fallback;} }
  function getCachedJsonEggLine(key){ const raw = localStorage.getItem(key); return raw ? safeParseJsonEggLine(raw, null) : null; }
  function setCachedJsonEggLine(key, value){ try{localStorage.setItem(key, JSON.stringify(value));}catch(e){} }
  function idFromUrlEggLine(url, segment){ const re = new RegExp("/" + segment + "/(\\d+)/?$"); const m = String(url || "").match(re); return m ? parseInt(m[1],10) : 0; }
  function speciesIdFromUrlEggLine(url){ return idFromUrlEggLine(url, "pokemon-species"); }
  function normaliseMoveEggLine(name){ if(typeof dexNormaliseMoveName === "function") return dexNormaliseMoveName(name); return String(name || "").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""); }
  async function fetchJsonCachedEggLine(url, key){ const cached = getCachedJsonEggLine(key); if(cached) return cached; const response = await fetch(url); if(!response.ok) throw new Error("PokéAPI request failed: HTTP " + response.status); const data = await response.json(); setCachedJsonEggLine(key, data); return data; }
  async function fetchRawSpeciesEggLine(id){ return fetchJsonCachedEggLine("https://pokeapi.co/api/v2/pokemon-species/" + parseInt(id,10) + "/", RAW_SPECIES_CACHE_PREFIX_EGG_LINE + parseInt(id,10)); }
  async function fetchRawPokemonEggLine(id){ return fetchJsonCachedEggLine("https://pokeapi.co/api/v2/pokemon/" + parseInt(id,10) + "/", RAW_POKEMON_CACHE_PREFIX_EGG_LINE + parseInt(id,10)); }
  async function fetchEvolutionChainEggLine(url){ const chainId = idFromUrlEggLine(url, "evolution-chain"); return fetchJsonCachedEggLine(url, RAW_EVO_CHAIN_CACHE_PREFIX_EGG_LINE + chainId); }
  function collectEvolutionLineSpeciesIdsEggLine(node, ids){ if(!node) return; const id = speciesIdFromUrlEggLine(node.species && node.species.url ? node.species.url : ""); if(id > 0 && id <= 386) ids.push(id); (node.evolves_to || []).forEach(function(child){ collectEvolutionLineSpeciesIdsEggLine(child, ids); }); }
  async function getEvolutionLineSpeciesIdsEggLine(pokeid){
    const id = parseInt(pokeid,10);
    const species = await fetchRawSpeciesEggLine(id);
    if(!species || !species.evolution_chain || !species.evolution_chain.url) return [id];
    const chain = await fetchEvolutionChainEggLine(species.evolution_chain.url);
    const ids = [];
    collectEvolutionLineSpeciesIdsEggLine(chain.chain, ids);
    const unique = Array.from(new Set(ids.filter(function(x){return x > 0 && x <= 386;}))).sort(function(a,b){return a-b;});
    return unique.length ? unique : [id];
  }
  function frlgEggMoveNamesFromRawPokemon(rawPokemon){
    const out = [];
    (rawPokemon.moves || []).forEach(function(moveEntry){
      const moveName = moveEntry.move && moveEntry.move.name ? normaliseMoveEggLine(moveEntry.move.name) : "";
      if(!moveName) return;
      const hasEgg = (moveEntry.version_group_details || []).some(function(detail){
        return detail && detail.version_group && detail.version_group.name === "firered-leafgreen" && detail.move_learn_method && detail.move_learn_method.name === "egg";
      });
      if(hasEgg) out.push(moveName);
    });
    return out;
  }
  async function getEvolutionLineEggMovesEggLine(pokeid){
    const ids = await getEvolutionLineSpeciesIdsEggLine(pokeid);
    const moveSet = {};
    for(let i=0;i<ids.length;i++){
      try{
        const rawPokemon = await fetchRawPokemonEggLine(ids[i]);
        frlgEggMoveNamesFromRawPokemon(rawPokemon).forEach(function(moveName){ moveSet[moveName] = true; });
      }catch(e){ console.warn("Could not load evolution-line egg moves for", ids[i], e); }
    }
    return Object.keys(moveSet).map(function(name){ return {name:name}; }).sort(function(a,b){
      const fa = typeof formatMoveName === "function" ? formatMoveName(a.name) : a.name;
      const fb = typeof formatMoveName === "function" ? formatMoveName(b.name) : b.name;
      return fa.localeCompare(fb);
    });
  }
  function allMoveNamesFromExpandedPayloadEggLine(payload){
    return Array.from(new Set([].concat(
      (payload.levelMoves || []).map(function(m){return m.name;}),
      (payload.machineMoves || []).map(function(m){return m.name;}),
      (payload.tutorMoves || []).map(function(m){return m.name;}),
      (payload.eggMoves || []).map(function(m){return m.name;})
    ).filter(Boolean)));
  }
  function payloadIsEvoLineEggSchema(payload){ return payload && payload.moveSchemaVersion === EVO_LINE_EGG_SCHEMA && Array.isArray(payload.eggMoves); }

  async function buildEvolutionLinePayloadEggLine(pokeid){
    let payload = null;
    if(typeof previousFetchPokemonData === "function") payload = await previousFetchPokemonData(pokeid);
    else throw new Error("Base Pokémon move loader unavailable");
    payload = payload || {};
    payload.eggMoves = await getEvolutionLineEggMovesEggLine(pokeid);
    payload.moveSchemaVersion = EVO_LINE_EGG_SCHEMA;
    payload.cachedAt = new Date().toISOString();
    payload.eggMoveScope = "evolution-line";
    return payload;
  }

  window.fetchPokemonData = buildEvolutionLinePayloadEggLine;

  window.cardMoveListFromPokemonData = function(data){
    /* Kept for older callers that pass raw PokéAPI data synchronously. The active
       move index builder below uses fetchPokemonData so it includes evolution-line egg moves. */
    if(data && data.moveSchemaVersion === EVO_LINE_EGG_SCHEMA) return allMoveNamesFromExpandedPayloadEggLine(data);
    const direct = [];
    (data.moves || []).forEach(function(moveRecord){
      const moveName = moveRecord.move && moveRecord.move.name ? normaliseMoveEggLine(moveRecord.move.name) : "";
      if(!moveName) return;
      const valid = (moveRecord.version_group_details || []).some(function(detail){
        if(!detail || !detail.version_group || detail.version_group.name !== "firered-leafgreen" || !detail.move_learn_method) return false;
        const method = detail.move_learn_method.name;
        return method === "level-up" || method === "machine" || method === "tutor" || method === "egg";
      });
      if(valid) direct.push(moveName);
    });
    return Array.from(new Set(direct));
  };

  window.loadPokemonData = async function(id, pokeid){
    const movesEl = document.getElementById("moves_" + id);
    const cachedRaw = localStorage.getItem(dataKey(id));
    if(cachedRaw){
      try{
        const cachedPayload = JSON.parse(cachedRaw);
        if(payloadIsEvoLineEggSchema(cachedPayload)){
          try{ if(typeof renderTypes === "function") renderTypes(id, cachedPayload.types || []); }catch(typeErr){ console.warn("Type render failed during cached move load", typeErr); }
          try{ if(typeof window.renderMoves === "function") window.renderMoves(id, cachedPayload); }catch(renderErr){ console.error("Cached move render failed", renderErr); if(movesEl) movesEl.innerHTML = '<span class="error">Could not render cached move data: ' + String(renderErr && renderErr.message ? renderErr.message : renderErr).replace(/</g,"&lt;") + '</span>'; }
          return cachedPayload;
        }
      }catch(parseErr){ console.warn("Cached move payload could not be parsed", parseErr); }
    }
    if(movesEl) movesEl.innerHTML = '<span class="loading">Loading from PokéAPI...</span>';
    try{
      const payload = await window.fetchPokemonData(pokeid);
      try{ localStorage.setItem(dataKey(id), JSON.stringify(payload)); }catch(storageErr){ console.warn("Could not cache evolution-line move payload", storageErr); }
      try{ if(typeof renderTypes === "function") renderTypes(id, payload.types || []); }catch(typeErr){ console.warn("Type render failed after move load", typeErr); }
      try{ if(typeof window.renderMoves === "function") window.renderMoves(id, payload); }catch(renderErr){ console.error("Move render failed", renderErr); if(movesEl) movesEl.innerHTML = '<span class="error">Could not render move data: ' + String(renderErr && renderErr.message ? renderErr.message : renderErr).replace(/</g,"&lt;") + '</span>'; }
      return payload;
    }catch(fetchErr){
      console.error("Move data fetch/parse failed", fetchErr);
      if(movesEl) movesEl.innerHTML = '<span class="error">Could not load move data: ' + String(fetchErr && fetchErr.message ? fetchErr.message : fetchErr).replace(/</g,"&lt;") + '</span>';
      const typeEl = document.getElementById("types_" + id);
      if(typeEl && typeEl.textContent.indexOf("loading") >= 0) typeEl.innerHTML = '<span class="type error">type unavailable</span>';
      return null;
    }
  };

  window.buildDexMoveReferenceIndex = async function(force){
    if(DEX_MOVE_REFERENCE_BUILDING) return;
    if(dexMoveReferenceReady() && !force){
      updateActiveDexFilters();
      applyFilter();
      return;
    }
    if(force && !confirm("Build/refresh the FireRed/LeafGreen move index? This runs once and caches the result in this browser.")) return;
    DEX_MOVE_REFERENCE_BUILDING = true;
    DEX_MOVE_REFERENCE_PROGRESS = {done:0,total:386};
    DEX_MOVE_FILTER_LOADING = true;
    updateActiveDexFilters();
    try{
      if(force) DEX_MOVE_REFERENCE_INDEX = {};
      const cards = Array.from(document.querySelectorAll(".card"));
      DEX_MOVE_REFERENCE_PROGRESS.total = cards.length;
      for(let i=0;i<cards.length;i++){
        const card = cards[i];
        const id = card.dataset.id;
        if(!DEX_MOVE_REFERENCE_INDEX[id]){
          try{
            const payload = await window.fetchPokemonData(card.dataset.pokeid);
            DEX_MOVE_REFERENCE_INDEX[id] = allMoveNamesFromExpandedPayloadEggLine(payload);
          }catch(e){ console.warn("Move index build failed for", id, e); }
        }
        DEX_MOVE_REFERENCE_PROGRESS.done = i + 1;
        if(i % 8 === 0){
          saveDexMoveReferenceIndex();
          try{ localStorage.setItem(DEX_MOVE_REFERENCE_META_KEY, JSON.stringify({schema:MOVE_INDEX_EGG_LINE_SCHEMA,builtAt:new Date().toISOString(),count:Object.keys(DEX_MOVE_REFERENCE_INDEX || {}).length})); }catch(e){}
          updateActiveDexFilters();
          await new Promise(function(resolve){ setTimeout(resolve, 20); });
        }
      }
      saveDexMoveReferenceIndex();
      try{ localStorage.setItem(DEX_MOVE_REFERENCE_META_KEY, JSON.stringify({schema:MOVE_INDEX_EGG_LINE_SCHEMA,builtAt:new Date().toISOString(),count:Object.keys(DEX_MOVE_REFERENCE_INDEX || {}).length})); }catch(e){}
    }finally{
      DEX_MOVE_REFERENCE_BUILDING = false;
      DEX_MOVE_FILTER_LOADING = false;
      updateActiveDexFilters();
      applyFilter();
    }
  };

  try{
    const meta = safeParseJsonEggLine(localStorage.getItem(DEX_MOVE_REFERENCE_META_KEY) || "{}", {});
    if(!meta || meta.schema !== MOVE_INDEX_EGG_LINE_SCHEMA){
      localStorage.removeItem(DEX_MOVE_REFERENCE_KEY);
      DEX_MOVE_REFERENCE_INDEX = {};
      localStorage.setItem(DEX_MOVE_REFERENCE_META_KEY, JSON.stringify({schema:MOVE_INDEX_EGG_LINE_SCHEMA,builtAt:null,count:0}));
    }
  }catch(e){
    DEX_MOVE_REFERENCE_INDEX = {};
  }
})();
