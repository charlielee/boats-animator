import { createContext } from "react";
import { FileManager2 } from "../../services/fileManager2/FileManager2";

interface FileManagerContextProps {
  fileManager: React.MutableRefObject<FileManager2> | undefined;
}

const defaultValue: FileManagerContextProps = {
  fileManager: undefined,
};

export const FileManagerContext = createContext<FileManagerContextProps>(defaultValue);
