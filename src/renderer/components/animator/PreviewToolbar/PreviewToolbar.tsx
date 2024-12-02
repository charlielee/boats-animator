import { Flex, Group } from "@mantine/core";
import { useContext } from "react";
import CaptureContext from "../../../context/CaptureContext/CaptureContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import IconName from "../../common/Icon/IconName";
import { UiActionIcon, UiActionIconRole } from "../../ui/UiActionIcon/UiActionIcon";
import { PreviewToolbarPlayback } from "./PreviewToolbarPlayback/PreviewToolbarPlayback";
import { PreviewToolbarPlaybackSettings } from "./PreviewToolbarPlaybackSettings/PreviewToolbarPlaybackSettings";
import { useDispatch, useSelector } from "react-redux";
import { setPreviewToolbarTab } from "../../../redux/slices/projectSlice";
import { RootState } from "../../../redux/store";

export const enum PreviewToolbarTab {
  FRAME = "FRAME",
  PLAYBACK = "PLAYBACK",
  GRID = "GRID",
  ASPECT_RATIO = "ASPECT_RATIO",
  ONION_SKIN = "ONION_SKIN",
}

export const PreviewToolbar = (): JSX.Element => {
  const { captureImage } = useContext(CaptureContext);
  const { stopPlayback, liveViewVisible } = useContext(PlaybackContext);
  const previewToolbarTab = useSelector((state: RootState) => state.project.previewToolbarTab);
  const dispatch = useDispatch();

  const handleClickCaptureButton = () => {
    if (!liveViewVisible) {
      stopPlayback();
    }
    captureImage();
  };

  const handleSelectTab = (tabName: PreviewToolbarTab) => dispatch(setPreviewToolbarTab(tabName));

  return (
    <Group py="sm" px="md" align="flex-end">
      <Group flex={1}>
        <UiActionIcon
          active={previewToolbarTab === PreviewToolbarTab.FRAME}
          icon={IconName.FRAME}
          onClick={() => handleSelectTab(PreviewToolbarTab.FRAME)}
        >
          Frame
        </UiActionIcon>
        <PreviewToolbarPlaybackSettings />
        <UiActionIcon
          active={previewToolbarTab === PreviewToolbarTab.GRID}
          icon={IconName.GRID}
          onClick={() => handleSelectTab(PreviewToolbarTab.GRID)}
        >
          Grid Overlay
        </UiActionIcon>
        <UiActionIcon
          active={previewToolbarTab === PreviewToolbarTab.ASPECT_RATIO}
          icon={IconName.ASPECT_RATIO}
          onClick={() => handleSelectTab(PreviewToolbarTab.ASPECT_RATIO)}
        >
          Aspect Ratio Overlay
        </UiActionIcon>
        <UiActionIcon
          active={previewToolbarTab === PreviewToolbarTab.ONION_SKIN}
          icon={IconName.ONION_SKIN}
          onClick={() => handleSelectTab(PreviewToolbarTab.ONION_SKIN)}
        >
          Onion Skin
        </UiActionIcon>
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
