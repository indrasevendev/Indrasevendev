const { execSync } = require('child_process');

console.log("--- Memulai Eksperimen Termux:API ---");

// 1. Getarkan HP
execSync('termux-vibrate -d 500');

// 2. Ambil data baterai
const battery = JSON.parse(execSync('termux-battery-status'));
const infoBaterai = `Baterai kamu: ${battery.percentage}% dan suhunya ${battery.temperature}°C`;

// 3. Tampilkan di layar Android (Toast) dan bicarakan (TTS)
execSync(`termux-toast "${infoBaterai}"`);
execSync(`termux-tts-speak "${infoBaterai}"`);

console.log(infoBaterai);
console.log("Eksperimen selesai!");
