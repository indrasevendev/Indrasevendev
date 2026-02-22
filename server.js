const http = require('http');
const { execSync } = require('child_process');

const server = http.createServer((req, res) => {
    // Mengambil data baterai menggunakan termux-api dari luar proot
    let batInfo = "N/A";
    try {
        // Kita panggil perintah termux via proot-distro shared path atau exec
        batInfo = execSync('termux-battery-status').toString();
    } catch (e) {
        batInfo = '{"percentage": "Error", "status": "Unknown"}';
    }
    
    const data = JSON.parse(batInfo);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <body style="background:#0a0a0a; color:#00ff00; font-family:monospace; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; margin:0;">
            <h1 style="border-bottom: 2px solid #00ff00; padding-bottom:10px;">🛡️ INDRASEVENDEV MONITOR</h1>
            <div style="font-size: 2rem; margin: 20px; padding: 30px; border: 1px dashed #00ff00;">
                BATTERY: <span style="color:white;">${data.percentage}%</span><br>
                STATUS: <span style="color:white;">${data.status}</span>
            </div>
            <p>Server Running on Ubuntu 25.1 (Proot)</p>
            <script>setTimeout(() => { location.reload(); }, 5000);</script>
        </body>
    `);
});

server.listen(3000, () => {
    console.log('✅ Monitor aktif di http://localhost:3000');
});
