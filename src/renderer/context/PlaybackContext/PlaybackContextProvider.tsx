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
  const [liveViewVisible, setLiveViewVisible] = useState(true);

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
          _updateFrameIndex(startTimelineIndex);
          break;
        case lastFrameIndex.current:
          stopPlayback();
          break;
        default:
          _updateFrameIndex(animationFrameIndex.current + 1);
          break;
      }
    }
  });

  const startPlayback = () => {
    _logPlayback("playback.startPlayback");
    if (playForDuration > 0) {
      lastFrameIndex.current = startTimelineIndex + playForDuration - 1;
      start();
      setLiveViewVisible(false);
    }
  };

  const stopPlayback = () => {
    _logPlayback("playback.stopPlayback");
    stop();
    if (returnToLiveView) {
      _updateFrameIndex(undefined);
      setLiveViewVisible(true);
    }
  };

  const displayFrame = (i: TimelineIndex | undefined) => {
    _logPlayback("playback.displayFrame");
    _updateFrameIndex(i);
    setLiveViewVisible(false);
  };

  const _updateFrameIndex = (i: TimelineIndex | undefined) => {
    animationFrameIndex.current = i;
    setTimelineIndex(i);
  };

  const _logPlayback = (loggingCode: string) =>
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
    displayFrame,
    timelineIndex,
    liveViewVisible,
  };

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
};

export default PlaybackContextProvider;
