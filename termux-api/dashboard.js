// Contoh logika sederhana untuk menampilkan di dashboard
fetch('/api/wallet')
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            document.getElementById('wallet-balance').innerText = `${data.balance} ETH (Sepolia)`;
            document.getElementById('block-number').innerText = `Block: ${data.block}`;
        } else {
            document.getElementById('wallet-balance').innerText = "Koneksi Error";
        }
    });

