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
  handle: FileSystemDirectoryHandle;
}

export const getWorkingDirectoryEntry = async () =>
  db.recentDirectories.get({
    type: RecentDirectoryType.WORKING_DIRECTORY,
  });

export const putOrAddWorkingDirectoryEntry = async (handle: FileSystemDirectoryHandle) => {
  const workingDirectory = await getWorkingDirectoryEntry();
  const newEntry: RecentDirectoryEntry = {
    id: workingDirectory?.id ?? uuidv4(),
    type: RecentDirectoryType.WORKING_DIRECTORY,
    friendlyName: handle.name,
    handle,
  };

  await db.recentDirectories.put(newEntry);

  return newEntry;
};

export const addProjectDirectoryEntry = async (
  friendlyName: string,
  handle: FileSystemDirectoryHandle
) => {
  const recentDirectoryEntry: RecentDirectoryEntry = {
    id: uuidv4(),
    type: RecentDirectoryType.PROJECT,
    friendlyName,
    handle,
  };
  await db.recentDirectories.add(recentDirectoryEntry);
  return recentDirectoryEntry;
};
