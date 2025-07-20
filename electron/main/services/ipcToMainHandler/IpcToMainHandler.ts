import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent, systemPreferences } from "electron";
import IpcChannel from "../../../common/ipc/IpcChannel";
import Ipc from "../../../common/ipc/IpcHandler";
import { render } from "../exportVideo/ExportVideo";
import { settingsFileStore } from "../fileStore/SettingsFileStore";
import { openUserDataDirectory, showItemInFolder } from "../fileUtils/fileUtils";
import logger, { ProcessName } from "../logger/Logger";
import {
  getWindowSize,
  openConfirmPrompt,
  openDirDialog,
  openExportVideoFilePathDialog,
} from "../windowUtils/windowUtils";

class IpcToMainHandler {
  appVersion = async (): Ipc.AppVersion.Response => app.getVersion();

  checkCameraAccess = async (): Ipc.CheckCameraAccess.Response => {
    // Only check media access on macOS and Windows (not supported by Linux)
    switch (process.platform) {
      case "win32":
        return systemPreferences.getMediaAccessStatus("camera") === "granted";
      case "darwin":
        return await systemPreferences.askForMediaAccess("camera");
      default:
        return true;
    }
  };

  getUserPreferences = async (): Ipc.GetUserPreferences.Response =>
    settingsFileStore.get().userPreferences;

  logRenderer = async (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    payload: Ipc.LogRenderer.Payload
  ): Ipc.LogRenderer.Response => {
    logger.log(payload.logLevel, payload.loggingCode, payload.message, true, ProcessName.RENDERER);
  };

  saveSettingsAndClose = async (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    payload: Ipc.SaveSettingsAndClose.Payload
  ): Ipc.SaveSettingsAndClose.Response => {
    settingsFileStore.save({
      appWindowSize: getWindowSize(win),
      userPreferences: payload.userPreferences,
    });
    win.destroy();
  };

  openUserDataDirectory = (): Ipc.OpenUserDataDirectory.Response => openUserDataDirectory();

  openConfirmPrompt = (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    payload: Ipc.OpenConfirmPrompt.Payload
  ): Ipc.OpenConfirmPrompt.Response => openConfirmPrompt(win, payload.message);

  openDirDialog = (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    payload: Ipc.OpenDirDialog.Payload
  ): Ipc.OpenDirDialog.Response => openDirDialog(win, payload.workingDirectory, payload.title);

  openExportVideoFilePathDialog = (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    payload: Ipc.OpenExportVideoFilePathDialog.Payload
  ): Ipc.OpenExportVideoFilePathDialog.Response =>
    openExportVideoFilePathDialog(win, payload.currentFilePath);

  exportVideoStart = (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    payload: Ipc.ExportVideoStart.Payload
  ): Ipc.ExportVideoStart.Response => render(win, payload.ffmpegArguments, payload.videoFilePath);

  showItemInFolder = (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    payload: Ipc.ShowItemInFolder.Payload
  ): Ipc.ShowItemInFolder.Response => showItemInFolder(payload.filePath);

  static handleIfWindow = (
    channel: IpcChannel,
    listener: (event: IpcMainInvokeEvent, win: BrowserWindow, payload: any) => any
  ) => {
    ipcMain.handle(channel, (event: IpcMainInvokeEvent, payload: any) => {
      if (channel !== IpcChannel.LOG_RENDERER) {
        logger.info(`ipcToMainHandler.${channel}`);
      }
      const win = BrowserWindow.fromWebContents(event.sender);
      return win ? listener(event, win, payload) : undefined;
    });
  };
}

export const addIpcToMainHandlers = () => {
  const ipcHandler = new IpcToMainHandler();

  IpcToMainHandler.handleIfWindow(IpcChannel.APP_VERSION, ipcHandler.appVersion);

  IpcToMainHandler.handleIfWindow(IpcChannel.CHECK_CAMERA_ACCESS, ipcHandler.checkCameraAccess);

  IpcToMainHandler.handleIfWindow(IpcChannel.GET_USER_PREFERENCES, ipcHandler.getUserPreferences);

  IpcToMainHandler.handleIfWindow(IpcChannel.LOG_RENDERER, ipcHandler.logRenderer);

  IpcToMainHandler.handleIfWindow(
    IpcChannel.SAVE_SETTINGS_AND_CLOSE,
    ipcHandler.saveSettingsAndClose
  );

  IpcToMainHandler.handleIfWindow(
    IpcChannel.OPEN_APP_DATA_DIRECTORY,
    ipcHandler.openUserDataDirectory
  );

  IpcToMainHandler.handleIfWindow(IpcChannel.OPEN_CONFIRM_PROMPT, ipcHandler.openConfirmPrompt);

  IpcToMainHandler.handleIfWindow(IpcChannel.OPEN_DIR_DIALOG, ipcHandler.openDirDialog);

  IpcToMainHandler.handleIfWindow(
    IpcChannel.OPEN_EXPORT_VIDEO_FILE_PATH_DIALOG,
    ipcHandler.openExportVideoFilePathDialog
  );

  IpcToMainHandler.handleIfWindow(IpcChannel.EXPORT_VIDEO_START, ipcHandler.exportVideoStart);

  IpcToMainHandler.handleIfWindow(IpcChannel.SHOW_ITEM_IN_FOLDER, ipcHandler.showItemInFolder);
};

export const sendToRenderer = (
  win: BrowserWindow,
  channel: IpcChannel,
  payload?: Record<string, unknown>
) => win.webContents.send(channel, payload);
