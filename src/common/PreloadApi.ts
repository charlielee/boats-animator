import { APP_WINDOW_CHANGE_PAGE } from "./IpcChannelNames";

export interface PreloadApi {
  platform: string;
  appVersion: string;
  ipc: {
    [APP_WINDOW_CHANGE_PAGE]: (pathname: string) => Promise<void>;
  };
}
