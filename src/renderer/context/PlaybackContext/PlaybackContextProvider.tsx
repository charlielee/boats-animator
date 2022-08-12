import { ReactNode, useRef, useState } from "react";
import { TimelineIndex } from "../../../common/Flavors";
import { getTrackLength, Take } from "../../../common/Project";
import useRequestAnimationFrame from "../../hooks/useRequestAnimationFrame";
import * as rLogger from "../../services/rLogger/rLogger";
import PlaybackContext, { PlaybackContextProps } from "./PlaybackContext";

interface PlaybackContextProviderProps {
  take: Take;
  children: ReactNode;
}

// interface UsePlaybackOptions {
//   // The zero based index of the first frame to play
//   startTimelineIndex: TimelineIndex;
//   // How many frames to playback
//   playForDuration: FrameCount;
//   // Should playback stop at the last frame or return to the live view?
//   returnToLiveView: boolean;
//   frameRate: FrameRate;
// }

const PlaybackContextProvider = ({
  take,
  children,
}: PlaybackContextProviderProps) => {
  const startTimelineIndex = 0;
  const playForDuration = getTrackLength(take.frameTrack);
  const returnToLiveView = true;

  // Note: an `undefined` timeline index indicates the application is showing the live view
  const [timelineIndex, setTimelineIndex] = useState<TimelineIndex | undefined>(
    undefined
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const delay = 1000 / take.frameRate;
  const previousTime = useRef<number>(0);
  const animationFrameIndex = useRef<TimelineIndex | undefined>(undefined);
  const lastFrameIndex = useRef<TimelineIndex>(0);

  const [start, stop] = useRequestAnimationFrame((newTime) => {
    if (
      animationFrameIndex.current === undefined ||
      newTime >= previousTime.current + delay
    ) {
      previousTime.current = newTime;

      switch (animationFrameIndex.current) {
        case undefined:
          updateFrameIndex(startTimelineIndex);
          break;
        case lastFrameIndex.current:
          stopPlayback();
          break;
        default:
          updateFrameIndex(animationFrameIndex.current + 1);
          break;
      }
    }
  });

  const startPlayback = () => {
    logPlayback("usePlayback.startPlayback");
    if (playForDuration > 0 && !isPlaying) {
      lastFrameIndex.current = startTimelineIndex + playForDuration - 1;
      start();
      setIsPlaying(true);
    }
  };

  const stopPlayback = () => {
    logPlayback("usePlayback.stopPlayback");
    stop();
    setIsPlaying(false);
    if (returnToLiveView) {
      updateFrameIndex(undefined);
    }
  };

  const updateFrameIndex = (i: number | undefined) => {
    animationFrameIndex.current = i;
    setTimelineIndex(i);
  };

  const logPlayback = (loggingCode: string) =>
    rLogger.info(loggingCode, {
      startTimelineIndex,
      playForDuration,
      returnToLiveView,
      frameRate: take.frameRate,
      timelineIndex: animationFrameIndex.current ?? "(showing live view)",
    });

  const value: PlaybackContextProps = {
    startPlayback,
    stopPlayback,
    timelineIndex,
    isPlaying,
  };

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
};

export default PlaybackContextProvider;
