import { v4 as uuidv4 } from "uuid";
import { FileRefType } from "./FileRef";
import {
  FrameCount,
  FrameRate,
  TakeId,
  TrackGroupId,
  TrackId,
  TrackItemId,
} from "./Flavors";
import { zeroPad } from "./utils";

interface Project {
  name: string;
  filePath: string;
  fileLastSavedToDisk?: Date;
}

export interface Take {
  id: TakeId;
  directoryPath: string;
  shotNumber: number;
  takeNumber: number;
  frameRate: FrameRate;
  holdFrames: FrameCount;
  frameTrack: Track;
}

export interface Track {
  id: TrackId;
  fileType: FileRefType;
  trackItems: TrackItem[];
}

export interface TrackItem {
  id: TrackItemId;
  length: FrameCount;
  filePath: string;
  trackGroupId: TrackGroupId;
}

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
  [
    workingDirectory,
    "Untitled Project.bafiles",
    `BA_${zeroPad(shotNumber, 3)}_${zeroPad(takeNumber, 2)}`,
  ].join("/");

export const makeFrameFilePath = (take: Take): string =>
  [
    take.directoryPath,
    [
      "ba",
      zeroPad(take.shotNumber, 3),
      zeroPad(take.takeNumber, 2),
      "frame",
      `${zeroPad(take.frameTrack.trackItems.length, 5)}.png`,
    ].join("_"),
  ].join("/");

export const getTrackLength = (track: Track): FrameCount =>
  track.trackItems.reduce((prev, trackItem) => prev + trackItem.length, 0);
