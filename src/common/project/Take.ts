import { FrameCount, FrameRate, TakeId } from "../Flavors";
import { Track } from "./Track";

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
