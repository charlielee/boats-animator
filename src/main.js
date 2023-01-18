const { app, BrowserWindow, ipcMain } = require("electron");
const settings = new (require("./js/main/Settings"))();
const shortcutStore = new (require("./js/main/ShortcutStore"))();
const win = new (require("./js/main/Win"))();

// App events

// Ensure only one instance of the application is open
const hasInstanceLock = app.requestSingleInstanceLock();
if (!hasInstanceLock) {
  app.quit();
}

// Someone tried to run a second instance, we should focus our window.
app.on("second-instance", (e, commandLine, workingDirectory) => {
  let curWindow = BrowserWindow.getAllWindows()[0];
  if (curWindow) {
    curWindow.restore();
    curWindow.focus();
  }
});

app.whenReady().then(() => {
  win.loadLauncher();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    win.loadLauncher();
  }
});

// IPC messages from the renderer processes

// Toggle menu bar items
ipcMain.on("menubar:toggle-items", (e, newState) => {
  win.menuBar.toggleAnimatorItems(newState);
});

// Toggle menu item checkbox
ipcMain.on("menubar:toggle-checkbox", (e, itemName, newState) => {
  win.menuBar.toggleCheckbox(itemName, newState);
});

// Returns if the app is packaged or not (indicates production or development mode)
ipcMain.handle("app:is-packaged", async (e) => {
  return app.isPackaged;
});

// Check camera access has been granted by the OS
ipcMain.handle("settings:check-for-camera-access", async (e) => {
  return settings.checkForCameraAccess();
});

// Display a confirm dialog with the given message
ipcMain.handle("settings:show-confirm-dialog", async (e, message) => {
  return settings.showConfirmDialog(message);
});

// Get the value of a setting with a given name
ipcMain.handle("settings:get", async (e, settingName) => {
  return settings.get(settingName);
});

// Open select export frame dir dialog
ipcMain.handle("settings:show-export-frame-dir-dialog", async (e) => {
  return settings.showExportFrameDirDialog();
});

// Open select export video file path dialog
ipcMain.handle(
  "settings:show-export-video-file-path-dialog",
  async (e, curFilePath) => {
    return settings.showExportVideoFilePathDialog(curFilePath);
  }
);

ipcMain.handle("shortcut-store:get-all", async (e) => {
  return shortcutStore.getAll();
});

// Handle window switching
ipcMain.on("win:switch-window", (e, winName) => {
  win.switchWindow(winName);
});

// Close current window
ipcMain.on("win:close-window", (e) => {
  BrowserWindow.getFocusedWindow().close();
});
