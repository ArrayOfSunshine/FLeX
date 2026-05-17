
(function(){
  if(window.__townMapRealAssetInlineV3Installed) return;
  window.__townMapRealAssetInlineV3Installed = true;

  var REAL_TOWN_MAP_IMAGES = {
    kanto: './assets/maps/kanto_map.jpg',
    sevii123: './assets/maps/sevii_123_map.jpg',
    sevii45: './assets/maps/sevii_45_map.jpg',
    sevii67: './assets/maps/sevii_67_map.jpg'
  };
  window.REAL_TOWN_MAP_IMAGES = REAL_TOWN_MAP_IMAGES;

  var REAL_TOWN_MAP_COORDS = {
    kanto: {
      "Pallet Town":{x:14,y:78},"Viridian City":{x:22,y:59},"Pewter City":{x:22,y:35},"Cerulean City":{x:64,y:29},"Lavender Town":{x:81,y:47},"Vermilion City":{x:64,y:65},"Celadon City":{x:52,y:48},"Fuchsia City":{x:56,y:82},"Saffron City":{x:64,y:48},"Cinnabar Island":{x:23,y:93},"Indigo Plateau":{x:14,y:30},
      "Route 1":{x:22,y:70},"Route 2":{x:22,y:47},"Route 3":{x:34,y:48},"Route 4":{x:51,y:29},"Route 5":{x:64,y:40},"Route 6":{x:64,y:57},"Route 7":{x:58,y:48},"Route 8":{x:72,y:48},"Route 9":{x:73,y:35},"Route 10":{x:81,y:38},"Route 11":{x:72,y:65},"Route 12":{x:81,y:56},"Route 13":{x:75,y:75},"Route 14":{x:64,y:76},"Route 15":{x:58,y:77},"Route 16":{x:45,y:48},"Route 17":{x:35,y:63},"Route 18":{x:41,y:78},"Route 19":{x:55,y:89},"Route 20":{x:40,y:93},"Route 21":{x:22,y:86},"Route 22":{x:16,y:60},"Route 23":{x:14,y:45},"Route 24":{x:65,y:23},"Route 25":{x:71,y:20},
      "Viridian Forest":{x:30,y:48},"Mt. Moon":{x:22,y:48},"Mount Moon":{x:22,y:48},"Rock Tunnel":{x:81,y:38},"Power Plant":{x:82,y:41},"Diglett's Cave":{x:29,y:59},"Digletts Cave":{x:29,y:59},"Seafoam Islands":{x:43,y:93},"Victory Road":{x:14,y:42},"Pokemon Tower":{x:81,y:47},"Pokémon Tower":{x:81,y:47},"Safari Zone":{x:56,y:82},"Pokemon Mansion":{x:23,y:93},"Pokémon Mansion":{x:23,y:93},"S.S. Anne":{x:78,y:79},"SS Anne":{x:78,y:79}
    },
    sevii123: {
      "One Island":{x:13,y:19},"Treasure Beach":{x:9,y:44},"Kindle Road":{x:13,y:10},"Mt. Ember":{x:13,y:10},"Mount Ember":{x:13,y:10},"Ember Spa":{x:13,y:24},
      "Two Island":{x:42,y:49},"Cape Brink":{x:42,y:49},
      "Three Island":{x:78,y:63},"Bond Bridge":{x:67,y:63},"Berry Forest":{x:78,y:77}
    },
    sevii45: {
      "Four Island":{x:12,y:23},"Icefall Cave":{x:12,y:28},"Five Island":{x:79,y:66},"Five Isle Meadow":{x:78,y:72},"Resort Gorgeous":{x:68,y:58},"Water Labyrinth":{x:69,y:57},"Lost Cave":{x:84,y:66},"Memorial Pillar":{x:78,y:92}
    },
    sevii67: {
      "Six Island":{x:22,y:51},"Water Path":{x:22,y:44},"Green Path":{x:22,y:53},"Pattern Bush":{x:24,y:63},"Ruin Valley":{x:27,y:83},"Altering Cave":{x:12,y:23},
      "Seven Island":{x:78,y:31},"Trainer Tower":{x:70,y:12},"Canyon Entrance":{x:78,y:42},"Sevault Canyon":{x:78,y:55},"Tanoby Ruins":{x:28,y:83},"Tanoby Chambers":{x:28,y:83}
    }
  };
  window.REAL_TOWN_MAP_COORDS = REAL_TOWN_MAP_COORDS;

  function esc(s){return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function norm(s){return String(s||'').trim().replace(/\s+/g,' ').replace(/Pokemon/g,'Pokémon');}
  function lower(s){return norm(s).toLowerCase();}
  function getSelectedLocationName(){
    var select=document.getElementById('locationSelect');
    if(!select) return '';
    var opt=select.options&&select.selectedIndex>=0?select.options[select.selectedIndex]:null;
    return norm((opt&&opt.textContent)||select.value||'');
  }
  function chooseMapKey(locationName){
    var n=lower(locationName);
    if(/(one island|treasure beach|kindle road|mt\.? ember|mount ember|ember spa|two island|cape brink|three island|bond bridge|berry forest)/i.test(n)) return 'sevii123';
    if(/(four island|icefall cave|five island|five isle meadow|resort gorgeous|water labyrinth|lost cave|memorial pillar)/i.test(n)) return 'sevii45';
    if(/(six island|water path|green path|pattern bush|ruin valley|altering cave|seven island|trainer tower|canyon entrance|sevault canyon|tanoby)/i.test(n)) return 'sevii67';
    return 'kanto';
  }
  function coordsFor(mapKey, locationName){
    var name=norm(locationName);
    var table=REAL_TOWN_MAP_COORDS[mapKey]||REAL_TOWN_MAP_COORDS.kanto;
    if(table[name]) return {coords:table[name], exact:true, name:name};
    var route=name.match(/Route\s*(\d+)/i);
    if(route && table['Route '+parseInt(route[1],10)]) return {coords:table['Route '+parseInt(route[1],10)], exact:true, name:'Route '+parseInt(route[1],10)};
    var found=null, n=lower(name);
    Object.keys(table).some(function(key){
      var k=lower(key);
      if(n.indexOf(k)!==-1 || k.indexOf(n)!==-1){found={coords:table[key], exact:true, name:key}; return true;}
      return false;
    });
    if(found) return found;
    return {coords:{x:50,y:50}, exact:false, name:name};
  }
  function mapLabel(mapKey){
    if(mapKey==='sevii123') return 'Sevii Islands 1–3';
    if(mapKey==='sevii45') return 'Sevii Islands 4–5';
    if(mapKey==='sevii67') return 'Sevii Islands 6–7';
    return 'Kanto';
  }
  function buildPanel(locationName){
    var name=norm(locationName||'Selected Location');
    var key=chooseMapKey(name);
    var r=coordsFor(key,name);
    var note=r.exact ? 'Showing '+mapLabel(key)+' map. Marker placement is approximate.' : 'Showing '+mapLabel(key)+' map. No exact coordinate is mapped for this location yet, so the marker is placed at the centre.';
    return '<details class="locationTownMapPanel realTownMapPanel"><summary><span>🗺️ Town Map — '+esc(name)+'</span><span class="smallText">'+esc(mapLabel(key))+'</span></summary><div class="realTownMapInner"><div class="realTownMapFrame"><img alt="'+esc(mapLabel(key))+' Town Map" src="'+REAL_TOWN_MAP_IMAGES[key]+'"><div class="realTownMapLabel" style="left:'+r.coords.x+'%;top:'+r.coords.y+'%">'+esc(name)+'</div><div class="realTownMapMarker" style="left:'+r.coords.x+'%;top:'+r.coords.y+'%"></div></div><div class="realTownMapNote">'+esc(note)+'</div></div></details>';
  }
  function injectRealTownMap(){
    var container=document.getElementById('locationResults');
    var loc=getSelectedLocationName();
    if(!container || !loc) return;
    var key=chooseMapKey(loc);
    var existing=container.querySelector('.locationTownMapPanel.realTownMapPanel');
    var legacy=container.querySelector('.locationMapToolbar,.showMapButton,.locationTownMapPanel:not(.realTownMapPanel)');
    if(existing && existing.getAttribute('data-location')===loc && existing.getAttribute('data-map-key')===key && !legacy) return;
    Array.prototype.forEach.call(container.querySelectorAll('.locationTownMapPanel,.locationMapToolbar,.showMapButton'),function(el){if(el&&el.parentNode) el.parentNode.removeChild(el);});
    var tmp=document.createElement('div');
    tmp.innerHTML=buildPanel(loc);
    var panel=tmp.firstChild;
    if(panel){panel.setAttribute('data-location',loc); panel.setAttribute('data-map-key',key); container.insertBefore(panel, container.firstChild);}
  }
  function scheduleInject(){setTimeout(injectRealTownMap,60); setTimeout(injectRealTownMap,220);}
  function wrapRender(){
    if(window.__townMapRealAssetRenderWrappedV3 || typeof window.renderLocationView !== 'function') return;
    window.__townMapRealAssetRenderWrappedV3 = true;
    var old=window.renderLocationView;
    window.renderLocationView=function(){var result=old.apply(this,arguments); scheduleInject(); return result;};
  }
  wrapRender();
  document.addEventListener('DOMContentLoaded',function(){
    wrapRender();
    scheduleInject();
    var select=document.getElementById('locationSelect');
    if(select) select.addEventListener('change',scheduleInject);
    var container=document.getElementById('locationResults');
    if(container && window.MutationObserver){
      var pending=false;
      new MutationObserver(function(){
        if(pending) return;
        pending=true;
        setTimeout(function(){pending=false; injectRealTownMap();},120);
      }).observe(container,{childList:true});
    }
  });
  scheduleInject();
})();
