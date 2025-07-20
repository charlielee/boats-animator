import { ReactNode, useContext, useEffect } from "react";
import useProjectDirectory from "../../hooks/useProjectDirectory";
import { FileInfoType } from "../../services/fileManager/FileInfo";
import {
  makeProjectInfoFileJson,
  makeTakeDirectoryName,
} from "../../services/project/projectBuilder";
import { FileManagerContext } from "../FileManagerContext/FileManagerContext";
import { ProjectFilesContext } from "./ProjectFilesContext";

import { useDispatch, useSelector } from "react-redux";
import { addFrameTrackItem, removeFrameTrackItem } from "../../redux/slices/projectSlice";
import { RootState } from "../../redux/store";
import * as rLogger from "../../services/rLogger/rLogger";
import { Project } from "../../services/project/types";
import { Take } from "../../services/project/types";
import { TrackItem } from "../../services/project/types";
import { PROJECT_INFO_FILE_NAME } from "../../services/utils";

interface ProjectFilesContextProviderProps {
  children: ReactNode;
}

export const ProjectFilesContextProvider = ({ children }: ProjectFilesContextProviderProps) => {
  const fileManager = useContext(FileManagerContext);

  const projectDirectory = useProjectDirectory();
  const { project, take } = useSelector((state: RootState) => state.project);
  const appVersion = useSelector((state: RootState) => state.app.appVersion);
  const dispatch = useDispatch();

  const saveTrackItemToDisk = async (
    take: Take,
    trackItem: TrackItem,
    data: Blob
  ): Promise<void> => {
    if (projectDirectory === undefined) {
      throw "Missing projectDirectory";
    }
    if (fileManager === undefined) {
      throw "Missing FileManager";
    }

    const takeDirectoryName = makeTakeDirectoryName(take);
    const takeDirectoryHandle = await fileManager.createDirectory(
      takeDirectoryName,
      projectDirectory.handle
    );

    await fileManager.createFile(
      trackItem.fileInfoId,
      trackItem.fileName,
      takeDirectoryHandle,
      FileInfoType.FRAME,
      data
    );
    dispatch(addFrameTrackItem(trackItem));
  };

  const deleteTrackItem = async (trackItem: TrackItem) => {
    await fileManager?.deleteFile(trackItem.fileInfoId);
    dispatch(removeFrameTrackItem(trackItem.id));
  };

  const getTrackItemObjectURL = (trackItem: TrackItem) => {
    const objectURL = fileManager?.findFile(trackItem.fileInfoId)?.objectURL;
    if (objectURL === undefined) {
      throw `Unable to find objectURL for trackItem ${trackItem.id}`;
    }
    return objectURL;
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
    if (fileManager === undefined) {
      throw "Unable to save project file info as missing FileManager";
    }

    const projectFileInfo = fileManager.findFile(project.fileInfoId);

    const projectFileJson = await makeProjectInfoFileJson(appVersion, project, takes);
    const profileFileString = JSON.stringify(projectFileJson);
    const data = new Blob([profileFileString], { type: "application/json" });

    if (projectFileInfo) {
      rLogger.info(
        "projectFilesContext.saveProject.update",
        `Updating project info file ${projectFileInfo.fileInfoId}`
      );
      await fileManager.updateFile(projectFileInfo.fileInfoId, data);
    } else {
      rLogger.info(
        "projectFilesContext.saveProject.create",
        `Creating new project info file in ${projectDirectory.handle.name}`
      );
      const fileInfoId = await fileManager.createFile(
        project.fileInfoId,
        PROJECT_INFO_FILE_NAME,
        projectDirectory.handle,
        FileInfoType.PROJECT_INFO,
        data
      );
      if (fileInfoId === undefined) {
        throw "Unable to create project info file";
      }
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
      value={{ saveTrackItemToDisk, deleteTrackItem, getTrackItemObjectURL }}
    >
      {children}
    </ProjectFilesContext.Provider>
  );
};
