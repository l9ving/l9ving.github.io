// Invisible background music. Autoplay with sound is browser-dependent.
// If autoplay is blocked, retry on the visitor's first interaction.
const audioPlayer = document.getElementById('audioPlayer');
if (audioPlayer) {
  audioPlayer.volume = 0.2;
  const activationEvents = ['pointerdown', 'touchstart', 'keydown'];

  function removeAudioActivationListeners() {
    activationEvents.forEach(type => document.removeEventListener(type, tryPlayMusic));
  }

  function tryPlayMusic() {
    if (!audioPlayer.paused) {
      removeAudioActivationListeners();
      return;
    }
    const result = audioPlayer.play();
    if (result && typeof result.then === 'function') {
      result.then(removeAudioActivationListeners).catch(() => {
        // Browsers often require a user gesture; retry on next interaction.
        // A missing audio file also leaves the page silent.
      });
    }
  }

  activationEvents.forEach(type => document.addEventListener(type, tryPlayMusic, {passive:true}));
  tryPlayMusic();
}

// Copy code: retain the tiny icon -> checkmark confirmation, no popup.
const codeButton = document.getElementById('copy-code');
const copyStatus = document.getElementById('copy-status');
let resetCopyIcon;
if (codeButton) {
  codeButton.addEventListener('click', async () => {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText('wuvabl');
        copied = true;
      }
    } catch (_) {}

    if (!copied) {
      const field = document.createElement('textarea');
      field.value = 'wuvabl';
      field.style.cssText = 'position:fixed;opacity:0;left:-9999px';
      document.body.appendChild(field);
      field.select();
      try { copied = document.execCommand('copy'); } catch (_) {}
      field.remove();
    }

    if (copyStatus) copyStatus.textContent = copied ? 'Code copied' : 'Unable to copy';
    codeButton.classList.toggle('copied', copied);
    clearTimeout(resetCopyIcon);
    resetCopyIcon = setTimeout(() => {
      codeButton.classList.remove('copied');
      if (copyStatus) copyStatus.textContent = '';
    }, 1500);
  });
}

// Casual-copy deterrents ONLY. The browser still has to download this site's
// HTML/CSS/JS/images, so these files cannot be hidden from determined visitors.
// Prevent normal right-click context menus on this page.
document.addEventListener('contextmenu', event => event.preventDefault());

// Block common source-view, developer-tools, Save Page, and Print shortcuts.
// These are best-effort: browser menus, preferences, extensions, and other
// methods can bypass them. Leave everyday navigation and assistive keys alone.
document.addEventListener('keydown', event => {
  const key = event.key.toLowerCase();
  const mod = event.ctrlKey || event.metaKey;
  const devToolsCombo = mod && event.shiftKey && ['i', 'j', 'c', 'k', 'm', 'e'].includes(key);
  const devToolsMac = event.metaKey && event.altKey && ['i', 'j', 'c', 'u'].includes(key);
  const saveViewPrint = mod && ['s', 'u', 'p'].includes(key);
  const plainInspect = mod && key === 'i'; // also requested Ctrl+I / Cmd+I
  if (key === 'f12' || devToolsCombo || devToolsMac || saveViewPrint || plainInspect) {
    event.preventDefault();
  }
}, true);
