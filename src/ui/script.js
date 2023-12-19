const { ipcRenderer } = require('electron');
const path = require('path');

document.addEventListener('DOMContentLoaded', () => {
    const startBackupButton = document.getElementById('start-backup');
    const sourcePathSelector = document.getElementById('source-path');
    const logContainer = document.getElementById('logs');

    let sourceDirectory = '';

    sourcePathSelector.addEventListener('change', function(event) {
        if (event.target.files.length > 0) {
            // Extrai o diretório pai do primeiro arquivo no diretório selecionado
            sourceDirectory = path.dirname(event.target.files[0].path);
            console.log('Source directory selected:', sourceDirectory);
        }
    });
