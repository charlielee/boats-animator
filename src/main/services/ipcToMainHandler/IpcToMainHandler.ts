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

  settingsOpenConfirmPrompt = (message: string) =>
    this.appWindow.openConfirmPrompt(message);

  settingsOpenDirDialog = (currentDir: string | undefined, title: string) =>
    this.appWindow.openDirDialog(currentDir, title);

  settingsSave = (userPreferences: UserPreferences) => {
    const appWindowSize = this.appWindow.getWindowSize();
    this.settingsFileStore.save({ appWindowSize, userPreferences });
  };
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

  ipcMain.handle(IpcChannel.SETTINGS_OPEN_CONFIRM_PROMPT, (e, message) =>
    ipcHandler.settingsOpenConfirmPrompt(message)
  );

  ipcMain.handle(IpcChannel.SETTINGS_OPEN_DIR_DIALOG, (e, currentDir, title) =>
    ipcHandler.settingsOpenDirDialog(currentDir, title)
  );

  ipcMain.handle(IpcChannel.SETTINGS_SAVE, (e, userPreferences) =>
    ipcHandler.settingsSave(userPreferences)
  );
};
