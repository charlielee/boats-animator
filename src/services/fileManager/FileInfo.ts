import { FileInfoId } from "../Flavors";

export enum FileInfoType {
  FRAME = "FRAME",
  PROJECT_INFO = "PROJECT_INFO",
}

export class FileInfo {
  constructor(
    public fileInfoId: FileInfoId,
    public fileType: FileInfoType,
    public fileHandle: FileSystemFileHandle,
    public objectURL: string
  ) {}
}
