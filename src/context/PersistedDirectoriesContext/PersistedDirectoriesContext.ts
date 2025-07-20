import { createContext, useContext } from "react";
import { PersistedDirectoryEntry } from "../../services/database/PersistedDirectoryEntry";
import { Project } from "../../services/project/types";

interface PersistedDirectoriesContextProps {
  checkWorkingDirectoryPermission: () => Promise<void>;
  changeWorkingDirectory: () => Promise<void>;
  addProjectDirectory: (project: Project) => Promise<PersistedDirectoryEntry>;
}

export const PersistedDirectoriesContext = createContext<
  PersistedDirectoriesContextProps | undefined
>(undefined);

export const usePersistedDirectoriesContext = () => {
  const context = useContext(PersistedDirectoriesContext);

  if (context === undefined) {
    throw new Error("Must be called within PersistedDirectoriesContextProvider");
  }

  return context;
};
