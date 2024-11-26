import { useContext, useState } from "react";
import { TimelineIndex } from "../../../../../common/Flavors";
import { Take } from "../../../../../common/project/Take";
import PlaybackContext from "../../../../context/PlaybackContext/PlaybackContext";
import { getTrackLength } from "../../../../services/project/projectCalculator";
import Button from "../../../common/Button/Button";
import { ButtonColor } from "../../../common/Button/ButtonColor";
import { buildStartTimeCode } from "../../../../../common/timeUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { UiButton } from "../../../ui/UiButton/UiButton";
import IconName from "../../../common/Icon/IconName";
import { SemanticColor } from "../../../ui/Theme/SemanticColor";
import { Tooltip } from "@mantine/core";

interface TitleToolbarTimestampProps {
  take: Take;
}

export const TitleToolbarTimestamp = ({ take }: TitleToolbarTimestampProps): JSX.Element => {
  const { timelineIndex } = useContext(PlaybackContext);
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
    <Tooltip label={showInSeconds ? "Show timestamp in frames" : "Show timestamp in seconds"}>
      <UiButton
        onClick={() => setShowInSeconds((prevState) => !prevState)}
        semanticColor={SemanticColor.SECONDARY}
        inToolbar
      >
        {showInSeconds ? secondsText : frameText}
      </UiButton>
    </Tooltip>
  );
};
