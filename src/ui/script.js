const { ipcRenderer } = require('electron');
const path = require('path');

document.addEventListener('DOMContentLoaded', () => {
    const startBackupButton = document.getElementById('start-backup');
    const sourcePathSelector = document.getElementById('source-path');
    const logContainer = document.getElementById('logs');

    let sourceDirectory = '';
