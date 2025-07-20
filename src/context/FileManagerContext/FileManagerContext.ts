import { createContext } from "react";
import { FileManager } from "../../services/fileManager/FileManager";

export const FileManagerContext = createContext<FileManager | undefined>(undefined);
