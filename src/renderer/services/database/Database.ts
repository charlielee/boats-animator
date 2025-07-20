import Dexie, { Table } from "dexie";
import { PersistedDirectoryEntry } from "./PersistedDirectoryEntry";
import { PersistedDirectoryId } from "../Flavors";

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
