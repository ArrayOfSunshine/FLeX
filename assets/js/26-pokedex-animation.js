
(function(){
  "use strict";
  if(window.POKEDEX_ANIMATION_PATCH_APPLIED) return;
  window.POKEDEX_ANIMATION_PATCH_APPLIED = true;

  var style = document.createElement("style");
  style.textContent = `
    #pokedexBootOverlay{
      position:fixed;
      inset:0;
      z-index:9999;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#101827;
      pointer-events:none;
      overflow:hidden;
      opacity:1;
      transition:opacity .28s ease;
    }
    #pokedexBootOverlay.bootDone{opacity:0}
    .pokedexBootHalf{
      position:absolute;
      top:0;
      bottom:0;
      width:50.5%;
      background:linear-gradient(135deg,#b91c1c,#ef4444 48%,#991b1b);
      box-shadow:inset 0 0 0 3px rgba(255,255,255,.18), inset 0 0 28px rgba(0,0,0,.35);
      transition:transform .78s cubic-bezier(.22,.88,.2,1);
    }
    .pokedexBootHalf.left{left:0;transform-origin:left center;border-right:4px solid #7f1d1d}
    .pokedexBootHalf.right{right:0;transform-origin:right center;border-left:4px solid #7f1d1d}
    #pokedexBootOverlay.opening .pokedexBootHalf.left{transform:perspective(900px) rotateY(72deg) translateX(-18%)}
    #pokedexBootOverlay.opening .pokedexBootHalf.right{transform:perspective(900px) rotateY(-72deg) translateX(18%)}
    .pokedexBootHinge{
      position:absolute;
      left:50%;top:0;bottom:0;width:10px;transform:translateX(-50%);
      background:linear-gradient(90deg,#450a0a,#fecaca,#450a0a);
      box-shadow:0 0 12px rgba(0,0,0,.35);
      transition:opacity .35s ease;
    }
    #pokedexBootOverlay.opening .pokedexBootHinge{opacity:.2}
    .pokedexBootLens{
      position:absolute;
      left:24px;top:22px;
      width:66px;height:66px;border-radius:50%;
      background:radial-gradient(circle at 35% 30%,#e0f2fe 0 18%,#38bdf8 19% 48%,#0369a1 49% 72%,#082f49 73% 100%);
      border:5px solid #f8fafc;
      box-shadow:0 0 0 5px rgba(15,23,42,.32),0 0 22px rgba(56,189,248,.55);
    }
    .pokedexBootLights{position:absolute;left:104px;top:28px;display:flex;gap:10px}
    .pokedexBootLights span{width:17px;height:17px;border-radius:50%;border:2px solid rgba(15,23,42,.42);box-shadow:inset 0 2px 4px rgba(255,255,255,.5)}
    .pokedexBootLights span:nth-child(1){background:#ef4444}.pokedexBootLights span:nth-child(2){background:#facc15}.pokedexBootLights span:nth-child(3){background:#22c55e}
    .pokedexBootScreen{
      position:relative;
      z-index:1;
      width:min(420px,76vw);
      min-height:170px;
      border:8px solid #e5e7eb;
      border-radius:18px;
      background:linear-gradient(180deg,#d1fae5,#86efac);
      box-shadow:0 10px 28px rgba(0,0,0,.35), inset 0 0 0 4px rgba(22,101,52,.18);
      display:flex;
      align-items:center;
      justify-content:center;
      flex-direction:column;
      gap:10px;
      transform:scale(.98);
      transition:transform .45s ease, opacity .35s ease;
    }
    #pokedexBootOverlay.opening .pokedexBootScreen{transform:scale(1.04);opacity:.18}
    .pokedexBootTitle{font-weight:800;color:#064e3b;letter-spacing:.04em;text-align:center;font-size:clamp(20px,5vw,32px)}
    .pokedexBootSub{font-size:13px;color:#166534;text-align:center}
    .pokedexBootScan{width:70%;height:8px;border-radius:999px;background:#dcfce7;overflow:hidden;border:1px solid rgba(22,101,52,.28)}
    .pokedexBootScan:before{content:"";display:block;width:36%;height:100%;border-radius:999px;background:#16a34a;animation:pokedexBootScan 1s ease-in-out infinite alternate}
    @keyframes pokedexBootScan{from{transform:translateX(-10%)}to{transform:translateX(190%)}}

    #globalLoadOverlay{
      position:fixed;
      inset:0;
      z-index:9998;
      display:none;
      align-items:center;
      justify-content:center;
      background:rgba(15,23,42,.28);
      backdrop-filter:blur(2px);
      pointer-events:none;
    }
    #globalLoadOverlay.visible{display:flex}
    .globalLoadCard{
      min-width:min(330px,84vw);
      border:1px solid rgba(255,255,255,.72);
      border-radius:18px;
      background:rgba(255,255,255,.94);
      box-shadow:0 12px 34px rgba(15,23,42,.28);
      padding:18px 20px;
      text-align:center;
      color:#1f2937;
    }
    .spinningPokeball{
      width:74px;
      height:74px;
      border-radius:50%;
      margin:0 auto 12px;
      position:relative;
      border:4px solid #111827;
      background:linear-gradient(to bottom,#ef4444 0 46%,#111827 47% 53%,#f9fafb 54% 100%);
      box-shadow:0 4px 12px rgba(15,23,42,.28);
      animation:pokeballSpin .78s linear infinite;
    }
    .spinningPokeball:before{
      content:"";
      position:absolute;
      left:50%;top:50%;
      width:26px;height:26px;
      transform:translate(-50%,-50%);
      border-radius:50%;
      background:#f9fafb;
      border:4px solid #111827;
      box-shadow:inset 0 0 0 4px #e5e7eb;
    }
    .globalLoadText{font-weight:700;margin-bottom:4px}.globalLoadSub{font-size:13px;color:#6b7280}
    @keyframes pokeballSpin{to{transform:rotate(360deg)}}
    @media (prefers-reduced-motion:reduce){
      .pokedexBootHalf,#pokedexBootOverlay,.pokedexBootScreen{transition:none!important}
      .spinningPokeball,.pokedexBootScan:before{animation:none!important}
    }
  `;
  document.head.appendChild(style);

  function makeBootOverlay(){
    if(document.getElementById("pokedexBootOverlay")) return;
    var overlay=document.createElement("div");
    overlay.id="pokedexBootOverlay";
    overlay.innerHTML='\
      <div class="pokedexBootHalf left"><div class="pokedexBootLens"></div><div class="pokedexBootLights"><span></span><span></span><span></span></div></div>\
      <div class="pokedexBootHalf right"></div>\
      <div class="pokedexBootHinge"></div>\
      <div class="pokedexBootScreen"><div class="pokedexBootTitle"><span class="flexBrandF">F</span><span class="flexBrandL">L</span>éX</div><div class="pokedexBootSub">Loading Gen 3 tracker</div><div class="pokedexBootScan"></div></div>';
    document.body.appendChild(overlay);
    setTimeout(function(){overlay.classList.add("opening");},180);
    setTimeout(function(){overlay.classList.add("bootDone");},1040);
    setTimeout(function(){if(overlay&&overlay.parentNode) overlay.parentNode.removeChild(overlay);},1420);
  }

  function ensureLoadOverlay(){
    var overlay=document.getElementById("globalLoadOverlay");
    if(overlay) return overlay;
    overlay=document.createElement("div");
    overlay.id="globalLoadOverlay";
    overlay.innerHTML='<div class="globalLoadCard"><div class="spinningPokeball"></div><div id="globalLoadText" class="globalLoadText">Loading…</div><div id="globalLoadSub" class="globalLoadSub">Please keep this tab open.</div></div>';
    document.body.appendChild(overlay);
    return overlay;
  }

  var activeLoads=0;
  window.showGlobalLoader=function(text,subtext){
    activeLoads++;
    var overlay=ensureLoadOverlay();
    var t=document.getElementById("globalLoadText");
    var s=document.getElementById("globalLoadSub");
    if(t) t.textContent=text||"Loading…";
    if(s) s.textContent=subtext||"Please keep this tab open.";
    overlay.classList.add("visible");
  };
  window.hideGlobalLoader=function(){
    activeLoads=Math.max(0,activeLoads-1);
    if(activeLoads===0){
      var overlay=document.getElementById("globalLoadOverlay");
      if(overlay) overlay.classList.remove("visible");
    }
  };
  window.setGlobalLoaderText=function(text,subtext){
    var t=document.getElementById("globalLoadText");
    var s=document.getElementById("globalLoadSub");
    if(t&&text) t.textContent=text;
    if(s&&subtext) s.textContent=subtext;
  };

  function wrapAsyncLoader(name,label,subtext){
    var fn=window[name];
    if(typeof fn!=="function" || fn.__pokeballWrapped) return false;
    var wrapped=function(){
      var result;
      window.showGlobalLoader(label,subtext);
      try{
        result=fn.apply(this,arguments);
      }catch(e){
        window.hideGlobalLoader();
        throw e;
      }
      return Promise.resolve(result).finally(function(){window.hideGlobalLoader();});
    };
    wrapped.__pokeballWrapped=true;
    window[name]=wrapped;
    return true;
  }

  function wrapKnownLoaders(){
    wrapAsyncLoader("buildDexMoveReferenceIndex","Rebuilding move tables…","Building learner index and move metadata cache.");
    wrapAsyncLoader("buildAllAbilityDataCache","Rebuilding ability cache…","Loading ability data for all tracked Pokémon.");
    wrapAsyncLoader("loadEncounterData","Refreshing location data…","Loading encounter tables and location details.");
  }

  var previousSetStatus = window.setIndexStatus || null;
  if(typeof previousSetStatus === "function"){
    window.setIndexStatus=function(text){
      window.setGlobalLoaderText("Rebuilding move tables…", text || "Working…");
      return previousSetStatus.apply(this,arguments);
    };
  }

  function startup(){
    makeBootOverlay();
    ensureLoadOverlay();
    wrapKnownLoaders();
    setTimeout(wrapKnownLoaders,500);
    setTimeout(wrapKnownLoaders,1500);
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",startup);
  else startup();
})();
