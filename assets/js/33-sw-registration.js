
(function(){
  if('serviceWorker' in navigator && location.protocol === 'https:'){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('./service-worker.js').catch(function(err){
        console.warn('FLéX service worker registration failed:', err);
      });
    });
  }
})();
