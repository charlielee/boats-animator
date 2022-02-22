interface Project {
  name: string;
  filePath: string;
  fileLastSavedToDisk?: Date;
}

export interface Take {
  id: string;
  directoryPath: string;
  shotNumber: number;
  takeNumber: number;
  frameRate: number;
  captureFramesHold: number;
  frameTrack: Track;
}

export interface Track {
  id: string;
  trackType: TrackType;
  trackItems: TrackItem[];
}

export enum TrackType {
  FRAME = "FRAME",
}

export interface TrackItem {
  id: string;
  lengthInFrames: number;
  trackFiles: TrackFile[];
}

interface BaseTrackFile {
  id: string;
  filePath: string;
}

interface FrameTrackFile extends BaseTrackFile {}

type TrackFile = FrameTrackFile;

export const makeTake = (args: {
  shotNumber: number;
  takeNumber: number;
  frameRate: number;
}): Take => ({
  id: Math.random().toString(),
  directoryPath: "",
  captureFramesHold: 1,
  frameTrack: {
    id: "1",
    trackType: TrackType.FRAME,
    trackItems: [],
  },
  ...args,
});

export const makeFrameTrackItem = (filePath: string): TrackItem => ({
  id: Math.random().toString(),
  lengthInFrames: 1,
  trackFiles: [
    {
      id: Math.random().toString(),
      filePath,
    },
  ],
});
