
/* Move List acquisition filter + shared Top button for Dex / Move List / My Mon's
   Appended as a final enhancement so earlier render/filter overrides remain intact. */
(function(){
  function esc(s){return String(s==null?"":s).replace(/[&<>\"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}

  function acquisitionLines(move){
    try{
      if(typeof window.getFRLGMoveAcquisitionLines === "function"){
        var lines = window.getFRLGMoveAcquisitionLines(move) || [];
        return Array.isArray(lines) ? lines : [];
      }
    }catch(e){}
    return [];
  }

  function acquisitionKindMatches(api, wanted){
    if(!wanted) return true;
    var lines = acquisitionLines(api);
    if(!lines.length) return false;
    return lines.some(function(line){
      var t = String(line || "").toLowerCase();
      var isTm = /\btm\d{2}\b/.test(t) || t.indexOf("tm") >= 0;
      var isHm = /\bhm\d{2}\b/.test(t) || t.indexOf("hm") >= 0;
      var isTutor = t.indexOf("tutor") >= 0;
      if(wanted === "tmhm") return isTm || isHm;
      if(wanted === "tm") return isTm;
      if(wanted === "hm") return isHm;
      if(wanted === "tutor") return isTutor;
      return true;
    });
  }

  function ensureAcquisitionFilter(){
    var grid = document.querySelector("#moveListFilterPanel .dexFilterGroup .dexFilterGrid");
    if(!grid || document.getElementById("moveListAcquireFilter")) return;
    var sel = document.createElement("select");
    sel.id = "moveListAcquireFilter";
    sel.className = "typeSelect";
    sel.innerHTML = [
      '<option value="">TM/HM/Tutor</option>',
      '<option value="tmhm">TM or HM moves</option>',
      '<option value="tm">TM moves only</option>',
      '<option value="hm">HM moves only</option>',
      '<option value="tutor">Move Tutor moves</option>'
    ].join("");
    sel.onchange = function(){ if(typeof window.renderMoveList === "function") window.renderMoveList(); };
    grid.appendChild(sel);
  }

  function acquisitionFilterLabel(v){
    if(v === "tmhm") return "TM/HM moves";
    if(v === "tm") return "TM moves";
    if(v === "hm") return "HM moves";
    if(v === "tutor") return "Move Tutor moves";
    return "";
  }

  var previousRenderMoveList = window.renderMoveList;
  window.renderMoveList = function(){
    ensureAcquisitionFilter();
    if(typeof previousRenderMoveList === "function") previousRenderMoveList.apply(this, arguments);

    var wanted = (document.getElementById("moveListAcquireFilter") || {}).value || "";
    var cards = Array.prototype.slice.call(document.querySelectorAll(".moveListCard[data-move-api]"));
    var shown = 0;
    cards.forEach(function(card){
      var api = card.getAttribute("data-move-api") || "";
      var ok = acquisitionKindMatches(api, wanted);
      card.classList.toggle("hidden", !ok);
      card.style.display = ok ? "" : "none";
      if(ok) shown++;
    });

    if(wanted){
      var summary = document.getElementById("activeMoveListFilters");
      if(summary){
        var label = acquisitionFilterLabel(wanted);
        var base = summary.textContent || "None";
        base = base.replace(/\s*—\s*\d+\s+shown\s*$/i, "");
        if(base === "None") base = label;
        else if(base.indexOf(label) < 0) base += ", " + label;
        summary.textContent = base + " — " + shown + " shown";
      }
      var status = document.getElementById("moveListStatus");
      if(status){
        var hidden = cards.length - shown;
        status.textContent = shown + " moves shown" + (hidden ? " after TM/HM/Tutor filter." : ".");
      }
    }
  };

  var previousClearMoveListFilters = window.clearMoveListFilters;
  window.clearMoveListFilters = function(){
    var acq = document.getElementById("moveListAcquireFilter");
    if(acq) acq.value = "";
    if(typeof previousClearMoveListFilters === "function") previousClearMoveListFilters.apply(this, arguments);
    else if(typeof window.renderMoveList === "function") window.renderMoveList();
  };

  function activeTopTarget(){
    return document.querySelector(".tabPage.active") || document.getElementById("dexTab") || document.body;
  }

  window.scrollDexToTop = function(){
    var target = activeTopTarget();
    var y = target === document.body ? 0 : Math.max(0, target.getBoundingClientRect().top + window.pageYOffset - 95);
    window.scrollTo({top:y, behavior:"smooth"});
  };

  window.updateBackToTopButton = function(){
    var btn = document.getElementById("backToTopButton");
    if(!btn) return;
    var active = document.querySelector(".tabPage.active");
    var eligible = active && /^(dexTab|moveListTab|myMonsTab)$/.test(active.id || "");
    btn.classList.toggle("visible", !!eligible && window.scrollY > 650);
  };

  function startup(){
    ensureAcquisitionFilter();
    if(typeof window.renderMoveList === "function") window.renderMoveList();
    window.updateBackToTopButton();
  }

  window.addEventListener("scroll", function(){window.updateBackToTopButton();}, {passive:true});
  window.addEventListener("resize", function(){window.updateBackToTopButton();});
  window.addEventListener("load", function(){setTimeout(startup, 150);});
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", startup);
  else startup();
})();
