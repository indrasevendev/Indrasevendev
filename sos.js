// Contoh kedip cepat (dot)
const { execSync } = require('child_process');

for(let i=0; i<5; i++) {
    execSync('termux-torch on');
    execSync('sleep 0.2');
    execSync('termux-torch off');
    execSync('sleep 0.2');
}

