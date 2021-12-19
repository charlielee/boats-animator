import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainInvokeEvent,
  systemPreferences,
} from "electron";
import IpcChannel from "../../../common/ipc/IpcChannel";
import Ipc from "../../../common/ipc/IpcHandler";
import { settingsFileStore } from "../fileStore/SettingsFileStore";
import logger, { ProcessName } from "../logger/Logger";
import {
  getWindowSize,
  openConfirmPrompt,
  openDirDialog,
} from "../windowUtils.ts/windowUtils";

class IpcToMainHandler {
  constructor() {}

  appVersion = async (e: IpcMainInvokeEvent): Ipc.AppVersion.Response =>
    app.getVersion();

  checkCameraAccess = async (
    e: IpcMainInvokeEvent
  ): Ipc.CheckCameraAccess.Response => {
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

  getUserPreferences = async (
    e: IpcMainInvokeEvent
  ): Ipc.GetUserPreferences.Response => settingsFileStore.get().userPreferences;

  logRenderer = async (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    payload: Ipc.LogRenderer.Payload
  ): Ipc.LogRenderer.Response => {
    logger.log(
      payload.logLevel,
      payload.loggingCode,
      payload.message,
      true,
      ProcessName.RENDERER
    );
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

  openConfirmPrompt = (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    payload: Ipc.OpenConfirmPrompt.Payload
  ): Ipc.OpenConfirmPrompt.Response => openConfirmPrompt(win, payload.message);

  openDirDialog = (
    e: IpcMainInvokeEvent,
    win: BrowserWindow,
    payload: Ipc.OpenDirDialog.Payload
  ): Ipc.OpenDirDialog.Response =>
    openDirDialog(win, payload.workingDirectory, payload.title);

  static handleIfWindow = (
    channel: IpcChannel,
    listener: (
      event: IpcMainInvokeEvent,
      win: BrowserWindow,
      payload: any
    ) => any
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

  IpcToMainHandler.handleIfWindow(
    IpcChannel.APP_VERSION,
    ipcHandler.appVersion
  );

  IpcToMainHandler.handleIfWindow(
    IpcChannel.CHECK_CAMERA_ACCESS,
    ipcHandler.checkCameraAccess
  );

  IpcToMainHandler.handleIfWindow(
    IpcChannel.GET_USER_PREFERENCES,
    ipcHandler.getUserPreferences
  );

  IpcToMainHandler.handleIfWindow(
    IpcChannel.LOG_RENDERER,
    ipcHandler.logRenderer
  );

  IpcToMainHandler.handleIfWindow(
    IpcChannel.SAVE_SETTINGS_AND_CLOSE,
    ipcHandler.saveSettingsAndClose
  );

  IpcToMainHandler.handleIfWindow(
    IpcChannel.OPEN_CONFIRM_PROMPT,
    ipcHandler.openConfirmPrompt
  );

  IpcToMainHandler.handleIfWindow(
    IpcChannel.OPEN_DIR_DIALOG,
    ipcHandler.openDirDialog
  );
};
