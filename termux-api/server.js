require('dotenv').config();
const express = require('express');
const { exec } = require('child_process');
const web3 = require('./modules/web3');
const app = express();

let lastBalance = null;

// Halaman Utama
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});

// API Status
app.get('/api/status', async (req, res) => {
    try {
        const walletData = await web3.getWalletStatus(process.env.MY_WALLET);
        exec('termux-battery-status', (error, stdout) => {
            let battery = "N/A";
            if (!error) { battery = JSON.parse(stdout).percentage + "%"; }
            res.json({
                device: { battery },
                blockchain: {
                    ...walletData,
                    basename: process.env.MY_BASENAME,
                    address: process.env.MY_WALLET
                }
            });
        });
    } catch (err) { res.json({ success: false }); }
});

// Auto Monitor Wallet
async function monitorWallet() {
    try {
        const walletData = await web3.getWalletStatus(process.env.MY_WALLET);
        const currentBalance = parseFloat(walletData.balance);
        if (lastBalance === null) { lastBalance = currentBalance; return; }
        
        if (currentBalance > lastBalance) {
            exec('termux-vibrate -d 1000 && termux-notification -c "ETH Masuk!" --sound');
            lastBalance = currentBalance;
        }
    } catch (e) { console.log("Monitor silent..."); }
}
setInterval(monitorWallet, 15000);

// Command Center
app.get('/api/vibrate', (req, res) => { exec('termux-vibrate -d 500'); res.json({ok:1}); });
app.get('/api/torch', (req, res) => { 
    exec(`termux-torch ${global.tOn ? 'off' : 'on'}`); 
    global.tOn = !global.tOn; res.json({ok:1}); 
});

app.listen(3000, () => console.log('Server lari di port 3000'));

