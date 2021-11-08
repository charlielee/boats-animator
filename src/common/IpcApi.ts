import { UserPreferencesState } from "../renderer/redux/bundles/userPreferences";

export const enum IpcChannel {
  APP_VERSION = "APP_VERSION",
  GET_USER_PREFERENCES = "GET_USER_PREFERENCES",
  SETTINGS_OPEN_CONFIRM_PROMPT = "SETTINGS_OPEN_CONFIRM_PROMPT",
  SETTINGS_OPEN_DIR_DIALOG = "SETTINGS_OPEN_DIR_DIALOG",
  SETTINGS_SAVE = "SETTINGS_SAVE",
}

interface IpcApi {
  [IpcChannel.APP_VERSION]: () => Promise<string>;
  [IpcChannel.GET_USER_PREFERENCES]: () => Promise<UserPreferencesState>;
  [IpcChannel.SETTINGS_OPEN_CONFIRM_PROMPT]: (
    message: string
  ) => Promise<boolean>;
  [IpcChannel.SETTINGS_OPEN_DIR_DIALOG]: (
    currentDir: string | undefined,
    title: string
  ) => Promise<string | undefined>;
  [IpcChannel.SETTINGS_SAVE]: (userPreferences: UserPreferencesState) => void;
}

export default IpcApi;
