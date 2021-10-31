import { app } from "electron";
import AppWindow from "./services/appWindow/AppWindow";
import { addIpcMainHandlers } from "./services/ipcMainHandler/IpcMainHandler";

app.whenReady().then(() => {
  let appWindow = AppWindow.create();
  appWindow.loadLauncher();

  addIpcMainHandlers(appWindow);

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
});

// Ensure only one instance of the application is open
const hasInstanceLock = app.requestSingleInstanceLock();
if (!hasInstanceLock) {
  app.quit();
}
