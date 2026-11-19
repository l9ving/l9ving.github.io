(() => {
  const socials = document.getElementById('social-list');
  const copyCode = document.getElementById('copy-code');

  // Heart is displayed for roughly one second, then fades into the list.
  window.setTimeout(() => {
    document.body.classList.add('revealed');
    socials.inert = false;
    socials.setAttribute('aria-hidden', 'false');
  }, 1000);

  copyCode.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('wuvabl');
    } catch (_) {
      const input = document.createElement('textarea');
      input.value = 'wuvabl';
      input.setAttribute('readonly', '');
      input.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
      document.body.append(input);
      input.select();
      try { document.execCommand('copy'); } catch (_) {}
      input.remove();
    }
    // Intentionally no popup or confirmation message.
  });

  // Convenience-only blocks retained from the earlier site.
  // Browsers can still access public HTML/CSS/JS and images.
  document.addEventListener('contextmenu', event => event.preventDefault());
  document.addEventListener('keydown', event => {
    const k = event.key.toLowerCase();
    const mod = event.ctrlKey || event.metaKey;
    if (k === 'f12' ||
        (mod && ['u','s'].includes(k)) ||
        (mod && event.shiftKey && ['i','j','c'].includes(k)) ||
        (event.metaKey && event.altKey && ['i','j','c'].includes(k))) {
      event.preventDefault();
    }
  }, true);
})();
