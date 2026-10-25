LOVING WEBSITE — READY-TO-UPLOAD FILES
========================================

WHAT EACH FILE DOES
index.html        - The page layout, 6 social links, fading code, music controls
style.css         - All styling, icon sizing, colors, responsive layout, miraFade effect
main.js           - Audio play/pause, volume and copy-code interaction
twitch.svg        - Twitch icon
x.svg             - Twitter / X icon
tiktok.svg        - TikTok icon
youtube.svg       - YouTube icon
discord.svg       - Discord icon
throne.svg        - Throne icon
favicon-icon.png  - Browser-tab icon
CNAME             - GitHub Pages custom-domain configuration (fawn.gg)

UPLOAD INSTRUCTIONS (GITHUB PAGES)
1. First download a ZIP backup of your EXISTING site repository.
2. Open the repository serving your website. Remove old files you no longer use.
3. Upload the files in THIS ZIP to the TOP LEVEL of that repository (not inside a nested folder).
4. Keep the names exactly the same, especially index.html, style.css and main.js.
5. CNAME is set to fawn.gg. Ensure your GitHub Pages custom-domain
   settings and the domain DNS records are configured for fawn.gg.
6. Commit changes. GitHub Pages should serve index.html automatically.

LOCAL TEST
Open index.html in Chrome. The page and icons should display locally.
Internet access is needed for the Google-hosted Inconsolata font and the music URL.

IMPORTANT — MUSIC
The music player now loads never_again.mp3 from the WEBSITE ROOT folder:

  index.html
  style.css
  main.js
  never_again.mp3   <-- YOU MUST ADD THIS FILE

The MP3 itself is NOT INCLUDED in the ZIP because it was not provided.
Name your own audio file exactly never_again.mp3 (lowercase, underscore),
then upload it alongside index.html to your GitHub repository. The audio
player will use that file; no external music hosting is required.
Only upload audio you have the rights to use.

WHAT WAS LEFT OUT
Your old key.png, key1.png, locket.png, wings.png, wings-icon.png, pfp.jpeg,
and similar files were used by your OLD design. The current simple website does
not reference them. You do not need them for this version; keep a backup first.

SITE LOOK
White background, 6 centered socials (Twitch, X, TikTok, YouTube, Discord,
Throne), Inconsolata 8px, #aaa text and controls, tiny tooltip labels, and the
miraFade animation on 'use code wuvabl' with the small copy icon.
