import { useContext } from "react";
import CaptureContext from "../../../context/CaptureContext/CaptureContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import "./CaptureButtonToolbar.css";

export const CaptureButtonToolbar = (): JSX.Element => {
  const { takePhoto } = useContext(CaptureContext);
  const { stopPlayback, liveViewVisible } = useContext(PlaybackContext);

  return (
    <Toolbar className="capture-button-toolbar">
      <ToolbarItem align={ToolbarItemAlign.CENTER}>
        <IconButton
          title="Capture Frame"
          icon={IconName.CAPTURE}
          className="animation-toolbar__capture-button"
          onClick={() => {
            if (!liveViewVisible) {
              stopPlayback();
            }
            takePhoto();
          }}
        />
      </ToolbarItem>
    </Toolbar>
  );
};
