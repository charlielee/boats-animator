import Conf from "conf/dist/source";
import { defaultUserPreferences, UserPreferences } from "../../../common/UserPreferences";
import { WindowSize } from "../windowUtils/WindowSize";
import FileStore from "./FileStore";

interface SettingsFileOptions {
  appWindowSize: WindowSize;
  userPreferences: UserPreferences;
}

const defaults: SettingsFileOptions = {
  appWindowSize: {
    isMaximized: false,
    winBounds: undefined,
  },
  userPreferences: defaultUserPreferences,
};

const migrations = {
  "2.0.0-alpha.1": (store: Conf<SettingsFileOptions>) => {
    store.clear();
  },
};

class SettingsFileStore extends FileStore<SettingsFileOptions> {
  constructor() {
    super({
      name: "settings",
      clearInvalidConfig: true,
      defaults,
      migrations,
    });
  }
}

export const settingsFileStore = new SettingsFileStore();

export default SettingsFileStore;
