const { ethers } = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_BASE_SEPOLIA);

async function getWalletStatus(address) {
    try {
        const balance = await provider.getBalance(address);
        const block = await provider.getBlockNumber();
        return {
            success: true,
            balance: parseFloat(ethers.formatEther(balance)).toFixed(4),
            block: block
        };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

module.exports = { getWalletStatus };

