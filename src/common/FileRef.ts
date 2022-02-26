import { FrameCount, TrackFileId } from "./Flavors";

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

export const makeFrameFileRef = (
  trackFileId: TrackFileId,
  location: string
): FileRef => ({
  trackFileId,
  location,
  fileType: FileRefType.FRAME,
  available: true,
});

export const getNumberOfFrames = (fileRefs: FileRef[]): FrameCount =>
  fileRefs.filter((fileRef) => fileRef.fileType === FileRefType.FRAME).length;
