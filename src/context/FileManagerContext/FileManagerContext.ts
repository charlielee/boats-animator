import { createContext, useContext } from "react";
import { FileManager } from "../../services/fileManager/FileManager";

export const FileManagerContext = createContext<FileManager | undefined>(undefined);

export const useFileManagerContext = () => {
  const context = useContext(FileManagerContext);

  if (context === undefined) {
    throw new Error("Must be called within FileManagerContextProvider");
  }

  return context;
};
