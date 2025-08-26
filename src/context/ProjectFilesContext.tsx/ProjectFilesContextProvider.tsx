import { ReactNode, useEffect } from "react";
import useProjectDirectory from "../../hooks/useProjectDirectory";
import { FileInfoType } from "../../services/fileManager/FileInfo";
import {
  makeProjectInfoFileJson,
  makeTakeDirectoryName,
} from "../../services/project/projectBuilder";
import { useFileManagerContext } from "../FileManagerContext/FileManagerContext";
import { ProjectFilesContext } from "./ProjectFilesContext";

import { useDispatch, useSelector } from "react-redux";
import { addFrameTrackItem, addProject, addTake, removeFrameTrackItem } from "../../redux/slices/projectSlice";
import { RootState } from "../../redux/store";
import * as rLogger from "../../services/rLogger/rLogger";
import { Project, ProjectInfoFileV1 } from "../../services/project/types";
import { Take } from "../../services/project/types";
import { TrackItem } from "../../services/project/types";
import { PROJECT_INFO_FILE_NAME } from "../../services/utils";

import {usePersistedDirectoriesContext} from "../PersistedDirectoriesContext/PersistedDirectoriesContext"
import { Action, ThunkDispatch } from "@reduxjs/toolkit";


interface ProjectFilesContextProviderProps {
  children: ReactNode;
}

export const ProjectFilesContextProvider = ({ children }: ProjectFilesContextProviderProps) => {
  const fileManager = useFileManagerContext();

  const persistedDirectory = usePersistedDirectoriesContext();

  const projectDirectory = useProjectDirectory();
  const { project, take } = useSelector((state: RootState) => state.project);
  const appVersion = useSelector((state: RootState) => state.app.appVersion);
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();

  const saveTrackItemToDisk = async (
    take: Take,
    trackItem: TrackItem,
    data: Blob
  ): Promise<void> => {
    if (projectDirectory === undefined) {
      throw "Missing projectDirectory";
    }

    const takeDirectoryName = makeTakeDirectoryName(take.shotNumber, take.takeNumber);
    const takeDirectoryHandle = await fileManager.createDirectory(
      takeDirectoryName,
      projectDirectory.handle,
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
    await fileManager.deleteFile(trackItem.fileInfoId);
    dispatch(removeFrameTrackItem(trackItem.id));
  };

  const getTrackItemObjectURL = (trackItem: TrackItem) => {
    const objectURL = fileManager.findFile(trackItem.fileInfoId)?.objectURL;
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
      await fileManager.createFile(
        project.fileInfoId,
        PROJECT_INFO_FILE_NAME,
        projectDirectory.handle,
        FileInfoType.PROJECT_INFO,
        data
      );
    }
  };

  const loadProjectInfoFromDisk = async (dirHandler :FileSystemDirectoryHandle) =>{
    
    let fileToLoadFrom: FileSystemFileHandle | undefined= undefined;
    for await (const directoryEntry of dirHandler.values()) {
      if (directoryEntry instanceof  FileSystemFileHandle){
        if (directoryEntry.name ===PROJECT_INFO_FILE_NAME){
          fileToLoadFrom = directoryEntry;
        }
      }
    }

    if (fileToLoadFrom === undefined){
      throw "Unable to load project as missing the Project boatsinfo file."
    }

    const readText: string = await (await fileToLoadFrom.getFile()).text();
    const parsedFile: ProjectInfoFileV1 = JSON.parse(readText);
    const chosenTake = parsedFile.takes[0];
    const persistedDirEntry = await (persistedDirectory.loadProjectDirectory(parsedFile.project.directoryName, dirHandler) )

    const  takeDirectoryHandle = await fileManager.createDirectory(
      chosenTake.takeDirectory,
      dirHandler,
    );

    await fileManager.addFileToFileManager(
      parsedFile.project.fileInfoId,
      PROJECT_INFO_FILE_NAME,
      dirHandler,
      FileInfoType.PROJECT_INFO
    );
    for (let i = 0; i < chosenTake.frameTrack.trackItems.length; ++i){
      const trackItem = chosenTake.frameTrack.trackItems[i];

      await fileManager.addFileToFileManager(
        trackItem.fileInfoId,
        trackItem.fileName,
        takeDirectoryHandle,
        FileInfoType.FRAME,
      );
    }
    dispatch(addProject({project : parsedFile.project, projectDirectoryId :  persistedDirEntry.id}));
    dispatch(addTake(chosenTake) )
  }

  useEffect(() => {
    if (projectDirectory !== undefined && project !== undefined && take !== undefined) {
      const [updatedProject, updatedTakes] = updateProjectAndTakeLastSaved(project, take);
      saveProjectInfoFileToDisk!(updatedProject, updatedTakes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, take, projectDirectory]);

  return (
    <ProjectFilesContext.Provider
      value={{ saveTrackItemToDisk, deleteTrackItem, getTrackItemObjectURL , loadProjectInfoFromDisk}}
    >
      {children}
    </ProjectFilesContext.Provider>
  );
};
