import { app } from "electron";
import WindowManager from "./windowManager/windowManager";

app.whenReady().then(() => {
  const windowManager = new WindowManager(app);
  windowManager.load();

  // Someone tried to run a second instance, we should focus our window.
  app.on("second-instance", () => windowManager.restore());

  app.on("window-all-closed", () => windowManager.quit());

  app.on("activate", () => windowManager.load());
});

// Ensure only one instance of the application is open
const hasInstanceLock = app.requestSingleInstanceLock();
if (!hasInstanceLock) {
  app.quit();
}
