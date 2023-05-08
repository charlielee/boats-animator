import { TimelineIndex } from "../../../../common/Flavors";
import { Take } from "../../../../common/project/Take";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { getTrackLength } from "../../../services/project/projectCalculator";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import "./StatusToolbar.css";

interface StatusToolbarWithContextProps {
  take: Take;
}

interface StatusToolbarProps extends StatusToolbarWithContextProps {
  timelineIndex: TimelineIndex | undefined;
}

const StatusToolbar = ({ take, timelineIndex }: StatusToolbarProps): JSX.Element => (
  <Toolbar className="status-toolbar">
    <ToolbarItem align={ToolbarItemAlign.CENTER}>
      <div>
        Frame{" "}
        {timelineIndex === undefined ? getTrackLength(take.frameTrack) + 1 : timelineIndex + 1} of{" "}
        {getTrackLength(take.frameTrack)}
      </div>
    </ToolbarItem>
  </Toolbar>
);

const StatusToolbarWithContext = (props: StatusToolbarWithContextProps) => (
  <PlaybackContext.Consumer>
    {(value) => <StatusToolbar timelineIndex={value.timelineIndex} {...props} />}
  </PlaybackContext.Consumer>
);

export default StatusToolbarWithContext;
