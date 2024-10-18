import { ReactNode, useContext } from "react";
import { RecentDirectoriesContext } from "./RecentDirectoriesContext";
// import useProjectDirectory from "../../hooks/useProjectDirectory";
// import useWorkingDirectory from "../../hooks/useWorkingDirectory";
import { FileManagerContext } from "../FileManagerContext/FileManagerContext";
import {
  addProjectDirectoryEntry,
  putOrAddWorkingDirectoryEntry,
  RecentDirectoryEntry,
} from "../../services/database/RecentDirectoryEntry";
import useWorkingDirectory from "../../hooks/useWorkingDirectory";
import { Project } from "../../../common/project/Project";
import { makeProjectDirectoryName } from "../../services/project/projectBuilder";

interface RecentDirectoriesContextProviderProps {
  children: ReactNode;
}

export const RecentDirectoriesContextProvider = ({
  children,
}: RecentDirectoriesContextProviderProps) => {
  const workingDirectory = useWorkingDirectory();

  const { fileManager } = useContext(FileManagerContext);
  if (fileManager === undefined) {
    throw "FileManagerContext was not found";
  }

  const changeWorkingDirectory = async (): Promise<void> => {
    const workingDirectoryHandle =
      await fileManager.current.openDirectoryDialog("changeWorkingDirectory");

    if (workingDirectoryHandle !== undefined) {
      await putOrAddWorkingDirectoryEntry(workingDirectoryHandle);
    }
  };

  const addProjectDirectory = async (project: Project): Promise<RecentDirectoryEntry> => {
    if (workingDirectory === undefined) {
      throw "workingDirectory was not found";
    }

    const projectDirectoryName = makeProjectDirectoryName(project);
    const handle = await fileManager.current.createDirectory(
      projectDirectoryName,
      workingDirectory.handle
    );

    return addProjectDirectoryEntry(project.name, handle);
  };

  return (
    <RecentDirectoriesContext.Provider value={{ changeWorkingDirectory, addProjectDirectory }}>
      {children}
    </RecentDirectoriesContext.Provider>
  );
};
