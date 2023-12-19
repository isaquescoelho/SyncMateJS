const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { copyFolderRecursiveSync } = require('./src/backend/backup');

const defaultBackupPath = path.join(os.homedir(), 'SyncMateJSBackups');

if (!fs.existsSync(defaultBackupPath)) {
    fs.mkdirSync(defaultBackupPath, { recursive: true });
}
