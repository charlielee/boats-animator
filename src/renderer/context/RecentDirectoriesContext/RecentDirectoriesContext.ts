import { createContext } from "react";

interface RecentDirectoriesContextProps {
  changeWorkingDirectory: () => Promise<void>;
}

export const RecentDirectoriesContext = createContext<Partial<RecentDirectoriesContextProps>>({});
