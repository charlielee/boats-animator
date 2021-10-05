import { contextBridge, ipcRenderer } from "electron";
import { APP_WINDOW_CHANGE_PAGE } from "../common/IpcChannelNames";
import { PreloadApi } from "../common/PreloadApi";

const api: PreloadApi = {
  platform: process.platform,
  ipc: {
    [APP_WINDOW_CHANGE_PAGE]: (pathname: string) =>
      ipcRenderer.invoke(APP_WINDOW_CHANGE_PAGE, pathname),
  },
};

contextBridge.exposeInMainWorld("preload", api);
