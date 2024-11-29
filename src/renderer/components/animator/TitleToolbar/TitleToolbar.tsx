import { Flex, Group, Title, Tooltip } from "@mantine/core";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { Take } from "../../../../common/project/Take";
import { zeroPad } from "../../../../common/utils";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import { toggleCapturePane } from "../../../redux/slices/projectSlice";
import { RootState } from "../../../redux/store";
import IconName from "../../common/Icon/IconName";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiActionIcon } from "../../ui/UiActionIcon/UiActionIcon";
import { UiButton } from "../../ui/UiButton/UiButton";
import "./TitleToolbar.css";
import { displayProjectTitle } from "../../../services/project/projectBuilder";

const TitleToolbar = (): JSX.Element => {
  const { take, project } = useProjectAndTake();
  const dispatch = useDispatch();
  const showCapturePane = useSelector((state: RootState) => state.project.showCapturePane);
  const { deviceIdentifier } = useContext(ImagingDeviceContext);

  const makeTakeTitle = (take: Take) =>
    `Shot ${zeroPad(take.shotNumber, 3)} Take ${zeroPad(take.takeNumber, 2)}`;

  return (
    <Group py="sm" px="md" style={{ backgroundColor: "black" }}>
      <Flex flex={1}>
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
          active={deviceIdentifier !== undefined}
        >
          {showCapturePane ? "Close Capture Settings" : "Open Capture Settings"}
        </UiActionIcon>

        <UiActionIcon icon={IconName.VIDEO} onClick={PageRoute.ANIMATOR_EXPORT_VIDEO_MODAL}>
          Export Video
        </UiActionIcon>
      </Flex>
    </Group>
  );
};

export default TitleToolbar;
