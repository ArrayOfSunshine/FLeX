
/* My Mon's IndexedDB persistence bridge - prevents localStorage quota failures on Android/local files */
(function(){
  if(window.__MY_MONS_IDB_BRIDGE_V1__) return;
  window.__MY_MONS_IDB_BRIDGE_V1__ = true;

  var STORAGE_PREFIX = (typeof window.STORAGE_PREFIX === "string" ? window.STORAGE_PREFIX : "leafgreen_251_dual_tracker_v3_");
  var MY_MONS_LS_KEY = STORAGE_PREFIX + "my_mons_v1";
  var DB_NAME = STORAGE_PREFIX + "user_data_indexeddb_v1";
  var DB_VERSION = 1;
  var STORE = "kv";
  var memoryMons = [];
  var loadedFromIdb = false;
  var pendingSave = null;
  var originalStorageSetItem = Storage.prototype.setItem;
  var originalStorageRemoveItem = Storage.prototype.removeItem;

  function isMyMonsKey(key){ return String(key) === MY_MONS_LS_KEY || /_my_mons_v1$/.test(String(key)); }
  function parseMons(value){
    try{
      var parsed = typeof value === "string" ? JSON.parse(value || "[]") : value;
      return Array.isArray(parsed) ? parsed : [];
    }catch(e){ return []; }
  }
  function cloneMons(mons){
    try{return JSON.parse(JSON.stringify(Array.isArray(mons)?mons:[]));}
    catch(e){return Array.isArray(mons)?mons.slice():[];}
  }
  function readLocalMons(){
    try{return parseMons(localStorage.getItem(MY_MONS_LS_KEY) || "[]");}
    catch(e){return [];}
  }
  memoryMons = readLocalMons();
  window.__MY_MONS_MEMORY__ = memoryMons;

  function openUserDb(){
    return new Promise(function(resolve,reject){
      if(!window.indexedDB){reject(new Error("IndexedDB unavailable"));return;}
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function(ev){
        var db = ev.target.result;
        if(!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE,{keyPath:"key"});
      };
      req.onsuccess = function(){resolve(req.result);};
      req.onerror = function(){reject(req.error || new Error("IndexedDB open failed"));};
    });
  }
  function idbGet(key){
    return openUserDb().then(function(db){return new Promise(function(resolve,reject){
      var tx = db.transaction(STORE,"readonly"), st = tx.objectStore(STORE), req = st.get(key);
      req.onsuccess = function(){resolve(req.result ? req.result.value : null);};
      req.onerror = function(){reject(req.error || new Error("IndexedDB read failed"));};
    });});
  }
  function idbSet(key,value){
    pendingSave = openUserDb().then(function(db){return new Promise(function(resolve,reject){
      var tx = db.transaction(STORE,"readwrite"), st = tx.objectStore(STORE), req = st.put({key:key,value:value,updatedAt:new Date().toISOString()});
      req.onsuccess = function(){resolve(true);};
      req.onerror = function(){reject(req.error || new Error("IndexedDB write failed"));};
    });}).catch(function(e){
      console.warn("My Mon's IndexedDB save failed", e);
      var status = document.getElementById("frlgFolderSyncStatus") || document.getElementById("myMonsSortStatus");
      if(status) status.textContent = "My Mon's IndexedDB save failed: " + (e && e.message ? e.message : e);
      return false;
    });
    return pendingSave;
  }
  function clearLocalMyMons(){
    try{ originalStorageRemoveItem.call(localStorage, MY_MONS_LS_KEY); }catch(e){}
  }
  function afterMonsChanged(){
    try{ if(typeof updateDexOwnershipFromMons === "function") updateDexOwnershipFromMons(); }catch(e){console.warn(e);}
    try{ if(typeof populateTeamBuilderSelectors === "function") populateTeamBuilderSelectors(); }catch(e){console.warn(e);}
    try{ if(typeof renderMyMons === "function") renderMyMons(); }catch(e){console.warn(e);}
    try{ if(typeof updateAllTeamSlotSprites === "function") updateAllTeamSlotSprites(); }catch(e){console.warn(e);}
    try{ if(typeof analyzeTeam === "function") analyzeTeam(); }catch(e){console.warn(e);}
    try{ if(typeof renderDex === "function") renderDex(); }catch(e){}
    try{ if(typeof renderProgress === "function") renderProgress(); }catch(e){}
  }

  window.getMyMons = function(){ return cloneMons(memoryMons); };
  try{ getMyMons = window.getMyMons; }catch(e){}

  window.setMyMons = function(mons){
    memoryMons = cloneMons(mons);
    window.__MY_MONS_MEMORY__ = memoryMons;
    idbSet(MY_MONS_LS_KEY, memoryMons);
    clearLocalMyMons();
    afterMonsChanged();
  };
  try{ setMyMons = window.setMyMons; }catch(e){}

  Storage.prototype.setItem = function(key,value){
    if(isMyMonsKey(key)){
      memoryMons = parseMons(value);
      window.__MY_MONS_MEMORY__ = memoryMons;
      idbSet(MY_MONS_LS_KEY, memoryMons);
      clearLocalMyMons();
      return;
    }
    try{return originalStorageSetItem.call(this,key,value);}
    catch(e){
      if(e && (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED" || String(e.message||"").toLowerCase().indexOf("quota") >= 0)){
        console.warn("localStorage quota exceeded for key", key, e);
        if(/move|cache|raw|pokedata/i.test(String(key))){ return; }
      }
      throw e;
    }
  };

  async function loadMyMonsFromIndexedDb(){
    try{
      var stored = await idbGet(MY_MONS_LS_KEY);
      if(Array.isArray(stored)){
        memoryMons = cloneMons(stored);
        window.__MY_MONS_MEMORY__ = memoryMons;
        loadedFromIdb = true;
        clearLocalMyMons();
        afterMonsChanged();
      }else if(memoryMons.length){
        await idbSet(MY_MONS_LS_KEY, memoryMons);
        clearLocalMyMons();
      }
    }catch(e){
      console.warn("My Mon's IndexedDB load failed", e);
    }
  }

  function cleanupOversizedLocalCaches(){
    var removed = 0;
    try{
      for(var i=localStorage.length-1;i>=0;i--){
        var k = localStorage.key(i) || "";
        if(k === MY_MONS_LS_KEY) continue;
        if(/^leafgreen_251_pokedata_v1_raw_move_v1_/.test(k) || /raw_move_v1_|move_meta_cache_v1|all_moves_type_cache_v1|move_meta_cache_v2/.test(k)){
          try{localStorage.removeItem(k);removed++;}catch(e){}
        }
      }
    }catch(e){}
    if(removed) console.log("Cleared oversized legacy localStorage cache keys:", removed);
  }

  window.waitForMyMonsPersistence = function(){ return pendingSave || Promise.resolve(true); };
  window.forceMyMonsIndexedDbSave = function(){ return idbSet(MY_MONS_LS_KEY, memoryMons).then(clearLocalMyMons); };

  cleanupOversizedLocalCaches();
  loadMyMonsFromIndexedDb();
  document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){cleanupOversizedLocalCaches();loadMyMonsFromIndexedDb();},0);});
})();
