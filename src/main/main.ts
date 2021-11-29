import { app, nativeTheme } from "electron";
import { addIpcToMainHandlers } from "./services/ipcToMainHandler/IpcToMainHandler";
import {
  createAppWindow,
  hasWindows,
  loadApp,
  restoreAndFocus,
} from "./services/windowUtils.ts/windowUtils";

nativeTheme.themeSource = "dark";

app.whenReady().then(() => {
  let appWindow = createAppWindow();
  loadApp(appWindow);

  addIpcToMainHandlers();

  // Someone tried to run a second instance, we should focus our window.
  app.on("second-instance", () => restoreAndFocus(appWindow));

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (!hasWindows()) {
      appWindow = createAppWindow();
      loadApp(appWindow);
    }
  });
});

// Ensure only one instance of the application is open
const hasInstanceLock = app.requestSingleInstanceLock();
if (!hasInstanceLock) {
  app.quit();
}
