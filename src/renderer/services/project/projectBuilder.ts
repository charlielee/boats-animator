import { v4 as uuidv4 } from "uuid";
import { FileRefType } from "../../../common/FileRef";
import { TrackGroupId } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import { PROJECT_DIRECTORY_EXTENSION, zeroPad } from "../../../common/utils";

export interface ProjectBuilderOptions {
  workingDirectory: string;
  shotNumber: number;
  takeNumber: number;
}

export const makeTake = ({
  workingDirectory,
  shotNumber,
  takeNumber,
  frameRate,
}: ProjectBuilderOptions & { frameRate: number }): Take => ({
  id: uuidv4(),
  directoryPath: makeTakeDirectoryPath({
    workingDirectory,
    shotNumber,
    takeNumber,
  }),
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

export const makeTakeDirectoryPath = ({
  workingDirectory,
  shotNumber,
  takeNumber,
}: ProjectBuilderOptions): string =>
  window.preload.joinPath(
    workingDirectory,
    "Untitled Project.bafiles",
    `BA_${zeroPad(shotNumber, 3)}_${zeroPad(takeNumber, 2)}`
  );

export const makeFrameFilePath = (take: Take, frameName?: string): string =>
  window.preload.joinPath(
    take.directoryPath,
    [
      "ba",
      zeroPad(take.shotNumber, 3),
      zeroPad(take.takeNumber, 2),
      "frame",
      `${frameName ?? zeroPad(take.lastExportedFrameNumber + 1, 5)}.jpg`,
    ].join("_")
  );

export const makeProjectFileName = (name: string) => name.trim().replaceAll(" ", "-");

export const makeProjectDirectoryPath = (workingDirectory: string, fileName: string) =>
  window.preload.joinPath(workingDirectory, `${fileName}.${PROJECT_DIRECTORY_EXTENSION}`);
