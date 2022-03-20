import { TrackItemId } from "./Flavors";

export interface FileRef {
  trackItemId: TrackItemId;
  fileType: FileRefType;
  available: boolean;
  // Can be an object URL or local path
  location: string;
}

export enum FileRefType {
  FRAME = "FRAME",
}

export const makeFrameFileRef = (
  trackItemId: TrackItemId,
  location: string
): FileRef => ({
  trackItemId,
  location,
  fileType: FileRefType.FRAME,
  available: true,
});

export const getFileRefById = (
  fileRefs: FileRef[],
  trackItemId: TrackItemId
): FileRef => {
  const fileRef = fileRefs.find(
    (fileRef) => fileRef.trackItemId === trackItemId
  );
  if (fileRef !== undefined) {
    return fileRef;
  } else {
    throw `No file ref with trackItemId ${trackItemId} found`;
  }
};
