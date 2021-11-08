import { app, ipcMain } from "electron";
import IpcApi, { IpcChannel } from "../../../common/IpcApi";
import { UserPreferencesState } from "../../../renderer/redux/bundles/userPreferences";
import AppWindow from "../appWindow/AppWindow";
import SettingsFile from "../settingsFile/settingsFile";

class IpcMainHandler implements IpcApi {
  constructor(
    private appWindow: AppWindow,
    private settingsFile: SettingsFile
  ) {}

  [IpcChannel.APP_VERSION] = async () => app.getVersion() || "";

  [IpcChannel.SETTINGS_OPEN_CONFIRM_PROMPT] = (message: string) =>
    this.appWindow.openConfirmPrompt(message);

  [IpcChannel.SETTINGS_OPEN_DIR_DIALOG] = (
    currentDir: string | undefined,
    title: string
  ) => this.appWindow.openDirDialog(currentDir, title);

  [IpcChannel.SETTINGS_SAVE] = (userPreferences: UserPreferencesState) => {
    const windowSize = this.appWindow.getWindowSize();
    this.settingsFile.save(windowSize, userPreferences);
  };
}

export const addIpcMainHandlers = (
  appWindow: AppWindow,
  settingsFile: SettingsFile
) => {
  const ipcHandler = new IpcMainHandler(appWindow, settingsFile);

  ipcMain.handle(IpcChannel.APP_VERSION, (e) => ipcHandler.APP_VERSION());

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
