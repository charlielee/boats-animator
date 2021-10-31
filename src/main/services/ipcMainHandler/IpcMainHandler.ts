import { app, ipcMain } from "electron";
import { IpcApi, IpcChannel } from "../../../common/IpcApi";
import { PageRoute } from "../../../common/PageRoute";
import AppWindow from "../appWindow/AppWindow";

class IpcMainHandler implements IpcApi {
  constructor(private appWindow: AppWindow) {}

  [IpcChannel.APP_VERSION] = async () => app.getVersion() || "";

  [IpcChannel.APP_WINDOW_CHANGE_PAGE] = (pathname: PageRoute) =>
    this.appWindow.changePage(pathname);

  [IpcChannel.SETTINGS_OPEN_DIR_DIALOG] = (
    currentDir: string | undefined,
    title: string
  ) => this.appWindow.openDirDialog(currentDir, title);
}

export const addIpcMainHandlers = (appWindow: AppWindow) => {
  const ipcHandler = new IpcMainHandler(appWindow);

  ipcMain.handle(IpcChannel.APP_VERSION, (e) => ipcHandler.APP_VERSION());

  ipcMain.handle(IpcChannel.APP_WINDOW_CHANGE_PAGE, (e, pathname) =>
    ipcHandler.APP_WINDOW_CHANGE_PAGE(pathname)
  );

  ipcMain.handle(IpcChannel.SETTINGS_OPEN_DIR_DIALOG, (e, currentDir, title) =>
    ipcHandler.SETTINGS_OPEN_DIR_DIALOG(currentDir, title)
  );
};
