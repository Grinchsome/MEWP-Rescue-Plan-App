(() => {
  const status = document.getElementById('offlineStatus');
  const install = document.getElementById('installApp');
  const update = document.getElementById('updateApp');
  const check = document.getElementById('checkAppUpdate');
  const dialog = document.getElementById('installDialog');
  let promptEvent, registration, ready = false, applying = false;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  function paint() {
    status.textContent = ready ? (navigator.onLine ? 'Offline copy ready · manuals need internet' : 'Offline · saved instructions and images available') : (navigator.onLine ? 'Preparing offline copy…' : 'Offline copy not yet confirmed');
    install.textContent = standalone() ? 'App information' : 'Install on phone';
  }
  paint();
  window.addEventListener('online', paint);
  window.addEventListener('offline', paint);
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); promptEvent = e; });
  window.addEventListener('appinstalled', () => { promptEvent = null; paint(); });
  install.onclick = () => dialog.showModal();
  document.getElementById('nativeInstall').onclick = async () => {
    if (!promptEvent) {
      document.getElementById('installAdvice').textContent = 'Use your browser menu: on iPhone, Safari → Share → Add to Home Screen; on Android, Chrome → menu → Install app or Add to Home screen. Open this website over HTTPS first.';
      return;
    }
    await promptEvent.prompt();
    await promptEvent.userChoice;
    promptEvent = null;
  };
  function waiting() { update.hidden = !(registration?.waiting && navigator.serviceWorker.controller); }
  function queryCache() {
    const worker = navigator.serviceWorker.controller || registration?.active;
    if (!worker) return;
    const channel = new MessageChannel();
    channel.port1.onmessage = e => { ready = e.data?.ready === true; paint(); channel.port1.close(); };
    worker.postMessage({type:'CACHE_STATUS'}, [channel.port2]);
  }
  if (!('serviceWorker' in navigator) || !window.isSecureContext || location.protocol === 'file:') {
    status.textContent = 'To install and save offline, open the HTTPS website.';
    check.disabled = true;
    return;
  }
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (applying) location.reload();
    else { waiting(); queryCache(); }
  });
  update.onclick = () => {
    if (!registration?.waiting) return;
    if (!confirm('Load the new app version now? Saved machines and briefing notes are kept. The current page will return to the machine library.')) return;
    applying = true;
    registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});
  };
  check.onclick = async () => {
    check.disabled = true;
    document.getElementById('updateMessage').textContent = 'Checking for an updated version…';
    try {
      await registration.update();
      waiting();
      document.getElementById('updateMessage').textContent = registration.waiting ? 'An update is ready. Close this panel and choose Load update.' : registration.installing ? 'An update is downloading. A Load update button will appear when ready.' : 'Update check complete. No new version is ready.';
    } catch { document.getElementById('updateMessage').textContent = 'Could not check for updates. Reconnect to the internet and try again.'; }
    finally { check.disabled = false; }
  };
  check.disabled = true;
  navigator.serviceWorker.register('./sw.js', {scope:'./', updateViaCache:'none'}).then(async r => {
    registration = r; check.disabled = false; waiting();
    r.addEventListener('updatefound', () => {
      const worker = r.installing;
      worker?.addEventListener('statechange', () => {
        if (worker.state === 'installed') {
          waiting();
          if (r.waiting && navigator.serviceWorker.controller) document.getElementById('updateMessage').textContent = 'New version saved. Close this panel and choose Load update when convenient.';
        }
        if (worker.state === 'activated') { waiting(); queryCache(); }
        if (worker.state === 'redundant' && !ready) status.textContent = 'Offline download did not finish. Reconnect and reload to retry.';
      });
    });
    await navigator.serviceWorker.ready;
    queryCache();
  }).catch(() => { status.textContent = 'Offline setup failed. Reconnect and reload to retry.'; });
})();
