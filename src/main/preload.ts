import { contextBridge, ipcRenderer, shell } from "electron";
import { IpcChannel } from "../common/IpcChannel";
import { PreloadApi } from "../common/PreloadApi";
import { NewsResponsePost } from "../renderer/services/news/NewsResponse";

// This file controls access to the Electron and Node methods required by the renderer process
// https://www.electronjs.org/docs/tutorial/context-isolation
const api: PreloadApi = {
  platform: process.platform,
  appVersion: () => ipcRenderer.invoke(IpcChannel.APP_VERSION),
  ipc: {
    [IpcChannel.APP_WINDOW_CHANGE_PAGE]: (pathname: string) =>
      ipcRenderer.invoke(IpcChannel.APP_WINDOW_CHANGE_PAGE, pathname),
  },
  openExternal: {
    discord: () => shell.openExternal("http://discord.boatsanimator.com"),
    newsPost: (post: NewsResponsePost) => shell.openExternal(post.url),
    website: () =>
      shell.openExternal("https://www.charlielee.uk/boats-animator"),
  },
};

contextBridge.exposeInMainWorld("preload", api);
