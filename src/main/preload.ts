import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("preload", {
  platform: process.platform,
});
