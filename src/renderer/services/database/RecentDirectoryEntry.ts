import { RecentDirectoryId } from "../../../common/Flavors";
import { db } from "./Database";
import { v4 as uuidv4 } from "uuid";

export const enum RecentDirectoryType {
  WORKING_DIRECTORY = "WORKING_DIRECTORY",
  PROJECT = "PROJECT",
}

export interface RecentDirectoryEntry {
  id: RecentDirectoryId;
  type: RecentDirectoryType;
  friendlyName: string;
  fileSystemDirectoryHandle: FileSystemDirectoryHandle;
}

export const getWorkingDirectory = async () =>
  db.recentDirectories.get({
    type: RecentDirectoryType.WORKING_DIRECTORY,
  });

export const putOrAddWorkingDirectory = async (
  fileSystemDirectoryHandle: FileSystemDirectoryHandle
) => {
  const newEntry: RecentDirectoryEntry = {
    id: uuidv4(),
    type: RecentDirectoryType.WORKING_DIRECTORY,
    friendlyName: fileSystemDirectoryHandle.name,
    fileSystemDirectoryHandle,
  };

  if (await getWorkingDirectory()) {
    await db.recentDirectories.put(newEntry);
  } else {
    await db.recentDirectories.add(newEntry);
  }

  return newEntry;
};
