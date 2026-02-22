const { execSync } = require('child_process');

try {
    // Memunculkan dialog pilihan di layar Android
    const options = "Senter_On,Senter_Off,Getar,Info_Baterai";
    const result = execSync(`termux-dialog sheet -t "Indrasevendev Control Center" -v "${options}"`).toString();
    
    // Mengambil teks pilihan dari output JSON
    const choice = JSON.parse(result).text;

    console.log(`Kamu memilih: ${choice}`);

    switch (choice) {
        case 'Senter_On':
            execSync('termux-torch on');
            execSync('termux-toast "Senter dinyalakan"');
            break;
        case 'Senter_Off':
            execSync('termux-torch off');
            execSync('termux-toast "Senter dimatikan"');
            break;
        case 'Getar':
            execSync('termux-vibrate -d 500');
            break;
        case 'Info_Baterai':
            const bat = JSON.parse(execSync('termux-battery-status'));
            execSync(`termux-dialog confirm -t "Status Baterai" -i "${bat.percentage}% - ${bat.status}"`);
            break;
        default:
            console.log("Aksi dibatalkan.");
    }
} catch (e) {
    console.log("Dialog ditutup atau terjadi error.");
}
