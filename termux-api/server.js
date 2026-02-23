const { ethers } = require('ethers');
require('dotenv').config();

// Gunakan RPC Mainnet dari .env yang baru dirapikan
const provider = new ethers.JsonRpcProvider(process.env.RPC_BASE_MAINNET);

// Alamat Kontrak USDC di Base Mainnet
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const walletAddress = process.env.MY_WALLET;

async function getStats() {
    const ethBalance = await provider.getBalance(walletAddress);
    
    // Logic untuk ambil saldo USDC (3 USDC Anda)
    const usdcContract = new ethers.Contract(USDC_ADDRESS, [
        "function balanceOf(address) view returns (uint256)"
    ], provider);
    
    const usdcBalance = await usdcContract.balanceOf(walletAddress);
    
    return {
        eth: ethers.formatEther(ethBalance),
        usdc: ethers.formatUnits(usdcBalance, 6) // USDC pakai 6 desimal
    };
}

getStats().then(stats => {
    console.log("=== Real-time Balance Monitor ===");
    console.log(`ETH Balance: ${stats.eth} ETH`);
    console.log(`USDC Balance: ${stats.usdc} USDC`);
    console.log("================================");
}).catch(err => console.error("Error fetching balance:", err));

