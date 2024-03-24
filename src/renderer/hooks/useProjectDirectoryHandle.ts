import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/database/Database";

const useProjectDirectoryHandle = () => {
  const { project } = useSelector((state: RootState) => state.project);

  if (!project) {
    throw "No project has been selected";
  }

  const projectDirectoryHandle = useLiveQuery(async () => {
    const recentProject = await db.recentDirectories.get(project.id);
    return recentProject?.fileSystemDirectoryHandle;
  });

  // if (!projectDirectoryHandle) {
  //   throw "No project handle found in database";
  // }

  return projectDirectoryHandle;
};

export default useProjectDirectoryHandle;
