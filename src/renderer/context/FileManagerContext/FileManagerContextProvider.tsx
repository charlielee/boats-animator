import { ReactNode, useRef } from "react";
import { FileManager2 } from "../../services/fileManager2/FileManager2";
import { FileManagerContext } from "./FileManagerContext";

interface FileManagerContextProviderProps {
  children: ReactNode;
}

export const FileManagerContextProvider = ({ children }: FileManagerContextProviderProps) => {
  const fileManager = useRef(new FileManager2());

  return (
    <FileManagerContext.Provider value={{ fileManager }}>{children}</FileManagerContext.Provider>
  );
};
