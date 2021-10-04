import { contextBridge } from "electron";

export type PreloadApi = {
  platform: string;
};

const api: PreloadApi = {
  platform: process.platform,
};

contextBridge.exposeInMainWorld("preload", api);
