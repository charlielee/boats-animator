import { useDispatch } from "react-redux";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { takePhoto } from "../../../redux/capture/actions";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../common/ToolbarItem/ToolbarItem";
import "./CaptureButtonToolbar.css";

interface CaptureToolbarProps {
  stopPlayback: () => void;
  isPlaying: boolean;
}

const CaptureButtonToolbar = ({
  stopPlayback,
  isPlaying,
}: CaptureToolbarProps): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <Toolbar className="capture-button-toolbar">
      <ToolbarItem align={ToolbarItemAlign.CENTER}>
        <IconButton
          title="Capture Frame"
          icon={IconName.CAPTURE}
          className="animation-toolbar__capture-button"
          onClick={() => {
            if (isPlaying) {
              stopPlayback();
            }
            dispatch(takePhoto());
          }}
        />
      </ToolbarItem>
    </Toolbar>
  );
};

const CaptureButtonToolbarWithContext = (): JSX.Element => (
  <PlaybackContext.Consumer>
    {(value) => <CaptureButtonToolbar {...value} />}
  </PlaybackContext.Consumer>
);

export default CaptureButtonToolbarWithContext;
