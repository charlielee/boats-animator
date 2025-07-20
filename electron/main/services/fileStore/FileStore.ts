import Conf from "conf/dist/source";
import { Migrations, Serialize } from "conf/dist/source/types";
import Store from "electron-store";

class FileStore<OptionsType extends Record<string, any>> {
  private store: Store<OptionsType>;

  constructor(options: Store.Options<OptionsType> | undefined = {}) {
    const { name = "config", migrations = {} } = options;

    this.store = new Store<OptionsType>({
      ...options,
      migrations: this.migrationsWithLogging(name, migrations),
      serialize: this.minifyJson,
    });
  }

  public get(): OptionsType {
    return this.store.store;
  }

  public save(options: OptionsType) {
    this.store.set(options);
  }

  // To test migrations delete the "__internal__" block from the settings.json file
  // located in your Boats Animator appData directory
  private migrationsWithLogging(name: string, migrations: Migrations<OptionsType>) {
    const loggedMigrations: Migrations<OptionsType> = {};

    Object.keys(migrations).forEach((version: string) => {
      loggedMigrations[version] = (store: Conf<OptionsType>) => {
        // Can't use logger for this as it isn't initialized when the migrations are run
        // eslint-disable-next-line no-console
        console.log(`Migrating ${name} file to ${version}`);
        migrations[version](store);
      };
    });

    return loggedMigrations;
  }

  private minifyJson: Serialize<OptionsType> = (value) => JSON.stringify(value, undefined);
}

export default FileStore;
