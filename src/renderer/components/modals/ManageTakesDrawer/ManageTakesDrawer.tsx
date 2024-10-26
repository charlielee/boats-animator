import { useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { UiDrawer } from "../../ui/UiDrawer/UiDrawer";
import { RootState } from "../../../redux/store";

export const ManageTakesDrawer = () => {
  const project = useSelector((state: RootState) => state.project.project);
  if (project === undefined) {
    throw "ManageTakesDrawer requires a project to be set";
  }

  return (
    <UiDrawer title={project?.name} onClose={PageRoute.ANIMATOR}>
      hi
    </UiDrawer>
  );
};
