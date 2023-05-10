import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useProjectAndTake = () => {
  const { project, take } = useSelector((state: RootState) => state.project);

  if (!project) {
    throw "No project has been selected";
  }

  if (!take) {
    throw "No take has been selected";
  }

  return { project, take };
};

export default useProjectAndTake;
