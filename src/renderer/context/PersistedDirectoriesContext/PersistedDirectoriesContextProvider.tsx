import { ReactNode, useContext } from "react";
import { PersistedDirectoriesContext } from "./PersistedDirectoriesContext";
import { FileManagerContext } from "../FileManagerContext/FileManagerContext";
import {
  addProjectDirectoryEntry,
  putOrAddWorkingDirectoryEntry,
  PersistedDirectoryEntry,
} from "../../services/database/PersistedDirectoryEntry";
import useWorkingDirectory from "../../hooks/useWorkingDirectory";
import { Project } from "../../../common/project/Project";
import { PROJECT_DIRECTORY_EXTENSION } from "../../../common/utils";
import { ProjectDirectoryIsInsideAnotherProjectError } from "./PersistedDirectoriesErrors";

interface PersistedDirectoriesContextProviderProps {
  children: ReactNode;
}

export const PersistedDirectoriesContextProvider = ({
  children,
}: PersistedDirectoriesContextProviderProps) => {
  const workingDirectory = useWorkingDirectory();

  const fileManager = useContext(FileManagerContext);

  const changeWorkingDirectory = async (): Promise<void> => {
    const workingDirectoryHandle = await fileManager?.openDirectoryDialog("changeWorkingDirectory");

    if (workingDirectoryHandle !== undefined) {
      await putOrAddWorkingDirectoryEntry(workingDirectoryHandle);
    }
  };

  const addProjectDirectory = async (project: Project): Promise<PersistedDirectoryEntry> => {
    if (workingDirectory === undefined) {
      throw "workingDirectory was not found";
    }
    if (workingDirectory.handle.name.endsWith(`.${PROJECT_DIRECTORY_EXTENSION}`)) {
      throw new ProjectDirectoryIsInsideAnotherProjectError(workingDirectory.handle.name);
    }

    const handle = await fileManager?.createDirectory(
      project.directoryName,
      workingDirectory.handle,
      true
    );
    if (handle === undefined) {
      throw "Unable to create project directory";
    }

    return addProjectDirectoryEntry(project.name, handle);
  };

  return (
    <PersistedDirectoriesContext.Provider value={{ changeWorkingDirectory, addProjectDirectory }}>
      {children}
    </PersistedDirectoriesContext.Provider>
  );
};
