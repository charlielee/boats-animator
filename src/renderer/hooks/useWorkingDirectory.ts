import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/database/Database";
import { PersistedDirectoryType } from "../services/database/PersistedDirectoryEntry";

const useWorkingDirectory = () => {
  const persistedDirectoryEntry = useLiveQuery(() =>
    db.persistedDirectories.get({ type: PersistedDirectoryType.WORKING_DIRECTORY })
  );

  return persistedDirectoryEntry;
};

export default useWorkingDirectory;
