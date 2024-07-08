// --- PWA Install --- //
// ------------------- //
const butInstall = document.getElementById('buttonInstall');
// ^ install button

window.addEventListener('beforeinstallprompt', (event) => {
// window listening for install critera to be available
// browser internally fires 'beforeinstallprompt' when install criteria are met
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
// install button click listener
    const promptEvent = window.deferredPrompt;
    // beforeinstallprompt event

    if (!promptEvent) {
    // if there isnt a prompt event, return
      return;
    }
  
    promptEvent.prompt();
    // fire installation prompt
  
    window.deferredPrompt = null;
    // empty deferred prompt because it has been used
  
    butInstall.classList.toggle('hidden', true);
    // hide install button
});

window.addEventListener('appinstalled', (event) => {
    // if PWA is installed, browser will fire appinstalled
    // which will empty the deferred prompt
    window.deferredPrompt = null;
});
