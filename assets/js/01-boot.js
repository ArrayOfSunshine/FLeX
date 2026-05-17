
(function(){
  "use strict";
  if(window.__POKEDEX_EARLY_BOOT_PATCH) return;
  window.__POKEDEX_EARLY_BOOT_PATCH = true;
  window.__pokedexBootPendingFetches = 0;
  window.__pokedexBootWindowLoaded = false;
  window.__pokedexBootStart = Date.now();
  var originalFetch = window.fetch;
  if(typeof originalFetch === "function" && !originalFetch.__pokedexBootTracked){
    var trackedFetch = function(){
      window.__pokedexBootPendingFetches++;
      var status = document.getElementById("pokedexBootStatus");
      if(status && !document.getElementById("pokedexBootOverlay").classList.contains("opening")) status.textContent = "Loading initial data…";
      return originalFetch.apply(this, arguments).finally(function(){
        window.__pokedexBootPendingFetches = Math.max(0, window.__pokedexBootPendingFetches - 1);
      });
    };
    trackedFetch.__pokedexBootTracked = true;
    window.fetch = trackedFetch;
  }
  window.addEventListener("load", function(){ window.__pokedexBootWindowLoaded = true; });
})();
