import { TrackFileId } from "./Flavors";

export interface FileRef {
  trackFileId: TrackFileId;
  fileType: FileRefType;
  available: boolean;
  // Can be an object URL or local path
  location: string;
}

export enum FileRefType {
  FRAME = "FRAME",
}
