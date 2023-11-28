import { FrameCount, TimelineIndex, TrackGroupId, TrackItemId } from "../Flavors";

export interface TrackItem {
  id: TrackItemId;
  length: FrameCount;
  filePath: string;
  fileNumber: TimelineIndex;
  trackGroupId: TrackGroupId;
}
