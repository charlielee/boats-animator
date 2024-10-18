import { FileInfo } from "./FileInfo";
import * as rLogger from "../rLogger/rLogger";
import { CreateDirectoryAlreadyExistsError, CreateFileAlreadyExistsError } from "./FileErrors";
import { FileInfoId } from "../../../common/Flavors";
import { FileInfoType } from "./FileInfo";

export class FileManager {
  private fileInfos: FileInfo[];

  constructor() {
    this.fileInfos = [];
  }

  createDirectory = async (
    name: string,
    parentHandle: FileSystemDirectoryHandle,
    errorIfExists: boolean = false
  ): Promise<FileSystemDirectoryHandle> => {
    if (errorIfExists && (await this.directoryExists(name, parentHandle))) {
      throw new CreateDirectoryAlreadyExistsError(parentHandle.name, name);
    }

    return parentHandle.getDirectoryHandle(name, { create: true });
  };

  private directoryExists = async (
    name: string,
    parentHandle: FileSystemDirectoryHandle
  ): Promise<boolean> => {
    try {
      await parentHandle.getDirectoryHandle(name);
      return true;
    } catch (e) {
      if (e instanceof DOMException && e.name === "NotFoundError") {
        return false;
      } else {
        throw e;
      }
    }
  };

  createFile = async (
    name: string,
    parentHandle: FileSystemDirectoryHandle,
    fileType: FileInfoType,
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

  findFile = (fileInfoId: FileInfoId): FileInfo | undefined =>
    this.fileInfos.find((f) => f.fileInfoId === fileInfoId);

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
