import { useContext } from "react";
import CaptureContext from "../../../context/CaptureContext/CaptureContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import "./PreviewToolbar.css";
import { UiActionIcon } from "../../ui/UiActionIcon/UiActionIcon";

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
    <Toolbar className="preview-toolbar">
      <ToolbarItem align={ToolbarItemAlign.CENTER}>
        <UiActionIcon icon={IconName.CAPTURE} onClick={handleClickCaptureButton} captureButton>
          Capture Frame
        </UiActionIcon>
      </ToolbarItem>
    </Toolbar>
  );
};
