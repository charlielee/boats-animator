import { FileInfoType } from "../../renderer/services/fileManager/FileInfo";
import { TrackId } from "../Flavors";
import { TrackItem } from "./TrackItem";

export interface Track {
  id: TrackId;
  fileType: FileInfoType;
  trackItems: TrackItem[];
}
