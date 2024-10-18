import { v4 as uuidv4 } from "uuid";
import { FileInfoId } from "../../../common/Flavors";

export enum FileInfoType {
  FRAME = "FRAME",
  PROJECT_INFO = "PROJECT_INFO",
}

export class FileInfo {
  public fileInfoId: FileInfoId;

  constructor(
    public fileType: FileInfoType,
    public fileHandle: FileSystemFileHandle,
    public objectURL: string
  ) {
    this.fileInfoId = uuidv4();
  }
}
