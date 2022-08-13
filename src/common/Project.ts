import { v4 as uuidv4 } from "uuid";
import { FileRefType } from "./FileRef";
import {
  FrameCount,
  FrameRate,
  TakeId,
  TimelineIndex,
  TrackGroupId,
  TrackId,
  TrackItemId,
} from "./Flavors";
import { zeroPad } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  lastExportedFrameNumber: number;
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

export const getTrackItemsLength = (trackItems: TrackItem[]): FrameCount =>
  trackItems.reduce((prev, trackItem) => prev + trackItem.length, 0);

export const getTrackLength = (track: Track): FrameCount =>
  getTrackItemsLength(track.trackItems);

export const getTrackItemStartPosition = (
  track: Track,
  trackItemIndex: number
): TimelineIndex =>
  getTrackItemsLength(
    track.trackItems.slice(0, trackItemIndex)
  ) as TimelineIndex;

export const getTrackItemEndPosition = (
  track: Track,
  trackItemIndex: number
): TimelineIndex =>
  getTrackItemsLength(
    track.trackItems.slice(0, trackItemIndex + 1)
  ) as TimelineIndex;

export const getHighlightedTrackItem = (
  track: Track,
  timelineIndex: TimelineIndex | undefined
): TrackItem | undefined =>
  timelineIndex === undefined
    ? undefined
    : track.trackItems.find(
        (_trackItem, index) =>
          getTrackItemStartPosition(track, index) >= timelineIndex
      );

export const getTrackItemTitle = (track: Track, trackItemIndex: number) =>
  track.fileType === FileRefType.FRAME
    ? `Frame ${getTrackItemStartPosition(track, trackItemIndex) + 1}`
    : track.trackItems[trackItemIndex].filePath;
