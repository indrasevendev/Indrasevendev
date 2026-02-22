require('dotenv').config();
const express = require('express');
const { exec } = require('child_process');
const web3 = require('./modules/web3');
const app = express();

// Rute untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});

// API untuk data Dashboard
app.get('/api/status', async (req, res) => {
    const walletData = await web3.getWalletStatus(process.env.MY_WALLET);
    
    exec('termux-battery-status', (error, stdout) => {
        let battery = "N/A";
        if (!error) {
            const data = JSON.parse(stdout);
            battery = data.percentage + "%";
        }
        res.json({
            device: { battery: battery },
            blockchain: walletData
        });
    });
});

app.listen(3000, () => {
    console.log('Server lari di port 3000');
});

