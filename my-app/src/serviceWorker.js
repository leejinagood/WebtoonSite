// serviceWorker.js

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(function(registration) {
          console.log('ServiceWorker registered with scope:', registration.scope);
        })
        .catch(function(error) {
          console.log('ServiceWorker registration failed:', error);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(function(registration) {
        registration.unregister();
      })
      .catch(function(error) {
        console.log('ServiceWorker unregistration failed:', error);
      });
  }
}
