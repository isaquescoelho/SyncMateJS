const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const { copyFileSync } = require('../backend/backup');

describe('File copy test', function() {
    const sourceFile = path.join(__dirname, 'testFile.txt');
    const targetDir = path.join(__dirname, 'testDir');
    const targetFile = path.join(targetDir, 'testFile.txt');

    before(function() {
        fs.writeFileSync(sourceFile, 'test content');
        if (!fs.existsSync(targetDir)){
            fs.mkdirSync(targetDir);
        }
    });

    it('must copy file from A to B', function() {
        copyFileSync(sourceFile, targetDir);
        expect(fs.existsSync(targetFile)).to.be.true;
    });

    after(function() {
        if (fs.existsSync(targetFile)) {
            fs.unlinkSync(targetFile);
        }
        if (fs.existsSync(targetDir)) {
            fs.rmdirSync(targetDir);
        }
    });
});
