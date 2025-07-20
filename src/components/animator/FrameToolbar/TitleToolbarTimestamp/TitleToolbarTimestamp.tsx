import { Tooltip } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { usePlaybackContext } from "../../../../context/PlaybackContext/PlaybackContext";
import { RootState } from "../../../../redux/store";
import { getTrackLength } from "../../../../services/project/projectCalculator";
import { SemanticColor } from "../../../ui/Theme/SemanticColor";
import { UiButton } from "../../../ui/UiButton/UiButton";
import { TimelineIndex } from "../../../../services/Flavors";
import { Take } from "../../../../services/project/types";
import { buildStartTimeCode } from "../../../../services/timeUtils";

interface TitleToolbarTimestampProps {
  take: Take;
}

export const TitleToolbarTimestamp = ({ take }: TitleToolbarTimestampProps) => {
  const { timelineIndex } = usePlaybackContext();
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
