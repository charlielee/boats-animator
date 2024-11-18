import { ReactNode, useContext, useEffect, useState } from "react";
import { ProjectFilesContext } from "./ProjectFilesContext";
import { FileInfo } from "../FileManagerContext/FileInfo";
import { FileManagerContext } from "../FileManagerContext/FileManagerContext";
import useProjectDirectory from "../../hooks/useProjectDirectory";
import { FileInfoId, TrackItemId } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import {
  makeTakeDirectoryName,
  makeProjectInfoFileJson,
} from "../../services/project/projectBuilder";
import { PROJECT_INFO_FILE_NAME } from "../../../common/utils";
import { FileInfoType } from "../FileManagerContext/FileInfo";

import { Project } from "../../../common/project/Project";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as rLogger from "../../services/rLogger/rLogger";
import { removeFrameTrackItem } from "../../redux/slices/projectSlice";

interface ProjectFilesContextProviderProps {
  children: ReactNode;
}

export const ProjectFilesContextProvider = ({ children }: ProjectFilesContextProviderProps) => {
  const fileManager = useContext(FileManagerContext);

  const projectDirectory = useProjectDirectory();
  const { project, take } = useSelector((state: RootState) => state.project);
  const appVersion = useSelector((state: RootState) => state.app.appVersion);
  const dispatch = useDispatch();

  const [projectInfoFileId, setProjectInfoFileId] = useState<FileInfoId | undefined>(undefined);
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
    const takeDirectoryHandle = await fileManager?.createDirectory(
      takeDirectoryName,
      projectDirectory.handle
    );
    if (takeDirectoryHandle === undefined) {
      throw "Unable to create take directory handle";
    }

    const fileInfoId = await fileManager?.createFile!(
      trackItem.fileName,
      takeDirectoryHandle,
      FileInfoType.FRAME,
      data
    );
    if (fileInfoId === undefined) {
      throw "Unable to create track item fileInfo";
    }

    setTrackItemFiles((p) => ({ ...p, [trackItem.id]: fileInfoId }));
  };

  const getTrackItemFileInfo = (trackItemId: TrackItemId): FileInfo | undefined =>
    fileManager?.findFile!(trackItemFiles[trackItemId]);

  const deleteTrackItem = async (trackItemId: TrackItemId): Promise<void> => {
    await fileManager?.deleteFile(trackItemFiles[trackItemId]);
    setTrackItemFiles(({ [trackItemId]: _, ...otherTrackItemFiles }) => otherTrackItemFiles);
    // todo should redux happen here
    dispatch(removeFrameTrackItem(trackItemId));
  };

  const updateProjectAndTakeLastSaved = (project: Project, take: Take): [Project, Take[]] => {
    const lastSaved = new Date().toISOString();
    const updatedProject: Project = { ...project, lastSaved };
    const updatedTake: Take = { ...take, lastSaved };
    return [updatedProject, [updatedTake]];
  };

  const saveProjectInfoFileToDisk = async (project: Project, takes: Take[]): Promise<void> => {
    rLogger.info("projectFilesContext.saveProject", "Saving project info file to disk");
    if (projectDirectory === undefined) {
      throw "Unable to save project file info as missing projectDirectory";
    }

    const projectFileJson = await makeProjectInfoFileJson(appVersion, project, takes);
    const profileFileString = JSON.stringify(projectFileJson);
    const data = new Blob([profileFileString], { type: "application/json" });

    if (projectInfoFileId) {
      rLogger.info(
        "projectFilesContext.saveProject.update",
        `Updating project info file ${projectInfoFileId}`
      );
      await fileManager?.updateFile(projectInfoFileId, data);
    } else {
      rLogger.info(
        "projectFilesContext.saveProject.create",
        `Creating new project info file in ${projectDirectory.handle.name}`
      );
      const fileInfoId = await fileManager?.createFile(
        PROJECT_INFO_FILE_NAME,
        projectDirectory.handle,
        FileInfoType.PROJECT_INFO,
        data
      );
      if (fileInfoId === undefined) {
        throw "Unable to create project info file";
      }
      setProjectInfoFileId(fileInfoId);
    }
  };

  useEffect(() => {
    if (projectDirectory !== undefined && project !== undefined && take !== undefined) {
      const [updatedProject, updatedTakes] = updateProjectAndTakeLastSaved(project, take);
      saveProjectInfoFileToDisk!(updatedProject, updatedTakes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, take, projectDirectory]);

  return (
    <ProjectFilesContext.Provider
      value={{ saveTrackItemToDisk, getTrackItemFileInfo, deleteTrackItem }}
    >
      {children}
    </ProjectFilesContext.Provider>
  );
};
