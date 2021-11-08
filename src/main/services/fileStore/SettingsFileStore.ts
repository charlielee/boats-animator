import Conf from "conf/dist/source";
import { WindowSize } from "../../../common/WindowSize";
import { UserPreferencesState } from "../../../renderer/redux/bundles/userPreferences";
import FileStore from "./FileStore";

interface SettingsFileOptions {
  appWindowSize: WindowSize;
  userPreferences: UserPreferencesState;
}

const defaults: SettingsFileOptions = {
  appWindowSize: {
    isMaximized: false,
    winBounds: undefined,
  },
  userPreferences: {
    workingDirectory: undefined,
  },
};

const migrations = {
  "1.0.0-alpha": (store: Conf<SettingsFileOptions>) => {
    console.log("Migrating settings file to 1.0.0-alpha");
    store.clear();
  },
};

class SettingsFileStore extends FileStore<SettingsFileOptions> {
  constructor() {
    super({
      name: "settings",
      defaults,
      migrations,
    });
  }
}

export default SettingsFileStore;
