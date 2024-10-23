import { FileInfo } from "./FileInfo";
import * as rLogger from "../rLogger/rLogger";
import {
  CreateDirectoryAlreadyExistsError,
  CreateFileAlreadyExistsError,
  DeleteFileInfoIdNotFoundError,
  UpdateFileInfoIdNotFoundError,
} from "./FileErrors";
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
  ): Promise<FileInfoId> => {
    if (await this.fileExists(name, parentHandle)) {
      throw new CreateFileAlreadyExistsError(parentHandle.name, name);
    }

    const fileHandle = await parentHandle.getFileHandle(name, { create: true });
    const objectURL = await this.writeFileAndCreateObjectURL(fileHandle, data);
    const fileInfo = new FileInfo(undefined, fileType, fileHandle, objectURL);
    this.fileInfos.push(fileInfo);

    return fileInfo.fileInfoId;
  };

  updateFile = async (fileInfoId: FileInfoId, data: Blob): Promise<void> => {
    const fileInfo = this.findFile(fileInfoId);
    if (fileInfo === undefined) {
      throw new UpdateFileInfoIdNotFoundError(fileInfoId);
    }

    const newObjectURL = await this.writeFileAndCreateObjectURL(fileInfo.fileHandle, data);
    URL.revokeObjectURL(fileInfo.objectURL);

    const index = this.fileInfos.findIndex((f) => f.fileInfoId === fileInfoId);
    this.fileInfos[index] = new FileInfo(
      fileInfo.fileInfoId,
      fileInfo.fileType,
      fileInfo.fileHandle,
      newObjectURL
    );
  };

  deleteFile = async (fileInfoId: FileInfoId): Promise<void> => {
    const fileInfo = this.findFile(fileInfoId);
    if (fileInfo === undefined) {
      throw new DeleteFileInfoIdNotFoundError(fileInfoId);
    }

    // TODO remove is a non-standard method so has to be casted to any
    await (fileInfo.fileHandle as any).remove();
    URL.revokeObjectURL(fileInfo.objectURL);

    const index = this.fileInfos.findIndex((f) => f.fileInfoId === fileInfoId);
    this.fileInfos.splice(index, 1);
  };

  private writeFileAndCreateObjectURL = async (
    fileHandle: FileSystemFileHandle,
    data: Blob
  ): Promise<string> => {
    const writable = await fileHandle.createWritable();
    await writable.write({ type: "write", data });
    await writable.close();
    return URL.createObjectURL(data);
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
