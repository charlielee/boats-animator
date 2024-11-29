import { Group, useMantineTheme } from "@mantine/core";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { RootState } from "../../../redux/store";
import { getTrackLength } from "../../../services/project/projectCalculator";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import { ThemeWithOther } from "../../ui/Theme/Theme";
import { TitleToolbarTimestamp } from "./TitleToolbarTimestamp/TitleToolbarTimestamp";
import useProjectAndTake from "../../../hooks/useProjectAndTake";

export const FrameToolbar = (): JSX.Element => {
  const theme: ThemeWithOther = useMantineTheme();

  const { take } = useProjectAndTake();

  const { liveViewVisible, timelineIndex } = useContext(PlaybackContext);
  const frameTrack = useSelector((state: RootState) => state.project.take?.frameTrack);
  if (frameTrack === undefined) {
    throw "No frame track found in FrameToolbar";
  }

  return (
    <Group py="sm" px="md" style={{ borderTop: theme.other.border }}>
      <TitleToolbarTimestamp take={take} />
      <IconButton
        title={
          timelineIndex === undefined ? "Undo Last Frame" : `Delete Frame ${timelineIndex + 1}`
        }
        icon={liveViewVisible ? IconName.UNDO : IconName.DELETE}
        onClick={
          getTrackLength(frameTrack) === 0 ? () => undefined : PageRoute.ANIMATOR_DELETE_FRAME
        }
      />
    </Group>
  );
};
