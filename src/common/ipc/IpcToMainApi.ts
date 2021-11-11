import { UserPreferences } from "../UserPreferences";

interface IpcToMainApi {
  appVersion: () => Promise<string>;
  getUserPreferences: () => Promise<UserPreferences>;
  settingsOpenConfirmPrompt: (message: string) => Promise<boolean>;
  settingsOpenDirDialog: (
    currentDir: string | undefined,
    title: string
  ) => Promise<string | undefined>;
  settingsSave: (userPreferences: UserPreferences) => void;
}

export default IpcToMainApi;
