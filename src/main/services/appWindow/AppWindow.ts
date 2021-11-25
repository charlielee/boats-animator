import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  dialog,
  Rectangle,
  screen,
} from "electron";
import * as path from "path";
import IpcChannel from "../../../common/ipc/IpcChannel";
import { WindowSize } from "../../../common/WindowSize";
import SettingsFileStore from "../fileStore/SettingsFileStore";

export const DEFAULT_WINDOW_OPTIONS: BrowserWindowConstructorOptions = {
  autoHideMenuBar: true,
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
  constructor(
    browserWindowOptions: BrowserWindowConstructorOptions,
    private settingsFileStore: SettingsFileStore
  ) {
    super(
      Object.assign(
        browserWindowOptions,
        AppWindow.getPreviousWinBounds(settingsFileStore)
      )
    );
  }

  loadLauncher() {
    this.loadURL(
      app.isPackaged
        ? `file://${path.join(__dirname, "renderer/index.html")}`
        : "http://localhost:4000"
    );

    this.once("ready-to-show", () => {
      if (this.settingsFileStore.get().appWindowSize.isMaximized) {
        this.maximize();
        this.focus();
      } else {
        this.show();
      }
    });

    this.on("close", (e) => {
      e.preventDefault();
      this.webContents.send(IpcChannel.ON_CLOSE_BUTTON_CLICK);
    });
  }

  restoreAndFocus() {
    this.restore();
    this.focus();
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

  public getWindowSize(): WindowSize {
    return {
      isMaximized: this.isMaximized(),
      winBounds: this.getNormalBounds(),
    };
  }

  private static getPreviousWinBounds(
    settingsFileStore: SettingsFileStore
  ): Rectangle | {} {
    const currentDisplaySize = screen.getPrimaryDisplay().workAreaSize;
    const { winBounds } = settingsFileStore.get().appWindowSize;

    // Check the window will fit in the x and y dimensions
    // +10 is to allow for a small amount of leeway
    const doesXFit =
      winBounds &&
      currentDisplaySize.width + 10 >= winBounds.x + winBounds.width;
    const doesYFit =
      winBounds &&
      currentDisplaySize.height + 10 >= winBounds.y + winBounds.height;

    if (doesXFit && doesYFit) {
      return winBounds;
    } else {
      return {};
    }
  }
}

export default AppWindow;
