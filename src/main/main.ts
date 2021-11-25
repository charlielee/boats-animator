import { app, nativeTheme } from "electron";
import AppWindow, {
  DEFAULT_WINDOW_OPTIONS,
} from "./services/appWindow/AppWindow";
import SettingsFileStore from "./services/fileStore/SettingsFileStore";
import { addIpcToMainHandlers } from "./services/ipcToMainHandler/IpcToMainHandler";

nativeTheme.themeSource = "dark";

app.whenReady().then(() => {
  const settingsFileStore = new SettingsFileStore();
  let appWindow = new AppWindow(DEFAULT_WINDOW_OPTIONS, settingsFileStore);
  appWindow.loadLauncher();

  addIpcToMainHandlers(settingsFileStore);

  // Someone tried to run a second instance, we should focus our window.
  app.on("second-instance", () => appWindow.restoreAndFocus());

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (appWindow.isDestroyed()) {
      appWindow = new AppWindow(DEFAULT_WINDOW_OPTIONS, settingsFileStore);
    }
    appWindow.loadLauncher();
  });
});

// Ensure only one instance of the application is open
const hasInstanceLock = app.requestSingleInstanceLock();
if (!hasInstanceLock) {
  app.quit();
}
