const axios = require('axios');

async function getCryptoData() {
    try {
        // Contoh mengambil harga Bitcoin & Ethereum
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        return {
            btc: res.data.bitcoin.usd,
            eth: res.data.ethereum.usd
        };
    } catch (err) {
        return { btc: 'N/A', eth: 'N/A' };
    }
}

module.exports = { getCryptoData };

