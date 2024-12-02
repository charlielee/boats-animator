import { Flex, Group } from "@mantine/core";
import { useContext } from "react";
import CaptureContext from "../../../context/CaptureContext/CaptureContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import IconName from "../../common/Icon/IconName";
import { UiActionIcon, UiActionIconRole } from "../../ui/UiActionIcon/UiActionIcon";
import { PreviewToolbarPlayback } from "./PreviewToolbarPlayback/PreviewToolbarPlayback";
import { PreviewToolbarPlaybackSettings } from "./PreviewToolbarPlaybackSettings/PreviewToolbarPlaybackSettings";

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
    <Group py="sm" px="md" align="flex-end">
      <Group flex={1}>
        <PreviewToolbarPlaybackSettings />
        <UiActionIcon icon={IconName.GRID}>Grid Overlay</UiActionIcon>
        <UiActionIcon icon={IconName.ASPECT_RATIO}>Aspect Ratio Overlay</UiActionIcon>
        <UiActionIcon icon={IconName.ONION_SKIN}>Onion Skin</UiActionIcon>
      </Group>
      <UiActionIcon
        icon={IconName.CAPTURE}
        onClick={handleClickCaptureButton}
        role={UiActionIconRole.CAPTURE}
      >
        Capture Frame
      </UiActionIcon>
      <Flex flex={1} justify="flex-end">
        <PreviewToolbarPlayback />
      </Flex>
    </Group>
  );
};
