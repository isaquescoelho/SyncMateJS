const fs = require('fs');
const path = require('path');

function copyFileSync(source, target) {
    let targetFile = path.join(target, path.basename(source));
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}
