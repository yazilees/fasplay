// Menggunakan async function agar bisa memakai 'await' untuk fetch dan player.load
async function loadShakaPlayer() {
    // 1. Reset UI dan siapkan kontainer utama
    resetUI();
    const playerDiv = document.getElementById('player');
    if (!playerDiv) {
        console.error("[shaka.js] FATAL: Kontainer #player tidak ditemukan.");
        return;
    }
    playerDiv.style.display = 'block';

    // 2. Buat kontainer untuk player
    playerDiv.innerHTML = `
        <div id="video-container" style="width:100%; height:100%; ">
            <video id="shaka-video-element" poster="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkAc2WLyOsYwyDQYVift6ml5HUGIN9Y20NKeyR49ktgW4CWmC1R1amGtqP9qg2VdNiaaMjJXq4Y6vICxkhPKdbKOPGm6mzLa0t7bbV4XCDWybU9mNdLAt1gmSYQ8e3FPNloTgVCuqcRPBJp3b2iqI7Z2p4EKGSWlM5wEyut50V0S3_YMpNDdpG5-bFrCRf/s1600/1000000736.jpg" data-shaka-player="true" style="width:100%; height:100%;"></video>
        </div>
    `;

    const videoElement = document.getElementById('shaka-video-element');
    videoElement.autoplay = true;

    // 3. Ambil nama channel dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const shakaParam = urlParams.get('shaka');

    try {
        if (!shaka.Player.isBrowserSupported()) {
            throw new Error("Browser ini tidak mendukung Shaka Player.");
        }

        const response = await fetch('https://fasplay.pages.dev/ch.json');
        if (!response.ok) throw new Error("Gagal memuat channels.json");
        const data = await response.json();

        const channel = data.channels.dash.find(ch => ch.name.toLowerCase() === shakaParam.toLowerCase());
        if (!channel) {
            throw new Error(`Channel '${shakaParam}' tidak ditemukan di array 'dash'.`);
        }
        
        console.log(`[shaka.js] Channel '${shakaParam}' ditemukan. Memulai Shaka Player.`);

        // Inisialisasi Shaka Player dengan UI default
        const player = new shaka.Player(videoElement);
        
        // Aktifkan UI kontrol bawaan Shaka Player
        const ui = new shaka.ui.Overlay(player, playerDiv, videoElement);
        
        // Konfigurasi player
        const config = {
            streaming: {
                bufferingGoal: 60,
                rebufferingGoal: 2,
                bufferBehind: 30,
                retryParameters: {
                    maxAttempts: 5,
                    baseDelay: 1000,
                    backoffFactor: 2,
                    fuzzFactor: 0.5
                }
            },
            // Aktifkan kontrol kualitas
            abr: {
                enabled: true
            }
        };

        // Tambahkan konfigurasi clearkeys jika tersedia
        if (channel.clearkeys) {
            config.drm = {
                clearKeys: channel.clearkeys
            };
        } else if (channel.keyId && channel.key) {
            // Support for legacy format (single key)
            config.drm = {
                clearKeys: {
                    [channel.keyId]: channel.key
                }
            };
        }

        player.configure(config);

        // Muat manifest DASH
        try {
            await player.load(channel.url);
            console.log('[shaka.js] Stream berhasil dimuat oleh Shaka Player.');
        } catch (error) {
            console.error('[shaka.js] Gagal memuat stream:', error);
            throw error;
        }

    } catch (error) {
        console.error("[shaka.js] Terjadi kesalahan:", error);
        alert("Terjadi kesalahan saat memutar video: " + error.message);
    }
}