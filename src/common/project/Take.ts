import { FrameCount, FrameRate, IsoDateString, TakeId } from "../Flavors";
import { Track } from "./Track";

export interface Take {
  id: TakeId;
  shotNumber: number;
  takeNumber: number;
  frameRate: FrameRate;
  holdFrames: FrameCount;
  frameTrack: Track;
  lastSaved: IsoDateString;
}
