const { exec } = require('child_process');

const pesan = "Halo Indrasevendev! Project Node.js kamu sudah berjalan.";
const judul = "Termux Notification";

exec(`termux-notification -c "${pesan}" -t "${judul}"`, (error) => {
    if (error) {
        console.error(`Gagal mengirim notif: ${error}`);
        return;
    }
    console.log("Notifikasi berhasil dikirim!");
});
