const { app, BrowserWindow, ipcMain } = require('electron');
const win = new (require('./js/main/win'));

app.whenReady().then(() => {
  win.loadLauncher();
});

// Handle window switching
ipcMain.on('win:switch-window', (e, winName) => {
  win.switchWindow(winName);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    win.loadLauncher();
  }
})
