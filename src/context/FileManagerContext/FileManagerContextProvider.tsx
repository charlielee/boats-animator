import { ReactNode, useRef } from "react";
import { FileManager } from "../../services/fileManager/FileManager";
import { FileManagerContext } from "./FileManagerContext";

interface FileManagerContextProviderProps {
  children: ReactNode;
}

export const FileManagerContextProvider = ({ children }: FileManagerContextProviderProps) => {
  const fileManager = useRef(new FileManager());

  return (
    <FileManagerContext.Provider value={fileManager.current}>
      {children}
    </FileManagerContext.Provider>
  );
};
