import { ReactNode, useContext, useState } from "react";
import { ProjectFilesContext } from "./ProjectFilesContext";
import { FileInfo } from "../../services/fileManager/FileInfo";
import { FileManagerContext } from "../FileManagerContext/FileManagerContext";
import useProjectDirectory from "../../hooks/useProjectDirectory";
import { FileInfoId, TrackItemId } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import { makeTakeDirectoryName, makeFrameFileName } from "../../services/project/projectBuilder";
import { PROJECT_INFO_FILE_NAME, zeroPad } from "../../../common/utils";
import { FileInfoType } from "../../services/fileManager/FileInfo";
import {
  CURRENT_PROJECT_INFO_FILE_SCHEMA_VERSION,
  ProjectInfoFileV1,
} from "../../../common/project/ProjectInfoFile";
import { Project } from "../../../common/project/Project";

interface ProjectFilesContextProviderProps {
  children: ReactNode;
}

export const ProjectFilesContextProvider = ({ children }: ProjectFilesContextProviderProps) => {
  const { fileManager } = useContext(FileManagerContext);
  const projectDirectory = useProjectDirectory();
  if (fileManager === undefined) {
    throw "Missing fileManager";
  }
  const [trackItemFiles, setTrackItemFiles] = useState<Record<TrackItemId, FileInfoId>>({});

  const saveTrackItemToDisk = async (
    take: Take,
    trackItem: TrackItem,
    data: Blob
  ): Promise<void> => {
    if (projectDirectory === undefined) {
      throw "Missing projectDirectory";
    }

    const takeDirectoryName = makeTakeDirectoryName(take);
    const takeDirectoryHandle = await fileManager.current.createDirectory(
      takeDirectoryName,
      projectDirectory.handle
    );
    const frameFileName = makeFrameFileName(take, zeroPad(trackItem.fileNumber, 5));
    const { fileInfoId } = await fileManager.current.createFile(
      frameFileName,
      takeDirectoryHandle,
      FileInfoType.FRAME,
      data
    );
    setTrackItemFiles((p) => ({ ...p, [trackItem.id]: fileInfoId }));
  };

  const getTrackItemFileInfo = (trackItemId: TrackItemId): FileInfo | undefined =>
    fileManager.current.findFile(trackItemFiles[trackItemId]);

  const saveProjectJsonToDisk = async (project: Project, takes: Take[]): Promise<void> => {
    if (projectDirectory === undefined) {
      throw "Missing projectDirectory";
    }

    const appVersion = await window.preload.ipcToMain.appVersion();
    const projectFileJson: ProjectInfoFileV1 = {
      schemaVersion: CURRENT_PROJECT_INFO_FILE_SCHEMA_VERSION,
      appVersion,
      project,
      takes,
    };
    const profileFileString = JSON.stringify(projectFileJson);
    const data = new Blob([profileFileString], { type: "application/json" });

    await fileManager.current.createFile(
      PROJECT_INFO_FILE_NAME,
      projectDirectory.handle,
      FileInfoType.PROJECT_INFO,
      data
    );
  };

  return (
    <ProjectFilesContext.Provider
      value={{ saveTrackItemToDisk, getTrackItemFileInfo, saveProjectJsonToDisk }}
    >
      {children}
    </ProjectFilesContext.Provider>
  );
};
