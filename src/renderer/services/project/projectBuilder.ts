import { v4 as uuidv4 } from "uuid";
import { FileRefType } from "../../../common/FileRef";
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

interface ProjectBuilderOptions {
  shotNumber: number;
  takeNumber: number;
  frameRate: number;
}

export const makeProject = ({ name }: { name: string }): Project => ({
  name: name.substring(0, 256),
  fileName: makeProjectFileName(name),
});

const makeProjectFileName = (name: string) => {
  const fileName = name
    .replace(/[<>:"/\\|?*.]/g, "")
    .substring(0, 60)
    .trim()
    .replace(/ /g, "-");
  return fileName === "" ? DEFAULT_PROJECT_FILE_NAME : fileName;
};

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
    fileType: FileRefType.FRAME,
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

export const makeTakeDirectoryPath = (project: Project, take: Take) =>
  window.preload.joinPath(
    makeProjectDirectoryName(project),
    `BA_${zeroPad(take.shotNumber, 3)}_${zeroPad(take.takeNumber, 2)}`
  );

export const makeFrameFileName = (take: Take, frameName: string) =>
  [
    "ba",
    zeroPad(take.shotNumber, 3),
    zeroPad(take.takeNumber, 2),
    "frame",
    `${frameName}.jpg`,
  ].join("_");

export const makeFrameFilePath = (project: Project, take: Take, frameName: string): string =>
  window.preload.joinPath(
    makeTakeDirectoryPath(project, take),
    [
      "ba",
      zeroPad(take.shotNumber, 3),
      zeroPad(take.takeNumber, 2),
      "frame",
      `${frameName}.jpg`,
    ].join("_")
  );
