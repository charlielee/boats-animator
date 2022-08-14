import { FrameCount, TrackGroupId, TrackItemId } from "../Flavors";

export interface TrackItem {
  id: TrackItemId;
  length: FrameCount;
  filePath: string;
  trackGroupId: TrackGroupId;
}
