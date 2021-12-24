import { app, nativeTheme } from "electron";
import * as os from "os";
import {
  loadExtension,
  REACT_DEV_TOOLS_ID,
  REDUX_DEV_TOOLS_ID,
} from "./services/devToolsExtensions/DevToolsExtensions";
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

app.whenReady().then(async () => {
  logger.info("app.ready", {
    appVersion: app.getVersion(),
    osType: os.type(),
    osRelease: os.release(),
    osPlatform: os.platform(),
  });

  await loadExtension(REACT_DEV_TOOLS_ID);
  await loadExtension(REDUX_DEV_TOOLS_ID);

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
    logger.info("app.activate");

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
