import IpcToMainApi from "../common/ipc/IpcToMainApi";
import { NewsResponsePost } from "../renderer/services/news/NewsResponse";

export interface PreloadApi {
  platform: string;
  ipcToMain: IpcToMainApi;
  openExternal: {
    discord: () => Promise<void>;
    newsPost: (post: NewsResponsePost) => Promise<void>;
    website: () => Promise<void>;
  };
}
