import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/database/Database";
import { RecentDirectoryType } from "../services/database/RecentDirectoryEntry";

const useWorkingDirectory = () => {
  const recentDirectoryEntry = useLiveQuery(() =>
    db.recentDirectories.get({ type: RecentDirectoryType.WORKING_DIRECTORY })
  );

  return recentDirectoryEntry;
};

export default useWorkingDirectory;
