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

    this.on("close", (e) => {
      if (this.displayCloseConfirmation && !this.showConfirmClosePrompt()) {
        e.preventDefault();
      }
    });
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

  /**
   * Displays a confirm prompt to close the application
   * @returns {Boolean} Returns true if the user wants the application to be closed
   */
  private showConfirmClosePrompt() {
    let choice = dialog.showMessageBoxSync(this, {
      type: "question",
      buttons: ["OK", "Cancel"],
      title: "Boats Animator",
      message: "Are you sure you want to exit Boats Animator?",
    });

    return choice === 0;
  }

  static create() {
    return new AppWindow(DEFAULT_WINDOW_OPTIONS, false);
  }
}

export default AppWindow;
