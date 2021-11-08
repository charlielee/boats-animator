import { app, ipcMain } from "electron";
import IpcApi, { IpcChannel } from "../../../common/IpcApi";
import { UserPreferencesState } from "../../../renderer/redux/bundles/userPreferences";
import AppWindow from "../appWindow/AppWindow";
import SettingsFileStore from "../fileStore/SettingsFileStore";

class IpcMainHandler implements IpcApi {
  constructor(
    private appWindow: AppWindow,
    private settingsFileStore: SettingsFileStore
  ) {}

  [IpcChannel.APP_VERSION] = async () => app.getVersion() || "";

  [IpcChannel.GET_USER_PREFERENCES] = async () =>
    this.settingsFileStore.get().userPreferences;

  [IpcChannel.SETTINGS_OPEN_CONFIRM_PROMPT] = (message: string) =>
    this.appWindow.openConfirmPrompt(message);

  [IpcChannel.SETTINGS_OPEN_DIR_DIALOG] = (
    currentDir: string | undefined,
    title: string
  ) => this.appWindow.openDirDialog(currentDir, title);

  [IpcChannel.SETTINGS_SAVE] = (userPreferences: UserPreferencesState) => {
    const appWindowSize = this.appWindow.getWindowSize();
    this.settingsFileStore.save({ appWindowSize, userPreferences });
  };
}

export const addIpcMainHandlers = (
  appWindow: AppWindow,
  settingsFileStore: SettingsFileStore
) => {
  const ipcHandler = new IpcMainHandler(appWindow, settingsFileStore);

  ipcMain.handle(IpcChannel.APP_VERSION, (e) => ipcHandler.APP_VERSION());

  ipcMain.handle(IpcChannel.GET_USER_PREFERENCES, (e) =>
    ipcHandler.GET_USER_PREFERENCES()
  );

  ipcMain.handle(IpcChannel.SETTINGS_OPEN_CONFIRM_PROMPT, (e, message) =>
    ipcHandler.SETTINGS_OPEN_CONFIRM_PROMPT(message)
  );

  ipcMain.handle(IpcChannel.SETTINGS_OPEN_DIR_DIALOG, (e, currentDir, title) =>
    ipcHandler.SETTINGS_OPEN_DIR_DIALOG(currentDir, title)
  );

  ipcMain.handle(IpcChannel.SETTINGS_SAVE, (e, userPreferences) =>
    ipcHandler.SETTINGS_SAVE(userPreferences)
  );
};
