import { Flex, Group } from "@mantine/core";
import { useContext } from "react";
import CaptureContext from "../../../context/CaptureContext/CaptureContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import IconName from "../../common/Icon/IconName";
import { UiActionIcon } from "../../ui/UiActionIcon/UiActionIcon";
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
    <Group py="sm" px="md" align="flex-end">
      <Flex flex={1}>
        <PreviewToolbarPlayback />
      </Flex>
      <UiActionIcon icon={IconName.CAPTURE} onClick={handleClickCaptureButton} captureButton>
        Capture Frame
      </UiActionIcon>
      <Flex flex={1}></Flex>
    </Group>
  );
};
