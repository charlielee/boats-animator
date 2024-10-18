import { FileInfo } from "./FileInfo";
import * as rLogger from "../../services/rLogger/rLogger";
import { CreateFileAlreadyExistsError } from "./FileErrors";
import { FileInfoId } from "../../../common/Flavors";
import { FileRefType } from "../../../common/FileRef";

export class FileManager2 {
  private fileInfos: FileInfo[];

  constructor() {
    this.fileInfos = [];
  }

  createDirectory = (
    name: string,
    parentHandle: FileSystemDirectoryHandle
  ): Promise<FileSystemDirectoryHandle> => parentHandle.getDirectoryHandle(name, { create: true });

  createFile = async (
    name: string,
    parentHandle: FileSystemDirectoryHandle,
    fileType: FileRefType,
    data: Blob
  ): Promise<FileInfo> => {
    const fileExists = await this.fileExists(name, parentHandle);
    if (fileExists) {
      throw new CreateFileAlreadyExistsError(parentHandle.name, name);
    }

    const fileHandle = await parentHandle.getFileHandle(name, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write({ type: "write", data });
    await writable.close();

    const objectURL = URL.createObjectURL(data);
    const fileInfo = new FileInfo(fileType, fileHandle, objectURL);
    this.fileInfos.push(fileInfo);

    return fileInfo;
  };

  findFile = (fileInfoId: FileInfoId): FileInfo | undefined =>
    this.fileInfos.find((f) => f.fileInfoId === fileInfoId);

  private fileExists = async (
    name: string,
    parentHandle: FileSystemDirectoryHandle
  ): Promise<boolean> => {
    try {
      await parentHandle.getFileHandle(name);
      return true;
    } catch (e) {
      if (e instanceof DOMException && e.name === "NotFoundError") {
        return false;
      } else {
        throw e;
      }
    }
  };

  openDirectoryDialog = async (id: string): Promise<FileSystemDirectoryHandle | undefined> => {
    try {
      const handle = await this.handleOpenDirectoryDialog(id);
      return handle;
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        rLogger.info("fileManager.cancelledDirectoryDialog", `Cancelled directory dialog id ${id}`);
      } else {
        throw e;
      }
    }
  };

  private handleOpenDirectoryDialog = async (id: string): Promise<FileSystemDirectoryHandle> => {
    rLogger.info("fileManager.openDirectoryDialog", `Opened directory dialog id ${id}`);
    const handle = await window.showDirectoryPicker({
      id,
      mode: "readwrite",
      startIn: "documents",
    });
    rLogger.info("fileManager.selectedDirectory", `Selected directory ${handle.name} for id ${id}`);
    return handle;
  };
}
