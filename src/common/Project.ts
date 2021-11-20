interface Project {
  name: string;
  filePath: string;
  fileLastSavedToDisk?: Date;
}

interface Take {
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
