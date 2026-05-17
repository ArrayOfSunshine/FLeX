
/* Android / browser folder sync for FireRed-LeafGreen .sav imports
   Uses File System Access API when available. The app remembers the selected
   folder handle in IndexedDB, then quietly imports the newest .sav on startup
   if sync is enabled. Manual folder selection is still required once by the
   browser for permission. */
(function(){
  var PREFIX = (typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "leafgreen_251_dual_tracker_v3_");
  var ENABLE_KEY = PREFIX + "frlg_save_folder_sync_enabled_v1";
  var LAST_KEY = PREFIX + "frlg_save_folder_sync_last_import_v1";
  var DB_NAME = "pokemon_living_dex_frlg_cache_v3";
  var DB_VERSION = 3;
  var STORE = "kv";
  var HANDLE_KEY = "frlgSaveFolderHandle";
  var AUTO_SYNC_STARTED = false;

  function $(id){return document.getElementById(id);}
  function isEnabled(){try{return localStorage.getItem(ENABLE_KEY)==="1";}catch(e){return false;}}
  function setEnabled(v){try{localStorage.setItem(ENABLE_KEY,v?"1":"0");}catch(e){}}
  function lastInfo(){try{return JSON.parse(localStorage.getItem(LAST_KEY)||"null");}catch(e){return null;}}
  function setLastInfo(info){try{localStorage.setItem(LAST_KEY,JSON.stringify(info||{}));}catch(e){}}
  function status(msg, isError){var el=$("frlgFolderSyncStatus"); if(el){el.textContent=msg||""; el.className="smallText"+(isError?" error":"");}}
  function supportsFolderPicker(){return !!(window.showDirectoryPicker && window.indexedDB);}
  function extOk(name){return /\.sav$/i.test(String(name||""));}

  function openDb(){
    return new Promise(function(resolve,reject){
      if(!window.indexedDB){reject(new Error("IndexedDB unavailable"));return;}
      var req=indexedDB.open(DB_NAME,DB_VERSION);
      req.onupgradeneeded=function(ev){var db=ev.target.result; if(!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE,{keyPath:"key"}); if(!db.objectStoreNames.contains("moveMeta")) db.createObjectStore("moveMeta",{keyPath:"api"});};
      req.onsuccess=function(){resolve(req.result);};
      req.onerror=function(){reject(req.error||new Error("IndexedDB open failed"));};
    });
  }
  function idbGet(key){return openDb().then(function(db){return new Promise(function(resolve,reject){var tx=db.transaction(STORE,"readonly"), st=tx.objectStore(STORE), req=st.get(key); req.onsuccess=function(){resolve(req.result?req.result.value:null);}; req.onerror=function(){reject(req.error||new Error("IndexedDB read failed"));};});});}
  function idbSet(key,value){return openDb().then(function(db){return new Promise(function(resolve,reject){var tx=db.transaction(STORE,"readwrite"), st=tx.objectStore(STORE), req=st.put({key:key,value:value,updatedAt:new Date().toISOString()}); req.onsuccess=function(){resolve(true);}; req.onerror=function(){reject(req.error||new Error("IndexedDB write failed"));};});});}
  function idbDel(key){return openDb().then(function(db){return new Promise(function(resolve,reject){var tx=db.transaction(STORE,"readwrite"), st=tx.objectStore(STORE), req=st.delete(key); req.onsuccess=function(){resolve(true);}; req.onerror=function(){reject(req.error||new Error("IndexedDB delete failed"));};});});}

  async function ensurePermission(handle, request){
    if(!handle || !handle.queryPermission)return false;
    var opts={mode:"read"};
    var q=await handle.queryPermission(opts);
    if(q==="granted")return true;
    if(request && handle.requestPermission){
      var r=await handle.requestPermission(opts);
      return r==="granted";
    }
    return false;
  }

  async function newestSavInFolder(handle){
    var newest=null;
    for await (var entry of handle.values()){
      if(entry && entry.kind==="file" && extOk(entry.name)){
        var f=await entry.getFile();
        if(!newest || f.lastModified>newest.lastModified) newest=f;
      }
    }
    return newest;
  }

  async function importFile(file, quiet){
    if(!file)throw new Error("No .sav file found in selected folder.");
    if(typeof window.parseFrLgSaveForTesting!=="function")throw new Error("Save parser is not available yet.");
    if(typeof window.importFrLgParsedSaveMonsSilently!=="function")throw new Error("Silent save import helper is not available yet.");
    var buf=await file.arrayBuffer();
    var parsed=window.parseFrLgSaveForTesting(buf);
    var result=await window.importFrLgParsedSaveMonsSilently(parsed,{replace:true,folderSync:true,enrich:true});
    setLastInfo({fileName:file.name,lastModified:file.lastModified,importedAt:new Date().toISOString(),result:result});
    if(typeof updateDexOwnershipFromMons==="function")updateDexOwnershipFromMons();
    if(typeof populateTeamBuilderSelectors==="function")populateTeamBuilderSelectors();
    if(typeof renderMyMons==="function")renderMyMons();
    if(typeof updateAllTeamSlotSprites==="function")updateAllTeamSlotSprites();
    if(typeof analyzeTeam==="function")analyzeTeam();
    if(!quiet)status("Imported newest save: "+file.name+" ("+result.imported+" Pokémon).",false);
    return result;
  }

  async function runFolderSync(options){
    options=options||{};
    var quiet=!!options.quiet, request=!!options.requestPermission;
    if(!isEnabled())return null;
    if(!supportsFolderPicker()){
      var msg="Folder sync unavailable: this browser/context does not support persistent folder access.";
      status(msg,true); if(quiet)console.warn(msg); return null;
    }
    var handle=await idbGet(HANDLE_KEY);
    if(!handle){var m="Folder sync is enabled but no folder has been chosen."; status(m,true); if(quiet)console.warn(m); return null;}
    var ok=await ensurePermission(handle,request);
    if(!ok){
      var p="Folder remembered, but Android Chrome has not granted folder access for this session. Tap Reconnect folder access or Sync now in Settings.";
      status(p,false);
      if(quiet)console.warn(p);
      refreshFolderSyncUi();
      return {needsPermission:true};
    }
    if(!quiet)status("Checking selected folder for newest .sav...",false);
    var file=await newestSavInFolder(handle);
    if(!file){var nf="Folder sync could not run: no .sav file was found in the selected folder."; status(nf,true); if(quiet)console.warn(nf); return null;}
    var last=lastInfo();
    if(last && last.fileName===file.name && Number(last.lastModified)===Number(file.lastModified) && quiet){return null;}
    if(!quiet)status("Importing "+file.name+"...",false);
    return await importFile(file,quiet);
  }

  window.chooseFrLgSaveSyncFolder=async function(){
    try{
      if(!supportsFolderPicker()){status("Folder picker is not available in this browser/context. Try Chrome/Edge with the app opened from a secure context.",true);return;}
      var handle=await window.showDirectoryPicker({mode:"read",id:"frlgSaveSyncFolder"});
      var ok=await ensurePermission(handle,true);
      if(!ok){status("Folder permission was not granted.",true);return;}
      await idbSet(HANDLE_KEY,handle);
      setEnabled(true);
      var cb=$("frlgFolderSyncEnabled"); if(cb)cb.checked=true;
      status("Folder selected. Checking for newest .sav...",false);
      await runFolderSync({quiet:false,requestPermission:true});
      refreshFolderSyncUi();
    }catch(e){status("Folder selection failed: "+(e&&e.message?e.message:e),true);}
  };

  window.clearFrLgSaveSyncFolder=async function(){
    try{await idbDel(HANDLE_KEY);}catch(e){}
    setEnabled(false);
    var cb=$("frlgFolderSyncEnabled"); if(cb)cb.checked=false;
    status("Folder sync disabled.",false);
    refreshFolderSyncUi();
  };

  window.setFrLgSaveFolderSyncEnabled=function(checked){
    setEnabled(!!checked);
    if(checked)status("Folder sync enabled. Choose a folder if one is not already saved.",false);
    else status("Folder sync disabled.",false);
    refreshFolderSyncUi();
  };

  window.reconnectFrLgSaveFolderSync=async function(){
    try{
      if(!isEnabled())setEnabled(true);
      var cb=$("frlgFolderSyncEnabled"); if(cb)cb.checked=true;
      status("Requesting folder access...",false);
      var result=await runFolderSync({quiet:false,requestPermission:true});
      if(result && result.needsPermission)status("Folder access was not granted. Tap Choose save folder to select it again.",true);
      refreshFolderSyncUi();
    }catch(e){status("Folder reconnect failed: "+(e&&e.message?e.message:e),true);}
  };

  window.runFrLgSaveFolderSyncNow=function(){
    runFolderSync({quiet:false,requestPermission:true}).then(function(result){
      if(result && result.needsPermission)status("Folder access was not granted. Tap Choose save folder to select it again.",true);
      refreshFolderSyncUi();
    }).catch(function(e){status("Folder sync failed: "+(e&&e.message?e.message:e),true);});
  };

  function refreshFolderSyncUi(){
    var cb=$("frlgFolderSyncEnabled"); if(cb)cb.checked=isEnabled();
    var support=$("frlgFolderSyncSupport");
    if(support) support.textContent=supportsFolderPicker()?"Folder access supported in this browser/context.":"Folder access not available in this browser/context.";
    var last=lastInfo(), lastEl=$("frlgFolderSyncLast");
    if(lastEl) lastEl.textContent=last?("Last sync: "+(last.fileName||"save")+" at "+new Date(last.importedAt).toLocaleString()+"."):"No folder sync has run yet.";
  }

  function insertUi(){
    var panel=$("frlgSaveImportPanel");
    if(!panel || $("frlgSaveFolderSyncPanel")) {refreshFolderSyncUi(); return;}
    var div=document.createElement("div");
    div.id="frlgSaveFolderSyncPanel";
    div.className="analysisBlock";
    div.innerHTML='<h4 style="margin:0 0 6px 0">Android save folder sync</h4>'+
      '<p class="smallText">Optional: choose a system folder containing FireRed/LeafGreen <b>.sav</b> files. When enabled, the app prompts for folder access during startup before the Pokédex opens, then quietly imports the newest .sav. Android Chrome may require this one tap after reopening a local file. This remains fully local.</p>'+
      '<div class="controls"><label><input id="frlgFolderSyncEnabled" type="checkbox" onchange="setFrLgSaveFolderSyncEnabled(this.checked)"> Sync newest .sav from chosen folder on startup</label></div>'+
      '<div class="controls"><button onclick="chooseFrLgSaveSyncFolder()">Choose save folder</button><button onclick="reconnectFrLgSaveFolderSync()">Reconnect folder access</button><button onclick="runFrLgSaveFolderSyncNow()">Sync now</button><button onclick="clearFrLgSaveSyncFolder()">Clear folder sync</button></div>'+
      '<p id="frlgFolderSyncSupport" class="smallText"></p><p id="frlgFolderSyncLast" class="smallText"></p><p id="frlgFolderSyncStatus" class="smallText"></p>';
    panel.appendChild(div);
    refreshFolderSyncUi();
  }

  async function startupSync(){
    if(AUTO_SYNC_STARTED)return; AUTO_SYNC_STARTED=true;
    try{await runFolderSync({quiet:true,requestPermission:false});}
    catch(e){status("Folder sync failed: "+(e&&e.message?e.message:e),true);}
    refreshFolderSyncUi();
  }

  document.addEventListener("DOMContentLoaded",function(){setTimeout(insertUi,0);setTimeout(startupSync,1400);});
  window.addEventListener("load",function(){setTimeout(insertUi,0);setTimeout(startupSync,600);});
  setTimeout(insertUi,800);
})();
