const fs = require('fs');
const path = require('path');

function copyFileSync(source, target) {
    let targetFile = path.join(target, path.basename(source));
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
    if (fs.lstatSync(source).isFile()) {
        copyFileSync(source, target);
        return;
    }

    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    let files = fs.readdirSync(source);
    files.forEach(function(file) {
        let curSource = path.join(source, file);

        if (fs.lstatSync(curSource).isDirectory()) {
            let curTarget = path.join(target, path.basename(file));
            copyFolderRecursiveSync(curSource, curTarget);
        } else {
            copyFileSync(curSource, target);
        }
    });
}

module.exports = {
    copyFolderRecursiveSync,
    copyFileSync
};
