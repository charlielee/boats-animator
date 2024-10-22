import { v4 as uuidv4 } from "uuid";
import { FileInfoId } from "../../../common/Flavors";

export enum FileInfoType {
  FRAME = "FRAME",
  PROJECT_INFO = "PROJECT_INFO",
}

export class FileInfo {
  constructor(
    public fileInfoId: FileInfoId = uuidv4(),
    public fileType: FileInfoType,
    public fileHandle: FileSystemFileHandle,
    public objectURL: string
  ) {}
}
