import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/database/Database";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useProjectDirectory = () => {
  const projectDirectoryId = useSelector((state: RootState) => state.project.projectDirectoryId);
  const recentDirectoryEntry = useLiveQuery(
    () => db.recentDirectories.get(projectDirectoryId ?? ""),
    [projectDirectoryId]
  );

  return recentDirectoryEntry;
};

export default useProjectDirectory;
