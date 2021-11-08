import { Serialize } from "conf/dist/source/types";
import Store from "electron-store";

class FileStore<OptionsType> {
  private store: Store<OptionsType>;

  constructor(options: Store.Options<OptionsType> | undefined) {
    this.store = new Store<OptionsType>({
      ...options,
      serialize: this.minifyJson,
    });
  }

  // To test migrations delete the "__internal__" block from the settings.json file
  // located in your Boats Animator appData directory
  // private migrationsWithLogging:

  public get(): OptionsType {
    return this.store.store;
  }

  public save(options: OptionsType) {
    this.store.set(options);
  }

  private minifyJson: Serialize<OptionsType> = (value) =>
    JSON.stringify(value, undefined);
}

export default FileStore;
