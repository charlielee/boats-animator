import IpcToMainApi from "../common/ipc/IpcToMainApi";
import IpcToRendererApi from "../common/ipc/IpcToRendererApi";
import { NewsResponsePost } from "../renderer/services/news/NewsResponse";

export interface PreloadApi {
  platform: string;
  ipcToMain: IpcToMainApi;
  ipcToRenderer: IpcToRendererApi;
  openExternal: {
    discord: () => Promise<void>;
    newsPost: (post: NewsResponsePost) => Promise<void>;
    website: () => Promise<void>;
  };
}
