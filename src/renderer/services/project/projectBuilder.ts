import { v4 as uuidv4 } from "uuid";
import { FileInfoType } from "../../context/FileManagerContext/FileInfo";
import { TrackGroupId } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import {
  DEFAULT_PROJECT_NAME_FORMATTED,
  PROJECT_DIRECTORY_EXTENSION,
  zeroPad,
  DEFAULT_PROJECT_DIRECTORY_NAME,
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
  directoryName: makeProjectDirectoryName(name),
  projectFrameRate,
  lastSaved: new Date().toISOString(),
});

const makeProjectDirectoryName = (name: string) => {
  const directoryName = name
    .replace(/[<>:"/\\|?*.]/g, "")
    .substring(0, 60)
    .trim()
    .replace(/ /g, "-");
  return directoryName === ""
    ? DEFAULT_PROJECT_DIRECTORY_NAME
    : `${directoryName}.${PROJECT_DIRECTORY_EXTENSION}`;
};

export const makeUniqueProjectDirectoryNameIfRequired = (directoryName: string) =>
  directoryName === DEFAULT_PROJECT_DIRECTORY_NAME
    ? makeUniqueDefaultProjectDirectoryName()
    : directoryName;

const makeUniqueDefaultProjectDirectoryName = () =>
  `${DEFAULT_PROJECT_NAME_FORMATTED}-${uuidv4().substring(0, 6)}.${PROJECT_DIRECTORY_EXTENSION}`;

export const makeTake = ({ shotNumber, takeNumber, frameRate }: ProjectBuilderOptions): Take => ({
  id: uuidv4(),
  lastSaved: new Date().toISOString(),
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
  take: Take,
  fileNumber: number,
  trackGroupId?: TrackGroupId
): TrackItem => ({
  id: uuidv4(),
  length: 1,
  fileName: makeFrameFileName(take, fileNumber),
  fileNumber,
  trackGroupId: trackGroupId ?? uuidv4(),
});

export const makeTakeDirectoryName = (take: Take) =>
  `BA_${zeroPad(take.shotNumber, 3)}_${zeroPad(take.takeNumber, 2)}`;

export const makeTakeDirectoryPath = (take: Take) =>
  window.preload.joinPath(`BA_${zeroPad(take.shotNumber, 3)}_${zeroPad(take.takeNumber, 2)}`);

export const makeFrameFileName = (take: Take, frameNumber: number) =>
  [
    "ba",
    zeroPad(take.shotNumber, 3),
    zeroPad(take.takeNumber, 2),
    "frame",
    `${zeroPad(frameNumber, 5)}.jpg`,
  ].join("_");

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
