import { Flex, Group } from "@mantine/core";
import { useContext } from "react";
import CaptureContext from "../../../context/CaptureContext/CaptureContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import IconName from "../../common/Icon/IconName";
import { UiActionIcon, UiActionIconRole } from "../../ui/UiActionIcon/UiActionIcon";
import { PreviewToolbarOverlayTabs } from "./PreviewToolbarOverlayTabs/PreviewToolbarOverlayTabs";
import { PreviewToolbarPlayback } from "./PreviewToolbarPlayback/PreviewToolbarPlayback";

export const PreviewToolbar = (): JSX.Element => {
  const { captureImage } = useContext(CaptureContext);
  const { stopPlayback, liveViewVisible } = useContext(PlaybackContext);

  const handleClickCaptureButton = () => {
    if (!liveViewVisible) {
      stopPlayback();
    }
    captureImage();
  };

  return (
    <Group align="flex-start">
      <Flex flex={1}>
        <PreviewToolbarOverlayTabs />
      </Flex>
      <UiActionIcon
        icon={IconName.CAPTURE}
        onClick={handleClickCaptureButton}
        role={UiActionIconRole.CAPTURE}
      >
        Capture Frame
      </UiActionIcon>
      <Flex flex={1} justify="flex-end" py="sm" px="md">
        <PreviewToolbarPlayback />
      </Flex>
    </Group>
  );
};
