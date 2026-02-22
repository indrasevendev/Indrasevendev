const { execSync } = require('child_process');
const path = require('path');

// Tentukan nama file dan lokasi simpan (di folder proyek kamu)
const fileName = `foto_${Date.now()}.jpg`;
const filePath = path.join(__dirname, fileName);

console.log("📸 Menyiapkan kamera...");

try {
    // 1. Ambil foto menggunakan kamera ID 1 (biasanya kamera depan)
    // Gunakan id 0 untuk kamera belakang
    execSync(`termux-camera-photo -c 1 ${filePath}`);
    
    // 2. Berikan notifikasi bahwa misi berhasil
    execSync(`termux-notification -t "Misi Berhasil" -c "Foto tersimpan sebagai ${fileName}"`);
    
    // 3. Munculkan Toast
    execSync(`termux-toast "Foto Berhasil Diambil!"`);

    console.log(`✅ Berhasil! Foto disimpan di: ${filePath}`);
} catch (error) {
    console.error("❌ Gagal mengambil foto. Pastikan izin kamera sudah diberikan.");
}
