import { v4 as uuidv4 } from "uuid";
import { FileInfoType } from "../fileManager/FileInfo";
import { TrackGroupId } from "../Flavors";
import {
  DEFAULT_PROJECT_DIRECTORY_NAME,
  PROJECT_DIRECTORY_EXTENSION,
  DEFAULT_PROJECT_NAME_FORMATTED,
  zeroPad,
  DEFAULT_PROJECT_NAME,
} from "../utils";
import { Project } from "./Project";
import { ProjectInfoFileV1, CURRENT_PROJECT_INFO_FILE_SCHEMA_VERSION } from "./ProjectInfoFile";
import { Take } from "./Take";
import { TrackItem } from "./TrackItem";
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
  fileInfoId: uuidv4(),
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
  fileInfoId: uuidv4(),
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
  appVersion: string,
  project: Project,
  takes: Take[]
): Promise<ProjectInfoFileV1> => ({
  schemaVersion: CURRENT_PROJECT_INFO_FILE_SCHEMA_VERSION,
  appVersion,
  project,
  takes,
});

export const displayProjectTitle = (project: Project) =>
  project.name === "" ? DEFAULT_PROJECT_NAME : project.name;
