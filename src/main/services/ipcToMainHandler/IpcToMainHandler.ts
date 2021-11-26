import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import IpcChannel from "../../../common/ipc/IpcChannel";
import Ipc from "../../../common/ipc/IpcHandler";
import {
  getWindowSize,
  openConfirmPrompt,
  openDirDialog,
} from "../windowUtils.ts/windowUtils";
import { settingsFileStore } from "../fileStore/SettingsFileStore";

class IpcToMainHandler {
  constructor() {}

  appVersion = async (e: IpcMainInvokeEvent): Ipc.AppVersion.Response =>
    app.getVersion();

  getUserPreferences = async (
    e: IpcMainInvokeEvent
  ): Ipc.GetUserPreferences.Response => settingsFileStore.get().userPreferences;

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
      const win = BrowserWindow.fromWebContents(event.sender);
      return win ? listener(event, win, payload) : undefined;
    });
  };
}

export const addIpcToMainHandlers = () => {
  const ipcHandler = new IpcToMainHandler();

  ipcMain.handle(IpcChannel.APP_VERSION, ipcHandler.appVersion);

  ipcMain.handle(
    IpcChannel.GET_USER_PREFERENCES,
    ipcHandler.getUserPreferences
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
