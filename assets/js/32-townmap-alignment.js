
(function(){
  if(window.__townMapRealAssetAlignmentV4Installed) return;
  window.__townMapRealAssetAlignmentV4Installed = true;

  var COORDS_V4 = {
    kanto: {
      "Indigo Plateau":{x:14.4,y:29.1},"Pewter City":{x:22.7,y:34.6},"Cerulean City":{x:64.4,y:29.2},"Lavender Town":{x:81.1,y:46.2},"Celadon City":{x:52.0,y:46.2},"Saffron City":{x:64.4,y:46.2},"Viridian City":{x:22.7,y:57.2},"Vermilion City":{x:64.4,y:63.0},"Fuchsia City":{x:56.1,y:79.8},"Pallet Town":{x:22.7,y:74.2},"Cinnabar Island":{x:22.6,y:91.2},
      "Route 1":{x:22.7,y:66.0},"Route 2":{x:22.7,y:46.0},"Route 3":{x:31.5,y:34.6},"Route 4":{x:52.5,y:29.2},"Route 5":{x:64.4,y:37.5},"Route 6":{x:64.4,y:54.6},"Route 7":{x:58.0,y:46.2},"Route 8":{x:72.8,y:46.2},"Route 9":{x:75.0,y:29.2},"Route 10":{x:81.1,y:37.8},"Route 11":{x:73.0,y:63.0},"Route 12":{x:81.1,y:55.5},"Route 13":{x:76.0,y:70.5},"Route 14":{x:70.0,y:73.5},"Route 15":{x:63.5,y:79.8},"Route 16":{x:45.5,y:46.2},"Route 17":{x:35.0,y:62.0},"Route 18":{x:48.0,y:79.8},"Route 19":{x:56.1,y:87.0},"Route 20":{x:39.0,y:91.2},"Route 21":{x:22.7,y:83.0},"Route 22":{x:17.0,y:57.2},"Route 23":{x:14.4,y:45.0},"Route 24":{x:64.4,y:22.0},"Route 25":{x:76.0,y:22.0},
      "Viridian Forest":{x:22.6,y:46.2},"Mt. Moon":{x:43.4,y:29.2},"Mount Moon":{x:43.4,y:29.2},"Rock Tunnel":{x:81.1,y:37.8},"Power Plant":{x:81.1,y:34.6},"Diglett's Cave":{x:68.6,y:63.0},"Digletts Cave":{x:68.6,y:63.0},"Seafoam Islands":{x:40.0,y:91.2},"Victory Road":{x:14.4,y:39.0},"Pokemon Tower":{x:81.1,y:46.2},"Pokémon Tower":{x:81.1,y:46.2},"Safari Zone":{x:56.1,y:79.8},"Pokemon Mansion":{x:22.6,y:91.2},"Pokémon Mansion":{x:22.6,y:91.2},"S.S. Anne":{x:70.5,y:68.5},"SS Anne":{x:70.5,y:68.5},"Cerulean Cave":{x:62.0,y:31.5}
    },
    sevii123: {
      "One Island":{x:13.8,y:20.1},"Kindle Road":{x:13.8,y:13.5},"Mt. Ember":{x:13.8,y:20.1},"Mount Ember":{x:13.8,y:20.1},"Ember Spa":{x:13.7,y:25.4},"Treasure Beach":{x:9.7,y:48.3},
      "Two Island":{x:42.7,y:52.6},"Cape Brink":{x:42.7,y:41.5},
      "Three Island":{x:80.4,y:70.1},"Bond Bridge":{x:67.6,y:70.1},"Berry Forest":{x:80.4,y:80.8},"Three Isle Port":{x:80.4,y:70.1},"Three Isle Path":{x:63.7,y:70.3}
    },
    sevii45: {
      "Four Island":{x:11.8,y:25.8},"Icefall Cave":{x:13.7,y:31.0},
      "Five Island":{x:70.9,y:70.5},"Five Isle Meadow":{x:59.9,y:77.8},"Resort Gorgeous":{x:76.0,y:58.0},"Water Labyrinth":{x:68.0,y:58.0},"Lost Cave":{x:80.5,y:58.0},"Memorial Pillar":{x:77.0,y:84.0},"Rocket Warehouse":{x:59.9,y:77.8}
    },
    sevii67: {
      "Six Island":{x:22.7,y:47.3},"Water Path":{x:22.7,y:39.0},"Green Path":{x:22.5,y:58.9},"Pattern Bush":{x:18.0,y:84.5},"Ruin Valley":{x:41.2,y:84.5},"Altering Cave":{x:22.7,y:47.3},"Outcast Island":{x:14.5,y:84.5},
      "Seven Island":{x:77.1,y:29.1},"Trainer Tower":{x:69.6,y:10.0},"Canyon Entrance":{x:77.1,y:41.3},"Sevault Canyon":{x:77.1,y:55.0},"Tanoby Ruins":{x:31.0,y:84.5},"Tanoby Chambers":{x:31.0,y:84.5}
    }
  };
  window.REAL_TOWN_MAP_COORDS = COORDS_V4;

  function esc(s){return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function norm(s){return String(s||'').trim().replace(/\s+/g,' ').replace(/\bPokemon\b/gi,'Pokémon');}
  function low(s){return norm(s).toLowerCase();}
  function hasAny(n, arr){for(var i=0;i<arr.length;i++){if(n.indexOf(arr[i])!==-1) return true;} return false;}
  function selectedLocationName(){
    var select=document.getElementById('locationSelect');
    if(!select) return '';
    var opt=select.options && select.selectedIndex>=0 ? select.options[select.selectedIndex] : null;
    return norm((opt && opt.textContent) || select.value || '');
  }
  function chooseMapKeyV4(locationName){
    var n=low(locationName);
    if(hasAny(n,['one island','treasure beach','kindle road','mt. ember','mt ember','mount ember','ember spa','two island','cape brink','three island','three isle','bond bridge','berry forest'])) return 'sevii123';
    if(hasAny(n,['four island','icefall cave','five island','five isle','resort gorgeous','water labyrinth','lost cave','memorial pillar','rocket warehouse'])) return 'sevii45';
    if(hasAny(n,['six island','water path','green path','pattern bush','ruin valley','altering cave','outcast island','seven island','trainer tower','canyon entrance','sevault canyon','tanoby'])) return 'sevii67';
    return 'kanto';
  }
  function coordsForV4(mapKey, locationName){
    var name=norm(locationName), table=COORDS_V4[mapKey] || COORDS_V4.kanto;
    if(table[name]) return {coords:table[name], exact:true, name:name};
    var route=name.match(/Route\s*(\d+)/i);
    if(route && table['Route '+parseInt(route[1],10)]) return {coords:table['Route '+parseInt(route[1],10)], exact:true, name:'Route '+parseInt(route[1],10)};
    var n=low(name), found=null;
    Object.keys(table).some(function(key){
      var k=low(key);
      if(n.indexOf(k)!==-1 || k.indexOf(n)!==-1){found={coords:table[key], exact:true, name:key}; return true;}
      return false;
    });
    return found || {coords:{x:50,y:50}, exact:false, name:name};
  }
  function mapLabelV4(key){return key==='sevii123'?'Sevii Islands 1–3':key==='sevii45'?'Sevii Islands 4–5':key==='sevii67'?'Sevii Islands 6–7':'Kanto';}
  function imageForV4(key){
    var imgs=window.REAL_TOWN_MAP_IMAGES || {};
    return imgs[key] || imgs.kanto || '';
  }
  function buildPanelV4(locationName){
    var name=norm(locationName||'Selected Location');
    var key=chooseMapKeyV4(name);
    var r=coordsForV4(key,name);
    var note=r.exact ? 'Showing '+mapLabelV4(key)+' map. Marker has been aligned to the in-game Town Map node/path.' : 'Showing '+mapLabelV4(key)+' map. No exact coordinate is mapped for this location yet, so the marker is placed at the centre.';
    return '<details class="locationTownMapPanel realTownMapPanel" data-location="'+esc(name)+'" data-map-key="kanto" data-real-map-key="'+esc(key)+'"><summary><span>🗺️ Town Map — '+esc(name)+'</span><span class="smallText">'+esc(mapLabelV4(key))+'</span></summary><div class="realTownMapInner"><div class="realTownMapFrame"><img alt="'+esc(mapLabelV4(key))+' Town Map" src="'+imageForV4(key)+'"><div class="realTownMapLabel" style="left:'+r.coords.x+'%;top:'+r.coords.y+'%">'+esc(name)+'</div><div class="realTownMapMarker" style="left:'+r.coords.x+'%;top:'+r.coords.y+'%"></div></div><div class="realTownMapNote">'+esc(note)+'</div></div></details>';
  }
  function injectV4(){
    var container=document.getElementById('locationResults');
    var loc=selectedLocationName();
    if(!container || !loc) return;
    var key=chooseMapKeyV4(loc);
    var existing=container.querySelector('.locationTownMapPanel.realTownMapPanel');
    if(existing && existing.getAttribute('data-location')===loc && existing.getAttribute('data-real-map-key')===key) return;
    Array.prototype.forEach.call(container.querySelectorAll('.locationTownMapPanel,.locationMapToolbar,.showMapButton'),function(el){ if(el && el.parentNode) el.parentNode.removeChild(el); });
    var tmp=document.createElement('div');
    tmp.innerHTML=buildPanelV4(loc);
    if(tmp.firstChild) container.insertBefore(tmp.firstChild, container.firstChild);
  }
  function scheduleV4(){setTimeout(injectV4,40); setTimeout(injectV4,180); setTimeout(injectV4,520);}
  function wrapRenderV4(){
    if(window.__townMapRealAssetRenderWrappedV4 || typeof window.renderLocationView !== 'function') return;
    window.__townMapRealAssetRenderWrappedV4 = true;
    var old=window.renderLocationView;
    window.renderLocationView=function(){var result=old.apply(this,arguments); scheduleV4(); return result;};
  }
  window.updateInlineTownMapForSelectedLocation = function(){scheduleV4();};
  wrapRenderV4();
  document.addEventListener('DOMContentLoaded',function(){
    wrapRenderV4();
    scheduleV4();
    var select=document.getElementById('locationSelect');
    if(select) select.addEventListener('change',scheduleV4);
    var container=document.getElementById('locationResults');
    if(container && window.MutationObserver){
      var pending=false;
      new MutationObserver(function(){
        if(pending) return;
        pending=true;
        setTimeout(function(){pending=false; injectV4();},160);
      }).observe(container,{childList:true,subtree:false});
    }
  });
  scheduleV4();
})();
