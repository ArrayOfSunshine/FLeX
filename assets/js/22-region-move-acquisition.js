
/* Enhancement: Dex region display/filter + Move List TM/HM/tutor acquisition notes */
(function(){
  "use strict";

  function esc(v){return String(v == null ? "" : v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
  function splitCamel(s){return String(s||"").replace(/([a-z])([A-Z])/g,"$1 $2");}
  function slugMove(name){var s=splitCamel(String(name||"").trim()); return s.toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");}
  function compactMove(name){return String(name||"").toLowerCase().replace(/[^a-z0-9]/g,"");}
  function titleFromSlug(slug){return String(slug||"").split("-").filter(Boolean).map(function(p){return p.charAt(0).toUpperCase()+p.slice(1);}).join(" ");}

  function dexRegionForNumber(n){
    n=parseInt(n,10)||0;
    if(n>=1 && n<=151) return "Kanto";
    if(n>=152 && n<=251) return "Johto";
    if(n>=252 && n<=386) return "Hoenn";
    return "";
  }
  window.dexRegionForNumber = dexRegionForNumber;

  function injectRegionFilter(){
    if(document.getElementById("dexRegionFilter")) return;
    var type1=document.getElementById("typeFilter1");
    var grid=type1 && type1.parentNode;
    if(!grid) return;
    var sel=document.createElement("select");
    sel.id="dexRegionFilter";
    sel.className="typeSelect";
    sel.innerHTML='<option value="">Region</option><option value="Kanto">Kanto</option><option value="Johto">Johto</option><option value="Hoenn">Hoenn</option>';
    sel.onchange=function(){ if(typeof applyFilter==="function") applyFilter(); };
    grid.insertBefore(sel,type1);
  }

  function decorateDexCards(){
    document.querySelectorAll("#grid .card[data-id], .card[data-id]").forEach(function(card){
      var id=card.dataset && card.dataset.id;
      if(!id || card.querySelector(".regionBadge")) return;
      var region=dexRegionForNumber(id);
      if(!region) return;
      card.dataset.region=region;
      var container=card.querySelector(".top .badge") || card.querySelector(".badge");
      var badge=document.createElement("span");
      badge.className="regionBadge "+region.toLowerCase();
      badge.textContent=region;
      if(container && container.parentNode){ container.parentNode.insertBefore(badge, container); }
    });
  }

  var previousUpdateActiveDexFilters=window.updateActiveDexFilters;
  window.updateActiveDexFilters=function(){
    if(previousUpdateActiveDexFilters) previousUpdateActiveDexFilters();
    var el=document.getElementById("activeDexFilters"), regionEl=document.getElementById("dexRegionFilter");
    if(el && regionEl && regionEl.value){
      if(el.textContent && el.textContent!=="None") el.textContent += " | Region: " + regionEl.value;
      else el.textContent = "Region: " + regionEl.value;
    }
  };

  var previousApplyFilter=window.applyFilter;
  window.applyFilter=function(){
    injectRegionFilter();
    decorateDexCards();
    if(previousApplyFilter) previousApplyFilter();
    var regionEl=document.getElementById("dexRegionFilter");
    var region=regionEl ? regionEl.value : "";
    if(region){
      document.querySelectorAll("#grid .card[data-id], .card[data-id]").forEach(function(card){
        if(card.classList.contains("hidden")) return;
        var r=card.dataset.region || dexRegionForNumber(card.dataset.id);
        if(r!==region) card.classList.add("hidden");
      });
    }
    if(typeof updateActiveDexFilters==="function") updateActiveDexFilters();
  };

  var previousClearDexFilters=window.clearDexFilters;
  window.clearDexFilters=function(){
    var regionEl=document.getElementById("dexRegionFilter");
    if(regionEl) regionEl.value="";
    if(previousClearDexFilters) previousClearDexFilters();
    else if(typeof applyFilter==="function") applyFilter();
  };

  var TM_HM_TUTOR = {
    "focus-punch":["TM01 — Silph Co. 5F, southwest"],
    "dragon-claw":["TM02 — Victory Road 1F, north"],
    "water-pulse":["TM03 — Cerulean City Gym; defeat Misty"],
    "calm-mind":["TM04 — Saffron City Gym; defeat Sabrina"],
    "roar":["TM05 — Route 4 northeast","TM05 — Celadon Department Store, $1,000"],
    "toxic":["TM06 — Fuchsia City Gym; defeat Koga"],
    "hail":["TM07 — Victory Road 2F, northeast"],
    "bulk-up":["TM08 — Silph Co. 7F, east"],
    "bullet-seed":["TM09 — Mt. Moon 1F, southeast"],
    "hidden-power":["TM10 — Pickup ability, 5% chance"],
    "sunny-day":["TM11 — Safari Zone Area 1, east"],
    "taunt":["TM12 — Rocket Hideout B2F, northwest"],
    "ice-beam":["TM13 — Celadon Game Corner, 4,000 coins"],
    "blizzard":["TM14 — Pokémon Mansion B1F, north"],
    "hyper-beam":["TM15 — Celadon Department Store, $7,500"],
    "light-screen":["TM16 — Celadon Department Store roof; give girl Fresh Water"],
    "protect":["TM17 — Power Plant, center"],
    "rain-dance":["TM18 — Route 15, northwest"],
    "giga-drain":["TM19 — Celadon City Gym; defeat Erika"],
    "safeguard":["TM20 — Celadon Department Store roof; give girl Soda Pop"],
    "frustration":["TM21 — Rocket Hideout B3F, south"],
    "solar-beam":["TM22 — Pokémon Mansion B1F, west"],
    "iron-tail":["TM23 — Celadon Game Corner, 3,500 coins"],
    "thunderbolt":["TM24 — Celadon Game Corner, 4,000 coins"],
    "thunder":["TM25 — Power Plant, southeast"],
    "earthquake":["TM26 — Viridian City Gym; defeat Giovanni"],
    "return":["TM27 — Route 12 north; girl in Lavender gate"],
    "dig":["TM28 — Cerulean City; defeat Team Rocket Grunt","TM28 — Celadon Department Store, $2,000"],
    "psychic":["TM29 — Saffron City southeast; Mr. Psychic"],
    "shadow-ball":["TM30 — Celadon Game Corner, 4,500 coins"],
    "brick-break":["TM31 — S.S. Anne 1F","TM31 — Celadon Department Store, $3,000"],
    "double-team":["TM32 — Safari Zone Area 3, west"],
    "reflect":["TM33 — Celadon Department Store, $1,000","TM33 — Celadon Department Store roof; give girl Lemonade"],
    "shock-wave":["TM34 — Vermilion City Gym; defeat Lt. Surge"],
    "flamethrower":["TM35 — Celadon Game Corner, 4,000 coins"],
    "sludge-bomb":["TM36 — Rocket Warehouse, northwest"],
    "sandstorm":["TM37 — Victory Road 2F, east"],
    "fire-blast":["TM38 — Cinnabar Island Gym; defeat Blaine"],
    "rock-tomb":["TM39 — Pewter City Gym; defeat Brock"],
    "aerial-ace":["TM40 — Route 9, southwest"],
    "torment":["TM41 — Silph Co. 4F, southeast"],
    "facade":["TM42 — Memorial Pillar; put Lemonade on memorial"],
    "secret-power":["TM43 — Route 25, northwest","TM43 — Celadon Department Store, $3,000"],
    "rest":["TM44 — S.S. Anne B1F"],
    "attract":["TM45 — Route 24, northwest","TM45 — Celadon Department Store, $3,000"],
    "thief":["TM46 — Mt. Moon B2F, north of Team Rocket Grunt"],
    "steel-wing":["TM47 — Safari Zone Area 2, north"],
    "skill-swap":["TM48 — Route 12 northeast; requires Surf"],
    "snatch":["TM49 — Rocket Hideout B4F, northwest"],
    "overheat":["TM50 — Victory Road 3F, northwest"],
    "cut":["HM01 — S.S. Anne; receive from the Captain"],
    "fly":["HM02 — Route 16; hidden house west of Celadon, requires Cut"],
    "surf":["HM03 — Safari Zone Area 3; Secret House"],
    "strength":["HM04 — Fuchsia City Safari Zone Warden; return Gold Teeth from Safari Zone Area 3"],
    "flash":["HM05 — Route 2 gate; Oak's aide after catching 10 Pokémon"],
    "rock-smash":["HM06 — Ember Spa, One Island"],
    "waterfall":["HM07 — Icefall Cave, Four Island"],
    "mega-punch":["Move Tutor — Route 4"],
    "mega-kick":["Move Tutor — Route 4"],
    "blast-burn":["Move Tutor — Cape Brink; Charizard only, max friendship"],
    "hydro-cannon":["Move Tutor — Cape Brink; Blastoise only, max friendship"],
    "frenzy-plant":["Move Tutor — Cape Brink; Venusaur only, max friendship"],
    "counter":["Move Tutor — Celadon City"],
    "soft-boiled":["Move Tutor — Celadon City"],
    "metronome":["Move Tutor — Cinnabar Island"],
    "body-slam":["Move Tutor — Four Island"],
    "substitute":["Move Tutor — Fuchsia City"],
    "explosion":["Move Tutor — Mt. Ember"],
    "seismic-toss":["Move Tutor — Pewter City"],
    "rock-slide":["Move Tutor — Rock Tunnel"],
    "mimic":["Move Tutor — Saffron City"],
    "swords-dance":["Move Tutor — Seven Island"],
    "thunder-wave":["Move Tutor — Silph Co."],
    "double-edge":["Move Tutor — Victory Road"],
    "dream-eater":["Move Tutor — Viridian City"]
  };
  window.FRLG_MOVE_ACQUISITION = TM_HM_TUTOR;

  function acquisitionLinesForMove(move){
    var slug=slugMove(move);
    if(TM_HM_TUTOR[slug]) return TM_HM_TUTOR[slug];
    var compact=compactMove(move);
    for(var k in TM_HM_TUTOR){ if(compactMove(k)===compact) return TM_HM_TUTOR[k]; }
    return [];
  }
  window.getFRLGMoveAcquisitionLines = acquisitionLinesForMove;

  function enhanceMoveListCards(){
    document.querySelectorAll(".moveListCard[data-move-api]").forEach(function(card){
      if(card.querySelector(".moveAcquireBox")) return;
      var api=card.getAttribute("data-move-api") || "";
      var title=card.querySelector("h3") ? card.querySelector("h3").textContent : titleFromSlug(api);
      var lines=acquisitionLinesForMove(api).concat(acquisitionLinesForMove(title)).filter(function(v,i,a){return v && a.indexOf(v)===i;});
      if(!lines.length) return;
      var box=document.createElement("div");
      box.className="moveAcquireBox";
      box.innerHTML='<b>FireRed/LeafGreen acquisition:</b><ul>'+lines.map(function(line){return '<li>'+esc(line)+'</li>';}).join("")+'</ul>';
      card.appendChild(box);
    });
  }

  var previousRenderMoveList=window.renderMoveList;
  window.renderMoveList=function(){
    if(previousRenderMoveList) previousRenderMoveList();
    enhanceMoveListCards();
  };

  function initEnhancements(){
    injectRegionFilter();
    decorateDexCards();
    if(typeof applyFilter==="function") applyFilter();
    if(typeof window.renderMoveList==="function") window.renderMoveList();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", initEnhancements); else initEnhancements();
  window.addEventListener("load", function(){setTimeout(initEnhancements,300);});
})();
