
(function(){
  var STATE={mons:[],summary:null};
  var SECTION_SIZE=4096, DATA_SIZE=3968, SLOT_SIZE=57344, SIG=0x08012025;
  var PARTY_COUNT=0x34, PARTY_START=0x38, BOX_MON_SIZE=80, PARTY_MON_SIZE=100;
  var ORDERS=[[0,1,2,3],[0,1,3,2],[0,2,1,3],[0,2,3,1],[0,3,1,2],[0,3,2,1],[1,0,2,3],[1,0,3,2],[1,2,0,3],[1,2,3,0],[1,3,0,2],[1,3,2,0],[2,0,1,3],[2,0,3,1],[2,1,0,3],[2,1,3,0],[2,3,0,1],[2,3,1,0],[3,0,1,2],[3,0,2,1],[3,1,0,2],[3,1,2,0],[3,2,0,1],[3,2,1,0]];
  var NATURES=['hardy','lonely','brave','adamant','naughty','bold','docile','relaxed','impish','lax','timid','hasty','serious','jolly','naive','modest','mild','quiet','bashful','rash','calm','gentle','sassy','careful','quirky'];
  var MOVES=['','Pound','Karate Chop','Double Slap','Comet Punch','Mega Punch','Pay Day','Fire Punch','Ice Punch','Thunder Punch','Scratch','Vice Grip','Guillotine','Razor Wind','Swords Dance','Cut','Gust','Wing Attack','Whirlwind','Fly','Bind','Slam','Vine Whip','Stomp','Double Kick','Mega Kick','Jump Kick','Rolling Kick','Sand Attack','Headbutt','Horn Attack','Fury Attack','Horn Drill','Tackle','Body Slam','Wrap','Take Down','Thrash','Double-Edge','Tail Whip','Poison Sting','Twineedle','Pin Missile','Leer','Bite','Growl','Roar','Sing','Supersonic','Sonic Boom','Disable','Acid','Ember','Flamethrower','Mist','Water Gun','Hydro Pump','Surf','Ice Beam','Blizzard','Psybeam','Bubble Beam','Aurora Beam','Hyper Beam','Peck','Drill Peck','Submission','Low Kick','Counter','Seismic Toss','Strength','Absorb','Mega Drain','Leech Seed','Growth','Razor Leaf','SolarBeam','PoisonPowder','Stun Spore','Sleep Powder','Petal Dance','String Shot','Dragon Rage','Fire Spin','ThunderShock','Thunderbolt','Thunder Wave','Thunder','Rock Throw','Earthquake','Fissure','Dig','Toxic','Confusion','Psychic','Hypnosis','Meditate','Agility','Quick Attack','Rage','Teleport','Night Shade','Mimic','Screech','Double Team','Recover','Harden','Minimize','Smokescreen','Confuse Ray','Withdraw','Defense Curl','Barrier','Light Screen','Haze','Reflect','Focus Energy','Bide','Metronome','Mirror Move','Self-Destruct','Egg Bomb','Lick','Smog','Sludge','Bone Club','Fire Blast','Waterfall','Clamp','Swift','Skull Bash','Spike Cannon','Constrict','Amnesia','Kinesis','Soft-Boiled','High Jump Kick','Glare','Dream Eater','Poison Gas','Barrage','Leech Life','Lovely Kiss','Sky Attack','Transform','Bubble','Dizzy Punch','Spore','Flash','Psywave','Splash','Acid Armor','Crabhammer','Explosion','Fury Swipes','Bonemerang','Rest','Rock Slide','Hyper Fang','Sharpen','Conversion','Tri Attack','Super Fang','Slash','Substitute','Struggle','Sketch','Triple Kick','Thief','Spider Web','Mind Reader','Nightmare','Flame Wheel','Snore','Curse','Flail','Conversion 2','Aeroblast','Cotton Spore','Reversal','Spite','Powder Snow','Protect','Mach Punch','Scary Face','Feint Attack','Sweet Kiss','Belly Drum','Sludge Bomb','Mud-Slap','Octazooka','Spikes','Zap Cannon','Foresight','Destiny Bond','Perish Song','Icy Wind','Detect','Bone Rush','Lock-On','Outrage','Sandstorm','Giga Drain','Endure','Charm','Rollout','False Swipe','Swagger','Milk Drink','Spark','Fury Cutter','Steel Wing','Mean Look','Attract','Sleep Talk','Heal Bell','Return','Present','Frustration','Safeguard','Pain Split','Sacred Fire','Magnitude','DynamicPunch','Megahorn','DragonBreath','Baton Pass','Encore','Pursuit','Rapid Spin','Sweet Scent','Iron Tail','Metal Claw','Vital Throw','Morning Sun','Synthesis','Moonlight','Hidden Power','Cross Chop','Twister','Rain Dance','Sunny Day','Crunch','Mirror Coat','Psych Up','ExtremeSpeed','AncientPower','Shadow Ball','Future Sight','Rock Smash','Whirlpool','Beat Up','Fake Out','Uproar','Stockpile','Spit Up','Swallow','Heat Wave','Hail','Torment','Flatter','Will-O-Wisp','Memento','Facade','Focus Punch','SmellingSalt','Follow Me','Nature Power','Charge','Taunt','Helping Hand','Trick','Role Play','Wish','Assist','Ingrain','Superpower','Magic Coat','Recycle','Revenge','Brick Break','Yawn','Knock Off','Endeavor','Eruption','Skill Swap','Imprison','Refresh','Grudge','Snatch','Secret Power','Dive','Arm Thrust','Camouflage','Tail Glow','Luster Purge','Mist Ball','FeatherDance','Teeter Dance','Blaze Kick','Mud Sport','Ice Ball','Needle Arm','Slack Off','Hyper Voice','Poison Fang','Crush Claw','Blast Burn','Hydro Cannon','Meteor Mash','Astonish','Weather Ball','Aromatherapy','Fake Tears','Air Cutter','Overheat','Odor Sleuth','Rock Tomb','Silver Wind','Metal Sound','GrassWhistle','Tickle','Cosmic Power','Water Spout','Signal Beam','Shadow Punch','Extrasensory','Sky Uppercut','Sand Tomb','Sheer Cold','Muddy Water','Bullet Seed','Aerial Ace','Icicle Spear','Iron Defense','Block','Howl','Dragon Claw','Frenzy Plant','Bulk Up','Bounce','Mud Shot','Poison Tail','Covet','Volt Tackle','Magical Leaf','Water Sport','Calm Mind','Leaf Blade','Dragon Dance','Rock Blast','Shock Wave','Water Pulse','Doom Desire','Psycho Boost'];
  var CHARS={0x00:' ',0xA1:'0',0xA2:'1',0xA3:'2',0xA4:'3',0xA5:'4',0xA6:'5',0xA7:'6',0xA8:'7',0xA9:'8',0xAA:'9',0xAB:'!',0xAC:'?',0xAD:'.',0xAE:'-',0xB5:'♂',0xB6:'♀',0xB8:',',0xBA:'/',0xBB:'A',0xBC:'B',0xBD:'C',0xBE:'D',0xBF:'E',0xC0:'F',0xC1:'G',0xC2:'H',0xC3:'I',0xC4:'J',0xC5:'K',0xC6:'L',0xC7:'M',0xC8:'N',0xC9:'O',0xCA:'P',0xCB:'Q',0xCC:'R',0xCD:'S',0xCE:'T',0xCF:'U',0xD0:'V',0xD1:'W',0xD2:'X',0xD3:'Y',0xD4:'Z',0xD5:'a',0xD6:'b',0xD7:'c',0xD8:'d',0xD9:'e',0xDA:'f',0xDB:'g',0xDC:'h',0xDD:'i',0xDE:'j',0xDF:'k',0xE0:'l',0xE1:'m',0xE2:'n',0xE3:'o',0xE4:'p',0xE5:'q',0xE6:'r',0xE7:'s',0xE8:'t',0xE9:'u',0xEA:'v',0xEB:'w',0xEC:'x',0xED:'y',0xEE:'z'};

  function u16(v,o){return v.getUint16(o,true)}
  function u32(v,o){return v.getUint32(o,true)}
  function hx(n){return ("00000000"+((Number(n)||0)>>>0).toString(16)).slice(-8)}
  function escHtml(s){return (typeof escapeHtml==="function"?escapeHtml(String(s||"")):String(s||"").replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];}))}
  function chk(v,o){var s=0;for(var i=0;i<DATA_SIZE;i+=4)s=(s+u32(v,o+i))>>>0;return((s&65535)+(s>>>16))&65535}
  function section(v,b,i){var o=b+i*SECTION_SIZE;if(o+SECTION_SIZE>v.byteLength)return null;var id=u16(v,o+0xff4),cs=u16(v,o+0xff6),sg=u32(v,o+0xff8),si=u32(v,o+0xffc);return{offset:o,id:id,saveIndex:si,valid:id<14&&sg===SIG&&cs===chk(v,o)}}
  function slot(v,b){var by={},valid=0,si=0;for(var i=0;i<14;i++){var s=section(v,b,i);if(s&&s.valid){by[s.id]=s;valid++;si=s.saveIndex}}return{base:b,by:by,valid:valid===14,validCount:valid,saveIndex:si}}
  function newest(v){var a=[];if(v.byteLength>=SLOT_SIZE)a.push(slot(v,0));if(v.byteLength>=SLOT_SIZE*2)a.push(slot(v,SLOT_SIZE));a=a.filter(function(x){return x.valid});if(!a.length)throw new Error('No complete valid FireRed/LeafGreen save block found. Use a raw .sav file, not a save state.');a.sort(function(x,y){return y.saveIndex-x.saveIndex});return a[0]}
  function assemble(v,s){var out=new Uint8Array(14*DATA_SIZE);for(var i=0;i<14;i++)out.set(new Uint8Array(v.buffer.slice(s.by[i].offset,s.by[i].offset+DATA_SIZE)),i*DATA_SIZE);return out}
  function text(v,o,n){var r='';for(var i=0;i<n;i++){var b=v.getUint8(o+i);if(b===255)break;r+=CHARS[b]||''}return r.trim()}
  function checksumMon(bytes){var s=0;for(var i=0;i<48;i+=2)s=(s+(bytes[i]|(bytes[i+1]<<8)))&65535;return s}
  function decrypt(v,o,pid,otid){var key=(pid^otid)>>>0,out=new Uint8Array(48);for(var i=0;i<48;i+=4){var val=(u32(v,o+32+i)^key)>>>0;out[i]=val&255;out[i+1]=(val>>>8)&255;out[i+2]=(val>>>16)&255;out[i+3]=(val>>>24)&255}return out}
  function subs(bytes,pid){var order=ORDERS[pid%24],r={};for(var i=0;i<4;i++)r[order[i]]=new DataView(bytes.buffer,bytes.byteOffset+i*12,12);return{g:r[0],a:r[1],e:r[2],m:r[3]}}
  function moveName(id){return MOVES[id]||''}
  function speciesId(n){return String(n).padStart(3,'0')}
  function normNameForCompare(s){return String(s||"").toUpperCase().replace(/[^A-Z0-9♀♂]/g,"")}
  function displayAbility(n){return n?(typeof displayAbilityName==="function"?displayAbilityName(n):String(n).replace(/-/g," ").replace(/\b\w/g,function(c){return c.toUpperCase()})):""}
  function normaliseAbility(n){return typeof normaliseAbilityName==="function"?normaliseAbilityName(n):String(n||"").toLowerCase().trim().replace(/\s+/g,"-")}
  var IMPORT_SPECIES_NAME_CACHE=null, IMPORT_POKEID_CACHE=null, IMPORT_ABILITY_CACHE=null;
  function initImportCaches(){
    if(!IMPORT_SPECIES_NAME_CACHE){
      IMPORT_SPECIES_NAME_CACHE={}; IMPORT_POKEID_CACHE={};
      try{(POKEMON_CARD_DATA||[]).forEach(function(x){if(!x||!x.id)return;var id=String(x.id).padStart(3,'0');IMPORT_SPECIES_NAME_CACHE[id]=x.name||id;IMPORT_POKEID_CACHE[id]=x.pokeid||String(parseInt(id,10));});}catch(e){}
    }
    if(!IMPORT_ABILITY_CACHE){try{IMPORT_ABILITY_CACHE=typeof getPokemonAbilityCache==='function'?getPokemonAbilityCache():{};}catch(e){IMPORT_ABILITY_CACHE={};}}
  }
  function importSpeciesName(id){initImportCaches();return IMPORT_SPECIES_NAME_CACHE[id]||id}
  function importPokeId(id){initImportCaches();return IMPORT_POKEID_CACHE[id]||String(parseInt(id,10))}
  function cachedOrderedAbilities(id){
    initImportCaches();
    var poke=importPokeId(id), arr=IMPORT_ABILITY_CACHE[poke]||[];
    return arr.map(function(a,i){return{name:normaliseAbility(typeof a==='string'?a:a.name),slot:(a&&a.slot)||i+1,hidden:!!(a&&a.hidden)}}).filter(function(a){return a.name && (!a.hidden);});
  }
  async function orderedAbilitiesForSpecies(id){
    var cached=cachedOrderedAbilities(id);
    if(cached.length)return cached.sort(function(a,b){return(a.slot||1)-(b.slot||1)});
    var poke=importPokeId(id), list=[], seen={};
    try{
      var res=await fetch("https://pokeapi.co/api/v2/pokemon/"+parseInt(poke,10)+"/");
      if(!res.ok)throw new Error("Ability request failed");
      var data=await res.json();
      function add(entry){
        if(!entry||entry.is_hidden)return;
        var nm=normaliseAbility(entry.ability&&entry.ability.name?entry.ability.name:entry.name);
        if(!nm||seen[nm])return;
        if(typeof isGen3AbilityName==="function" && !isGen3AbilityName(nm))return;
        seen[nm]=true; list.push({name:nm,slot:entry.slot||list.length+1,hidden:false});
      }
      (data.abilities||[]).forEach(add);
      (data.past_abilities||[]).forEach(function(g){(g.abilities||[]).forEach(add);});
      list.sort(function(a,b){return(a.slot||1)-(b.slot||1)});
      if(list.length){
        try{var cache=typeof getPokemonAbilityCache==='function'?getPokemonAbilityCache():{};cache[poke]=list.map(function(a){return{name:a.name,slot:a.slot,hidden:false}});if(typeof setPokemonAbilityCache==='function')setPokemonAbilityCache(cache);IMPORT_ABILITY_CACHE=cache;}catch(e){}
      }
    }catch(e){}
    return list;
  }
  function setAbilityOnMon(mon, abilityName){var nm=normaliseAbility(abilityName);mon.ability=nm||"";mon.abilityDisplay=displayAbility(nm);}
  async function enrichAbilities(mons,st){
    var bySpecies={}, ids=[], i, j;
    for(i=0;i<mons.length;i++){if(mons[i]&&mons[i].speciesId&&!bySpecies[mons[i].speciesId]){bySpecies[mons[i].speciesId]=true;ids.push(mons[i].speciesId);}}
    for(i=0;i<ids.length;i++){
      if(st)st.textContent="Resolving abilities "+(i+1)+"/"+ids.length+"...";
      var abilities=await orderedAbilitiesForSpecies(ids[i]);
      if(!abilities.length)continue;
      for(j=0;j<mons.length;j++){
        var m=mons[j]; if(!m||m.speciesId!==ids[i])continue;
        var slot=(m.saveImport&&typeof m.saveImport.abilitySlot==="number")?m.saveImport.abilitySlot:0;
        var picked=abilities.find(function(a){return(a.slot||1)===(slot+1)})||abilities[slot]||abilities[0];
        if(picked&&picked.name)setAbilityOnMon(m,picked.name);
      }
    }
    return mons;
  }

  function parseMon(v,o,size,source,label,ordinal){
    if(o<0||o+size>v.byteLength)return null;
    var pid=u32(v,o),otid=u32(v,o+4);
    if(!pid||pid===0xffffffff)return null;
    var dec=decrypt(v,o,pid,otid),stored=u16(v,o+28);
    if(stored!==checksumMon(dec))return null;
    var s=subs(dec,pid),sp=s.g.getUint16(0,true);
    if(!sp||sp>386)return null;
    var id=speciesId(sp),ivWord=s.m.getUint32(4,true),originInfo=s.m.getUint32(0,true),abilitySlot=(ivWord>>>31)&1;
    var stats={hp:'',attack:'',defense:'',speed:'','special-attack':'','special-defense':''},lvl='';
    if(source==='party'){
      lvl=String(v.getUint8(o+84));
      stats.hp=String(u16(v,o+88));stats.attack=String(u16(v,o+90));stats.defense=String(u16(v,o+92));stats.speed=String(u16(v,o+94));stats['special-attack']=String(u16(v,o+96));stats['special-defense']=String(u16(v,o+98));
    }
    var tid=otid&65535,sid=otid>>>16,shiny=((tid^sid^(pid&65535)^(pid>>>16))&65535)<8;
    var moves=[];for(var i=0;i<4;i++){var mn=moveName(s.a.getUint16(i*2,true));moves.push({name:mn,type:''});}
    var speciesName=importSpeciesName(id), rawNickname=text(v,o+8,10), otName=text(v,o+20,7);
    var nickname=(normNameForCompare(rawNickname)===normNameForCompare(speciesName))?"":rawNickname;
    var baseFingerprint=[hx(pid),hx(otid),hx(ivWord),hx(originInfo),normNameForCompare(otName)].join("|");
    var mon={uid:makeUid(),speciesId:id,speciesName:speciesName,pokeid:importPokeId(id),nickname:nickname,nature:NATURES[pid%25]||'hardy',level:lvl,shinyStatus:shiny?'shiny':'normal',ability:'',abilityDisplay:'',stats:stats,evs:{hp:String(s.e.getUint8(0)),attack:String(s.e.getUint8(1)),defense:String(s.e.getUint8(2)),speed:String(s.e.getUint8(3)),'special-attack':String(s.e.getUint8(4)),'special-defense':String(s.e.getUint8(5))},ivs:{hp:ivWord&31,attack:(ivWord>>>5)&31,defense:(ivWord>>>10)&31,speed:(ivWord>>>15)&31,'special-attack':(ivWord>>>20)&31,'special-defense':(ivWord>>>25)&31},moves:moves,personalityValue:String(pid),otId:String(otid),saveImport:{source:source,slot:label,ordinal:ordinal,imported:new Date().toISOString(),personalityValue:String(pid),otId:String(otid),ivWord:String(ivWord),originInfo:String(originInfo),otName:otName,abilitySlot:abilitySlot,baseFingerprint:baseFingerprint,fingerprint:''},updated:new Date().toISOString()};
    return mon;
  }
  function assignDuplicateAwareFingerprints(mons){
    var counts={}, used={};
    mons.forEach(function(m){var b=m.saveImport&&m.saveImport.baseFingerprint;if(!b)return;counts[b]=(counts[b]||0)+1;});
    mons.forEach(function(m){var b=m.saveImport&&m.saveImport.baseFingerprint;if(!b)return;used[b]=(used[b]||0)+1;m.saveImport.fingerprint=b+"#"+(counts[b]>1?used[b]:1);});
  }
  function parseSave(buf){
    IMPORT_ABILITY_CACHE=null; initImportCaches();
    var dv=new DataView(buf),sl=newest(dv),save=assemble(dv,sl),v=new DataView(save.buffer),party=[],pc=[],ordinal=0;
    var count=Math.min(6,v.getUint8(DATA_SIZE+PARTY_COUNT));
    for(var i=0;i<count;i++){var m=parseMon(v,DATA_SIZE+PARTY_START+i*PARTY_MON_SIZE,PARTY_MON_SIZE,'party','Party '+(i+1),++ordinal);if(m)party.push(m);}
    var pcStart=5*DATA_SIZE+4;
    for(i=0;i<420;i++){m=parseMon(v,pcStart+i*BOX_MON_SIZE,BOX_MON_SIZE,'pc','Box '+(Math.floor(i/30)+1)+' Slot '+(i%30+1),++ordinal);if(m)pc.push(m);}
    var mons=party.concat(pc); assignDuplicateAwareFingerprints(mons);
    return{slot:sl,party:party,pc:pc,mons:mons};
  }
  function saveFingerprint(m){return m&&m.saveImport&&m.saveImport.fingerprint?String(m.saveImport.fingerprint):""}
  function selected(){var r=document.querySelector('input[name="frlgImportScope"]:checked');var mode=r?r.value:'all';return STATE.mons.filter(function(m){return mode==='all'||m.saveImport.source===mode})}
  function render(){
    var st=document.getElementById('frlgSaveImportStatus'),pv=document.getElementById('frlgSaveImportPreview'),ac=document.getElementById('frlgSaveImportActions');if(!st||!pv||!ac)return;
    if(!STATE.mons.length){ac.style.display='none';pv.innerHTML='';if(STATE.summary){st.textContent='Valid FireRed/LeafGreen save found, but no Pokémon were found in party or PC storage. Save index: '+STATE.summary.slot.saveIndex+'.';pv.innerHTML='<div class="analysisBlock"><b>No importable Pokémon found.</b><br><span class="smallText">The uploaded file is a valid raw save, but no importable Pokémon were found in the party or PC storage.</span></div>';}return}
    var p=STATE.summary,sh=STATE.mons.filter(function(m){return m.shinyStatus==='shiny'}).length;
    st.textContent='Found '+STATE.mons.length+' Pokémon — '+p.party.length+' party, '+p.pc.length+' PC. Save index: '+p.slot.saveIndex+(sh?' | '+sh+' shiny':'');
    pv.innerHTML='<div class="plannerList">'+STATE.mons.slice(0,120).map(function(m){return '<div class="plannerItem"><b>'+escHtml(m.speciesName||m.speciesId)+'</b> '+(m.level?'Lv '+escHtml(m.level):'Lv ?')+(m.nickname?' — '+escHtml(m.nickname):'')+'<br><span class="smallText">'+escHtml(m.saveImport.source.toUpperCase())+' | '+escHtml(m.nature)+(m.shinyStatus==='shiny'?' | Shiny':'')+(m.abilityDisplay?' | '+escHtml(m.abilityDisplay):' | Ability unresolved')+' | ID '+escHtml(String(m.saveImport.fingerprint||"").split("|").slice(0,2).join("|"))+'</span></div>'}).join('')+(STATE.mons.length>120?'<p class="smallText">Showing first 120 parsed Pokémon.</p>':'')+'</div>';
    ac.style.display='block';
  }
  function chooseFile(e){
    var f=e.target.files&&e.target.files[0],st=document.getElementById('frlgSaveImportStatus');STATE.mons=[];STATE.summary=null;render();
    if(!f){if(st)st.textContent='No save file selected.';return}
    if(st)st.textContent='Reading '+f.name+'...';
    var r=new FileReader();
    r.onload=function(){setTimeout(async function(){try{if(st)st.textContent='Validating save blocks and parsing Pokémon...';var p=parseSave(r.result);STATE.mons=p.mons;STATE.summary=p;if(STATE.mons.length)await enrichAbilities(STATE.mons,st);render();}catch(err){if(st)st.textContent='Import failed: '+(err.message||err)}e.target.value=''},0)};
    r.onerror=function(){if(st)st.textContent='Could not read file.';e.target.value=''};
    r.readAsArrayBuffer(f);
  }
  window.importFrLgParsedSaveMons=function(){
    if(!STATE.mons.length){alert('Select and parse a .sav file first.');return}
    var replace=document.getElementById('frlgImportReplace')&&document.getElementById('frlgImportReplace').checked,skip=document.getElementById('frlgImportSkipDuplicates')&&document.getElementById('frlgImportSkipDuplicates').checked;
    var existing=typeof getMyMons==="function"?getMyMons():[], chosen=selected(), byFp={}, seen={}, mons=[], add=0,upd=0,sk=0,now=new Date().toISOString();
    existing.forEach(function(m){var fp=saveFingerprint(m);if(fp)byFp[fp]=m;if(!replace)mons.push(m);if(fp)seen[fp]=true;});
    chosen.forEach(function(m){
      var fp=saveFingerprint(m), old=fp?byFp[fp]:null, c=JSON.parse(JSON.stringify(m));
      if(old&&old.uid){c.uid=old.uid;upd++;}
      else{if(!replace&&skip&&fp&&seen[fp]){sk++;return}c.uid=makeUid();add++;}
      c.saveImport=c.saveImport||{};c.saveImport.imported=now;c.saveImport.previousUidMatched=!!old;c.updated=now;
      if(!replace&&old){var idx=mons.indexOf(old);if(idx>=0)mons[idx]=c;else mons.push(c);}else{mons.push(c);}
      if(fp)seen[fp]=true;
    });
    setMyMons(mons);
    alert('Imported '+add+' new Pokémon into My Mon\'s'+(upd?'; updated '+upd+' existing save-imported Pokémon while preserving UID(s)':'')+(sk?'; skipped '+sk+' duplicate(s)':'')+'.');
    showTab('myMonsTab');
  };
  window.parseFrLgSaveForTesting=parseSave;
  window.enrichFrLgParsedSaveMonsForTesting=enrichAbilities;
  window.importFrLgParsedSaveMonsSilently=async function(parsed, opts){
    opts=opts||{};
    var parsedMons=(parsed&&parsed.mons)||[];
    if(!parsedMons.length)throw new Error('No Pokémon found in parsed save.');
    if(opts.enrich!==false)await enrichAbilities(parsedMons,null);
    var replace=opts.replace!==false, skip=!!opts.skipDuplicates;
    var existing=typeof getMyMons==="function"?getMyMons():[], chosen=parsedMons, byFp={}, seen={}, mons=[], add=0, upd=0, sk=0, now=new Date().toISOString();
    existing.forEach(function(m){var fp=saveFingerprint(m);if(fp)byFp[fp]=m;if(!replace)mons.push(m);if(fp)seen[fp]=true;});
    chosen.forEach(function(m){
      var fp=saveFingerprint(m), old=fp?byFp[fp]:null, c=JSON.parse(JSON.stringify(m));
      if(old&&old.uid){c.uid=old.uid;upd++;}
      else{if(!replace&&skip&&fp&&seen[fp]){sk++;return;}c.uid=makeUid();add++;}
      c.saveImport=c.saveImport||{};c.saveImport.imported=now;c.saveImport.previousUidMatched=!!old;c.saveImport.folderSync=!!opts.folderSync;c.updated=now;
      if(!replace&&old){var idx=mons.indexOf(old);if(idx>=0)mons[idx]=c;else mons.push(c);}else{mons.push(c);}
      if(fp)seen[fp]=true;
    });
    setMyMons(mons);
    return {added:add,updated:upd,skipped:sk,total:mons.length,imported:chosen.length,saveIndex:parsed&&parsed.slot?parsed.slot.saveIndex:null};
  };
  function attach(){var inp=document.getElementById('frlgSaveFileInput');if(inp&&!inp._frlgSaveImportBound){inp.addEventListener('change',chooseFile);inp._frlgSaveImportBound=true;}}
  function insert(){
    if(document.getElementById('frlgSaveImportPanel')){attach();return;}
    var panel=document.querySelector('#settingsTab .panel');if(!panel)return;
    var div=document.createElement('div');div.id='frlgSaveImportPanel';
    div.innerHTML='<h3>FireRed / LeafGreen save import</h3><p class="smallText">Read-only import from a raw <b>.sav</b> file. The file is parsed locally in this browser; nothing is uploaded or written back to the save.</p><div class="controls"><label class="buttonLike">Choose .sav file <input id="frlgSaveFileInput" type="file" accept=".sav,application/octet-stream"></label><span id="frlgSaveImportStatus" class="smallText">No save file selected.</span></div><div id="frlgSaveImportPreview" class="frlgSavePreview"></div><div id="frlgSaveImportActions" class="analysisBlock" style="display:none"><div class="controls"><label><input type="radio" name="frlgImportScope" value="all" checked> Import all</label><label><input type="radio" name="frlgImportScope" value="party"> Party only</label><label><input type="radio" name="frlgImportScope" value="pc"> PC only</label></div><div class="controls"><label><input id="frlgImportSkipDuplicates" type="checkbox" checked> Skip duplicates</label><label><input id="frlgImportReplace" type="checkbox"> Replace existing My Mon&apos;s</label><button onclick="importFrLgParsedSaveMons()">Import parsed Pokémon</button></div><p class="smallText">Ability names are resolved from the Pokémon&apos;s saved Gen 3 ability slot. Re-import matching uses a save-origin fingerprint made from PID, OT ID, IV word, origin data and original trainer name, and only updates previous save-imported My Mon&apos;s with that fingerprint.</p></div>';
    var hs=Array.prototype.slice.call(panel.querySelectorAll('h3')),before=null;hs.forEach(function(h){if(!before&&h.textContent.toLowerCase().indexOf('reset saved data')!==-1)before=h});if(before)panel.insertBefore(div,before);else panel.appendChild(div);attach();
  }
  var style=document.createElement('style');style.textContent='.frlgSavePreview{margin-top:10px;max-height:360px;overflow:auto}.frlgSavePreview .plannerItem{background:#fff}';document.head.appendChild(style);
  document.addEventListener('DOMContentLoaded',insert);window.addEventListener('load',insert);setTimeout(insert,0);
})();
