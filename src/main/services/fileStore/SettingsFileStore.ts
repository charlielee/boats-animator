import Conf from "conf/dist/source";
import { defaultUserPreferences, UserPreferences } from "../../../common/UserPreferences";
import { WindowSize } from "../../../common/WindowSize";
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
  "1.0.0-alpha": (store: Conf<SettingsFileOptions>) => {
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
