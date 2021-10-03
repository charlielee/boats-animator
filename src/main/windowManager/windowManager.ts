import {
  App,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  dialog,
} from "electron";
import * as path from "path";

const DEFAULT_OPTIONS: BrowserWindowConstructorOptions = {
  backgroundColor: "#2b2b2b",
  height: 540,
  minHeight: 400,
  minWidth: 640,
  show: false,
  title: "Boats Animator",
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
    // preload: path.join(__dirname, "../../preload.js"),
  },
  width: 730,
};

class WindowManager {
  app: App;
  browserWindow: BrowserWindow;
  displayCloseConfirmation: boolean;

  constructor(app: App) {
    this.app = app;
    this.browserWindow = new BrowserWindow(DEFAULT_OPTIONS);
    this.displayCloseConfirmation = false;
  }

  /**
   * Loads a window with the HTML page where React is built.
   */
  load() {
    this.browserWindow.loadURL(
      this.app.isPackaged
        ? `file://${path.join(__dirname, "renderer/index.html")}`
        : "http://localhost:4000"
    );

    this.browserWindow.once("ready-to-show", this.browserWindow.show);

    this.browserWindow.on("close", (e) => {
      if (this.displayCloseConfirmation && !this.showConfirmClosePrompt()) {
        e.preventDefault();
      }
    });
  }

  /**
   * Displays a confirm prompt to close the application
   * @returns {Boolean} Returns true if the user wants the application to be closed
   */
  showConfirmClosePrompt(): boolean {
    let choice = dialog.showMessageBoxSync(this.browserWindow, {
      type: "question",
      buttons: ["OK", "Cancel"],
      title: "Boats Animator",
      message: "Are you sure you want to exit Boats Animator?",
    });

    return choice === 0;
  }

  /**
   * Restores and focuses the window.
   */
  restore() {
    this.browserWindow.restore();
    this.browserWindow.focus();
  }

  /**
   * Resizes the window.
   */
  resize(width: number, height: number, maximized: boolean = false) {
    this.browserWindow.setSize(width, height, true);

    if (maximized) {
      this.browserWindow.maximize();
    } else {
      this.browserWindow.unmaximize();
    }
  }

  quit() {
    if (process.platform !== "darwin") {
      this.app.quit();
    }
  }

  static hasBrowserWindows() {
    return BrowserWindow.getAllWindows().length > 0;
  }
}

export default WindowManager;
