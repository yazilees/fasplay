// Fungsi baru untuk menampilkan widget homepage
function loadHomepageWidget() {
    // 1. Reset UI untuk membersihkan sisa player, jika ada
    resetUI();

    // 2. Dapatkan kontainer homepage dan tampilkan
    const homepageDiv = document.getElementById('homepage-content');
    if (homepageDiv) {
        homepageDiv.style.display = 'block';
        homepageDiv.innerHTML = ''; // Kosongkan dulu
    } else {
        console.error("Wadah #homepage-content tidak ditemukan!");
        return;
    }

    // 3. Buat elemen widget secara dinamis
    // Buat elemen anchor <a>
    const widgetAnchor = document.createElement('a');
    widgetAnchor.href = "https://www.livescore.bz";
    widgetAnchor.setAttribute('sport', 'football(soccer)');
    widgetAnchor.setAttribute('data-1', 'today');
    widgetAnchor.setAttribute('lang', 'en');
    widgetAnchor.textContent = 'live football scores';

    // Buat elemen script <script>
    const widgetScript = document.createElement('script');
    widgetScript.type = "text/javascript";
    widgetScript.src = "https://www.livescore.bz/api.livescore.0.1.js";
    widgetScript.setAttribute('api', 'livescore');
    widgetScript.async = true;

    // 4. Tambahkan elemen ke halaman
    homepageDiv.appendChild(widgetAnchor); // Tambahkan anchor ke wadah
    document.head.appendChild(widgetScript); // Tambahkan script ke head untuk dieksekusi

    console.log("Widget Live Score telah dimuat.");
}


// Fungsi utama yang sudah ada, dengan tambahan 'else'
function initializePlayer() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('iframe')) {
        loadIframePlayer();
    } else if (urlParams.has('ss')) {
        loadSSPlayer();
    } else if (urlParams.has('envivo')) {
        loadEnvivoPlayer();
    } else if (urlParams.has('hls')) {
        loadHLSPlayer();
    } else if (urlParams.has('jw')) {
        loadJWPlayer();
    } else if (urlParams.has('shaka')) {
        loadShakaPlayer();
    } else {
        // INILAH LOGIKA BARUNYA: Jika tidak ada parameter player, tampilkan homepage
        loadHomepageWidget();
    }
}