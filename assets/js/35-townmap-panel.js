
(function(){
  if(window.__townMapInlinePanelV2Installed) return;
  window.__townMapInlinePanelV2Installed = true;

  var EXTRA_COORDS = {
    "Pallet Town":{x:12,y:78},"Viridian City":{x:18,y:70},"Pewter City":{x:20,y:58},"Cerulean City":{x:52,y:48},"Lavender Town":{x:68,y:52},"Vermilion City":{x:58,y:70},"Celadon City":{x:36,y:52},"Fuchsia City":{x:42,y:78},"Saffron City":{x:52,y:56},"Cinnabar Island":{x:20,y:92},"Indigo Plateau":{x:10,y:48},
    "Route 1":{x:18,y:75},"Route 2":{x:20,y:66},"Route 3":{x:28,y:60},"Route 4":{x:40,y:55},"Route 5":{x:52,y:52},"Route 6":{x:55,y:64},"Route 7":{x:44,y:55},"Route 8":{x:61,y:55},"Route 9":{x:61,y:47},"Route 10":{x:68,y:48},"Route 11":{x:66,y:69},"Route 12":{x:69,y:62},"Route 13":{x:65,y:75},"Route 14":{x:57,y:77},"Route 15":{x:49,y:78},"Route 16":{x:28,y:52},"Route 17":{x:32,y:66},"Route 18":{x:38,y:80},"Route 19":{x:42,y:88},"Route 20":{x:30,y:92},"Route 21":{x:17,y:85},"Route 22":{x:13,y:69},"Route 23":{x:10,y:58},"Route 24":{x:52,y:42},"Route 25":{x:58,y:40},
    "Viridian Forest":{x:21,y:62},"Mt. Moon":{x:35,y:56},"Rock Tunnel":{x:70,y:47},"Power Plant":{x:72,y:50},"Diglett's Cave":{x:45,y:68},"Digletts Cave":{x:45,y:68},"Seafoam Islands":{x:30,y:90},"Victory Road":{x:10,y:52},"Pokemon Tower":{x:68,y:52},"Pokémon Tower":{x:68,y:52},"Safari Zone":{x:42,y:78},"Pokemon Mansion":{x:20,y:92},"Pokémon Mansion":{x:20,y:92}
  };
  window.TOWN_MAP_COORDS = Object.assign({}, EXTRA_COORDS, window.TOWN_MAP_COORDS || {});

  function esc(s){return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function normaliseLocationName(name){return String(name||'').trim().replace(/\s+/g,' ').replace(/^Kanto\s+/i,'').replace(/\bPokemon\b/g,'Pokémon');}
  function coordsFor(locationName){
    var name = normaliseLocationName(locationName);
    if(window.TOWN_MAP_COORDS[name]) return {coords:window.TOWN_MAP_COORDS[name], exact:true, name:name};
    var route = name.match(/\bRoute\s*(\d+)\b/i);
    if(route){var key='Route '+parseInt(route[1],10); if(window.TOWN_MAP_COORDS[key]) return {coords:window.TOWN_MAP_COORDS[key], exact:true, name:key};}
    var lower = name.toLowerCase(), found = null;
    Object.keys(window.TOWN_MAP_COORDS).some(function(key){var k=key.toLowerCase(); if(lower.indexOf(k)!==-1 || k.indexOf(lower)!==-1){found={coords:window.TOWN_MAP_COORDS[key], exact:true, name:key}; return true;} return false;});
    return found || {coords:{x:52,y:56}, exact:false, name:name};
  }
  function mapUri(){
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" shape-rendering="crispEdges">'
      + '<defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8bd3ff"/><stop offset="1" stop-color="#4aa3df"/></linearGradient><pattern id="waves" width="34" height="22" patternUnits="userSpaceOnUse"><path d="M0 12c8-8 18-8 26 0" fill="none" stroke="#dff6ff" stroke-width="3" opacity=".55"/></pattern><pattern id="grass" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="#86cf68"/><path d="M2 15l4-5 4 5M11 8l3-4 3 4" stroke="#5faa48" stroke-width="2" fill="none" opacity=".55"/></pattern><pattern id="forest" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#5fb85a"/><circle cx="6" cy="7" r="5" fill="#2f8f4a"/><circle cx="14" cy="13" r="5" fill="#317f42"/></pattern></defs>'
      + '<rect width="800" height="600" fill="url(#sea)"/><rect width="800" height="600" fill="url(#waves)" opacity=".72"/>'
      + '<g stroke="#2f6f45" stroke-width="8" fill="url(#grass)"><path d="M72 250h104v-82h78v-55h138v61h96v-61h118v105h82v112h-88v98H470v77H324v-60H204v-70H96v-72H52v-86h20z"/><rect x="128" y="428" width="98" height="108"/><rect x="235" y="500" width="92" height="46"/><rect x="248" y="70" width="115" height="63"/><rect x="488" y="74" width="138" height="72"/></g>'
      + '<g fill="url(#forest)" stroke="#2f6f45" stroke-width="4"><rect x="156" y="325" width="75" height="58"/><rect x="155" y="238" width="58" height="52"/><rect x="582" y="228" width="70" height="62"/><rect x="290" y="92" width="55" height="36"/></g>'
      + '<g fill="#a7a29a" stroke="#5b5b66" stroke-width="5"><path d="M311 192h80l35 38-29 38h-84l-35-39z"/><path d="M642 178h60l35 35-18 44h-72l-31-35z"/><path d="M45 215h70l30 42-20 48H50z"/></g>'
      + '<g stroke="#e5c76f" stroke-width="18" fill="none" stroke-linecap="square"><path d="M145 468V420M145 420V350M145 350V305M145 305h40M185 305v-80M185 225h90M275 225h125M400 225h115M515 225v75M515 300v85M515 300h130M400 225v105M400 330h115M400 330H265M265 330H185M265 330v145M265 475h-90M175 475h-35M265 330v-105M515 385h-160M355 385v90M145 305h-70M75 305v-75"/></g><g stroke="#b88933" stroke-width="4" fill="none" opacity=".7"><path d="M145 468V420M145 420V350M145 350V305M145 305h40M185 305v-80M185 225h90M275 225h125M400 225h115M515 225v75M515 300v85M515 300h130M400 225v105M400 330h115M400 330H265M265 330H185M265 330v145M265 475h-90M175 475h-35M265 330v-105M515 385h-160M355 385v90M145 305h-70M75 305v-75"/></g>'
      + '<g fill="#fff4bf" stroke="#8a5a1f" stroke-width="4"><rect x="84" y="455" width="30" height="24"/><rect x="128" y="404" width="34" height="26"/><rect x="138" y="292" width="36" height="28"/><rect x="170" y="218" width="34" height="28"/><rect x="388" y="214" width="34" height="28"/><rect x="500" y="318" width="34" height="28"/><rect x="500" y="370" width="34" height="28"/><rect x="278" y="466" width="34" height="28"/><rect x="126" y="528" width="34" height="28"/><rect x="55" y="260" width="34" height="28"/></g>'
      + '<g fill="#1f2937" font-family="Arial" font-size="18" font-weight="700"><text x="82" y="447">Pallet</text><text x="118" y="397">Viridian</text><text x="142" y="210">Pewter</text><text x="366" y="205">Cerulean</text><text x="520" y="315">Saffron</text><text x="542" y="388">Vermilion</text><text x="220" y="325">Celadon</text><text x="294" y="462">Fuchsia</text><text x="84" y="525">Cinnabar</text><text x="585" y="300">Lavender</text></g>'
      + '<g fill="#374151" font-family="Arial" font-size="13" font-weight="700" opacity=".82"><text x="162" y="366">Forest</text><text x="303" y="225">Mt. Moon</text><text x="646" y="226">Tunnel</text><text x="40" y="246">Plateau</text><text x="396" y="518">Seafoam</text></g>'
      + '</svg>';
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }
  function selectedLocation(){var s=document.getElementById('locationSelect'); return s&&s.value?s.value:'';}
  function buildPanel(locationName){
    var r=coordsFor(locationName), note = r.exact ? 'Map marker is approximate and percentage-positioned for the current selected location.' : 'No exact coordinate is mapped for this location yet, so the marker is centred near Saffron City.';
    return '<details class="locationTownMapPanel"><summary><span>Town Map — '+esc(locationName)+'</span><span class="smallText">expand</span></summary><div class="locationTownMapInner"><div class="inlineTownMapFrame"><img alt="Kanto Town Map" src="'+mapUri()+'"><div class="inlineTownMapLabel" style="left:'+r.coords.x+'%;top:'+r.coords.y+'%">'+esc(locationName)+'</div><div class="inlineTownMapMarker" style="left:'+r.coords.x+'%;top:'+r.coords.y+'%"></div></div><div class="inlineTownMapNote">'+esc(note)+'</div></div></details>';
  }
  function injectInlineTownMap(){
    var c=document.getElementById('locationResults'), loc=selectedLocation();
    if(!c || !loc) return;
    Array.prototype.forEach.call(c.querySelectorAll('.locationMapToolbar,.showMapButton'),function(el){el.parentNode&&el.parentNode.removeChild(el);});
    Array.prototype.forEach.call(c.querySelectorAll('.locationTownMapPanel'),function(el){el.parentNode&&el.parentNode.removeChild(el);});
    var tmp=document.createElement('div'); tmp.innerHTML=buildPanel(loc); var panel=tmp.firstChild;
    c.insertBefore(panel,c.firstChild);
  }
  function afterRender(){setTimeout(injectInlineTownMap,25);}
  function wrap(){
    if(window.__townMapInlineRenderWrappedV2 || typeof window.renderLocationView !== 'function') return;
    window.__townMapInlineRenderWrappedV2 = true;
    var old=window.renderLocationView;
    window.renderLocationView=function(){var res=old.apply(this,arguments); afterRender(); return res;};
  }
  wrap();
  document.addEventListener('DOMContentLoaded',function(){wrap(); afterRender(); var s=document.getElementById('locationSelect'); if(s) s.addEventListener('change',afterRender);});
  afterRender();
})();
