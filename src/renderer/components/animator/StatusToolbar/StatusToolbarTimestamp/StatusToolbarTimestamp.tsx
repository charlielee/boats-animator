import { useState } from "react";
import { TimelineIndex } from "../../../../../common/Flavors";
import { Take } from "../../../../../common/project/Take";
import PlaybackContext from "../../../../context/PlaybackContext/PlaybackContext";
import { getTrackLength } from "../../../../services/project/projectCalculator";
import Button from "../../../common/Button/Button";
import { ButtonColor } from "../../../common/Button/ButtonColor";

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
  const [showInSeconds, setShowInSeconds] = useState(false);

  const secondsText = "00:00.00 / 00:09.83";

  const frameText = [
    "Frame",
    timelineIndex === undefined ? getTrackLength(take.frameTrack) + 1 : timelineIndex + 1,
    "of",
    getTrackLength(take.frameTrack),
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
