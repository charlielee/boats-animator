import Dexie, { Table } from "dexie";
import { PersistedDirectoryId } from "../../../common/Flavors";
import { PersistedDirectoryEntry } from "./PersistedDirectoryEntry";

class Database extends Dexie {
  persistedDirectories!: Table<PersistedDirectoryEntry, PersistedDirectoryId>;

  constructor() {
    super("BoatsAnimatorDatabase");
    this.version(1).stores({
      persistedDirectories: "id, type, friendlyName, fileSystemDirectoryHandle",
    });
  }
}

export const db = new Database();
