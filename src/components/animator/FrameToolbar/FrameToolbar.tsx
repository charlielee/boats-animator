import { Group } from "@mantine/core";
import { useContext } from "react";
import { useSelector } from "react-redux";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import { RootState } from "../../../redux/store";
import { getTrackLength } from "../../../services/project/projectCalculator";
import IconName from "../../common/Icon/IconName";
import { UiActionIcon } from "../../ui/UiActionIcon/UiActionIcon";
import { TitleToolbarTimestamp } from "./TitleToolbarTimestamp/TitleToolbarTimestamp";
import { PageRoute } from "../../../services/PageRoute";

export const FrameToolbar = () => {
  const { take } = useProjectAndTake();

  const { liveViewVisible, timelineIndex } = useContext(PlaybackContext);
  const frameTrack = useSelector((state: RootState) => state.project.take?.frameTrack);
  if (frameTrack === undefined) {
    throw "No frame track found in FrameToolbar";
  }

  return (
    <Group
      py="sm"
      px="md"
      style={{
        backgroundColor: "var(--mantine-color-default)",
        borderTop: "var(--ba-theme-border)",
      }}
    >
      <TitleToolbarTimestamp take={take} />
      <UiActionIcon
        icon={liveViewVisible ? IconName.UNDO : IconName.DELETE}
        onClick={
          getTrackLength(frameTrack) === 0 ? () => undefined : PageRoute.ANIMATOR_DELETE_FRAME
        }
      >
        {timelineIndex === undefined ? "Undo Last Frame" : `Delete Frame ${timelineIndex + 1}`}
      </UiActionIcon>
    </Group>
  );
};
