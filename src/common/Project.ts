import { v4 as uuidv4 } from "uuid";
import { FileRefType } from "./FileRef";
import {
  FrameCount,
  TakeId,
  TrackFileId,
  TrackId,
  TrackItemId,
} from "./Flavors";

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
  frameRate: number;
  captureFramesHold: FrameCount;
  frameTrack: Track;
}

export interface Track {
  id: TrackId;
  fileType: FileRefType;
  trackItems: TrackItem[];
}

export interface TrackItem {
  id: TrackItemId;
  trackFiles: TrackFile[];
}

interface TrackFile {
  id: TrackFileId;
  length: FrameCount;
  filePath: string;
}

export const makeTake = (args: {
  shotNumber: number;
  takeNumber: number;
  frameRate: number;
}): Take => ({
  id: uuidv4(),
  directoryPath: "",
  captureFramesHold: 1,
  frameTrack: {
    id: "1",
    fileType: FileRefType.FRAME,
    trackItems: [],
  },
  ...args,
});

export const makeFrameTrackItem = (filePath: string): TrackItem => ({
  id: uuidv4(),
  trackFiles: [
    {
      id: uuidv4(),
      length: 1,
      filePath,
    },
  ],
});
