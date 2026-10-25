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

// Typewriter animation based on the user's uploaded lovenote.html:
// type forward at 90ms per character, hold 1400ms, delete at 40ms.
const typewriterEl = document.getElementById('typewriter');
const typewriterPhrases = [
  'welcome',
  'all my socials above',
  'dont forget to use code wuvabl'
];

if (typewriterEl) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    typewriterEl.textContent = typewriterPhrases[0];
  } else {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    typewriterEl.textContent = '';
    function typeLoop() {
      const currentPhrase = typewriterPhrases[phraseIndex];
      if (!isDeleting) {
        charIndex++;
        typewriterEl.textContent = currentPhrase.slice(0, charIndex);
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        charIndex--;
        typewriterEl.textContent = currentPhrase.slice(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
        }
      }
      const speed = isDeleting ? 40 : 90;
      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }
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
