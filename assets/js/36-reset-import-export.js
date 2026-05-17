
/* My Mon's reset/import/export IndexedDB repair - keeps restore in-app and avoids Pokédex boot replay */
(function(){
  if(window.__MY_MONS_RESET_IMPORT_IDB_REPAIR_V1__) return;
  window.__MY_MONS_RESET_IMPORT_IDB_REPAIR_V1__ = true;

  var SP = (typeof window.STORAGE_PREFIX === "string" ? window.STORAGE_PREFIX : "leafgreen_251_dual_tracker_v3_");
  var DP = (typeof window.DATA_PREFIX === "string" ? window.DATA_PREFIX : "leafgreen_251_pokedata_v1_");
  var MY_KEY = SP + "my_mons_v1";
  var DB_NAME = SP + "user_data_indexeddb_v1";
  var DB_VERSION = 1;
  var STORE = "kv";

  function openDb(){
    return new Promise(function(resolve,reject){
      if(!window.indexedDB){ reject(new Error("IndexedDB unavailable")); return; }
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function(ev){
        var db = ev.target.result;
        if(!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE,{keyPath:"key"});
      };
      req.onsuccess = function(){ resolve(req.result); };
      req.onerror = function(){ reject(req.error || new Error("IndexedDB open failed")); };
    });
  }
  function idbGet(key){
    return openDb().then(function(db){ return new Promise(function(resolve,reject){
      var tx = db.transaction(STORE,"readonly");
      var st = tx.objectStore(STORE);
      var req = st.get(key);
      req.onsuccess = function(){ resolve(req.result ? req.result.value : null); };
      req.onerror = function(){ reject(req.error || new Error("IndexedDB read failed")); };
    }); });
  }
  function idbSet(key,value){
    return openDb().then(function(db){ return new Promise(function(resolve,reject){
      var tx = db.transaction(STORE,"readwrite");
      var st = tx.objectStore(STORE);
      var req = st.put({key:key,value:value,updatedAt:new Date().toISOString()});
      req.onsuccess = function(){ resolve(true); };
      req.onerror = function(){ reject(req.error || new Error("IndexedDB write failed")); };
    }); });
  }
  function idbDelete(key){
    return openDb().then(function(db){ return new Promise(function(resolve,reject){
      var tx = db.transaction(STORE,"readwrite");
      var st = tx.objectStore(STORE);
      var req = st.delete(key);
      req.onsuccess = function(){ resolve(true); };
      req.onerror = function(){ reject(req.error || new Error("IndexedDB delete failed")); };
    }); });
  }
  function parseMons(value){
    try{
      var parsed = typeof value === "string" ? JSON.parse(value || "[]") : value;
      return Array.isArray(parsed) ? parsed : [];
    }catch(e){ return []; }
  }
  function clone(value){
    try{return JSON.parse(JSON.stringify(value));}
    catch(e){return value;}
  }
  function trackerBackupPrefixes(){ return [SP, DP]; }
  function isTrackerBackupKey(storageKey){
    return trackerBackupPrefixes().some(function(prefix){ return storageKey && String(storageKey).indexOf(prefix) === 0; });
  }
  function isBulkyRuntimeCacheKey(k){
    k = String(k || "");
    return /raw_move_v1_|move_meta_cache_v1|all_moves_type_cache_v1|move_meta_cache_v2/.test(k);
  }
  function refreshAfterDataChange(){
    try{ if(typeof updateDexOwnershipFromMons === "function") updateDexOwnershipFromMons(); }catch(e){console.warn(e);}
    try{ if(typeof populateTeamBuilderSelectors === "function") populateTeamBuilderSelectors(); }catch(e){console.warn(e);}
    try{ if(typeof populateMoveDatalists === "function") populateMoveDatalists(); }catch(e){}
    try{ if(typeof renderMyMons === "function") renderMyMons(); }catch(e){console.warn(e);}
    try{ if(typeof renderTeamBuilder === "function") renderTeamBuilder(); }catch(e){console.warn(e);}
    try{ if(typeof analyzeTeam === "function") analyzeTeam(); }catch(e){console.warn(e);}
    try{ if(typeof updateAllTeamSlotSprites === "function") updateAllTeamSlotSprites(); }catch(e){}
    try{ if(typeof updateStats === "function") updateStats(); }catch(e){console.warn(e);}
    try{ if(typeof applyFilter === "function") applyFilter(); else if(typeof renderDex === "function") renderDex(); }catch(e){console.warn(e);}
    try{ if(typeof renderProgress === "function") renderProgress(); }catch(e){}
    try{ if(typeof applyMoveListFilters === "function") applyMoveListFilters(); else if(typeof renderMoveList === "function") renderMoveList(); }catch(e){}
    try{ if(typeof applyVersionTheme === "function") applyVersionTheme(); }catch(e){}
    try{ if(typeof renderFolderSyncUi === "function") renderFolderSyncUi(); }catch(e){}
  }
  function showWork(text, sub){ try{ if(typeof showGlobalLoader === "function") showGlobalLoader(text, sub); }catch(e){} }
  function setWork(text, sub){ try{ if(typeof setGlobalLoaderText === "function") setGlobalLoaderText(text, sub); }catch(e){} }
  function hideWork(){ try{ if(typeof hideGlobalLoader === "function") hideGlobalLoader(); }catch(e){} }

  async function persistMons(mons){
    if(typeof window.setMyMons === "function"){
      window.setMyMons(clone(mons));
      if(typeof window.waitForMyMonsPersistence === "function") await window.waitForMyMonsPersistence();
      else await idbSet(MY_KEY, clone(mons));
    }else{
      window.__MY_MONS_MEMORY__ = clone(mons);
      await idbSet(MY_KEY, clone(mons));
    }
    try{ localStorage.removeItem(MY_KEY); }catch(e){}
  }

  window.resetMyMonsData = async function(){
    if(typeof confirmResetArea === "function"){
      if(!confirmResetArea("My Mon's")) return;
    }else if(!confirm("Confirm reset My Mon's? This clears saved My Mon's data from this browser.")) return;

    showWork("Resetting My Mon's…", "Clearing owned Pokémon from IndexedDB.");
    try{
      await persistMons([]);
      try{ await idbDelete(MY_KEY); }catch(e){}
      window.__MY_MONS_MEMORY__ = [];
      if(typeof window.setMyMons === "function") window.setMyMons([]);
      try{ localStorage.removeItem(MY_KEY); }catch(e){}
      refreshAfterDataChange();
      alert("My Mon's data reset.");
    }catch(e){
      alert("Could not reset My Mon's data: " + (e && e.message ? e.message : e));
    }finally{
      hideWork();
    }
  };
  try{ resetMyMonsData = window.resetMyMonsData; }catch(e){}

  window.importMyMons = function(event){
    var file = event && event.target && event.target.files && event.target.files[0];
    if(!file) return;
    showWork("Importing My Mon's…", "Reading owned Pokémon JSON.");
    var reader = new FileReader();
    reader.onload = async function(){
      try{
        var data = JSON.parse(reader.result);
        if(!Array.isArray(data)) throw new Error("Expected a My Mon's array.");
        setWork("Importing My Mon's…", "Saving " + data.length + " Pokémon to IndexedDB.");
        await persistMons(data);
        refreshAfterDataChange();
        alert("My Mon's imported.");
      }catch(e){
        alert("Could not import My Mon's JSON: " + (e && e.message ? e.message : e));
      }finally{
        if(event && event.target) event.target.value = "";
        hideWork();
      }
    };
    reader.onerror = function(){
      if(event && event.target) event.target.value = "";
      hideWork();
      alert("Could not read the selected My Mon's file.");
    };
    reader.readAsText(file);
  };
  try{ importMyMons = window.importMyMons; }catch(e){}

  window.exportAllTrackerData = async function(){
    showWork("Exporting tracker data…", "Collecting localStorage and IndexedDB data.");
    try{
      var prefixes = trackerBackupPrefixes();
      var myMons = [];
      try{
        if(typeof window.getMyMons === "function") myMons = window.getMyMons();
        var storedMons = await idbGet(MY_KEY);
        if(Array.isArray(storedMons)) myMons = storedMons;
      }catch(e){ console.warn("Could not read My Mon's from IndexedDB for backup", e); }

      var data = {
        app: "pokemon-living-dex",
        version: 3,
        exportedAt: new Date().toISOString(),
        storagePrefixes: prefixes,
        storagePrefix: SP,
        dataPrefix: DP,
        localStorage: {},
        indexedDb: { myMons: clone(myMons) }
      };
      for(var i=0;i<localStorage.length;i++){
        var k = localStorage.key(i);
        if(isTrackerBackupKey(k) && k !== MY_KEY && !isBulkyRuntimeCacheKey(k)){
          try{ data.localStorage[k] = localStorage.getItem(k); }catch(e){}
        }
      }
      var blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "pokemon_living_dex_backup.json";
      a.click();
      URL.revokeObjectURL(a.href);
    }catch(e){
      alert("Could not export tracker data: " + (e && e.message ? e.message : e));
    }finally{
      hideWork();
    }
  };
  try{ exportAllTrackerData = window.exportAllTrackerData; }catch(e){}

  window.importAllTrackerData = function(event){
    var file = event && event.target && event.target.files && event.target.files[0];
    if(!file) return;
    showWork("Restoring tracker data…", "Reading backup file.");
    var reader = new FileReader();
    reader.onload = async function(){
      try{
        var data = JSON.parse(reader.result);
        if(!data || !data.localStorage || typeof data.localStorage !== "object") throw new Error("Invalid backup file.");
        if(!confirm("Restore all tracker data from this backup? This will replace existing saved tracker data in this browser.")) return;
        setWork("Restoring tracker data…", "Clearing existing tracker keys.");

        var restoredMons = null;
        if(data.indexedDb && Array.isArray(data.indexedDb.myMons)) restoredMons = data.indexedDb.myMons;
        else if(Object.prototype.hasOwnProperty.call(data.localStorage, MY_KEY)) restoredMons = parseMons(data.localStorage[MY_KEY]);

        var remove = [];
        for(var i=0;i<localStorage.length;i++){
          var key = localStorage.key(i);
          if(isTrackerBackupKey(key)) remove.push(key);
        }
        remove.forEach(function(k){ try{ localStorage.removeItem(k); }catch(e){} });

        setWork("Restoring tracker data…", "Restoring settings, Dex, teams and cached indexes.");
        Object.keys(data.localStorage).forEach(function(k){
          if(!isTrackerBackupKey(k) || k === MY_KEY || isBulkyRuntimeCacheKey(k)) return;
          try{ localStorage.setItem(k, data.localStorage[k]); }
          catch(e){ console.warn("Skipped restore key due to storage error", k, e); }
        });

        if(restoredMons){
          setWork("Restoring tracker data…", "Saving " + restoredMons.length + " My Mon's records to IndexedDB.");
          await persistMons(restoredMons);
        }else{
          await persistMons([]);
        }

        refreshAfterDataChange();
        alert("Backup restored.");
      }catch(e){
        alert("Could not restore backup: " + (e && e.message ? e.message : e));
      }finally{
        if(event && event.target) event.target.value = "";
        hideWork();
      }
    };
    reader.onerror = function(){
      if(event && event.target) event.target.value = "";
      hideWork();
      alert("Could not read the selected backup file.");
    };
    reader.readAsText(file);
  };
  try{ importAllTrackerData = window.importAllTrackerData; }catch(e){}
})();
