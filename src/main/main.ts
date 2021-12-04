import { app, nativeTheme } from "electron";
import LogLevel from "../common/LogLevel";
import { addIpcToMainHandlers } from "./services/ipcToMainHandler/IpcToMainHandler";
import logger from "./services/logger/Logger";
import {
  createAppWindow,
  hasWindows,
  loadApp,
  restoreAndFocus,
} from "./services/windowUtils.ts/windowUtils";

nativeTheme.themeSource = "dark";

logger.initialize();

app.whenReady().then(() => {
  logger.log(LogLevel.INFO, "app.ready");

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
    logger.log(LogLevel.INFO, "app.activate");

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
