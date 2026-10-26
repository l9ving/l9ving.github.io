// fawn.gg — discourage casual right-click and common view-source shortcuts.
// These controls cannot hide or secure frontend HTML, CSS, JS, or image files.
(() => {
  document.addEventListener('contextmenu', (event) => event.preventDefault(), true);
  document.addEventListener('dragstart', (event) => event.preventDefault(), true);
  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const mod = event.ctrlKey || event.metaKey;
    const developerShortcut = mod && event.shiftKey && ['i', 'j', 'c', 'k'].includes(key);
    const macDeveloperShortcut = event.metaKey && event.altKey && ['i', 'j', 'c', 'u'].includes(key);
    const commonCopyShortcut = mod && ['u', 's', 'p', 'i'].includes(key);
    if (key === 'f12' || developerShortcut || macDeveloperShortcut || commonCopyShortcut) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
})();
