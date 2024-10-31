import { FileInfo } from "./FileInfo";
import * as rLogger from "../../services/rLogger/rLogger";
import {
  CreateDirectoryAlreadyExistsError,
  CreateDirectoryUnexpectedError,
  CreateFileAlreadyExistsError,
  CreateFileUnexpectedError,
  DeleteFileInfoIdNotFoundError,
  DeleteFileUnexpectedError,
  UpdateFileInfoIdNotFoundError,
  UpdateFileUnexpectedError,
} from "./FileErrors";
import { FileInfoId } from "../../../common/Flavors";
import { FileInfoType } from "./FileInfo";
import { ReactNode, useState } from "react";
import { FileManagerContext } from "./FileManagerContext";

interface FileManagerContextProviderProps {
  children: ReactNode;
}

export const FileManagerContextProvider = ({ children }: FileManagerContextProviderProps) => {
  const [fileInfos, setFileInfos] = useState<FileInfo[]>([]);
  console.log("fileInfos", fileInfos);

  const createDirectory = async (
    name: string,
    parentHandle: FileSystemDirectoryHandle,
    errorIfExists: boolean = false
  ): Promise<FileSystemDirectoryHandle> => {
    if (errorIfExists && (await _directoryExists(name, parentHandle))) {
      throw new CreateDirectoryAlreadyExistsError(parentHandle.name, name);
    }

    try {
      return parentHandle.getDirectoryHandle(name, { create: true });
    } catch (e) {
      throw new CreateDirectoryUnexpectedError(parentHandle.name, name, e);
    }
  };

  const _directoryExists = async (
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

  const createFile = async (
    name: string,
    parentHandle: FileSystemDirectoryHandle,
    fileType: FileInfoType,
    data: Blob
  ): Promise<FileInfoId> => {
    if (await _fileExists(name, parentHandle)) {
      throw new CreateFileAlreadyExistsError(parentHandle.name, name);
    }

    try {
      const fileHandle = await parentHandle.getFileHandle(name, { create: true });
      const objectURL = await _writeFileAndCreateObjectURL(fileHandle, data);
      const fileInfo = new FileInfo(undefined, fileType, fileHandle, objectURL);

      console.log(fileInfos);
      setFileInfos((prevState) => {
        console.log([...prevState, fileInfo]);
        return [...prevState, fileInfo];
      });

      return fileInfo.fileInfoId;
    } catch (e) {
      throw new CreateFileUnexpectedError(parentHandle.name, name, e);
    }
  };

  const updateFile = async (fileInfoId: FileInfoId, data: Blob): Promise<void> => {
    const fileInfo = findFile(fileInfoId);
    if (fileInfo === undefined) {
      throw new UpdateFileInfoIdNotFoundError(fileInfoId);
    }

    try {
      const newObjectURL = await _writeFileAndCreateObjectURL(fileInfo.fileHandle, data);
      URL.revokeObjectURL(fileInfo.objectURL);

      const updatedFileInfo = new FileInfo(
        fileInfo.fileInfoId,
        fileInfo.fileType,
        fileInfo.fileHandle,
        newObjectURL
      );
      setFileInfos((prevState) => [
        ...prevState.filter((fileInfo) => fileInfo.fileInfoId !== fileInfoId),
        updatedFileInfo,
      ]);
    } catch (e) {
      throw new UpdateFileUnexpectedError(fileInfo.fileHandle.name, e);
    }
  };

  const deleteFile = async (fileInfoId: FileInfoId): Promise<void> => {
    const fileInfo = findFile(fileInfoId);
    if (fileInfo === undefined) {
      throw new DeleteFileInfoIdNotFoundError(fileInfoId);
    }

    try {
      // Remove is a non-standard method so has to be casted to any
      await (fileInfo.fileHandle as any).remove();
      URL.revokeObjectURL(fileInfo.objectURL);

      setFileInfos((prevState) => [
        ...prevState.filter((fileInfo) => fileInfo.fileInfoId !== fileInfoId),
      ]);
    } catch (e) {
      throw new DeleteFileUnexpectedError(fileInfo.fileHandle.name, e);
    }
  };

  const _writeFileAndCreateObjectURL = async (
    fileHandle: FileSystemFileHandle,
    data: Blob
  ): Promise<string> => {
    const writable = await fileHandle.createWritable();
    await writable.write({ type: "write", data });
    await writable.close();
    return URL.createObjectURL(data);
  };

  const _fileExists = async (
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

  const findFile = (fileInfoId: FileInfoId): FileInfo | undefined =>
    fileInfos.find((f) => f.fileInfoId === fileInfoId);

  const openDirectoryDialog = async (
    id: string
  ): Promise<FileSystemDirectoryHandle | undefined> => {
    try {
      const handle = await _handleOpenDirectoryDialog(id);
      return handle;
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        rLogger.info("fileManager.cancelledDirectoryDialog", `Cancelled directory dialog id ${id}`);
      } else {
        throw e;
      }
    }
  };

  const _handleOpenDirectoryDialog = async (id: string): Promise<FileSystemDirectoryHandle> => {
    rLogger.info("fileManager.openDirectoryDialog", `Opened directory dialog id ${id}`);
    const handle = await window.showDirectoryPicker({
      id,
      mode: "readwrite",
      startIn: "documents",
    });
    rLogger.info("fileManager.selectedDirectory", `Selected directory ${handle.name} for id ${id}`);
    return handle;
  };

  return (
    <FileManagerContext.Provider
      value={{
        createDirectory,
        createFile,
        updateFile,
        deleteFile,
        findFile,
        openDirectoryDialog,
      }}
    >
      {children}
    </FileManagerContext.Provider>
  );
};
