import { useContext } from "react";
import CaptureContext from "../../../context/CaptureContext/CaptureContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import "./PreviewToolbar.css";

export const PreviewToolbar = (): JSX.Element => {
  const { captureImage } = useContext(CaptureContext);
  const { stopPlayback, liveViewVisible } = useContext(PlaybackContext);

  return (
    <Toolbar className="preview-toolbar">
      <ToolbarItem align={ToolbarItemAlign.CENTER}>
        <IconButton
          title="Capture Frame"
          icon={IconName.CAPTURE}
          className="animation-toolbar__capture-button"
          onClick={() => {
            if (!liveViewVisible) {
              stopPlayback();
            }
            captureImage();
          }}
        />
      </ToolbarItem>
    </Toolbar>
  );
};
