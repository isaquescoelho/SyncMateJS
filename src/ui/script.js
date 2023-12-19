const { ipcRenderer } = require('electron');
const path = require('path');

document.addEventListener('DOMContentLoaded', () => {
    const startBackupButton = document.getElementById('start-backup');
    const sourcePathSelector = document.getElementById('source-path');
    const logContainer = document.getElementById('logs');

    let sourceDirectory = '';

    sourcePathSelector.addEventListener('change', function(event) {
        if (event.target.files.length > 0) {
            sourceDirectory = path.dirname(event.target.files[0].path);
            console.log('Source directory selected:', sourceDirectory);
        }
    });

    startBackupButton.addEventListener('click', () => {
        if (sourceDirectory) {
            ipcRenderer.send('start-backup', sourceDirectory);
            logContainer.innerText = 'Starting backup...';
        } else {
            logContainer.innerText = 'Please select a source directory.';
        }
    });

    ipcRenderer.on('backup-complete', (event, message) => {
        logContainer.innerText = message;
    });

    ipcRenderer.on('backup-error', (event, message) => {
        logContainer.innerText = message;
    });
});
