import CaptureContext from "../../../context/CaptureContext/CaptureContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../common/ToolbarItem/ToolbarItem";
import "./CaptureButtonToolbar.css";

interface CaptureToolbarProps {
  takePhoto: () => void;
  stopPlayback: () => void;
  liveViewVisible: boolean;
}

const CaptureButtonToolbar = ({
  takePhoto,
  stopPlayback,
  liveViewVisible,
}: CaptureToolbarProps): JSX.Element => (
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

const CaptureButtonToolbarWithContext = (): JSX.Element => (
  <CaptureContext.Consumer>
    {({ takePhoto }) => (
      <PlaybackContext.Consumer>
        {({ stopPlayback, liveViewVisible }) => (
          <CaptureButtonToolbar
            takePhoto={takePhoto}
            stopPlayback={stopPlayback}
            liveViewVisible={liveViewVisible}
          />
        )}
      </PlaybackContext.Consumer>
    )}
  </CaptureContext.Consumer>
);

export default CaptureButtonToolbarWithContext;
