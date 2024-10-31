import { createContext } from "react";
import { FileInfoId } from "../../../common/Flavors";
import { FileInfo, FileInfoType } from "./FileInfo";

export interface FileManagerContextProps {
  createDirectory: (
    name: string,
    parentHandle: FileSystemDirectoryHandle,
    errorIfExists?: boolean
  ) => Promise<FileSystemDirectoryHandle>;

  createFile: (
    name: string,
    parentHandle: FileSystemDirectoryHandle,
    fileType: FileInfoType,
    data: Blob
  ) => Promise<FileInfoId>;

  updateFile: (fileInfoId: FileInfoId, data: Blob) => Promise<void>;

  deleteFile: (fileInfoId: FileInfoId) => Promise<void>;

  findFile: (fileInfoId: FileInfoId) => FileInfo | undefined;

  openDirectoryDialog: (id: string) => Promise<FileSystemDirectoryHandle | undefined>;
}

export const FileManagerContext = createContext<Partial<FileManagerContextProps>>({});
