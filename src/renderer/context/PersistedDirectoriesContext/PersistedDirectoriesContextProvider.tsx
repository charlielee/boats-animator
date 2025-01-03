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
import { PROJECT_DIRECTORY_EXTENSION, PROJECT_INFO_FILE_NAME } from "../../../common/utils";
import { ProjectDirectoryIsInsideAnotherProjectError } from "./PersistedDirectoriesErrors";
import { makeProjectInfoFileBlob, makeTake } from "../../services/project/projectBuilder";
import { FileInfoType } from "../../services/fileManager/FileInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface PersistedDirectoriesContextProviderProps {
  children: ReactNode;
}

export const PersistedDirectoriesContextProvider = ({
  children,
}: PersistedDirectoriesContextProviderProps) => {
  const appVersion = useSelector((state: RootState) => state.app.appVersion);

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

  const addNewProjectInfoFile = async (
    projectDirectory: PersistedDirectoryEntry,
    project: Project
  ): Promise<void> => {
    const take = makeTake({
      shotNumber: 1,
      takeNumber: 1,
      frameRate: project.projectFrameRate,
    });
    const data = await makeProjectInfoFileBlob(appVersion, project, [take]);

    const fileInfoId = await fileManager?.createFile(
      project.fileInfoId,
      PROJECT_INFO_FILE_NAME,
      projectDirectory.handle,
      FileInfoType.PROJECT_INFO,
      data
    );
    if (fileInfoId === undefined) {
      throw "Unable to create project info file";
    }
  };

  return (
    <PersistedDirectoriesContext.Provider
      value={{ changeWorkingDirectory, addProjectDirectory, addNewProjectInfoFile }}
    >
      {children}
    </PersistedDirectoriesContext.Provider>
  );
};
