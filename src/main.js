const { app, BrowserWindow, ipcMain } = require('electron');
const win = new (require('./js/main/win'));

// App events

app.whenReady().then(() => {
  win.loadLauncher();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    win.loadLauncher();
  }
});

// IPC messages from the renderer processes

// Toggle menu bar items
ipcMain.on('menubar:toggle-items', (e, newState) => {
  win.menuBar.toggleAnimatorItems(newState);
});

// Toggle menu item checkbox
ipcMain.on('menubar:toggle-checkbox', (e, itemName, newState) => {
  win.menuBar.toggleCheckbox(itemName, newState);
});

// Handle window switching
ipcMain.on('win:switch-window', (e, winName) => {
  win.switchWindow(winName);
});

// Close current window
ipcMain.on('win:close-window', (e) => {
  BrowserWindow.getFocusedWindow().close();
});
