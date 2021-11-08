import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  dialog,
} from "electron";
import * as path from "path";
import { WindowSize } from "../../../common/WindowSize";

export const DEFAULT_WINDOW_OPTIONS: BrowserWindowConstructorOptions = {
  backgroundColor: "#171717",
  height: 715,
  minHeight: 400,
  minWidth: 640,
  show: false,
  title: "Boats Animator",
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
    preload: path.join(__dirname, "preload.js"),
  },
  width: 1050,
};

class AppWindow extends BrowserWindow {
  constructor(browserWindowOptions: BrowserWindowConstructorOptions) {
    super(browserWindowOptions);
  }

  loadLauncher() {
    this.loadURL(
      app.isPackaged
        ? `file://${path.join(__dirname, "renderer/index.html")}`
        : "http://localhost:4000"
    );

    this.once("ready-to-show", this.show);
  }

  restoreAndFocus() {
    this.restore();
    this.focus();
  }

  getWindowSize(): WindowSize {
    return {
      isMaximized: this.isMaximized(),
      winBounds: this.getNormalBounds(),
    };
  }

  async openConfirmPrompt(message: string) {
    const choice = await dialog.showMessageBox(this, {
      type: "question",
      buttons: ["OK", "Cancel"],
      title: "Boats Animator",
      message: message,
    });

    return choice.response === 0;
  }

  async openDirDialog(currentDir: string | undefined, title: string) {
    const result = await dialog.showOpenDialog(this, {
      title,
      // Title for macOS
      message: title,
      defaultPath: currentDir,
      properties: ["openDirectory", "createDirectory"],
    });

    if (!result.canceled && result.filePaths[0]) {
      return result.filePaths[0];
    } else {
      return currentDir;
    }
  }

  static create() {
    return new AppWindow(DEFAULT_WINDOW_OPTIONS);
  }
}

export default AppWindow;
