const { app, BrowserWindow, ipcMain } = require('electron');
const settings = new (require('./js/main/settings'));
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

// Check camera access has been granted by the OS
ipcMain.handle('settings:check-for-camera-access', async (e) => {
  return settings.checkForCameraAccess();
});

// Get the value of a setting with a given name
ipcMain.handle('settings:get', async (e, settingName) => {
  return settings.get(settingName);
});

// Open select export frame dir dialog
ipcMain.handle('settings:show-export-frame-dir-dialog', async (e) => {
  return settings.showExportFrameDirDialog();
});

// Open select export video file path dialog
ipcMain.handle('settings:show-export-video-file-path-dialog', async (e, curFilePath) => {
  return settings.showExportVideoFilePathDialog(curFilePath);
});

// Handle window switching
ipcMain.on('win:switch-window', (e, winName) => {
  win.switchWindow(winName);
});

// Close current window
ipcMain.on('win:close-window', (e) => {
  BrowserWindow.getFocusedWindow().close();
});
