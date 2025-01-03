import { ReactNode, useContext, useEffect } from "react";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import useProjectDirectory from "../../hooks/useProjectDirectory";
import { FileInfoType } from "../../services/fileManager/FileInfo";
import {
  makeProjectInfoFileBlob,
  makeTakeDirectoryName,
} from "../../services/project/projectBuilder";
import { FileManagerContext } from "../FileManagerContext/FileManagerContext";
import { ProjectFilesContext } from "./ProjectFilesContext";

import { useDispatch, useSelector } from "react-redux";
import { Project } from "../../../common/project/Project";
import { addFrameTrackItem, removeFrameTrackItem } from "../../redux/slices/projectSlice";
import { RootState } from "../../redux/store";
import * as rLogger from "../../services/rLogger/rLogger";

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
    if (projectFileInfo === undefined) {
      throw "Unable to find project info file";
    }

    const data = await makeProjectInfoFileBlob(appVersion, project, takes);
    await fileManager.updateFile(projectFileInfo.fileInfoId, data);
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
