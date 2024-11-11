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
  makeFrameFileName,
  makeProjectInfoFileJson,
} from "../../services/project/projectBuilder";
import { PROJECT_INFO_FILE_NAME, zeroPad } from "../../../common/utils";
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
  const { createDirectory, createFile, findFile, deleteFile, updateFile } =
    useContext(FileManagerContext);

  const projectDirectory = useProjectDirectory();
  const { project, take } = useSelector((state: RootState) => state.project);
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
    const takeDirectoryHandle = await createDirectory!(takeDirectoryName, projectDirectory.handle);
    const frameFileName = makeFrameFileName(take, zeroPad(trackItem.fileNumber, 5));
    const fileInfoId = await createFile!(
      frameFileName,
      takeDirectoryHandle,
      FileInfoType.FRAME,
      data
    );
    setTrackItemFiles((p) => ({ ...p, [trackItem.id]: fileInfoId }));
  };

  const getTrackItemFileInfo = (trackItemId: TrackItemId): FileInfo | undefined =>
    findFile!(trackItemFiles[trackItemId]);

  const deleteTrackItem = async (trackItemId: TrackItemId): Promise<void> => {
    await deleteFile!(trackItemFiles[trackItemId]);
    setTrackItemFiles(({ [trackItemId]: _, ...otherTrackItemFiles }) => otherTrackItemFiles);
    // todo should redux happen here
    dispatch(removeFrameTrackItem(trackItemId));
  };

  // const updateProjectAndTakeLastSaved = async (project: Project, take: Take) => {
  //   const updatedProject = {...project, la}
  // }

  const saveProjectInfoFileToDisk = async (project: Project, takes: Take[]): Promise<void> => {
    rLogger.info("projectFilesContext.saveProject", "Saving project json to disk");
    if (projectDirectory === undefined) {
      throw "Unable to save project file info as missing projectDirectory";
    }

    const projectFileJson = await makeProjectInfoFileJson(project, takes);
    const profileFileString = JSON.stringify(projectFileJson);
    const data = new Blob([profileFileString], { type: "application/json" });

    if (projectInfoFileId) {
      await updateFile!(projectInfoFileId, data);
    } else {
      const fileInfoId = await createFile!(
        PROJECT_INFO_FILE_NAME,
        projectDirectory.handle,
        FileInfoType.PROJECT_INFO,
        data
      );
      setProjectInfoFileId(fileInfoId);
    }
  };

  useEffect(() => {
    if (projectDirectory !== undefined && project !== undefined && take !== undefined) {
      saveProjectInfoFileToDisk!(project, [take]);
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
