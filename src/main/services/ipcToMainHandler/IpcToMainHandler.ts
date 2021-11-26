import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import IpcChannel from "../../../common/ipc/IpcChannel";
import Ipc from "../../../common/ipc/IpcHandler";
import { getWindowSize } from "../../windowUtils";
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
    ...args: Ipc.SaveSettingsAndClose.Args
  ): Ipc.SaveSettingsAndClose.Response => {
    const [userPreferences] = args;

    this.settingsFileStore.save({
      appWindowSize: getWindowSize(win),
      userPreferences,
    });
    win.destroy();
  };

  openConfirmPrompt = (
    e: IpcMainInvokeEvent,
    win: AppWindow,
    args: Ipc.OpenConfirmPrompt.Args
  ): Ipc.OpenConfirmPrompt.Response => win.openConfirmPrompt(args[0]);

  openDirDialog = (
    e: IpcMainInvokeEvent,
    win: AppWindow,
    args: Ipc.OpenDirDialog.Args
  ): Ipc.OpenDirDialog.Response => win.openDirDialog(args[0], args[1]);

  static handleIfWindow = (
    channel: IpcChannel,
    listener: (event: IpcMainInvokeEvent, win: AppWindow, ...args: any[]) => any
  ) => {
    ipcMain.handle(channel, (event: IpcMainInvokeEvent, ...args: any[]) => {
      const win = BrowserWindow.fromWebContents(event.sender) as AppWindow;
      return win ? listener(event, win, ...args) : undefined;
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
