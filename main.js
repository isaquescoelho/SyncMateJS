const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { copyFolderRecursiveSync } = require('./src/backend/backup');

const defaultBackupPath = path.join(os.homedir(), 'SyncMateJSBackups');

if (!fs.existsSync(defaultBackupPath)) {
    fs.mkdirSync(defaultBackupPath, { recursive: true });
}

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(path.join('src', 'ui', 'index.html'));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('start-backup', (event, sourcePath) => {
    try {
        copyFolderRecursiveSync(sourcePath, defaultBackupPath);
        event.reply('backup-complete', `Backup completed succefully to: ${defaultBackupPath}`);
    } catch (error) {
        event.reply('backup-error', `Backup failed: ${error.message}`);
    }
});
