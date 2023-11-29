import Dexie, { Table } from "dexie";
import { ProjectId } from "../../../common/Flavors";
import { RecentProjectEntry } from "./RecentProjectEntry";

class Database extends Dexie {
  recentProjects!: Table<RecentProjectEntry, ProjectId>;

  constructor() {
    super("BoatsAnimatorDatabase");
    this.version(1).stores({
      recentProjects: "+id, name, fileSystemDirectoryHandle",
    });
  }
}

export const db = new Database();
