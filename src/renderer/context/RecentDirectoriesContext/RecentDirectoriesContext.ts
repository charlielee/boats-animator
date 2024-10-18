import { createContext } from "react";
import { RecentDirectoryEntry } from "../../services/database/RecentDirectoryEntry";
import { Project } from "../../../common/project/Project";

interface RecentDirectoriesContextProps {
  changeWorkingDirectory: () => Promise<void>;
  addProjectDirectory: (project: Project) => Promise<RecentDirectoryEntry>;
}

export const RecentDirectoriesContext = createContext<Partial<RecentDirectoriesContextProps>>({});
