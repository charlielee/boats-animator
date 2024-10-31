import { FileInfoType } from "../../renderer/context/FileManagerContext/FileInfo";
import { TrackId } from "../Flavors";
import { TrackItem } from "./TrackItem";

export interface Track {
  id: TrackId;
  fileType: FileInfoType;
  trackItems: TrackItem[];
}
