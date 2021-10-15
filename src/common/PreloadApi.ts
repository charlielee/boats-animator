import { IpcChannel } from "./IpcChannel";

export interface PreloadApi {
  platform: string;
  appVersion: string;
  ipc: {
    [IpcChannel.APP_WINDOW_CHANGE_PAGE]: (pathname: string) => Promise<void>;
  };
  openExternal: {
    discord: () => Promise<void>;
    website: () => Promise<void>;
  };
}
