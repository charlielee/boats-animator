import { contextBridge, ipcRenderer, shell } from "electron";
import { IpcChannel } from "../common/IpcApi";
import { PreloadApi } from "../common/PreloadApi";
import { SettingsState } from "../renderer/redux/bundles/settings";
import { NewsResponsePost } from "../renderer/services/news/NewsResponse";

// This file controls access to the Electron and Node methods required by the renderer process
// https://www.electronjs.org/docs/tutorial/context-isolation
const api: PreloadApi = {
  platform: process.platform,
  ipc: {
    [IpcChannel.APP_VERSION]: () => ipcRenderer.invoke(IpcChannel.APP_VERSION),

    [IpcChannel.APP_WINDOW_GET_SIZE]: () =>
      ipcRenderer.invoke(IpcChannel.APP_WINDOW_GET_SIZE),

    [IpcChannel.SETTINGS_OPEN_CONFIRM_PROMPT]: (message: string) =>
      ipcRenderer.invoke(IpcChannel.SETTINGS_OPEN_CONFIRM_PROMPT, message),

    [IpcChannel.SETTINGS_OPEN_DIR_DIALOG]: (
      currentDir: string | undefined,
      title: string
    ) =>
      ipcRenderer.invoke(
        IpcChannel.SETTINGS_OPEN_DIR_DIALOG,
        currentDir,
        title
      ),

    [IpcChannel.SETTINGS_SAVE]: (settings: SettingsState) =>
      ipcRenderer.invoke(IpcChannel.SETTINGS_SAVE, settings),
  },
  openExternal: {
    discord: () => shell.openExternal("http://discord.boatsanimator.com"),
    newsPost: (post: NewsResponsePost) => shell.openExternal(post.url),
    website: () =>
      shell.openExternal("https://www.charlielee.uk/boats-animator"),
  },
};

contextBridge.exposeInMainWorld("preload", api);
