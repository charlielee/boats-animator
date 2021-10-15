import { app, ipcMain } from "electron";
import { IpcChannel } from "../common/IpcChannel";
import AppWindow from "./services/appWindow/AppWindow";

app.whenReady().then(() => {
  let appWindow = AppWindow.create();
  appWindow.loadLauncher();

  // Someone tried to run a second instance, we should focus our window.
  app.on("second-instance", () => appWindow.restoreAndFocus());

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (appWindow.isDestroyed()) {
      appWindow = AppWindow.create();
    }
    appWindow.loadLauncher();
  });

  ipcMain.handle(IpcChannel.APP_WINDOW_CHANGE_PAGE, (e, pathname) =>
    appWindow.changePage(pathname)
  );
});

// Ensure only one instance of the application is open
const hasInstanceLock = app.requestSingleInstanceLock();
if (!hasInstanceLock) {
  app.quit();
}
