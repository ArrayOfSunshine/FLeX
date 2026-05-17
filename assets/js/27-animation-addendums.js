
(function(){
  "use strict";
  if(window.POKEDEX_ANIMATION_ADDENDUMS_APPLIED) return;
  window.POKEDEX_ANIMATION_ADDENDUMS_APPLIED = true;

  function ensureProgressLine(){
    var card = document.querySelector("#globalLoadOverlay .globalLoadCard");
    if(!card) return null;
    var el = document.getElementById("globalLoadProgress");
    if(!el){
      el = document.createElement("div");
      el.id = "globalLoadProgress";
      el.className = "globalLoadProgress";
      card.appendChild(el);
    }
    return el;
  }

  function setOverlayProgress(text){
    text = String(text || "").trim();
    if(!text) return;
    var boot = document.getElementById("pokedexBootStatus");
    var bootOverlay = document.getElementById("pokedexBootOverlay");
    if(boot && bootOverlay && !bootOverlay.classList.contains("opening")) boot.textContent = text;
    var line = ensureProgressLine();
    if(line) line.textContent = text;
  }
  window.setGlobalLoaderProgress = setOverlayProgress;

  function patchGlobalLoaderFunctions(){
    if(window.__globalLoaderProgressPatched) return;
    window.__globalLoaderProgressPatched = true;
    var previousShow = window.showGlobalLoader;
    if(typeof previousShow === "function"){
      window.showGlobalLoader = function(text, subtext){
        var result = previousShow.apply(this, arguments);
        setOverlayProgress(subtext || text || "Working…");
        return result;
      };
    }
    var previousSet = window.setGlobalLoaderText;
    if(typeof previousSet === "function"){
      window.setGlobalLoaderText = function(text, subtext){
        var result = previousSet.apply(this, arguments);
        setOverlayProgress(subtext || text || "Working…");
        return result;
      };
    }
  }

  function observeStatus(id){
    var el = document.getElementById(id);
    if(!el || el.__pokedexProgressObserved) return;
    el.__pokedexProgressObserved = true;
    if(el.textContent) setOverlayProgress(el.textContent);
    new MutationObserver(function(){
      var txt = String(el.textContent || "").trim();
      if(txt) setOverlayProgress(txt);
    }).observe(el, {childList:true, characterData:true, subtree:true});
  }

  function observeKnownStatuses(){
    ["moveIndexStatus","abilityCacheStatus","moveListStatus"].forEach(observeStatus);
  }

  function patchStatusSetters(){
    if(window.__pokedexStatusSettersPatched) return;
    window.__pokedexStatusSettersPatched = true;
    var names = ["updateAbilityCacheStatus"];
    names.forEach(function(name){
      var fn = window[name];
      if(typeof fn === "function"){
        window[name] = function(message){
          setOverlayProgress(message);
          return fn.apply(this, arguments);
        };
      }
    });
  }

  function finishBoot(){
    var overlay = document.getElementById("pokedexBootOverlay");
    if(!overlay || overlay.__finished) return;
    if(window.__FRLG_FOLDER_SYNC_BOOT_PROMPT_BLOCKING__ || overlay.classList.contains("folderSyncPrompting")){
      setTimeout(pollBootReady, 180);
      return;
    }
    overlay.__finished = true;
    var status = document.getElementById("pokedexBootStatus");
    if(status) status.textContent = "Ready.";
    overlay.classList.add("opening");
    setTimeout(function(){
      document.body.classList.remove("pokedexBootPending");
      overlay.classList.add("bootDone");
    }, 610);
    setTimeout(function(){
      if(overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1050);
  }

  function bootReady(){
    if(window.__FRLG_FOLDER_SYNC_BOOT_PROMPT_BLOCKING__) return false;
    var loaded = window.__pokedexBootWindowLoaded || document.readyState === "complete";
    var pending = Number(window.__pokedexBootPendingFetches || 0);
    var elapsed = Date.now() - Number(window.__pokedexBootStart || Date.now());
    return (loaded && pending === 0 && elapsed > 450) || elapsed > 6500;
  }

  function pollBootReady(){
    observeKnownStatuses();
    patchGlobalLoaderFunctions();
    patchStatusSetters();
    if(bootReady()){
      setTimeout(function(){
        if(!window.__FRLG_FOLDER_SYNC_BOOT_PROMPT_BLOCKING__ && (Number(window.__pokedexBootPendingFetches || 0) === 0 || Date.now() - Number(window.__pokedexBootStart || Date.now()) > 6500)){
          finishBoot();
        }else{
          pollBootReady();
        }
      }, 250);
    }else{
      setTimeout(pollBootReady, 120);
    }
  }

  document.addEventListener("DOMContentLoaded", function(){
    observeKnownStatuses();
    patchGlobalLoaderFunctions();
    patchStatusSetters();
  });
  window.addEventListener("load", function(){
    window.__pokedexBootWindowLoaded = true;
    observeKnownStatuses();
    patchGlobalLoaderFunctions();
    patchStatusSetters();
  });

  setTimeout(pollBootReady, 60);
  setTimeout(observeKnownStatuses, 700);
  setTimeout(function(){
    patchGlobalLoaderFunctions();
    observeKnownStatuses();
  }, 1600);
})();
