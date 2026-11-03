(() => {
  const menu = document.getElementById('social-menu');
  const trigger = document.getElementById('social-trigger');
  const reveal = document.getElementById('social-list');
  const copyButton = document.getElementById('copy-code');
  let clickedOpen = false;
  function show(open) {
    menu.classList.toggle('open', open);
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Hide socials' : 'Show socials');
    reveal.setAttribute('aria-hidden', String(!open));
    reveal.inert = !open;
  }
  show(false);
  trigger.addEventListener('click', () => {
    clickedOpen = !clickedOpen;
    show(clickedOpen);
  });
  menu.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') show(true);
  });
  menu.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse' && !clickedOpen) show(false);
  });
  document.addEventListener('pointerdown', (event) => {
    if (!menu.contains(event.target)) {
      clickedOpen = false;
      show(false);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      clickedOpen = false;
      show(false);
      trigger.focus();
    }
  });
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('wuvabl');
    } catch (err) {
      // Compatibility fallback for contexts without the Clipboard API.
      const textarea = document.createElement('textarea');
      textarea.value = 'wuvabl';
      textarea.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand('copy'); } catch (_) {}
      textarea.remove();
    }
  });
  // Convenience-only blockers carried over from the earlier version.
  // Public frontend source files cannot be hidden from a browser.
  document.addEventListener('contextmenu', event => event.preventDefault());
  document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    const mod = event.ctrlKey || event.metaKey;
    if (key === 'f12' || (mod && ['u', 's'].includes(key)) ||
        (mod && event.shiftKey && ['i','j','c'].includes(key)) ||
        (event.metaKey && event.altKey && ['i','j','c'].includes(key))) event.preventDefault();
  }, true);
})();
