import { useState } from "react";
import { TimelineIndex } from "../../../../../common/Flavors";
import { Take } from "../../../../../common/project/Take";
import PlaybackContext from "../../../../context/PlaybackContext/PlaybackContext";
import { getTrackLength } from "../../../../services/project/projectCalculator";
import Button from "../../../common/Button/Button";
import { ButtonColor } from "../../../common/Button/ButtonColor";
import { buildStartTimeCode } from "../../../../../common/timeUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

interface StatusToolbarTimestampWithContextProps {
  take: Take;
}

interface StatusToolbarTimestampProps extends StatusToolbarTimestampWithContextProps {
  timelineIndex: TimelineIndex | undefined;
}

const StatusToolbarTimestamp = ({
  take,
  timelineIndex,
}: StatusToolbarTimestampProps): JSX.Element => {
  const { showTimestampInSeconds } = useSelector((state: RootState) => state.app.userPreferences);
  const [showInSeconds, setShowInSeconds] = useState(showTimestampInSeconds);

  const trackLength = getTrackLength(take.frameTrack);
  const secondsText = [
    buildStartTimeCode(timelineIndex ?? (trackLength as TimelineIndex), take.frameRate),
    "/",
    buildStartTimeCode(trackLength as TimelineIndex, take.frameRate),
  ].join(" ");
  const frameText = [
    "Frame",
    timelineIndex === undefined ? trackLength + 1 : timelineIndex + 1,
    "of",
    trackLength,
  ].join(" ");

  return (
    <Button
      label={showInSeconds ? secondsText : frameText}
      title={showInSeconds ? "Show timestamp in frames" : "Show timestamp in seconds"}
      onClick={() => setShowInSeconds((prevState) => !prevState)}
      color={ButtonColor.TRANSPARENT}
    />
  );
};

const StatusToolbarTimestampWithContext = (props: StatusToolbarTimestampWithContextProps) => (
  <PlaybackContext.Consumer>
    {(value) => <StatusToolbarTimestamp timelineIndex={value.timelineIndex} {...props} />}
  </PlaybackContext.Consumer>
);

export default StatusToolbarTimestampWithContext;
