import { UserPreferences } from "../UserPreferences";

interface IpcToMainApi {
  appVersion: () => Promise<string>;
  getUserPreferences: () => Promise<UserPreferences>;
  saveSettingsAndClose: (userPreferences: UserPreferences) => void;
  openConfirmPrompt: (message: string) => Promise<boolean>;
  openDirDialog: (
    currentDir: string | undefined,
    title: string
  ) => Promise<string | undefined>;
}

export default IpcToMainApi;
