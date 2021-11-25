import { BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import { WindowSize } from "../common/WindowSize";

export const getWindowSize = (browserWindow: BrowserWindow): WindowSize => ({
  isMaximized: browserWindow.isMaximized(),
  winBounds: browserWindow.getNormalBounds(),
});
