import { app, ipcMain } from "electron";
import IpcChannel from "../../../common/ipc/IpcChannel";
import IpcToMainApi from "../../../common/ipc/IpcToMainApi";
import { UserPreferences } from "../../../common/UserPreferences";
import AppWindow from "../appWindow/AppWindow";
import SettingsFileStore from "../fileStore/SettingsFileStore";

class IpcToMainHandler implements IpcToMainApi {
  constructor(
    private appWindow: AppWindow,
    private settingsFileStore: SettingsFileStore
  ) {}

  appVersion = async () => app.getVersion() || "";

  getUserPreferences = async () => this.settingsFileStore.get().userPreferences;

  saveSettingsAndClose = (userPreferences: UserPreferences) => {
    const appWindowSize = this.appWindow.getWindowSize();
    this.settingsFileStore.save({ appWindowSize, userPreferences });
    this.appWindow.confirmBeforeClose = false;
    this.appWindow.close();
  };

  openConfirmPrompt = (message: string) =>
    this.appWindow.openConfirmPrompt(message);

  openDirDialog = (currentDir: string | undefined, title: string) =>
    this.appWindow.openDirDialog(currentDir, title);
}

export const addIpcToMainHandlers = (
  appWindow: AppWindow,
  settingsFileStore: SettingsFileStore
) => {
  const ipcHandler = new IpcToMainHandler(appWindow, settingsFileStore);

  ipcMain.handle(IpcChannel.APP_VERSION, (e) => ipcHandler.appVersion());

  ipcMain.handle(IpcChannel.GET_USER_PREFERENCES, (e) =>
    ipcHandler.getUserPreferences()
  );

  ipcMain.handle(IpcChannel.SAVE_SETTINGS_AND_CLOSE, (e, userPreferences) =>
    ipcHandler.saveSettingsAndClose(userPreferences)
  );

  ipcMain.handle(IpcChannel.OPEN_CONFIRM_PROMPT, (e, message) =>
    ipcHandler.openConfirmPrompt(message)
  );

  ipcMain.handle(IpcChannel.OPEN_DIR_DIALOG, (e, currentDir, title) =>
    ipcHandler.openDirDialog(currentDir, title)
  );
};
