import { app, ipcMain } from "electron";
import IpcApi, { IpcChannel } from "../../../common/IpcApi";
import { SettingsState } from "../../../renderer/redux/bundles/settings";
import AppWindow from "../appWindow/AppWindow";

class IpcMainHandler implements IpcApi {
  constructor(private appWindow: AppWindow) {}

  [IpcChannel.APP_VERSION] = async () => app.getVersion() || "";

  [IpcChannel.APP_WINDOW_GET_SIZE] = async () => ({
    isMaximized: false,
    // TODO
    winBounds: undefined,
  });

  [IpcChannel.SETTINGS_OPEN_CONFIRM_PROMPT] = (message: string) =>
    this.appWindow.openConfirmPrompt(message);

  [IpcChannel.SETTINGS_OPEN_DIR_DIALOG] = (
    currentDir: string | undefined,
    title: string
  ) => this.appWindow.openDirDialog(currentDir, title);

  [IpcChannel.SETTINGS_SAVE] = (settings: SettingsState) =>
    console.log("TODO:", settings);
}

export const addIpcMainHandlers = (appWindow: AppWindow) => {
  const ipcHandler = new IpcMainHandler(appWindow);

  ipcMain.handle(IpcChannel.APP_VERSION, (e) => ipcHandler.APP_VERSION());

  ipcMain.handle(IpcChannel.APP_WINDOW_GET_SIZE, (e) =>
    ipcHandler.APP_WINDOW_GET_SIZE()
  );

  ipcMain.handle(IpcChannel.SETTINGS_OPEN_CONFIRM_PROMPT, (e, message) =>
    ipcHandler.SETTINGS_OPEN_CONFIRM_PROMPT(message)
  );

  ipcMain.handle(IpcChannel.SETTINGS_OPEN_DIR_DIALOG, (e, currentDir, title) =>
    ipcHandler.SETTINGS_OPEN_DIR_DIALOG(currentDir, title)
  );

  ipcMain.handle(IpcChannel.SETTINGS_SAVE, (e, settings) =>
    ipcHandler.SETTINGS_SAVE(settings)
  );
};
