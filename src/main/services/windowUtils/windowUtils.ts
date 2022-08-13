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
import { settingsFileStore } from "../fileStore/SettingsFileStore";
import { sendToRenderer } from "../ipcToMainHandler/IpcToMainHandler";
import logger from "../logger/Logger";

const DEFAULT_WINDOW_OPTIONS: BrowserWindowConstructorOptions = {
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

export const createAppWindow = () =>
  new BrowserWindow({
    ...DEFAULT_WINDOW_OPTIONS,
    ...getPreviousWinBounds(),
  });

export const loadApp = (win: BrowserWindow) => {
  logger.info("windowUtils.loadApp");

  win.loadURL(
    app.isPackaged
      ? `file://${path.join(__dirname, "renderer/index.html")}`
      : "http://localhost:4000"
  );

  win.once("ready-to-show", () => {
    logger.info("windowUtils.readyToShow");

    if (settingsFileStore.get().appWindowSize.isMaximized) {
      win.maximize();
      win.focus();
    }

    win.show();
  });

  win.on("close", (e) => {
    logger.info("windowUtils.closePrevented");
    e.preventDefault();
    sendToRenderer(win, IpcChannel.ON_CLOSE_BUTTON_CLICK);
  });
};

export const restoreAndFocus = (win: BrowserWindow) => {
  win.restore();
  win.focus();
};

export const openConfirmPrompt = async (
  win: BrowserWindow,
  message: string
) => {
  logger.info("windowUtils.openConfirmPrompt", message);

  const choice = await dialog.showMessageBox(win, {
    type: "question",
    buttons: ["OK", "Cancel"],
    title: "Boats Animator",
    message: message,
  });

  return choice.response === 0;
};

export const openDirDialog = async (
  win: BrowserWindow,
  workingDirectory: string | undefined,
  title: string
) => {
  logger.info("windowUtils.openDirDialog", title);

  const result = await dialog.showOpenDialog(win, {
    title,
    // Title for macOS
    message: title,
    defaultPath: workingDirectory,
    properties: ["openDirectory", "createDirectory"],
  });

  if (!result.canceled && result.filePaths[0] !== "") {
    return result.filePaths[0];
  } else {
    return workingDirectory;
  }
};

export const openExportVideoFilePathDialog = async (
  win: BrowserWindow,
  currentFilePath: string | undefined
) => {
  logger.info("windowUtils.openExportVideoFilePathDialog");

  const result = await dialog.showSaveDialog(win, {
    title: "Select the location to save the exported video file",
    // Title for macOS
    message: "Select the location to save the exported video file",
    defaultPath: currentFilePath,
    properties: ["createDirectory", "showOverwriteConfirmation"],
    filters: [{ name: "MP4 File", extensions: ["mp4"] }],
  });

  if (!result.canceled && result.filePath !== undefined) {
    return result.filePath;
  } else {
    return currentFilePath;
  }
};

export const getWindowSize = (win: BrowserWindow): WindowSize => ({
  isMaximized: win.isMaximized(),
  winBounds: win.getNormalBounds(),
});

const getPreviousWinBounds = (): Rectangle | Record<string, never> => {
  logger.info("windowUtils.getPreviousWinBounds");

  const currentDisplaySize = screen.getPrimaryDisplay().workAreaSize;
  const { winBounds } = settingsFileStore.get().appWindowSize;

  // Check the window will fit in the x and y dimensions
  // +10 is to allow for a small amount of leeway
  const doesXFit =
    winBounds !== undefined &&
    currentDisplaySize.width + 10 >= winBounds.x + winBounds.width;
  const doesYFit =
    winBounds !== undefined &&
    currentDisplaySize.height + 10 >= winBounds.y + winBounds.height;

  if (doesXFit && doesYFit) {
    return winBounds;
  } else {
    return {};
  }
};

export const hasWindows = () => BrowserWindow.getAllWindows().length > 0;
