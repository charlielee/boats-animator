import { ReactNode, useContext } from "react";
import { RecentDirectoriesContext } from "./RecentDirectoriesContext";
// import useProjectDirectory from "../../hooks/useProjectDirectory";
// import useWorkingDirectory from "../../hooks/useWorkingDirectory";
import { FileManagerContext } from "../FileManagerContext/FileManagerContext";
import { putOrAddWorkingDirectory } from "../../services/database/RecentDirectoryEntry";

interface RecentDirectoriesContextProviderProps {
  children: ReactNode;
}

export const RecentDirectoriesContextProvider = ({
  children,
}: RecentDirectoriesContextProviderProps) => {
  // const workingDirectory = useWorkingDirectory();
  // const projectDirectory = useProjectDirectory();

  const { fileManager } = useContext(FileManagerContext);
  if (fileManager === undefined) {
    throw "FileManagerContext was not found";
  }

  const changeWorkingDirectory = async (): Promise<void> => {
    const workingDirectoryHandle =
      await fileManager.current.openDirectoryDialog("changeWorkingDirectory");

    if (workingDirectoryHandle !== undefined) {
      await putOrAddWorkingDirectory(workingDirectoryHandle);
    }
  };

  return (
    <RecentDirectoriesContext.Provider value={{ changeWorkingDirectory }}>
      {children}
    </RecentDirectoriesContext.Provider>
  );
};
