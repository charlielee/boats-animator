import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import IpcChannel from "../../../common/ipc/IpcChannel";
import Ipc from "../../../common/ipc/IpcHandler";
import AppWindow from "../appWindow/AppWindow";
import SettingsFileStore from "../fileStore/SettingsFileStore";

class IpcToMainHandler {
  constructor(private settingsFileStore: SettingsFileStore) {}

  appVersion = async (e: IpcMainInvokeEvent): Ipc.AppVersion.Response =>
    app.getVersion();

  getUserPreferences = async (
    e: IpcMainInvokeEvent
  ): Ipc.GetUserPreferences.Response =>
    this.settingsFileStore.get().userPreferences;

  saveSettingsAndClose = async (
    e: IpcMainInvokeEvent,
    win: AppWindow,
    payload: Ipc.SaveSettingsAndClose.Payload
  ): Ipc.SaveSettingsAndClose.Response => {
    this.settingsFileStore.save({
      appWindowSize: win.getWindowSize(),
      userPreferences: payload.userPreferences,
    });
    win.destroy();
  };

  openConfirmPrompt = (
    e: IpcMainInvokeEvent,
    win: AppWindow,
    payload: Ipc.OpenConfirmPrompt.Payload
  ): Ipc.OpenConfirmPrompt.Response => win.openConfirmPrompt(payload.message);

  openDirDialog = (
    e: IpcMainInvokeEvent,
    win: AppWindow,
    payload: Ipc.OpenDirDialog.Payload
  ): Ipc.OpenDirDialog.Response =>
    win.openDirDialog(payload.workingDirectory, payload.title);

  static handleIfWindow = (
    channel: IpcChannel,
    listener: (event: IpcMainInvokeEvent, win: AppWindow, payload: any) => any
  ) => {
    ipcMain.handle(channel, (event: IpcMainInvokeEvent, payload: any) => {
      const win = BrowserWindow.fromWebContents(event.sender) as AppWindow;
      return win ? listener(event, win, payload) : undefined;
    });
  };
}

export const addIpcToMainHandlers = (settingsFileStore: SettingsFileStore) => {
  const ipcHandler = new IpcToMainHandler(settingsFileStore);

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
