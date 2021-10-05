import { app, ipcMain } from "electron";
import { APP_WINDOW_CHANGE_PAGE } from "../common/IpcChannelNames";
import AppWindow, {
  DEFAULT_WINDOW_OPTIONS,
} from "./services/appWindow/AppWindow";

app.whenReady().then(() => {
  const appWindow = new AppWindow(DEFAULT_WINDOW_OPTIONS, false);
  appWindow.loadLauncher();

  // Someone tried to run a second instance, we should focus our window.
  app.on("second-instance", () => appWindow.restoreAndFocus());

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => appWindow.loadLauncher());

  ipcMain.handle(APP_WINDOW_CHANGE_PAGE, (e, pathname) =>
    appWindow.changePage(pathname)
  );
});

// Ensure only one instance of the application is open
const hasInstanceLock = app.requestSingleInstanceLock();
if (!hasInstanceLock) {
  app.quit();
}
