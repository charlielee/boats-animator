import { v4 as uuidv4 } from "uuid";
import * as RecentDirectoryEntry from "../services/database/RecentDirectoryEntry";
import FileManager from "../services/fileManager/FileManager";

export const mockOpenDirectoryDialog = (selectedDirectoryName: string) =>
  jest
    .spyOn(FileManager, "openDirectoryDialogHandleCancel")
    .mockImplementation(() => Promise.resolve({ name: selectedDirectoryName }) as any);

export const mockGetWorkingDirectory = () =>
  jest.spyOn(RecentDirectoryEntry, "getWorkingDirectory").mockImplementation(() =>
    Promise.resolve({
      id: uuidv4(),
      type: RecentDirectoryEntry.RecentDirectoryType.WORKING_DIRECTORY,
      friendlyName: "My Working Directory",
      handle: {
        name: "working-directory",
        getDirectoryHandle: () => ({ name: "project-directory" }),
      } as any,
    })
  );
