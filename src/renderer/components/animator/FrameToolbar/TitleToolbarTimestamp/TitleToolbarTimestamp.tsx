import { Tooltip } from "@mantine/core";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { TimelineIndex } from "../../../../../common/Flavors";
import { Take } from "../../../../../common/project/Take";
import { buildStartTimeCode } from "../../../../../common/timeUtils";
import PlaybackContext from "../../../../context/PlaybackContext/PlaybackContext";
import { RootState } from "../../../../redux/store";
import { getTrackLength } from "../../../../services/project/projectCalculator";
import { SemanticColor } from "../../../ui/Theme/SemanticColor";
import { UiButton } from "../../../ui/UiButton/UiButton";

interface TitleToolbarTimestampProps {
  take: Take;
}

export const TitleToolbarTimestamp = ({ take }: TitleToolbarTimestampProps) => {
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
        semanticColor={SemanticColor.TITLE}
      >
        {showInSeconds ? secondsText : frameText}
      </UiButton>
    </Tooltip>
  );
};
