import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  dialog,
} from "electron";
import * as path from "path";
import { PageRoute } from "../../../common/PageRoute";

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
  displayCloseConfirmation: boolean;

  constructor(
    browserWindowOptions: BrowserWindowConstructorOptions,
    displayCloseConfirmation: boolean
  ) {
    super(browserWindowOptions);
    this.displayCloseConfirmation = displayCloseConfirmation;
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

  changePage(pathname: PageRoute) {
    switch (pathname) {
      case PageRoute.LAUNCHER: {
        this.displayCloseConfirmation = false;
        break;
      }
      case PageRoute.ANIMATOR: {
        this.displayCloseConfirmation = true;
        break;
      }
      default:
        throw `Unknown pathname ${pathname}`;
    }
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
    return new AppWindow(DEFAULT_WINDOW_OPTIONS, false);
  }
}

export default AppWindow;
