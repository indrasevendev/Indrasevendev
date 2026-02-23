require('dotenv').config();
const express = require('express');
const { exec } = require('child_process');
const web3 = require('./modules/web3');
const app = express();

// Halaman Utama
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});

// API Status (Baterai & Blockchain)
app.get('/api/status', async (req, res) => {
    try {
        const walletData = await web3.getWalletStatus(process.env.MY_WALLET);
        exec('termux-battery-status', (error, stdout) => {
            let battery = "N/A";
            if (!error) {
                battery = JSON.parse(stdout).percentage + "%";
            }
            res.json({
                device: { battery },
                blockchain: {
                    ...walletData,
                    basename: process.env.MY_BASENAME,
                    address: process.env.MY_WALLET
                }
            });
        });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// Command Center: Vibrate
app.get('/api/vibrate', (req, res) => {
    exec('termux-vibrate -d 500', (err) => {
        res.json({ success: !err });
    });
});

// Command Center: Torch
let torchOn = false;
app.get('/api/torch', (req, res) => {
    torchOn = !torchOn;
    exec(`termux-torch ${torchOn ? 'on' : 'off'}`, (err) => {
        res.json({ success: !err, mode: torchOn });
    });
});

app.listen(3000, () => {
    console.log('Server lari di port 3000');
});

