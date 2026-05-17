
(function(){
  if(!window.GEN3_MOVE_NAMES){ window.GEN3_MOVE_NAMES = ["", "Pound", "Karate Chop", "Double Slap", "Comet Punch", "Mega Punch", "Pay Day", "Fire Punch", "Ice Punch", "Thunder Punch", "Scratch", "Vice Grip", "Guillotine", "Razor Wind", "Swords Dance", "Cut", "Gust", "Wing Attack", "Whirlwind", "Fly", "Bind", "Slam", "Vine Whip", "Stomp", "Double Kick", "Mega Kick", "Jump Kick", "Rolling Kick", "Sand Attack", "Headbutt", "Horn Attack", "Fury Attack", "Horn Drill", "Tackle", "Body Slam", "Wrap", "Take Down", "Thrash", "Double-Edge", "Tail Whip", "Poison Sting", "Twineedle", "Pin Missile", "Leer", "Bite", "Growl", "Roar", "Sing", "Supersonic", "Sonic Boom", "Disable", "Acid", "Ember", "Flamethrower", "Mist", "Water Gun", "Hydro Pump", "Surf", "Ice Beam", "Blizzard", "Psybeam", "Bubble Beam", "Aurora Beam", "Hyper Beam", "Peck", "Drill Peck", "Submission", "Low Kick", "Counter", "Seismic Toss", "Strength", "Absorb", "Mega Drain", "Leech Seed", "Growth", "Razor Leaf", "SolarBeam", "PoisonPowder", "Stun Spore", "Sleep Powder", "Petal Dance", "String Shot", "Dragon Rage", "Fire Spin", "ThunderShock", "Thunderbolt", "Thunder Wave", "Thunder", "Rock Throw", "Earthquake", "Fissure", "Dig", "Toxic", "Confusion", "Psychic", "Hypnosis", "Meditate", "Agility", "Quick Attack", "Rage", "Teleport", "Night Shade", "Mimic", "Screech", "Double Team", "Recover", "Harden", "Minimize", "Smokescreen", "Confuse Ray", "Withdraw", "Defense Curl", "Barrier", "Light Screen", "Haze", "Reflect", "Focus Energy", "Bide", "Metronome", "Mirror Move", "Self-Destruct", "Egg Bomb", "Lick", "Smog", "Sludge", "Bone Club", "Fire Blast", "Waterfall", "Clamp", "Swift", "Skull Bash", "Spike Cannon", "Constrict", "Amnesia", "Kinesis", "Soft-Boiled", "High Jump Kick", "Glare", "Dream Eater", "Poison Gas", "Barrage", "Leech Life", "Lovely Kiss", "Sky Attack", "Transform", "Bubble", "Dizzy Punch", "Spore", "Flash", "Psywave", "Splash", "Acid Armor", "Crabhammer", "Explosion", "Fury Swipes", "Bonemerang", "Rest", "Rock Slide", "Hyper Fang", "Sharpen", "Conversion", "Tri Attack", "Super Fang", "Slash", "Substitute", "Struggle", "Sketch", "Triple Kick", "Thief", "Spider Web", "Mind Reader", "Nightmare", "Flame Wheel", "Snore", "Curse", "Flail", "Conversion 2", "Aeroblast", "Cotton Spore", "Reversal", "Spite", "Powder Snow", "Protect", "Mach Punch", "Scary Face", "Feint Attack", "Sweet Kiss", "Belly Drum", "Sludge Bomb", "Mud-Slap", "Octazooka", "Spikes", "Zap Cannon", "Foresight", "Destiny Bond", "Perish Song", "Icy Wind", "Detect", "Bone Rush", "Lock-On", "Outrage", "Sandstorm", "Giga Drain", "Endure", "Charm", "Rollout", "False Swipe", "Swagger", "Milk Drink", "Spark", "Fury Cutter", "Steel Wing", "Mean Look", "Attract", "Sleep Talk", "Heal Bell", "Return", "Present", "Frustration", "Safeguard", "Pain Split", "Sacred Fire", "Magnitude", "DynamicPunch", "Megahorn", "DragonBreath", "Baton Pass", "Encore", "Pursuit", "Rapid Spin", "Sweet Scent", "Iron Tail", "Metal Claw", "Vital Throw", "Morning Sun", "Synthesis", "Moonlight", "Hidden Power", "Cross Chop", "Twister", "Rain Dance", "Sunny Day", "Crunch", "Mirror Coat", "Psych Up", "ExtremeSpeed", "AncientPower", "Shadow Ball", "Future Sight", "Rock Smash", "Whirlpool", "Beat Up", "Fake Out", "Uproar", "Stockpile", "Spit Up", "Swallow", "Heat Wave", "Hail", "Torment", "Flatter", "Will-O-Wisp", "Memento", "Facade", "Focus Punch", "SmellingSalt", "Follow Me", "Nature Power", "Charge", "Taunt", "Helping Hand", "Trick", "Role Play", "Wish", "Assist", "Ingrain", "Superpower", "Magic Coat", "Recycle", "Revenge", "Brick Break", "Yawn", "Knock Off", "Endeavor", "Eruption", "Skill Swap", "Imprison", "Refresh", "Grudge", "Snatch", "Secret Power", "Dive", "Arm Thrust", "Camouflage", "Tail Glow", "Luster Purge", "Mist Ball", "FeatherDance", "Teeter Dance", "Blaze Kick", "Mud Sport", "Ice Ball", "Needle Arm", "Slack Off", "Hyper Voice", "Poison Fang", "Crush Claw", "Blast Burn", "Hydro Cannon", "Meteor Mash", "Astonish", "Weather Ball", "Aromatherapy", "Fake Tears", "Air Cutter", "Overheat", "Odor Sleuth", "Rock Tomb", "Silver Wind", "Metal Sound", "GrassWhistle", "Tickle", "Cosmic Power", "Water Spout", "Signal Beam", "Shadow Punch", "Extrasensory", "Sky Uppercut", "Sand Tomb", "Sheer Cold", "Muddy Water", "Bullet Seed", "Aerial Ace", "Icicle Spear", "Iron Defense", "Block", "Howl", "Dragon Claw", "Frenzy Plant", "Bulk Up", "Bounce", "Mud Shot", "Poison Tail", "Covet", "Volt Tackle", "Magical Leaf", "Water Sport", "Calm Mind", "Leaf Blade", "Dragon Dance", "Rock Blast", "Shock Wave", "Water Pulse", "Doom Desire", "Psycho Boost"]; }
  function esc(s){ return (typeof escapeHtml === "function" ? escapeHtml(String(s||"")) : String(s||"").replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];})); }
  function apiName(name){ return String(name||"").trim().replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase(); }
  function displayMove(name){ if(typeof formatMoveName === "function") return formatMoveName(apiName(name)); return String(name||"").replace(/-/g," ").replace(/\b\w/g,function(c){return c.toUpperCase();}); }
  function prettyMoveNameFromApi(api){ return typeof formatMoveName === "function" ? formatMoveName(api) : String(api||"").replace(/-/g," ").replace(/\b\w/g,function(c){return c.toUpperCase();}); }
  function moveSlugFromDisplay(name){ return apiName(name); }
  function gen3MoveObjects(){ return (window.GEN3_MOVE_NAMES||[]).filter(Boolean).map(function(n,i){ return {id:i+1,name:n,api:apiName(n)}; }); }
  function moveMetaCacheKey(){ return (typeof MOVE_META_CACHE_KEY !== "undefined" ? MOVE_META_CACHE_KEY : ((typeof STORAGE_PREFIX!=="undefined"?STORAGE_PREFIX:"leafgreen_251_dual_tracker_v3_")+"move_meta_cache_v1")); }
  function getMoveListMetaCache(){ try{ return JSON.parse(localStorage.getItem(moveMetaCacheKey())||"{}"); }catch(e){ return {}; } }
  function setMoveListMetaCache(cache){ try{ localStorage.setItem(moveMetaCacheKey(), JSON.stringify(cache)); }catch(e){} }
  function getCachedMoveMeta(api){ var cache=getMoveListMetaCache(); return cache && cache[api] ? cache[api] : null; }
  function mergeMoveMeta(api, raw){
    var cache=getMoveListMetaCache();
    var existing=cache[api] || {};
    var flavour="", effect="";
    if(Array.isArray(raw.flavor_text_entries)){
      var f=raw.flavor_text_entries.find(function(x){return x.language && x.language.name==="en" && x.version_group && x.version_group.name==="firered-leafgreen";}) || raw.flavor_text_entries.find(function(x){return x.language && x.language.name==="en";});
      if(f) flavour=String(f.flavor_text||"").replace(/\s+/g," ").trim();
    }
    if(Array.isArray(raw.effect_entries)){
      var e=raw.effect_entries.find(function(x){return x.language && x.language.name==="en";});
      if(e) effect=String(e.short_effect||e.effect||"").replace(/\$effect_chance/g, raw.effect_chance || "").replace(/\s+/g," ").trim();
    }
    var meta={
      name: api,
      display: existing.display || prettyMoveNameFromApi(api),
      type: raw.type && raw.type.name || existing.type || "",
      power: raw.power === null || raw.power === undefined ? 0 : raw.power,
      accuracy: raw.accuracy === null || raw.accuracy === undefined ? 100 : raw.accuracy,
      category: raw.damage_class && raw.damage_class.name || existing.category || existing.damage_class || "",
      damage_class: raw.damage_class && raw.damage_class.name || existing.damage_class || existing.category || "",
      pp: raw.pp === null || raw.pp === undefined ? existing.pp : raw.pp,
      priority: raw.priority === null || raw.priority === undefined ? existing.priority || 0 : raw.priority,
      flavor: flavour || existing.flavor || "",
      effect: effect || existing.effect || "",
      fullDetailsLoaded: true
    };
    cache[api]=Object.assign({}, existing, meta);
    setMoveListMetaCache(cache);
    try{
      if(typeof getMoveCache === "function" && typeof setMoveCache === "function"){
        var oldCache=getMoveCache(); oldCache[api]={type:meta.type,display:meta.display,power:meta.power,accuracy:meta.accuracy,category:meta.category}; setMoveCache(oldCache);
      }
    }catch(e){}
    return cache[api];
  }
  async function fetchMoveMetaForList(api){
    var cached=getCachedMoveMeta(api);
    if(cached && cached.fullDetailsLoaded) return cached;
    var raw=null;
    if(typeof fetchJsonCached === "function") raw = await fetchJsonCached("https://pokeapi.co/api/v2/move/"+api+"/", (typeof STORAGE_PREFIX!=="undefined"?STORAGE_PREFIX:"leafgreen_251_dual_tracker_v3_")+"raw_move_v1_"+api);
    else { var r=await fetch("https://pokeapi.co/api/v2/move/"+api+"/"); if(!r.ok) throw new Error("Could not load move details"); raw=await r.json(); }
    return mergeMoveMeta(api, raw);
  }
  function simpleMeta(raw){
    if(!raw) return {};
    return {
      type: raw.type || "",
      power: raw.power,
      accuracy: raw.accuracy,
      pp: raw.pp,
      priority: raw.priority,
      damage_class: raw.damage_class || raw.category || "",
      flavor: raw.flavor || "",
      effect: raw.effect || "",
      fullDetailsLoaded: !!raw.fullDetailsLoaded
    };
  }
  function currentMoveFilters(){
    return {
      name:(document.getElementById("moveListNameFilter")||{}).value||"",
      type:(document.getElementById("moveListTypeFilter")||{}).value||"",
      cat:(document.getElementById("moveListCategoryFilter")||{}).value||"",
      power:(document.getElementById("moveListPowerFilter")||{}).value||"",
      acc:(document.getElementById("moveListAccuracyFilter")||{}).value||""
    };
  }
  function passes(o, meta, f){
    var dn=displayMove(o.name).toLowerCase(), nf=String(f.name||"").toLowerCase().trim();
    if(nf && dn.indexOf(nf)<0 && o.api.indexOf(apiName(nf))<0) return false;
    if(f.type && (!meta || meta.type!==f.type)) return false;
    if(f.cat && (!meta || meta.damage_class!==f.cat)) return false;
    var p=meta ? meta.power : null, a=meta ? meta.accuracy : null;
    if(f.power==="damaging" && !(p>0)) return false;
    if(f.power==="non-damaging" && p!==null && p!==undefined) return false;
    if(f.power==="60plus" && !(p>=60)) return false;
    if(f.power==="80plus" && !(p>=80)) return false;
    if(f.power==="100plus" && !(p>=100)) return false;
    if(f.acc==="perfect" && !(a===100 || a===null)) return false;
    if(f.acc==="90plus" && !(a>=90 || a===null)) return false;
    if(f.acc==="less90" && !(a!==null && a<90)) return false;
    return true;
  }
  function renderCard(o, meta){
    var m=simpleMeta(meta);
    var type=m.type?m.type:"?", cat=m.damage_class?m.damage_class:"?";
    var power=(m.power===null||m.power===undefined)?"—":m.power;
    var acc=(m.accuracy===null||m.accuracy===undefined)?"—":m.accuracy+"%";
    var pp=(m.pp===null||m.pp===undefined)?"—":m.pp;
    var desc=m.flavor || "Details not loaded yet.";
    var effect=m.effect && m.effect!==desc ? '<div class="moveEffect"><b>Effect:</b> '+esc(m.effect)+'</div>' : '';
    return '<article class="moveListCard" id="move-entry-'+esc(o.api)+'" data-move-api="'+esc(o.api)+'">' +
      '<h3>'+esc(displayMove(o.name))+'</h3>' +
      '<div class="moveMetaGrid"><span>Type: '+esc(type)+'</span><span>Class: '+esc(cat)+'</span><span>Power: '+esc(power)+'</span><span>Accuracy: '+esc(acc)+'</span><span>PP: '+esc(pp)+'</span><span>Priority: '+esc(m.priority||0)+'</span></div>' +
      '<div class="moveDescription">'+esc(desc)+'</div>'+effect+
      (!meta ? '<div style="margin-top:8px"><button class="miniButton" onclick="loadMoveListDetail(\''+esc(o.api)+'\')">Load details</button></div>' : '') +
      '</article>';
  }
  function updateMoveListFilterSummary(count){
    var el=document.getElementById("activeMoveListFilters"); if(!el) return;
    var f=currentMoveFilters(), parts=[];
    if(f.name) parts.push('Name contains "'+f.name+'"'); if(f.type) parts.push('Type '+f.type); if(f.cat) parts.push(f.cat); if(f.power) parts.push('Power '+f.power); if(f.acc) parts.push('Accuracy '+f.acc);
    el.textContent=(parts.length?parts.join(', '):'None')+' — '+count+' shown';
  }
  window.renderMoveList=function(){
    var out=document.getElementById("moveListResults"), stat=document.getElementById("moveListStatus"); if(!out) return;
    var f=currentMoveFilters();
    var arr=gen3MoveObjects().filter(function(o){ return passes(o, simpleMeta(getCachedMoveMeta(o.api)), f); });
    arr.sort(function(a,b){ return displayMove(a.name).localeCompare(displayMove(b.name)); });
    updateMoveListFilterSummary(arr.length);
    if(stat) stat.textContent=arr.length+' moves shown. Use Load visible move details to fetch type, power, accuracy and descriptions for all currently shown moves.';
    out.innerHTML=arr.map(function(o){ return renderCard(o, getCachedMoveMeta(o.api)); }).join('');
  };
  window.loadMoveListDetail=async function(api){
    var card=document.getElementById('move-entry-'+api); if(card) card.innerHTML='<div class="loading">Loading '+esc(prettyMoveNameFromApi(api))+'...</div>';
    try{ await fetchMoveMetaForList(api); renderMoveList(); setTimeout(function(){var c=document.getElementById('move-entry-'+api); if(c) c.scrollIntoView({block:'center'});},0); }catch(e){ if(card) card.innerHTML='<div class="error">Could not load '+esc(prettyMoveNameFromApi(api))+': '+esc(e.message||e)+'</div>'; }
  };
  window.loadVisibleMoveListDetails=async function(){
    var cards=[].slice.call(document.querySelectorAll('.moveListCard'));
    var stat=document.getElementById('moveListStatus');
    var total=cards.length, loaded=0;
    for(var i=0;i<cards.length;i++){
      var api=cards[i].getAttribute('data-move-api');
      if(!api) continue;
      var cached=getCachedMoveMeta(api);
      if(cached && cached.fullDetailsLoaded){ loaded++; continue; }
      if(stat) stat.textContent='Loading move details '+(i+1)+'/'+total+'...';
      try{ await fetchMoveMetaForList(api); loaded++; }catch(e){}
    }
    renderMoveList(); if(stat) stat.textContent='Loaded move details for '+loaded+'/'+total+' shown moves.';
  };
  window.clearMoveListFilters=function(){ ['moveListNameFilter','moveListTypeFilter','moveListCategoryFilter','moveListPowerFilter','moveListAccuracyFilter'].forEach(function(id){var el=document.getElementById(id); if(el) el.value='';}); renderMoveList(); };
  window.openMoveListEntry=function(moveName){
    var api=moveSlugFromDisplay(moveName);
    if(typeof showTab==='function') showTab('moveListTab');
    setTimeout(function(){ var f=document.getElementById('moveListNameFilter'); if(f) f.value=prettyMoveNameFromApi(api); renderMoveList(); setTimeout(function(){ var c=document.getElementById('move-entry-'+api); if(c){ c.scrollIntoView({block:'center'}); c.classList.add('locationJumpHighlight'); setTimeout(function(){c.classList.remove('locationJumpHighlight');},1600); }},60); },0);
  };
  function setupMoveListTypeFilter(){
    var sel=document.getElementById('moveListTypeFilter'); if(!sel || sel.options.length>1) return;
    var types=['normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel'];
    types.forEach(function(t){ var o=document.createElement('option'); o.value=t; o.textContent=t.charAt(0).toUpperCase()+t.slice(1); sel.appendChild(o); });
  }
  function linkMoveName(name){ var api=apiName(name); return '<button type="button" class="moveInlineLink" data-move-name="'+esc(prettyMoveNameFromApi(api))+'">'+esc(prettyMoveNameFromApi(api))+'</button>'; }
  var oldRenderMoves=window.renderMoves;
  window.renderMoves=function(id,payload){
    if(!payload){ if(oldRenderMoves) return oldRenderMoves.apply(this,arguments); return; }
    var movesEl=document.getElementById('moves_'+id); if(!movesEl){ if(oldRenderMoves) return oldRenderMoves.apply(this,arguments); return; }
    var pokeid=(document.querySelector('.card[data-id="'+id+'"]')||{}).dataset ? (document.querySelector('.card[data-id="'+id+'"]')||{}).dataset.pokeid : '';
    var levelMoves=payload.levelMoves||[], machineMoves=payload.machineMoves||[], tutorMoves=payload.tutorMoves||[], eggMoves=payload.eggMoves||[];
    var levelHtml=levelMoves.length?'<ul class="move-list">'+levelMoves.map(function(m){return '<li>Lv '+m.level+': '+linkMoveName(m.name)+'</li>';}).join('')+'</ul>':'<div class="loading">No level-up moves listed for FireRed/LeafGreen.</div>';
    var machineHtml=machineMoves.length?'<ul class="move-list">'+machineMoves.map(function(m){return '<li>'+linkMoveName(m.name)+'</li>';}).join('')+'</ul>':'<div class="loading">No TM/HM moves listed for FireRed/LeafGreen.</div>';
    var tutorHtml=tutorMoves.length?'<ul class="move-list">'+tutorMoves.map(function(m){return '<li>'+linkMoveName(m.name)+'</li>';}).join('')+'</ul>':'<div class="loading">No move tutor moves listed for FireRed/LeafGreen.</div>';
    var eggHtml=eggMoves.length?'<ul class="move-list">'+eggMoves.map(function(m){return '<li><span class="eggMoveLine">'+linkMoveName(m.name)+' <button type="button" class="eggMoveButton eggDonorToggle" data-pokeid="'+esc(pokeid)+'" data-move="'+esc(m.name)+'">Donors</button></span><div class="eggDonorRow hidden" data-pokeid="'+esc(pokeid)+'" data-move="'+esc(m.name)+'"></div></li>';}).join('')+'</ul>':'<div class="loading">No egg moves listed for FireRed/LeafGreen.</div>';
    movesEl.innerHTML='<div class="move-section"><div class="move-title">Level-up</div>'+levelHtml+'</div><div class="move-section"><div class="move-title">TM/HM</div>'+machineHtml+'</div><div class="move-section"><div class="move-title">Move tutor</div>'+tutorHtml+'</div><div class="move-section"><div class="move-title">Egg moves</div>'+eggHtml+'</div>';
  };
  document.addEventListener('click',function(e){ var btn=e.target && e.target.closest ? e.target.closest('.moveInlineLink') : null; if(btn){ e.preventDefault(); openMoveListEntry(btn.getAttribute('data-move-name')||btn.textContent); }});
  document.addEventListener('click',function(e){ var btn=e.target && e.target.closest ? e.target.closest('.eggDonorToggle') : null; if(btn){ e.preventDefault(); if(typeof window.toggleEggMoveDonors === 'function') window.toggleEggMoveDonors(btn.getAttribute('data-pokeid'), btn.getAttribute('data-move'), btn); }});
  document.addEventListener('DOMContentLoaded',function(){ setupMoveListTypeFilter(); renderMoveList(); });
  window.addEventListener('load',function(){ setupMoveListTypeFilter(); renderMoveList(); });
})();
