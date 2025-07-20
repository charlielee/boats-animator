import { createContext } from "react";
import { PersistedDirectoryEntry } from "../../services/database/PersistedDirectoryEntry";
import { Project } from "../../services/project/types";

interface PersistedDirectoriesContextProps {
  checkWorkingDirectoryPermission: () => Promise<void>;
  changeWorkingDirectory: () => Promise<void>;
  addProjectDirectory: (project: Project) => Promise<PersistedDirectoryEntry>;
}

export const PersistedDirectoriesContext = createContext<Partial<PersistedDirectoriesContextProps>>(
  {}
);
