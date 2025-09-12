// File: hls.js
function initializeClapprPlayer(sourceUrl) {
    const playerDiv = document.getElementById('player');
    // Fungsi reset sudah dipanggil sebelumnya, jadi kita hanya setup
    try {
        new Clappr.Player({
            source: sourceUrl,
poster: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkAc2WLyOsYwyDQYVift6ml5HUGIN9Y20NKeyR49ktgW4CWmC1R1amGtqP9qg2VdNiaaMjJXq4Y6vICxkhPKdbKOPGm6mzLa0t7bbV4XCDWybU9mNdLAt1gmSYQ8e3FPNloTgVCuqcRPBJp3b2iqI7Z2p4EKGSWlM5wEyut50V0S3_YMpNDdpG5-bFrCRf/s1600/1000000736.jpg',
            parentId: '#player',
            autoPlay: true,
            width: '100%',
            height: '100vh'
        });
    } catch(e) { console.error("Gagal inisialisasi Clappr:", e); }
}

function loadHLSPlayer() {
    resetUI(); // WAJIB: Bersihkan UI sebelum memulai

    const playerDiv = document.getElementById('player');
    playerDiv.style.display = 'block'; // Tampilkan kontainer yang akan kita gunakan

    const urlParams = new URLSearchParams(window.location.search);
    const hlsParam = urlParams.get('hls');

    // Logika untuk Base64
    try {
      if (hlsParam.length > 20 && /^[A-Za-z0-9+/=]+$/.test(hlsParam)) {
        const decodedUrl = atob(hlsParam);
        if (decodedUrl.startsWith('http')) {
          initializeClapprPlayer(decodedUrl);
          return;
        }
      }
    } catch (e) {}

    // Logika untuk channels.json
    fetch('https://fasplay.pages.dev/ch.json')
      .then(response => response.json())
      .then(data => {
        const channel = data.channels.m3u8.find(ch => ch.name.toLowerCase() === hlsParam.toLowerCase());
        if (channel) {
          initializeClapprPlayer(channel.url);
        } else {
          console.error(`[hls.js] Channel '${hlsParam}' tidak ditemukan.`);
        }
      })
      .catch(error => console.error("[hls.js] FATAL:", error));
}