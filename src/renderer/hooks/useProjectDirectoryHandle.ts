import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/database/Database";

const useProjectDirectoryHandle = () => {
  const project = useSelector((state: RootState) => state.project.project);
  const recentDirectoryId = useSelector((state: RootState) => state.project.recentDirectoryId);
  if (!project || recentDirectoryId === undefined) {
    throw "No project has been selected";
  }

  const projectDirectoryHandle = useLiveQuery(async () => {
    const recentProject = await db.recentDirectories.get(recentDirectoryId);
    return recentProject?.fileSystemDirectoryHandle;
  });

  // TODO
  // if (!projectDirectoryHandle) {
  //   throw "No project handle found in database";
  // }

  return projectDirectoryHandle;
};

export default useProjectDirectoryHandle;
