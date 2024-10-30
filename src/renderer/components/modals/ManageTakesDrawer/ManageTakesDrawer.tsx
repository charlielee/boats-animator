import { useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { UiDrawer } from "../../ui/UiDrawer/UiDrawer";
import { RootState } from "../../../redux/store";
import { Divider, Group, NavLink } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Icon from "../../common/Icon/Icon";
import IconName from "../../common/Icon/IconName";
import { zeroPad } from "../../../../common/utils";
import { makeTakeTitle } from "../../../services/project/projectBuilder";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";

export const ManageTakesDrawer = () => {
  const project = useSelector((state: RootState) => state.project.project);
  const take = useSelector((state: RootState) => state.project.take);
  if (project === undefined) {
    throw "ManageTakesDrawer requires a project to be set";
  }

  const navigate = useNavigate();

  return (
    <UiDrawer title={project?.name} onClose={PageRoute.ANIMATOR}>
      <NavLink
        href="#home"
        onClick={() => navigate(PageRoute.STARTUP)}
        label="Home"
        leftSection={<Icon name={IconName.BACK} />}
      />
      <NavLink
        href="#edit-project"
        onClick={() => navigate(PageRoute.ANIMATOR_PROJECT_SETTINGS_MODAL)}
        label="Edit Project"
        leftSection={<Icon name={IconName.SAVE} />}
      />
      <Divider my="lg" />
      <Group justify="space-between">
        <h3>Takes</h3>
        <UiButton icon={IconName.ADD}>Add Take</UiButton>
      </Group>
      {take && (
        <NavLink
          href={`#take-${take.id}`}
          onClick={() => navigate(PageRoute.ANIMATOR)}
          label={makeTakeTitle(take)}
          leftSection={<Icon name={IconName.CIRCLE} />}
          variant="filled"
          active
        />
      )}
    </UiDrawer>
  );
};
