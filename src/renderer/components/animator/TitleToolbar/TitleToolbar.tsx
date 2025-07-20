import { Flex, Group, Title, Tooltip } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { Take } from "../../../../common/project/Take";
import { zeroPad } from "../../../../common/utils";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import { toggleCapturePane } from "../../../redux/slices/projectSlice";
import { RootState } from "../../../redux/store";
import { displayProjectTitle } from "../../../services/project/projectBuilder";
import IconName from "../../common/Icon/IconName";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiActionIcon, UiActionIconRole } from "../../ui/UiActionIcon/UiActionIcon";
import { UiButton } from "../../ui/UiButton/UiButton";
import "./TitleToolbar.css";

const TitleToolbar = () => {
  const { take, project } = useProjectAndTake();
  const dispatch = useDispatch();
  const showCapturePane = useSelector((state: RootState) => state.project.showCapturePane);

  const makeTakeTitle = (take: Take) =>
    `Shot ${zeroPad(take.shotNumber, 3)} Take ${zeroPad(take.takeNumber, 2)}`;

  return (
    <Group className="title-toolbar">
      <Flex flex={1} pl="sm" py="sm">
        <Tooltip label="Manage Project">
          <UiButton
            icon={IconName.FOLDER}
            onClick={PageRoute.STARTUP}
            semanticColor={SemanticColor.TITLE}
          >
            {makeTakeTitle(take)}
          </UiButton>
        </Tooltip>
      </Flex>

      <Title order={1} size="h4">
        {displayProjectTitle(project)}
      </Title>

      <Flex flex={1} justify="flex-end">
        <UiActionIcon
          icon={IconName.CAPTURE_SETTINGS}
          onClick={() => dispatch(toggleCapturePane())}
          open={showCapturePane}
          role={UiActionIconRole.TOOLBAR_TAB}
        >
          Capture Settings
        </UiActionIcon>

        <UiActionIcon
          icon={IconName.VIDEO}
          onClick={PageRoute.ANIMATOR_EXPORT_VIDEO_MODAL}
          role={UiActionIconRole.TOOLBAR_TAB}
        >
          Export Video
        </UiActionIcon>
      </Flex>
    </Group>
  );
};

export default TitleToolbar;
