function loadSSPlayer() {
    resetUI();

    const iframePlayer = document.getElementById('video-iframe');
    if (iframePlayer) {
        iframePlayer.style.display = 'block';
    } else {
        console.error("[ss.js] FATAL: Kontainer #video-iframe tidak ditemukan.");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const ssParam = urlParams.get('ss');
  
    if (ssParam) {
        let category = 'hd';
        if (ssParam.includes('sporttv')) category = 'pt';
        else if (ssParam.includes('br')) category = 'bra';
        
        iframePlayer.src = `https://sportzonline.site/channels/${category}/${ssParam}.php`;
    }
}