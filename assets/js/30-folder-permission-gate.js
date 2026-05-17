
/* Startup folder-sync permission prompt gate
   If folder sync is enabled and a folder handle exists, hold the Pokédex closed
   after initial loading, ask the user to grant folder access, then run sync before opening. */
(function(){
  "use strict";
  if(window.__FRLG_FOLDER_SYNC_BOOT_PROMPT_GATE_V1__) return;
  window.__FRLG_FOLDER_SYNC_BOOT_PROMPT_GATE_V1__ = true;

  var PREFIX = (typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "leafgreen_251_dual_tracker_v3_");
  var ENABLE_KEY = PREFIX + "frlg_save_folder_sync_enabled_v1";
  var DB_NAME = "pokemon_living_dex_frlg_cache_v3";
  var DB_VERSION = 3;
  var STORE = "kv";
  var HANDLE_KEY = "frlgSaveFolderHandle";
  var holdActive = false;
  var holdReleased = false;

  function isEnabled(){
    try{return localStorage.getItem(ENABLE_KEY)==="1";}catch(e){return false;}
  }
  function bootStatus(text){
    var el=document.getElementById("pokedexBootStatus");
    if(el) el.textContent=text;
    if(typeof window.setGlobalLoaderProgress==="function") window.setGlobalLoaderProgress(text);
  }
  function openDb(){
    return new Promise(function(resolve,reject){
      if(!window.indexedDB){reject(new Error("IndexedDB unavailable"));return;}
      var req=indexedDB.open(DB_NAME,DB_VERSION);
      req.onupgradeneeded=function(ev){
        var db=ev.target.result;
        if(!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE,{keyPath:"key"});
        if(!db.objectStoreNames.contains("moveMeta")) db.createObjectStore("moveMeta",{keyPath:"api"});
      };
      req.onsuccess=function(){resolve(req.result);};
      req.onerror=function(){reject(req.error||new Error("IndexedDB open failed"));};
    });
  }
  function idbGet(key){
    return openDb().then(function(db){return new Promise(function(resolve,reject){
      var tx=db.transaction(STORE,"readonly"), st=tx.objectStore(STORE), req=st.get(key);
      req.onsuccess=function(){resolve(req.result?req.result.value:null);};
      req.onerror=function(){reject(req.error||new Error("IndexedDB read failed"));};
    });});
  }
  function releaseHold(){
    if(holdReleased) return;
    holdReleased=true;
    window.__FRLG_FOLDER_SYNC_BOOT_PROMPT_BLOCKING__ = false;
    if(holdActive){
      window.__pokedexBootPendingFetches=Math.max(0,Number(window.__pokedexBootPendingFetches||0)-1);
    }
  }
  function ensurePromptStyles(){
    if(document.getElementById("frlgFolderBootPromptStyles")) return;
    var style=document.createElement("style");
    style.id="frlgFolderBootPromptStyles";
    style.textContent="\
      #pokedexBootOverlay.folderSyncPrompting{pointer-events:auto;}\
      #pokedexBootOverlay.folderSyncPrompting .pokedexBootScreen{min-height:230px;padding:16px;}\
      .folderSyncBootPrompt{display:flex;flex-direction:column;align-items:center;gap:8px;margin-top:4px;width:100%;}\
      .folderSyncBootPromptText{font-size:13px;line-height:1.35;color:#14532d;text-align:center;max-width:340px;}\
      .folderSyncBootPromptButtons{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}\
      .folderSyncBootPromptButtons button{border:1px solid #166534;background:#f0fdf4;color:#14532d;border-radius:999px;padding:8px 12px;font-weight:700;cursor:pointer;}\
      .folderSyncBootPromptButtons button.secondary{border-color:#9ca3af;background:#fff;color:#374151;}\
      .folderSyncBootPromptButtons button:disabled{opacity:.6;cursor:wait;}\
    ";
    document.head.appendChild(style);
  }
  function showPrompt(){
    ensurePromptStyles();
    var overlay=document.getElementById("pokedexBootOverlay");
    var screen=document.querySelector("#pokedexBootOverlay .pokedexBootScreen");
    if(!overlay || !screen){releaseHold();return;}
    window.__FRLG_FOLDER_SYNC_BOOT_PROMPT_BLOCKING__ = true;
    overlay.classList.remove("opening");
    overlay.classList.add("folderSyncPrompting");
    bootStatus("Save folder sync is enabled.");
    var old=document.getElementById("frlgFolderBootPrompt");
    if(old && old.parentNode) old.parentNode.removeChild(old);
    var prompt=document.createElement("div");
    prompt.id="frlgFolderBootPrompt";
    prompt.className="folderSyncBootPrompt";
    prompt.innerHTML='\
      <div class="folderSyncBootPromptText">Grant access to your selected save folder so the newest FireRed/LeafGreen .sav can sync before the Pokédex opens.</div>\
      <div class="folderSyncBootPromptButtons"><button id="frlgFolderBootGrantButton" type="button">Grant folder access</button><button id="frlgFolderBootSkipButton" class="secondary" type="button">Skip this time</button></div>';
    screen.appendChild(prompt);
    var grant=document.getElementById("frlgFolderBootGrantButton");
    var skip=document.getElementById("frlgFolderBootSkipButton");
    if(skip) skip.onclick=function(){
      bootStatus("Folder sync skipped for this startup.");
      overlay.classList.remove("folderSyncPrompting");
      if(prompt.parentNode) prompt.parentNode.removeChild(prompt);
      releaseHold();
    };
    if(grant) grant.onclick=function(){
      grant.disabled=true;
      if(skip) skip.disabled=true;
      bootStatus("Requesting folder access…");
      Promise.resolve()
        .then(function(){
          if(typeof window.reconnectFrLgSaveFolderSync==="function") return window.reconnectFrLgSaveFolderSync();
          if(typeof window.runFrLgSaveFolderSyncNow==="function") return window.runFrLgSaveFolderSyncNow();
          throw new Error("Folder sync helper is not available yet.");
        })
        .then(function(){bootStatus("Folder sync check complete.");})
        .catch(function(e){
          bootStatus("Folder sync could not run: "+(e&&e.message?e.message:e));
        })
        .then(function(){
          setTimeout(function(){
            overlay.classList.remove("folderSyncPrompting");
            if(prompt.parentNode) prompt.parentNode.removeChild(prompt);
            releaseHold();
          },450);
        });
    };
  }
  function initialLoadsSettled(){
    var loaded=window.__pokedexBootWindowLoaded || document.readyState==="complete";
    var pending=Number(window.__pokedexBootPendingFetches||0);
    var elapsed=Date.now()-Number(window.__pokedexBootStart||Date.now());
    return (loaded && pending<=1 && elapsed>550) || elapsed>6500;
  }
  function waitThenPrompt(){
    if(holdReleased) return;
    if(initialLoadsSettled()) showPrompt();
    else setTimeout(waitThenPrompt,120);
  }
  async function init(){
    if(!isEnabled()) return;
    window.__FRLG_FOLDER_SYNC_BOOT_PROMPT_BLOCKING__ = true;
    holdActive=true;
    window.__pokedexBootPendingFetches=Number(window.__pokedexBootPendingFetches||0)+1;
    bootStatus("Checking save folder sync settings…");
    try{
      var handle=await idbGet(HANDLE_KEY);
      if(!handle){releaseHold();return;}
      waitThenPrompt();
    }catch(e){
      bootStatus("Folder sync setup could not be checked: "+(e&&e.message?e.message:e));
      setTimeout(releaseHold,900);
    }
  }

  init();
})();
