import { FileInfoId, FrameCount, TimelineIndex, TrackGroupId, TrackItemId } from "../Flavors";

export interface TrackItem {
  id: TrackItemId;
  length: FrameCount;
  fileName: string;
  fileNumber: TimelineIndex;
  trackGroupId: TrackGroupId;
  fileInfoId: FileInfoId;
}
