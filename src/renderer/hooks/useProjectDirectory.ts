import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/database/Database";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useProjectDirectory = () => {
  const projectDirectoryId = useSelector((state: RootState) => state.project.projectDirectoryId);
  const persistedDirectoryEntry = useLiveQuery(
    () => db.persistedDirectories.get(projectDirectoryId ?? ""),
    [projectDirectoryId]
  );

  return persistedDirectoryEntry;
};

export default useProjectDirectory;
