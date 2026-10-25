// Loads never_again.mp3 from the same directory as index.html.
    // Remember to upload that MP3 separately; it is not included in the ZIP.
    // Player starts at 20% volume.
    const audioPlayer=document.getElementById('audioPlayer');
    const playButton=document.getElementById('playButton');
    const playIcon=document.getElementById('playIcon');
    const pauseIcon=document.getElementById('pauseIcon');
    const volumeSlider=document.getElementById('volumeSlider');
    const code=document.getElementById('copy-code');
    audioPlayer.volume=volumeSlider.value/100;

    playButton.addEventListener('click',async()=>{
      if(audioPlayer.paused){
        try { await audioPlayer.play(); }
        catch(error) {
          console.warn('Could not play never_again.mp3. Confirm the file is uploaded next to index.html.',error);
          playButton.title='Audio unavailable — upload never_again.mp3';
        }
      }else audioPlayer.pause();
    });
    audioPlayer.addEventListener('play',()=>{
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
      playButton.setAttribute('aria-label','Pause audio');
    });
    audioPlayer.addEventListener('pause',()=>{
      pauseIcon.classList.add('hidden');
      playIcon.classList.remove('hidden');
      playButton.setAttribute('aria-label','Play audio');
    });
    volumeSlider.addEventListener('input',()=>{
      audioPlayer.volume=volumeSlider.value/100;
    });

    const copyStatus=document.getElementById('copy-status');
    let resetCopyIcon;
    code.addEventListener('click',async()=>{
      let copied=false;
      try{
        if(navigator.clipboard && window.isSecureContext){
          await navigator.clipboard.writeText('wuvabl');
          copied=true;
        }
      }catch(e){}
      if(!copied){
        const field=document.createElement('textarea');
        field.value='wuvabl';
        field.style.cssText='position:fixed;opacity:0;left:-9999px';
        document.body.appendChild(field);
        field.select();
        try{copied=document.execCommand('copy')}catch(e){}
        field.remove();
      }
      // Quiet inline feedback only: replace the copy icon with a little checkmark.
      // The old 'copy this code' popup is not shown.
      copyStatus.textContent=copied?'Code copied':'Unable to copy';
      code.classList.toggle('copied',copied);
      clearTimeout(resetCopyIcon);
      resetCopyIcon=setTimeout(()=>{code.classList.remove('copied');copyStatus.textContent=''},1500);
    });
