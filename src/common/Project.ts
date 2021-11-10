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

interface Track {
  id: string;
  trackType: TrackType;
  trackItems: TrackItem;
}

enum TrackType {
  FRAME = "FRAME",
}

interface TrackItem {
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
