import { contextBridge, ipcRenderer, shell } from "electron";
import IpcChannel from "../common/ipc/IpcChannel";
import { UserPreferences } from "../common/UserPreferences";
import { NewsResponsePost } from "../renderer/services/news/NewsResponse";
import { PreloadApi } from "./PreloadApi";

// This file controls access to the Electron and Node methods required by the renderer process
// https://www.electronjs.org/docs/tutorial/context-isolation
const api: PreloadApi = {
  platform: process.platform,
  ipcToMain: {
    appVersion: () => ipcRenderer.invoke(IpcChannel.APP_VERSION),

    getUserPreferences: () =>
      ipcRenderer.invoke(IpcChannel.GET_USER_PREFERENCES),

    saveSettingsAndClose: (userPreferences: UserPreferences) =>
      ipcRenderer.invoke(IpcChannel.SAVE_SETTINGS_AND_CLOSE, userPreferences),

    openConfirmPrompt: (message: string) =>
      ipcRenderer.invoke(IpcChannel.OPEN_CONFIRM_PROMPT, message),

    openDirDialog: (currentDir: string | undefined, title: string) =>
      ipcRenderer.invoke(IpcChannel.OPEN_DIR_DIALOG, currentDir, title),
  },
  ipcToRenderer: {
    onCloseButtonClick: (callback: () => void) =>
      ipcRenderer.on(IpcChannel.ON_CLOSE_BUTTON_CLICK, callback),
  },
  openExternal: {
    discord: () => shell.openExternal("http://discord.boatsanimator.com"),
    newsPost: (post: NewsResponsePost) => shell.openExternal(post.url),
    website: () =>
      shell.openExternal("https://www.charlielee.uk/boats-animator"),
  },
};

contextBridge.exposeInMainWorld("preload", api);
