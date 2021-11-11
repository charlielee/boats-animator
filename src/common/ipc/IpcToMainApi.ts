import { UserPreferences } from "../UserPreferences";

interface IpcToMainApi {
  appVersion: () => Promise<string>;
  getUserPreferences: () => Promise<UserPreferences>;
  saveSettingsAndClose: (userPreferences: UserPreferences) => void;
  settingsOpenConfirmPrompt: (message: string) => Promise<boolean>;
  settingsOpenDirDialog: (
    currentDir: string | undefined,
    title: string
  ) => Promise<string | undefined>;
}

export default IpcToMainApi;
