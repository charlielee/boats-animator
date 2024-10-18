import { v4 as uuidv4 } from "uuid";
import { FileInfoId } from "../../../common/Flavors";

export enum FileInfoType {
  FRAME = "FRAME",
}

export class FileInfo {
  private fileInfoId: FileInfoId;

  constructor(
    private fileType: FileInfoType,
    private fileHandle: FileSystemFileHandle,
    private objectURL: string
  ) {
    this.fileInfoId = uuidv4();
  }
}
