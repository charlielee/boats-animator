import { createContext } from "react";
import { FileManager } from "../../services/fileManager/FileManager";

interface FileManagerContextProps {
  fileManager: React.MutableRefObject<FileManager> | undefined;
}

const defaultValue: FileManagerContextProps = {
  fileManager: undefined,
};

export const FileManagerContext = createContext<FileManagerContextProps>(defaultValue);
