import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/database/Database";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

/* I, Ikyman, Declare this function depricated.
 * useLiveQuery is asynchronous: There is no gurantee that it runs and completes before the return statement.
 * Instead what happens is that one runs risks of getting the previous value of useLiveQuery returned.
 * Not good! If projectDirectoryId changed, then this hook may return a persistedDirectoryEntry in which
 * the ID != the current projectDirectoryId. Aka, the wrong value.
 * As the current use of this is for saving project files, this directory mis-match invites a whole world of trouble!
 */
const useProjectDirectory = () => {
  const projectDirectoryId = useSelector((state: RootState) => state.project.projectDirectoryId);
  const persistedDirectoryEntry = useLiveQuery(
    () => db.persistedDirectories.get(projectDirectoryId ?? ""),
    [projectDirectoryId]
  );

  return persistedDirectoryEntry;
};

export default useProjectDirectory;
