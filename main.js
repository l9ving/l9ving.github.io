// All six social links and creator code share one centered native dropdown.
const socialSelect = document.getElementById('socialSelect');
socialSelect.addEventListener('change', () => {
  const value = socialSelect.value;
  socialSelect.selectedIndex = 0; // Return to 'socials' after any selection.
  if (value === 'creator-code') {
    openModal();
  } else if (value) {
    window.open(value, '_blank', 'noopener,noreferrer');
  }
});

const modal = document.getElementById('creatorModal');
const yes = document.getElementById('copyYes');
const no = document.getElementById('copyNo');
function openModal() {
  modal.hidden = false;
  yes.focus();
}
function closeModal() {
  modal.hidden = true;
  socialSelect.focus();
}
no.addEventListener('click', closeModal); // Go back to unchanged home screen.
modal.addEventListener('pointerdown', event => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', event => {
  if (modal.hidden) return;
  if (event.key === 'Escape') { event.preventDefault(); closeModal(); }
  if (event.key === 'Tab') {
    // Keep focus within the two choices while this small dialog is open.
    if (event.shiftKey && document.activeElement === yes) { event.preventDefault(); no.focus(); }
    else if (!event.shiftKey && document.activeElement === no) { event.preventDefault(); yes.focus(); }
  }
});
async function silentlyCopy(value) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
  } catch (_) {}
  const field = document.createElement('textarea');
  field.value = value;
  field.readOnly = true;
  field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;user-select:text;-webkit-user-select:text';
  document.body.appendChild(field);
  field.focus();
  field.select();
  try { document.execCommand('copy'); } catch (_) {}
  field.remove();
}
yes.addEventListener('click', () => {
  // Start the clipboard request while still handling the user click.
  void silentlyCopy('wuvabl');
  closeModal(); // No confirmation, popup, or visual change after the Yes click.
});

// Invisible, looping music — automatic playback may be restricted by browsers.
const audio = document.getElementById('audioPlayer');
if (audio) {
  audio.volume = .2;
  const interactions = ['pointerdown', 'keydown', 'touchstart'];
  const unsubscribe = () => interactions.forEach(type => document.removeEventListener(type, tryPlay));
  function tryPlay() {
    if (!audio.paused) { unsubscribe(); return; }
    const result = audio.play();
    if (result && typeof result.then === 'function') result.then(unsubscribe).catch(() => {});
  }
  interactions.forEach(type => document.addEventListener(type, tryPlay, {passive:true}));
  tryPlay();
}

// Casual copy deterrents carried forward from the previous version.
// Visitors can still inspect any public site's frontend using other means.
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
  const key = event.key.toLowerCase();
  const mod = event.ctrlKey || event.metaKey;
  if (key === 'f12' ||
    (mod && event.shiftKey && ['i','j','c','k','m','e'].includes(key)) ||
    (event.metaKey && event.altKey && ['i','j','c','u'].includes(key)) ||
    (mod && ['s','u','p','i'].includes(key))) event.preventDefault();
}, true);
