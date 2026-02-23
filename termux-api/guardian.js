const { ethers } = require('ethers');
const { exec } = require('child_process');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_BASE_MAINNET);
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const wallet = process.env.MY_WALLET;

let lastUsdc = null;

async function checkBalance() {
    try {
        const usdcContract = new ethers.Contract(USDC_ADDRESS, ["function balanceOf(address) view returns (uint256)"], provider);
        const rawUsdc = await usdcContract.balanceOf(wallet);
        const currentUsdc = parseFloat(ethers.formatUnits(rawUsdc, 6)).toFixed(2);

        if (lastUsdc !== null && currentUsdc !== lastUsdc) {
            console.log(`🔔 Perubahan Saldo: ${currentUsdc} USDC`);
            // Notifikasi Suara & Getar
            exec(`termux-tts-speak "Saldo baru anda adalah ${currentUsdc} dollar"`);
            exec('termux-vibrate -d 1000');
        }

        lastUsdc = currentUsdc;
        console.log(`[${new Date().toLocaleTimeString()}] Monitoring: ${currentUsdc} USDC`);
    } catch (e) {
        console.error("Koneksi terganggu, mencoba lagi...");
    }
}

// Cek setiap 1 menit (hemat baterai & kuota API)
setInterval(checkBalance, 60000);
checkBalance();
console.log("🚀 Guardian Aktif. Pantauan Base Mainnet dimulai...");
