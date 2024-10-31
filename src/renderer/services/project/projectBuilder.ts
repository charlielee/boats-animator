import { v4 as uuidv4 } from "uuid";
import { FileInfoType } from "../../context/FileManagerContext/FileInfo";
import { TrackGroupId } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import {
  DEFAULT_PROJECT_FILE_NAME,
  DEFAULT_PROJECT_NAME,
  PROJECT_DIRECTORY_EXTENSION,
  zeroPad,
} from "../../../common/utils";
import { Project } from "../../../common/project/Project";
import {
  CURRENT_PROJECT_INFO_FILE_SCHEMA_VERSION,
  ProjectInfoFileV1,
} from "../../../common/project/ProjectInfoFile";

interface ProjectBuilderOptions {
  shotNumber: number;
  takeNumber: number;
  frameRate: number;
}

export const makeProject = ({
  name,
  projectFrameRate,
}: {
  name: string;
  projectFrameRate: number;
}): Project => ({
  name: name.substring(0, 256),
  fileName: makeProjectFileName(name),
  projectFrameRate,
});

const makeProjectFileName = (name: string) => {
  const fileName = name
    .replace(/[<>:"/\\|?*.]/g, "")
    .substring(0, 60)
    .trim()
    .replace(/ /g, "-");
  return fileName === "" ? makeUniqueDefaultProjectFileName() : fileName;
};

const makeUniqueDefaultProjectFileName = () =>
  `${DEFAULT_PROJECT_FILE_NAME}-${uuidv4().substring(0, 6)}`;

export const formatProjectName = (name: string) =>
  name.trim() === "" ? DEFAULT_PROJECT_NAME : name.trim();

export const makeTake = ({ shotNumber, takeNumber, frameRate }: ProjectBuilderOptions): Take => ({
  id: uuidv4(),
  shotNumber,
  takeNumber,
  frameRate,
  holdFrames: 1,
  frameTrack: {
    id: uuidv4(),
    fileType: FileInfoType.FRAME,
    trackItems: [],
  },
});

export const makeFrameTrackItem = (
  filePath: string,
  fileNumber: number,
  trackGroupId?: TrackGroupId
): TrackItem => ({
  id: uuidv4(),
  length: 1,
  filePath,
  fileNumber,
  trackGroupId: trackGroupId ?? uuidv4(),
});

export const makeProjectDirectoryName = (project: Project) =>
  `${project.fileName}.${PROJECT_DIRECTORY_EXTENSION}`;

export const makeTakeDirectoryName = (take: Take) =>
  `BA_${zeroPad(take.shotNumber, 3)}_${zeroPad(take.takeNumber, 2)}`;

export const makeTakeDirectoryPath = (take: Take) =>
  window.preload.joinPath(`BA_${zeroPad(take.shotNumber, 3)}_${zeroPad(take.takeNumber, 2)}`);

export const makeFrameFileName = (take: Take, frameName: string) =>
  [
    "ba",
    zeroPad(take.shotNumber, 3),
    zeroPad(take.takeNumber, 2),
    "frame",
    `${frameName}.jpg`,
  ].join("_");

export const makeFrameFilePath = (take: Take, frameName: string): string =>
  window.preload.joinPath(
    makeTakeDirectoryPath(take),
    [
      "ba",
      zeroPad(take.shotNumber, 3),
      zeroPad(take.takeNumber, 2),
      "frame",
      `${frameName}.jpg`,
    ].join("_")
  );

export const makeProjectInfoFileJson = async (
  project: Project,
  takes: Take[]
): Promise<ProjectInfoFileV1> => {
  const appVersion = await window.preload.ipcToMain.appVersion();
  return {
    schemaVersion: CURRENT_PROJECT_INFO_FILE_SCHEMA_VERSION,
    appVersion,
    project,
    takes,
  };
};
