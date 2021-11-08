import Conf from "conf/dist/source";
import Store from "electron-store";
import { WindowSize } from "../../../common/WindowSize";
import { UserPreferencesState } from "../../../renderer/redux/bundles/userPreferences";

interface SettingsFileOptions {
  appWindowSize: WindowSize;
  userPreferences: UserPreferencesState;
}

const initialState: SettingsFileOptions = {
  appWindowSize: {
    isMaximized: false,
    winBounds: undefined,
  },
  userPreferences: {
    workingDirectory: undefined,
  },
};

// To test migrations delete the "__internal__" block from the settings.json file
// located in your Boats Animator appData directory
const migrations = {
  "1.0.0-alpha": (store: Conf<SettingsFileOptions>) => {
    console.log("Migrating settings file to 1.0.0-alpha");
    store.clear();
  },
};

class SettingsFile {
  private store: Store<SettingsFileOptions>;

  constructor() {
    this.store = new Store<SettingsFileOptions>({
      name: "settings",
      defaults: initialState,
      migrations: migrations,
    });
  }

  save(windowSize: WindowSize, userPreferences: UserPreferencesState) {
    console.log("TODO:");
    console.log(windowSize);
    console.log(userPreferences);
  }
}

export default SettingsFile;
