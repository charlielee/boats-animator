import { v4 as uuidv4 } from "uuid";
import { FileRefType } from "../../../common/FileRef";
import { TrackGroupId } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import { PROJECT_DIRECTORY_EXTENSION, zeroPad } from "../../../common/utils";
import { Project } from "../../../common/project/Project";

interface ProjectBuilderOptions {
  shotNumber: number;
  takeNumber: number;
  frameRate: number;
}

export const makeProject = ({
  name,
  workingDirectory,
}: {
  name: string;
  workingDirectory: string;
}): Project => ({
  name,
  fileName: makeProjectFileName(name),
  workingDirectory,
});

const makeProjectFileName = (name: string) =>
  name
    .replace(/[<>:"/\\|?*.]/g, "")
    .trim()
    .replace(/ /g, "-");

export const makeTake = ({ shotNumber, takeNumber, frameRate }: ProjectBuilderOptions): Take => ({
  id: uuidv4(),
  shotNumber,
  takeNumber,
  frameRate,
  holdFrames: 1,
  lastExportedFrameNumber: 0,
  frameTrack: {
    id: uuidv4(),
    fileType: FileRefType.FRAME,
    trackItems: [],
  },
});

export const makeFrameTrackItem = (filePath: string, trackGroupId?: TrackGroupId): TrackItem => ({
  id: uuidv4(),
  length: 1,
  filePath,
  trackGroupId: trackGroupId ?? uuidv4(),
});

export const makeProjectDirectoryPath = (project: Project) =>
  window.preload.joinPath(
    project.workingDirectory,
    `${project.fileName}.${PROJECT_DIRECTORY_EXTENSION}`
  );

export const makeTakeDirectoryPath = (project: Project, take: Take) =>
  window.preload.joinPath(
    makeProjectDirectoryPath(project),
    `BA_${zeroPad(take.shotNumber, 3)}_${zeroPad(take.takeNumber, 2)}`
  );

export const makeFrameFilePath = (project: Project, take: Take, frameName?: string): string =>
  window.preload.joinPath(
    makeTakeDirectoryPath(project, take),
    [
      "ba",
      zeroPad(take.shotNumber, 3),
      zeroPad(take.takeNumber, 2),
      "frame",
      `${frameName ?? zeroPad(take.lastExportedFrameNumber + 1, 5)}.jpg`,
    ].join("_")
  );
