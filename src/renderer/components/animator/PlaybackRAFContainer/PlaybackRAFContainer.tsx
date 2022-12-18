import { useRef } from "react";
import { TimelineIndex } from "../../../../common/Flavors";
import { Take } from "../../../../common/project/Take";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { isLiveView } from "../../../context/PlaybackContext/timelineIndexCalculator";
import useRequestAnimationFrame from "../../../hooks/useRequestAnimationFrame";
import { getTrackLength } from "../../../services/project/projectCalculator";

interface PlaybackRAFContainerWithContextProps {
  take: Take;
}

interface PlaybackRAFContainerProps {
  timelineIndex: TimelineIndex | undefined;
  playing: boolean;
  take: Take;
  playbackSpeed: number;
  setTimelineIndex: (timelineIndex: TimelineIndex) => void;
  stopOrRepeatPlayback: () => void;
}

const PlaybackRAFContainer = ({
  timelineIndex,
  playing,
  take,
  playbackSpeed,
  setTimelineIndex,
  stopOrRepeatPlayback,
}: PlaybackRAFContainerProps): JSX.Element => {
  const runningRAFRef = useRef(false);
  const timelineIndexRef = useRef<TimelineIndex | undefined>(timelineIndex);

  const delay = 1000 / take.frameRate / playbackSpeed;
  const previousTimeRef = useRef<number>(0);
  const lastIndexRef = useRef<TimelineIndex>(0);
  const totalFrames = getTrackLength(take.frameTrack);

  const [startRAF, stopRAF] = useRequestAnimationFrame((newTime) => {
    if (!runningRAFRef.current) {
      previousTimeRef.current = newTime;
      runningRAFRef.current = true;
      lastIndexRef.current = totalFrames - 1;
    }

    if (
      isLiveView(timelineIndexRef.current) ||
      newTime >= previousTimeRef.current + delay
    ) {
      switch (timelineIndexRef.current) {
        case undefined:
          return setTimelineIndex(0);
        case lastIndexRef.current:
          return stopOrRepeatPlayback();
        default:
          setTimelineIndex(timelineIndexRef.current + 1);
      }
    }
  });

  if (playing && !runningRAFRef.current) {
    startRAF();
  }

  if (!playing) {
    runningRAFRef.current = false;
    stopRAF();
  }

  return <></>;
};

const PlaybackRAFContainerWithContext = (
  props: PlaybackRAFContainerWithContextProps
): JSX.Element => (
  <PlaybackContext.Consumer>
    {(value) => (
      <PlaybackRAFContainer
        {...props}
        {...value}
        playing={value.state.playing}
        playbackSpeed={value.state.playbackSpeed}
        timelineIndex={value.state.timelineIndex}
      />
    )}
  </PlaybackContext.Consumer>
);

export default PlaybackRAFContainerWithContext;
