function loadIframePlayer() {
    // 1. Reset semua UI player lain ke keadaan awal.
    resetUI();

    // 2. Dapatkan kontainer iframe dan BUAT TERLIHAT KEMBALI.
    const iframePlayer = document.getElementById('video-iframe');
    if (iframePlayer) {
        iframePlayer.style.display = 'block';
    } else {
        console.error("[iframe.js] FATAL: Kontainer #video-iframe tidak ditemukan di HTML.");
        return; // Hentikan jika elemen tidak ada
    }

    // 3. Lakukan tugas spesifik untuk player ini.
    const urlParams = new URLSearchParams(window.location.search);
    const encodedUrl = urlParams.get('iframe');
  
    if (encodedUrl) {
      try {
        // Atur sumber URL yang sudah di-decode ke iframe
        iframePlayer.src = atob(encodedUrl);
      } catch (error) {
        console.error('Gagal mendekode atau memuat URL iframe:', error);
        iframePlayer.style.display = 'none'; // Sembunyikan lagi jika ada error
      }
    }
}