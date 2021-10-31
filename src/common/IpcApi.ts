import { PageRoute } from "./PageRoute";

export const enum IpcChannel {
  APP_VERSION = "APP_VERSION",
  APP_WINDOW_CHANGE_PAGE = "APP_WINDOW_CHANGE_PAGE",
  SETTINGS_OPEN_DIR_DIALOG = "SETTINGS_OPEN_DIR_DIALOG",
}

export interface IpcApi {
  [IpcChannel.APP_VERSION]: () => Promise<string>;
  [IpcChannel.APP_WINDOW_CHANGE_PAGE]: (pathname: PageRoute) => void;
  [IpcChannel.SETTINGS_OPEN_DIR_DIALOG]: (
    currentDir: string | undefined,
    title: string
  ) => Promise<string | undefined>;
}
