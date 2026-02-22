const { execSync } = require('child_process');

function getTermuxData(command) {
    try {
        return JSON.parse(execSync(command).toString());
    } catch (e) {
        return { error: "Gagal mengambil data" };
    }
}

console.log("\x1b[36m=== INDRASEVENDEV SYSTEM DASHBOARD ===\x1b[0m");

// 1. Data Baterai
const battery = getTermuxData('termux-battery-status');
console.log(`🔋 Baterai: ${battery.percentage}% (${battery.status}) | Suhu: ${battery.temperature}°C`);

// 2. Data Jaringan
const network = getTermuxData('termux-telephony-deviceinfo');
console.log(`📶 Provider: ${network.sim_operator_name} | Tipe: ${network.network_type}`);

// 3. Data Clipboard (Cek apa yang kamu copy terakhir)
const clip = execSync('termux-clipboard-get').toString().trim();
console.log(`📋 Isi Clipboard: "${clip || 'Kosong'}"`);

// 4. Fitur Interaktif (HP akan bicara jika baterai rendah)
if (battery.percentage < 30) {
    execSync('termux-tts-speak "Peringatan, baterai Anda sudah di bawah tiga puluh persen. Segera isi daya."');
    execSync('termux-vibrate -d 1000');
    console.log("\x1b[31m⚠️  PERINGATAN: Baterai Rendah!\x1b[0m");
}

console.log("\x1b[36m======================================\x1b[0m");
