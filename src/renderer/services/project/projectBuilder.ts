import { v4 as uuidv4 } from "uuid";
import { FileRefType } from "../../../common/FileRef";
import { TrackGroupId } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import { zeroPad } from "../../../common/utils";

export const makeTake = (
  workingDirectory: string,
  shotNumber: number,
  takeNumber: number,
  frameRate: number
): Take => ({
  id: uuidv4(),
  directoryPath: makeTakeDirectoryPath(
    workingDirectory,
    shotNumber,
    takeNumber
  ),
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

export const makeFrameTrackItem = (
  filePath: string,
  trackGroupId?: TrackGroupId
): TrackItem => ({
  id: uuidv4(),
  length: 1,
  filePath,
  trackGroupId: trackGroupId ?? uuidv4(),
});

export const makeTakeDirectoryPath = (
  workingDirectory: string,
  shotNumber: number,
  takeNumber: number
): string =>
  window.preload.joinPath(
    workingDirectory,
    "Untitled Project.bafiles",
    `BA_${zeroPad(shotNumber, 3)}_${zeroPad(takeNumber, 2)}`
  );

export const makeFrameFilePath = (take: Take, fileName?: string): string =>
  window.preload.joinPath(
    take.directoryPath,
    [
      "ba",
      zeroPad(take.shotNumber, 3),
      zeroPad(take.takeNumber, 2),
      "frame",
      `${fileName ?? zeroPad(take.lastExportedFrameNumber + 1, 5)}.png`,
    ].join("_")
  );
