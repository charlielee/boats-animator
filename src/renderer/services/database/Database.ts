import Dexie, { Table } from "dexie";
import { RecentDirectoryId } from "../../../common/Flavors";
import { RecentDirectoryEntry } from "./RecentDirectoryEntry";

class Database extends Dexie {
  recentDirectories!: Table<RecentDirectoryEntry, RecentDirectoryId>;

  constructor() {
    super("BoatsAnimatorDatabase");
    this.version(1).stores({
      recentDirectories: "id, type, friendlyName, fileSystemDirectoryHandle",
    });
  }
}

export const db = new Database();
