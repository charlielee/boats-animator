import { NewsResponsePost } from "../renderer/services/news/NewsResponse";
import IpcApi from "./IpcApi";

export interface PreloadApi {
  platform: string;
  ipc: IpcApi;
  openExternal: {
    discord: () => Promise<void>;
    newsPost: (post: NewsResponsePost) => Promise<void>;
    website: () => Promise<void>;
  };
}
