import { createContext } from "react";
import { PersistedDirectoryEntry } from "../../services/database/PersistedDirectoryEntry";
import { Project } from "../../../common/project/Project";

interface PersistedDirectoriesContextProps {
  changeWorkingDirectory: () => Promise<void>;
  addProjectDirectory: (project: Project) => Promise<PersistedDirectoryEntry>;
  addNewProjectInfoFile: (
    projectDirectory: PersistedDirectoryEntry,
    project: Project
  ) => Promise<void>;
}

export const PersistedDirectoriesContext = createContext<Partial<PersistedDirectoriesContextProps>>(
  {}
);
