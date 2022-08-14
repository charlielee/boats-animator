import { FileRefType } from "../FileRef";
import { TrackId } from "../Flavors";
import { TrackItem } from "./TrackItem";

export interface Track {
  id: TrackId;
  fileType: FileRefType;
  trackItems: TrackItem[];
}
