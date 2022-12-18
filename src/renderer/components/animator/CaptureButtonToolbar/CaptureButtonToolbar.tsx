import { useDispatch } from "react-redux";
import { TimelineIndex } from "../../../../common/Flavors";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { isLiveView } from "../../../context/PlaybackContext/timelineIndexCalculator";
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
  timelineIndex: TimelineIndex | undefined;
}

const CaptureButtonToolbar = ({
  stopPlayback,
  timelineIndex,
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
            if (!isLiveView(timelineIndex)) {
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
    {(value) => (
      <CaptureButtonToolbar
        {...value}
        timelineIndex={value.state.timelineIndex}
      />
    )}
  </PlaybackContext.Consumer>
);

export default CaptureButtonToolbarWithContext;
