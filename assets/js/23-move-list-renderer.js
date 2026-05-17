
/* Final Move List metadata/acquisition renderer repair
   Keeps the region/acquisition enhancement, but renders move metadata directly from the
   canonical IndexedDB-backed cache/fallback so acquisition notes cannot blank the cards. */
(function(){
  "use strict";
  var STORAGE = (typeof STORAGE_PREFIX !== "undefined" ? STORAGE_PREFIX : "leafgreen_251_dual_tracker_v3_");
  var DB_NAME = STORAGE + "indexeddb_cache_v1";
  var MOVE_STORE = "moveMeta";
  var MOVE_TOTAL = 354;
  var FALLBACK_PREFIX = STORAGE + "move_meta_cache_v2_fallback_chunk_";
  var FALLBACK_COUNT_KEY = STORAGE + "move_meta_cache_v2_fallback_chunk_count";
  var FINAL_META_MEMORY = {};
  var FINAL_META_LOAD_STARTED = false;
  var FINAL_META_LOAD_DONE = false;

  function esc(v){return String(v == null ? "" : v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
  function splitCamel(s){return String(s||"").replace(/([a-z])([A-Z])/g,"$1 $2");}
  function slugMove(name){var s=splitCamel(String(name||"").trim()); return s.toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");}
  function compactMove(name){return String(name||"").toLowerCase().replace(/[^a-z0-9]/g,"");}
  function titleWords(s){return String(s||"").replace(/\b\w/g,function(c){return c.toUpperCase();});}
  var DISPLAY_EXCEPTIONS={"double-edge":"Double-Edge","self-destruct":"Self-Destruct","soft-boiled":"Soft-Boiled","mud-slap":"Mud-Slap","lock-on":"Lock-On","will-o-wisp":"Will-O-Wisp","u-turn":"U-turn"};
  function titleFromSlug(slug){slug=String(slug||""); return DISPLAY_EXCEPTIONS[slug] || slug.split("-").filter(Boolean).map(function(p){return p.charAt(0).toUpperCase()+p.slice(1);}).join(" ");}

  function buildMoveObjects(){
    var names = window.GEN3_MOVE_NAMES || [];
    var out=[];
    for(var i=1;i<=MOVE_TOTAL && i<names.length;i++){
      var raw=names[i]; if(!raw) continue;
      var api=slugMove(raw);
      var spaced=splitCamel(raw).replace(/[-_]+/g," ").replace(/\s+/g," ").trim();
      out.push({id:i, raw:raw, api:api, compact:compactMove(raw), display:DISPLAY_EXCEPTIONS[api] || titleWords(spaced)});
    }
    return out;
  }
  var MOVE_OBJS = buildMoveObjects();
  function objForMove(move){
    var raw = String(move && (move.api || move.display || move.name || move.raw) || move || "").trim();
    if(!raw) return null;
    var slug=slugMove(raw), compact=compactMove(raw);
    for(var i=0;i<MOVE_OBJS.length;i++){
      var o=MOVE_OBJS[i];
      if(o.api===slug || o.compact===compact || compactMove(o.display)===compact || String(o.id)===raw) return o;
    }
    return {id:null, raw:raw, api:slug, compact:compact, display:titleFromSlug(slug)};
  }

  function loadFallback(){
    var cache={};
    try{
      var count=parseInt(localStorage.getItem(FALLBACK_COUNT_KEY)||"0",10)||0;
      if(count){
        var json="";
        for(var i=0;i<count;i++) json += localStorage.getItem(FALLBACK_PREFIX+i)||"";
        if(json) cache=JSON.parse(json)||{};
      }
    }catch(e){console.warn("Move metadata fallback read failed",e);}
    return cache;
  }
  var FALLBACK_META = loadFallback();

  function idbOpen(){
    return new Promise(function(resolve,reject){
      if(!window.indexedDB){reject(new Error("IndexedDB unavailable")); return;}
      var req=indexedDB.open(DB_NAME,2);
      req.onupgradeneeded=function(ev){var db=ev.target.result; if(!db.objectStoreNames.contains(MOVE_STORE)) db.createObjectStore(MOVE_STORE,{keyPath:"api"});};
      req.onsuccess=function(){resolve(req.result);};
      req.onerror=function(){reject(req.error||new Error("IndexedDB open failed"));};
      req.onblocked=function(){reject(new Error("IndexedDB open blocked"));};
    });
  }
  async function loadIndexedMoveMeta(){
    if(FINAL_META_LOAD_STARTED) return;
    FINAL_META_LOAD_STARTED=true;
    try{
      var db=await idbOpen();
      var rows=await new Promise(function(resolve,reject){
        var tx=db.transaction(MOVE_STORE,"readonly"), store=tx.objectStore(MOVE_STORE), req=store.getAll();
        req.onsuccess=function(){resolve(req.result||[]);};
        req.onerror=function(){reject(req.error||new Error("IndexedDB getAll failed"));};
        tx.oncomplete=function(){db.close();};
        tx.onerror=function(){try{db.close();}catch(e){}};
      });
      rows.forEach(function(r){if(r&&r.api) FINAL_META_MEMORY[r.api]=r;});
      FINAL_META_LOAD_DONE=true;
      if(typeof window.renderMoveList==="function") window.renderMoveList();
    }catch(e){
      FINAL_META_LOAD_DONE=true;
      console.warn("Final Move List metadata IndexedDB load failed",e);
      if(typeof window.renderMoveList==="function") window.renderMoveList();
    }
  }

  function normalizeMeta(meta,obj){
    if(!meta) return null;
    obj = obj || objForMove(meta.api || meta.name || meta.display);
    var copy={}; for(var k in meta) copy[k]=meta[k];
    if(obj){copy.api=obj.api; copy.id=obj.id || copy.id; copy.display=obj.display; copy.name=copy.name || obj.api;}
    if(!copy.damage_class && copy.damageClass) copy.damage_class=copy.damageClass;
    if(!copy.damage_class && copy.category) copy.damage_class=copy.category;
    if(!copy.category && copy.damage_class) copy.category=copy.damage_class;
    return copy;
  }
  function metaForMove(move){
    var obj=objForMove(move); if(!obj) return null;
    var meta=null;
    try{ if(window.getMoveMetaSync) meta=window.getMoveMetaSync(obj.api) || window.getMoveMetaSync(obj.display) || window.getMoveMetaSync(obj.raw); }catch(e){}
    meta = meta || FINAL_META_MEMORY[obj.api] || FINAL_META_MEMORY[obj.compact] || FALLBACK_META[obj.api] || FALLBACK_META[obj.compact] || null;
    return normalizeMeta(meta,obj);
  }

  var oldGetMoveMetaSync = window.getMoveMetaSync;
  window.getMoveMetaSync=function(move){
    var obj=objForMove(move), meta=null;
    try{ if(oldGetMoveMetaSync) meta=oldGetMoveMetaSync(move); }catch(e){}
    if(!meta && obj){ meta = FINAL_META_MEMORY[obj.api] || FALLBACK_META[obj.api] || FALLBACK_META[obj.compact] || null; }
    return normalizeMeta(meta,obj);
  };

  function filters(){return {name:(document.getElementById("moveListNameFilter")||{}).value||"",type:(document.getElementById("moveListTypeFilter")||{}).value||"",cat:(document.getElementById("moveListCategoryFilter")||{}).value||"",power:(document.getElementById("moveListPowerFilter")||{}).value||"",acc:(document.getElementById("moveListAccuracyFilter")||{}).value||""};}
  function pass(obj,meta,f){
    if(f.name && compactMove(obj.display).indexOf(compactMove(f.name))<0 && obj.api.indexOf(slugMove(f.name))<0) return false;
    if(f.type && (!meta || meta.type!==f.type)) return false;
    var cls=meta && (meta.damage_class||meta.category) || "";
    if(f.cat && cls!==f.cat) return false;
    var p=meta && meta.power!=null?Number(meta.power):null, a=meta && meta.accuracy!=null?Number(meta.accuracy):null;
    if(f.power){ if(f.power==="status"&&p!==null)return false; if(f.power==="lt60"&&!(p!==null&&p<60))return false; if(f.power==="60to89"&&!(p>=60&&p<=89))return false; if(f.power==="90plus"&&!(p>=90))return false; if(f.power==="damaging"&&!(p>0))return false; if(f.power==="non-damaging"&&!(p===null||p===0))return false; if(f.power==="60plus"&&!(p>=60))return false; if(f.power==="80plus"&&!(p>=80))return false; if(f.power==="100plus"&&!(p>=100))return false; }
    if(f.acc){ if(f.acc==="perfect"&&!(a===100||a===null))return false; if(f.acc==="lt100"&&!(a!==null&&a<100))return false; if(f.acc==="lt85"&&!(a!==null&&a<85))return false; if(f.acc==="90plus"&&!(a>=90||a===null))return false; if(f.acc==="less90"&&!(a!==null&&a<90))return false; }
    return true;
  }
  function acquisitionHtml(obj){
    var lines=[];
    try{ if(window.getFRLGMoveAcquisitionLines) lines=(window.getFRLGMoveAcquisitionLines(obj.api)||[]).concat(window.getFRLGMoveAcquisitionLines(obj.display)||[]); }catch(e){}
    var seen={}, unique=[];
    lines.forEach(function(line){if(line&&!seen[line]){seen[line]=true; unique.push(line);}});
    if(!unique.length) return "";
    return '<div class="moveAcquireBox"><b>FireRed/LeafGreen acquisition:</b><ul>'+unique.map(function(line){return '<li>'+esc(line)+'</li>';}).join("")+'</ul></div>';
  }
  function cardHtml(obj){
    var meta=metaForMove(obj);
    var loaded=!!(meta&&(meta.type||meta.damage_class||meta.category||meta.fullDetailsLoaded));
    var type=loaded?(meta.type||"—"):"Metadata not loaded";
    var cls=loaded?(meta.damage_class||meta.category||"—"):"—";
    var power=loaded?(meta.power==null?"—":meta.power):"—";
    var acc=loaded?(meta.accuracy==null?"—":meta.accuracy+"%"):"—";
    var pp=loaded?(meta.pp==null?"—":meta.pp):"—";
    var pri=loaded?(meta.priority==null?0:meta.priority):"—";
    var desc=loaded?(meta.flavor||meta.effect||"No description available."):"Metadata not loaded. Use Settings → Build/refresh move index to cache details.";
    var effect=loaded&&meta.effect&&meta.effect!==desc?'<div class="moveEffect"><b>Effect:</b> '+esc(meta.effect)+'</div>':"";
    return '<article class="moveListCard" id="move-entry-'+esc(obj.api)+'" data-move-api="'+esc(obj.api)+'"><h3>'+esc(obj.display)+'</h3><div class="moveMetaGrid"><span>Type: '+esc(type)+'</span><span>Class: '+esc(cls)+'</span><span>Power: '+esc(power)+'</span><span>Accuracy: '+esc(acc)+'</span><span>PP: '+esc(pp)+'</span><span>Priority: '+esc(pri)+'</span></div><div class="moveDescription">'+esc(desc)+'</div>'+effect+acquisitionHtml(obj)+'</article>';
  }
  function ensureTypeFilter(){
    var sel=document.getElementById("moveListTypeFilter");
    if(sel&&sel.options.length<=1){["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel"].forEach(function(t){var o=document.createElement("option");o.value=t;o.textContent=t.charAt(0).toUpperCase()+t.slice(1);sel.appendChild(o);});}
  }
  window.renderMoveList=function(){
    var out=document.getElementById("moveListResults"); if(!out) return;
    if(!FINAL_META_LOAD_STARTED) loadIndexedMoveMeta();
    ensureTypeFilter();
    var f=filters();
    var arr=MOVE_OBJS.filter(function(o){return pass(o,metaForMove(o),f);}).sort(function(a,b){return a.display.localeCompare(b.display);});
    var loaded=arr.filter(function(o){var m=metaForMove(o); return m&&(m.type||m.damage_class||m.category||m.fullDetailsLoaded);}).length;
    var summary=document.getElementById("activeMoveListFilters");
    if(summary){var parts=[]; if(f.name)parts.push('Name contains "'+f.name+'"'); if(f.type)parts.push("Type "+f.type); if(f.cat)parts.push(f.cat); if(f.power)parts.push("Power "+f.power); if(f.acc)parts.push("Accuracy "+f.acc); summary.textContent=(parts.length?parts.join(", "):"None")+" — "+arr.length+" shown";}
    var st=document.getElementById("moveListStatus");
    if(st) st.textContent=arr.length+" moves shown. Metadata available for "+loaded+"/"+arr.length+(FINAL_META_LOAD_DONE?".":" (loading cache...).");
    out.innerHTML=arr.map(cardHtml).join("");
  };
  window.openMoveListEntry=function(moveName){
    var obj=objForMove(moveName), api=obj?obj.api:slugMove(moveName);
    if(typeof showTab==="function") showTab("moveListTab");
    setTimeout(function(){var f=document.getElementById("moveListNameFilter"); if(f) f.value=obj?obj.display:titleFromSlug(api); window.renderMoveList(); setTimeout(function(){var c=document.getElementById("move-entry-"+api); if(c){c.scrollIntoView({block:"center"}); c.classList.add("locationJumpHighlight"); setTimeout(function(){c.classList.remove("locationJumpHighlight");},1600);}},80);},0);
  };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",function(){window.renderMoveList();}); else window.renderMoveList();
  window.addEventListener("load",function(){setTimeout(function(){window.renderMoveList();},400);});
})();
