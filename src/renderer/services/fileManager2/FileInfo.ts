import { v4 as uuidv4 } from "uuid";
import { FileInfoId } from "../../../common/Flavors";
import { FileRefType } from "../../../common/FileRef";

export class FileInfo {
  public fileInfoId: FileInfoId;

  constructor(
    public fileType: FileRefType,
    public fileHandle: FileSystemFileHandle,
    public objectURL: string
  ) {
    this.fileInfoId = uuidv4();
  }
}
