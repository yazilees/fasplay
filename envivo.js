function loadEnvivoPlayer() {
    // 1. Reset UI dan tampilkan kontainer iframe
    resetUI();
    const iframePlayer = document.getElementById('video-iframe');
    if (!iframePlayer) {
        console.error("[envivo.js] FATAL: Kontainer #video-iframe tidak ditemukan.");
        return;
    }
    iframePlayer.style.display = 'block';

    // 2. Ambil parameter channel dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const envivoParam = urlParams.get('envivo');
    if (!envivoParam || isNaN(parseInt(envivoParam, 10))) {
        console.error("[envivo.js] Parameter 'envivo' tidak valid atau tidak ada.");
        return;
    }
    const channelNumber = parseInt(envivoParam, 10);

    // 3. Definisikan konfigurasi server, termasuk persyaratan sandbox
    const serverMap = {
        1: { path: 4, requiresSandbox: true },
        2: { path: 3, requiresSandbox: true },
        3: { path: 2, requiresSandbox: false } // Server 3 TIDAK memerlukan sandbox
    };
    const sandboxPermissions = 'allow-same-origin allow-scripts allow-forms allow-presentation allow-top-navigation-by-user-activation';

    // 4. Buat satu fungsi untuk menangani SEMUA perubahan server
    function switchServer(serverKey) {
        const serverConfig = serverMap[serverKey];
        if (!serverConfig) return; // Keluar jika server tidak valid

        console.log(`[envivo.js] Mengganti ke Server ${serverKey}. Sandbox diperlukan: ${serverConfig.requiresSandbox}`);

        // LOGIKA KUNCI: Tambah atau hapus atribut sandbox
        if (serverConfig.requiresSandbox) {
            iframePlayer.setAttribute('sandbox', sandboxPermissions);
        } else {
            iframePlayer.removeAttribute('sandbox');
        }

        // Atur URL baru
        const url = `https://rereyano.ru/player/${serverConfig.path}/${channelNumber}`;
        iframePlayer.src = url;
    }

    // 5. Muat server default saat pertama kali dijalankan
    switchServer(1);

    // 6. Buat tombol dropdown
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'envivo-dropdown-container'; // Agar bisa dihapus oleh resetUI()
    dropdownContainer.style.cssText = 'position:absolute; top:10px; right:10px; z-index:1000; color:white; padding:10px; border-radius:5px;';
    
    const select = document.createElement('select');
    select.style.cssText = 'background:white; color:black; border:1px solid white; border-radius:3px;';

    // Isi opsi dropdown
    Object.keys(serverMap).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `Server ${key}`;
        select.appendChild(option);
    });

    // Tambahkan event listener yang memanggil fungsi utama kita
    select.addEventListener('change', (event) => {
        switchServer(event.target.value);
    });

    dropdownContainer.appendChild(select);
    document.body.appendChild(dropdownContainer);
}