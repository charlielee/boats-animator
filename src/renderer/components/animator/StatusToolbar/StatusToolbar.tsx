import { TimelineIndex } from "../../../../common/Flavors";
import { PageRoute } from "../../../../common/PageRoute";
import { Take } from "../../../../common/project/Take";
import { zeroPad } from "../../../../common/utils";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { getTrackLength } from "../../../services/project/projectCalculator";
import Button from "../../common/Button/Button";
import { ButtonColor } from "../../common/Button/ButtonColor";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";

interface StatusToolbarWithContextProps {
  take: Take;
}

interface StatusToolbarProps extends StatusToolbarWithContextProps {
  timelineIndex: TimelineIndex | undefined;
}

const StatusToolbar = ({ take, timelineIndex }: StatusToolbarProps): JSX.Element => {
  const makeTakeTitle = (take: Take) =>
    `Shot ${zeroPad(take.shotNumber, 3)} Take ${zeroPad(take.takeNumber, 2)}`;

  return (
    <Toolbar>
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <Button
          title={makeTakeTitle(take)}
          onClick={PageRoute.STARTUP_MODAL}
          color={ButtonColor.TRANSPARENT}
        />
      </ToolbarItem>
      <ToolbarItem align={ToolbarItemAlign.CENTER}>
        Frame{" "}
        {timelineIndex === undefined ? getTrackLength(take.frameTrack) + 1 : timelineIndex + 1} of{" "}
        {getTrackLength(take.frameTrack)}
      </ToolbarItem>
      <ToolbarItem stretch align={ToolbarItemAlign.RIGHT}>
        {take.frameRate} FPS
      </ToolbarItem>
    </Toolbar>
  );
};

const StatusToolbarWithContext = (props: StatusToolbarWithContextProps) => (
  <PlaybackContext.Consumer>
    {(value) => <StatusToolbar {...value} {...props} />}
  </PlaybackContext.Consumer>
);

export default StatusToolbarWithContext;
