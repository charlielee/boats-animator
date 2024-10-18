import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { ProjectFilesContext } from "./ProjectFilesContext";
import { FileInfo } from "../../services/fileManager/FileInfo";
import { FileManagerContext } from "../FileManagerContext/FileManagerContext";
import useProjectDirectory from "../../hooks/useProjectDirectory";
import { FileInfoId, TrackItemId } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import {
  makeTakeDirectoryName,
  makeFrameFileName,
  makeProjectInfoFileJson,
} from "../../services/project/projectBuilder";
import { PROJECT_INFO_FILE_NAME, zeroPad } from "../../../common/utils";
import { FileInfoType } from "../../services/fileManager/FileInfo";

import { Project } from "../../../common/project/Project";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as rLogger from "../../services/rLogger/rLogger";

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

  const { project, take } = useSelector((state: RootState) => state.project);

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

  const saveProjectInfoFileToDisk = useCallback(
    async (project: Project, takes: Take[]): Promise<void> => {
      rLogger.info("projectFilesContext.saveProject", "Saving project json to disk");
      if (projectDirectory === undefined) {
        throw "Missing projectDirectory";
      }

      const projectFileJson = makeProjectInfoFileJson(project, takes);
      const profileFileString = JSON.stringify(projectFileJson);
      const data = new Blob([profileFileString], { type: "application/json" });

      // TODO error handling
      await fileManager.current.createFile(
        PROJECT_INFO_FILE_NAME,
        projectDirectory.handle,
        FileInfoType.PROJECT_INFO,
        data,
        false
      );
    },
    [fileManager, projectDirectory]
  );

  useEffect(() => {
    if (projectDirectory !== undefined && project !== undefined && take !== undefined) {
      saveProjectInfoFileToDisk!(project, [take]);
    }
  }, [project, take, saveProjectInfoFileToDisk, projectDirectory]);

  return (
    <ProjectFilesContext.Provider value={{ saveTrackItemToDisk, getTrackItemFileInfo }}>
      {children}
    </ProjectFilesContext.Provider>
  );
};
