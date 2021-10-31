import { SettingsState } from "../renderer/redux/bundles/settings";
import { PageRoute } from "./PageRoute";

export const enum IpcChannel {
  APP_VERSION = "APP_VERSION",
  APP_WINDOW_CHANGE_PAGE = "APP_WINDOW_CHANGE_PAGE",
  SETTINGS_OPEN_CONFIRM_PROMPT = "SETTINGS_OPEN_CONFIRM_PROMPT",
  SETTINGS_OPEN_DIR_DIALOG = "SETTINGS_OPEN_DIR_DIALOG",
  SETTINGS_SAVE = "SETTINGS_SAVE",
}

interface IpcApi {
  [IpcChannel.APP_VERSION]: () => Promise<string>;
  [IpcChannel.APP_WINDOW_CHANGE_PAGE]: (pathname: PageRoute) => void;
  [IpcChannel.SETTINGS_OPEN_CONFIRM_PROMPT]: (
    message: string
  ) => Promise<boolean>;
  [IpcChannel.SETTINGS_OPEN_DIR_DIALOG]: (
    currentDir: string | undefined,
    title: string
  ) => Promise<string | undefined>;
  [IpcChannel.SETTINGS_SAVE]: (settings: SettingsState) => void;
}

export default IpcApi;
