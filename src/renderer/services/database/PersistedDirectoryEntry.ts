import { PersistedDirectoryId } from "../../../common/Flavors";
import { db } from "./Database";
import { v4 as uuidv4 } from "uuid";

export const enum PersistedDirectoryType {
  WORKING_DIRECTORY = "WORKING_DIRECTORY",
  PROJECT = "PROJECT",
}

export interface PersistedDirectoryEntry {
  id: PersistedDirectoryId;
  type: PersistedDirectoryType;
  friendlyName: string;
  handle: FileSystemDirectoryHandle;
}

const getWorkingDirectoryEntry = async () =>
  db.persistedDirectories.get({
    type: PersistedDirectoryType.WORKING_DIRECTORY,
  });

export const putOrAddWorkingDirectoryEntry = async (handle: FileSystemDirectoryHandle) => {
  const workingDirectory = await getWorkingDirectoryEntry();
  const newEntry: PersistedDirectoryEntry = {
    id: workingDirectory?.id ?? uuidv4(),
    type: PersistedDirectoryType.WORKING_DIRECTORY,
    friendlyName: handle.name,
    handle,
  };

  await db.persistedDirectories.put(newEntry);

  return newEntry;
};

export const addProjectDirectoryEntry = async (
  friendlyName: string,
  handle: FileSystemDirectoryHandle
) => {
  const persistedDirectoryEntry: PersistedDirectoryEntry = {
    id: uuidv4(),
    type: PersistedDirectoryType.PROJECT,
    friendlyName,
    handle,
  };
  await db.persistedDirectories.add(persistedDirectoryEntry);
  return persistedDirectoryEntry;
};
