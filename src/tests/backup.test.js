const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const { copyFileSync } = require('../backend/backup');

describe('Teste de Cópia de Arquivos', function() {
    const sourceFile = path.join(__dirname, 'testFile.txt');
    const targetDir = path.join(__dirname, 'testDir');
    const targetFile = path.join(targetDir, 'testFile.txt');

    before(function() {
        fs.writeFileSync(sourceFile, 'conteúdo de teste');
        if (!fs.existsSync(targetDir)){
            fs.mkdirSync(targetDir);
        }
    });

    it('deve copiar arquivo de A para B', function() {
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
