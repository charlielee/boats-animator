import { NewsResponsePost } from "../renderer/services/news/NewsResponse";
import { IpcChannel } from "./IpcChannel";

export interface PreloadApi {
  platform: string;
  appVersion: string;
  ipc: {
    [IpcChannel.APP_WINDOW_CHANGE_PAGE]: (pathname: string) => Promise<void>;
  };
  openExternal: {
    discord: () => Promise<void>;
    newsPost: (post: NewsResponsePost) => Promise<void>;
    website: () => Promise<void>;
  };
}
