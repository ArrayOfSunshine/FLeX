
(function(){
  if(window.__townMapOverlayVerifiedInstalled) return;
  window.__townMapOverlayVerifiedInstalled = true;

  var TOWN_MAP_COORDS = {
    "Pallet Town":{x:12,y:78},"Viridian City":{x:18,y:70},"Pewter City":{x:20,y:58},"Cerulean City":{x:52,y:48},"Lavender Town":{x:68,y:52},"Vermilion City":{x:58,y:70},"Celadon City":{x:36,y:52},"Fuchsia City":{x:42,y:78},"Saffron City":{x:52,y:56},"Cinnabar Island":{x:20,y:92},"Indigo Plateau":{x:10,y:48},
    "Route 1":{x:18,y:75},"Route 2":{x:20,y:66},"Route 3":{x:28,y:60},"Route 4":{x:40,y:55},"Route 5":{x:52,y:52},"Route 6":{x:55,y:64},"Route 7":{x:44,y:55},"Route 8":{x:61,y:55},"Route 9":{x:61,y:47},"Route 10":{x:68,y:48},"Route 11":{x:66,y:69},"Route 12":{x:69,y:62},"Route 13":{x:65,y:75},"Route 14":{x:57,y:77},"Route 15":{x:49,y:78},"Route 16":{x:28,y:52},"Route 17":{x:32,y:66},"Route 18":{x:38,y:80},"Route 19":{x:42,y:88},"Route 20":{x:30,y:92},"Route 21":{x:17,y:85},"Route 22":{x:13,y:69},"Route 23":{x:10,y:58},"Route 24":{x:52,y:42},"Route 25":{x:58,y:40},
    "Viridian Forest":{x:21,y:62},"Mt. Moon":{x:35,y:56},"Rock Tunnel":{x:70,y:47},"Power Plant":{x:72,y:50},"Diglett's Cave":{x:45,y:68},"Seafoam Islands":{x:30,y:90},"Victory Road":{x:10,y:52},"Pokemon Tower":{x:68,y:52},"Pokémon Tower":{x:68,y:52},"Safari Zone":{x:42,y:78}
  };
  window.TOWN_MAP_COORDS = Object.assign({}, TOWN_MAP_COORDS, window.TOWN_MAP_COORDS || {});

  function esc(s){return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function normaliseLocationName(name){
    var n = String(name || '').trim();
    n = n.replace(/\s+/g,' ');
    n = n.replace(/^Kanto\s+/i,'');
    n = n.replace(/\bPokemon\b/g,'Pokémon');
    return n;
  }
  function getTownMapCoords(locationName){
    var name = normaliseLocationName(locationName);
    var coords = window.TOWN_MAP_COORDS[name];
    if(coords) return {coords:coords, exact:true, name:name};
    var routeMatch = name.match(/\bRoute\s*(\d+)\b/i);
    if(routeMatch && window.TOWN_MAP_COORDS['Route '+parseInt(routeMatch[1],10)]) return {coords:window.TOWN_MAP_COORDS['Route '+parseInt(routeMatch[1],10)], exact:true, name:'Route '+parseInt(routeMatch[1],10)};
    var found = null;
    Object.keys(window.TOWN_MAP_COORDS).some(function(key){
      var k = key.toLowerCase();
      var n = name.toLowerCase();
      if(n.indexOf(k) !== -1 || k.indexOf(n) !== -1){ found = {coords:window.TOWN_MAP_COORDS[key], exact:true, name:key}; return true; }
      return false;
    });
    return found || {coords:{x:52,y:56}, exact:false, name:name};
  }
  function getTownMapDataUri(){
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" shape-rendering="crispEdges">'
      + '<rect width="800" height="600" fill="#9fd3ff"/><g fill="#7cc96b" stroke="#3f8f4f" stroke-width="8">'
      + '<path d="M70 250h105v-80h80v-55h135v60h100v-60h115v105h80v110h-85v100H470v75H325v-60H205v-70H95z"/>'
      + '<rect x="130" y="430" width="95" height="105"/><rect x="235" y="500" width="90" height="45"/><rect x="30" y="270" width="70" height="110"/><rect x="250" y="70" width="110" height="60"/><rect x="490" y="75" width="135" height="70"/>'
      + '</g><g stroke="#d9b45f" stroke-width="18" fill="none" stroke-linecap="square"><path d="M145 468V420M145 420V350M145 350V305M145 305h40M185 305v-80M185 225h90M275 225h125M400 225h115M515 225v75M515 300v85M515 300h130M400 225v105M400 330h115M400 330H265M265 330H185M265 330v145M265 475h-90M175 475h-35M265 330v-105M515 385h-160M355 385v90M145 305h-70M75 305v-75"/></g>'
      + '<g fill="#fef3c7" stroke="#92400e" stroke-width="4"><rect x="84" y="455" width="30" height="24"/><rect x="128" y="404" width="34" height="26"/><rect x="138" y="292" width="36" height="28"/><rect x="170" y="218" width="34" height="28"/><rect x="388" y="214" width="34" height="28"/><rect x="500" y="318" width="34" height="28"/><rect x="500" y="370" width="34" height="28"/><rect x="278" y="466" width="34" height="28"/><rect x="126" y="528" width="34" height="28"/><rect x="55" y="260" width="34" height="28"/></g>'
      + '<g fill="#1f2937" font-family="Arial" font-size="20" font-weight="700"><text x="84" y="447">Pallet</text><text x="120" y="395">Viridian</text><text x="145" y="210">Pewter</text><text x="372" y="205">Cerulean</text><text x="526" y="315">Saffron</text><text x="545" y="388">Vermilion</text><text x="225" y="325">Celadon</text><text x="300" y="462">Fuchsia</text><text x="90" y="525">Cinnabar</text><text x="590" y="300">Lavender</text></g>'
      + '</svg>';
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }
  function ensureTownMapOverlay(){
    var overlay = document.getElementById('townMapOverlay');
    if(overlay) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'townMapOverlay';
    overlay.innerHTML = '<div class="townMapModal" role="dialog" aria-modal="true" aria-labelledby="townMapTitle"><div class="townMapHeader"><h3 id="townMapTitle">Town Map</h3><button type="button" class="townMapClose" onclick="closeTownMapOverlay()">Close</button></div><div class="townMapFrame" id="townMapFrame"><img alt="Kanto Town Map" src="'+getTownMapDataUri()+'"><div id="townMapLabel" class="townMapLabel"></div><div id="townMapMarker" class="townMapMarker"></div></div><div id="townMapMissing" class="townMapMissing hidden"></div></div>';
    overlay.addEventListener('click',function(e){ if(e.target === overlay) window.closeTownMapOverlay(); });
    document.body.appendChild(overlay);
    return overlay;
  }
  window.closeTownMapOverlay = function(){ var overlay = document.getElementById('townMapOverlay'); if(overlay) overlay.classList.remove('visible'); };
  window.openTownMapOverlay = function(locationName){
    var overlay = ensureTownMapOverlay();
    var name = normaliseLocationName(locationName || 'Selected location');
    var result = getTownMapCoords(name);
    var title = document.getElementById('townMapTitle');
    var label = document.getElementById('townMapLabel');
    var marker = document.getElementById('townMapMarker');
    var missing = document.getElementById('townMapMissing');
    if(title) title.textContent = 'Town Map — ' + name;
    if(label){ label.textContent = name; label.style.left = result.coords.x + '%'; label.style.top = result.coords.y + '%'; }
    if(marker){ marker.style.left = result.coords.x + '%'; marker.style.top = result.coords.y + '%'; }
    if(missing){
      if(result.exact){ missing.classList.add('hidden'); missing.textContent = ''; }
      else{ missing.classList.remove('hidden'); missing.textContent = 'No exact coordinate is mapped for "' + name + '" yet, so the marker is centred near Saffron City. Add it to TOWN_MAP_COORDS to place it precisely.'; }
    }
    overlay.classList.add('visible');
  };

  function getSelectedLocationName(){ var select = document.getElementById('locationSelect'); return select && select.value ? select.value : ''; }
  function addLocationMapControls(){
    var container = document.getElementById('locationResults');
    var locationName = getSelectedLocationName();
    if(!container || !locationName) return;
    var toolbar = document.createElement('div');
    toolbar.className = 'locationMapToolbar';
    toolbar.innerHTML = '<span>Viewing: <button type="button" class="locNameAsButton" title="Show on Town Map">'+esc(locationName)+'</button></span><button type="button" class="showMapButton">Show on Map</button>';
    toolbar.querySelector('.locNameAsButton').addEventListener('click',function(){ window.openTownMapOverlay(locationName); });
    toolbar.querySelector('.showMapButton').addEventListener('click',function(){ window.openTownMapOverlay(locationName); });
    container.insertBefore(toolbar, container.firstChild);
    Array.prototype.forEach.call(container.querySelectorAll('details.locItem'),function(details){
      var summary = details.querySelector('summary.locName');
      if(!summary || summary.querySelector('.showMapButton')) return;
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'miniButton showMapButton'; btn.textContent = 'Show on Map';
      btn.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); window.openTownMapOverlay(locationName); });
      summary.appendChild(document.createTextNode(' ')); summary.appendChild(btn);
    });
  }
  function wrapLocationRenderer(){
    if(window.__townMapRenderWrapped || typeof window.renderLocationView !== 'function') return;
    window.__townMapRenderWrapped = true;
    var original = window.renderLocationView;
    window.renderLocationView = function(){
      var result = original.apply(this, arguments);
      setTimeout(addLocationMapControls, 0);
      return result;
    };
  }
  wrapLocationRenderer();
  document.addEventListener('DOMContentLoaded',function(){
    wrapLocationRenderer();
    setTimeout(addLocationMapControls, 0);
    var select = document.getElementById('locationSelect');
    if(select) select.addEventListener('change',function(){ setTimeout(addLocationMapControls, 0); });
  });
})();
