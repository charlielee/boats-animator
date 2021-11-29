import { ipcRenderer, IpcRendererEvent } from "electron";
import IpcChannel from "../common/ipc/IpcChannel";

export const setListener = <T>(
  channel: IpcChannel,
  callback: (payload: T) => void
) => {
  const subscription = (_event: IpcRendererEvent, payload: T) =>
    callback(payload);
  ipcRenderer.on(channel, subscription);

  return () => {
    ipcRenderer.removeListener(channel, subscription);
  };
};
