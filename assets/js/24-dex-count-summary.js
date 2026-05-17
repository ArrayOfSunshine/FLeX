
/* Dex persistence hardening + visible count summary
   - Keeps Dex/Living Dex checkbox updates responsive even if old API caches have filled localStorage.
   - Adds visible Dex card count for unfiltered/filtered states.
   - Appended as a final override so earlier large compatibility blocks do not overwrite it. */
(function(){
  function dexStorageKey(id,type){
    var prefix = (typeof STORAGE_PREFIX !== "undefined") ? STORAGE_PREFIX : "leafgreen_251_dual_tracker_v3_";
    return prefix + id + "_" + type;
  }

  function isBulkyNonUserCacheKey(k){
    var prefix = (typeof STORAGE_PREFIX !== "undefined") ? STORAGE_PREFIX : "leafgreen_251_dual_tracker_v3_";
    var dataPrefix = (typeof DATA_PREFIX !== "undefined") ? DATA_PREFIX : "leafgreen_251_pokedata_v1_";
    if(!k) return false;
    if(k.indexOf(prefix + "raw_move_v1_") === 0) return true;
    if(k.indexOf(prefix + "raw_pokemon_v1_") === 0) return true;
    if(k.indexOf(prefix + "raw_species_v1_") === 0) return true;
    if(k === prefix + "all_moves_type_cache_v1") return true;
    if(k === prefix + "move_meta_cache_v1") return true;
    if(k === prefix + "move_meta_cache_v2") return true;
    if(k === prefix + "move_meta_cache_v2_snapshot") return true;
    if(k === prefix + "move_meta_cache_v2_local_snapshot") return true;
    if(k.indexOf(dataPrefix) === 0) return true;
    return false;
  }

  function clearBulkyNonUserCaches(){
    var removed = 0;
    try{
      var keys=[];
      for(var i=0;i<localStorage.length;i++) keys.push(localStorage.key(i));
      keys.forEach(function(k){
        if(isBulkyNonUserCacheKey(k)){
          try{ localStorage.removeItem(k); removed++; }catch(e){}
        }
      });
    }catch(e){}
    return removed;
  }

  function safeSetItem(k,v){
    try{
      localStorage.setItem(k,v);
      return true;
    }catch(firstErr){
      clearBulkyNonUserCaches();
      try{
        localStorage.setItem(k,v);
        return true;
      }catch(secondErr){
        console.warn("Unable to save Dex state after cache cleanup", secondErr);
        var status = document.getElementById("dexSaveStatus");
        if(status){
          status.textContent = "Dex save failed: browser storage is full or unavailable.";
          status.className = "smallText error";
        }
        return false;
      }
    }
  }

  function ensureDexVisibleCountElement(){
    var summary = document.querySelector(".activeFilterSummary");
    if(!summary) return null;
    var el = document.getElementById("dexVisibleCount");
    if(!el){
      el = document.createElement("div");
      el.id = "dexVisibleCount";
      el.className = "smallText";
      el.style.marginTop = "4px";
      var first = summary.querySelector("div");
      if(first) first.appendChild(el);
      else summary.insertBefore(el, summary.firstChild);
    }
    return el;
  }

  function updateDexVisibleCount(){
    var cards = Array.prototype.slice.call(document.querySelectorAll("#grid .card"));
    var total = cards.length || 386;
    var visible = cards.filter(function(c){ return !c.classList.contains("hidden"); }).length;
    var el = ensureDexVisibleCountElement();
    if(el) el.textContent = "Showing " + visible + " of " + total + " Pokémon";
    return {visible:visible,total:total};
  }

  var previousUpdateStats = window.updateStats;
  window.updateStats = function(){
    if(typeof previousUpdateStats === "function") previousUpdateStats.apply(this, arguments);
    updateDexVisibleCount();
  };

  var previousApplyFilter = window.applyFilter;
  window.applyFilter = function(){
    if(typeof previousApplyFilter === "function") previousApplyFilter.apply(this, arguments);
    updateDexVisibleCount();
  };

  window.saveState = function(id,type,val){
    safeSetItem(dexStorageKey(id,type), val ? "true" : "false");

    var box = document.getElementById(type + "_" + id);
    if(box) box.checked = !!val;

    if(typeof updateStats === "function") updateStats();
    if(typeof renderProgress === "function") renderProgress();
    if(typeof updateUnownVariantUi === "function") updateUnownVariantUi();
    if(typeof applyFilter === "function") applyFilter();
    if(typeof updateActiveDexFilters === "function") updateActiveDexFilters();

    var status = document.getElementById("dexSaveStatus");
    if(status){
      status.textContent = "Dex progress saved.";
      status.className = "smallText";
    }
  };

  function ensureDexSaveStatus(){
    var summary = document.querySelector(".activeFilterSummary");
    if(!summary || document.getElementById("dexSaveStatus")) return;
    var el = document.createElement("div");
    el.id = "dexSaveStatus";
    el.className = "smallText";
    el.style.marginTop = "3px";
    el.textContent = "";
    var first = summary.querySelector("div");
    if(first) first.appendChild(el);
  }

  function rebindDexCheckboxes(){
    document.querySelectorAll("#grid .card").forEach(function(card){
      var id = card.dataset.id;
      ["dex","living"].forEach(function(type){
        var box = document.getElementById(type + "_" + id);
        if(box && !box.dataset.dexPersistenceBound){
          box.dataset.dexPersistenceBound = "1";
          box.addEventListener("change", function(){
            window.saveState(id, type, box.checked);
          });
        }
      });
    });
  }

  function startup(){
    ensureDexSaveStatus();
    rebindDexCheckboxes();
    updateDexVisibleCount();
    if(typeof updateStats === "function") updateStats();
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", startup);
  else startup();
  window.addEventListener("load", function(){ setTimeout(startup, 100); });
})();
