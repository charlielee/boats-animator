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

const PlaybackContextProvider = ({
  take,
  children,
}: PlaybackContextProviderProps) => {
  const playForDuration = getTrackLength(take.frameTrack);

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
          _updateFrameIndex(0);
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
      lastFrameIndex.current = playForDuration - 1;
      start();
      setLiveViewVisible(false);
    }
  };

  const stopPlayback = () => {
    _logPlayback("playback.stopPlayback");
    stop();
    _updateFrameIndex(undefined);
    setLiveViewVisible(true);
  };

  const displayFrame = (i: TimelineIndex | undefined) => {
    _logPlayback("playback.displayFrame");
    if (i === undefined) {
      stopPlayback();
    } else {
      _updateFrameIndex(i);
      setLiveViewVisible(false);
    }
  };

  const displayFirstFrame = () => displayFrame(0);

  const displayPreviousFrame = () => {
    if (timelineIndex === undefined) {
      return displayFrame(playForDuration - 1);
    }
    if (timelineIndex > 0) {
      return displayFrame(timelineIndex - 1);
    }
  };

  const displayNextFrame = () => {
    if (timelineIndex === playForDuration - 1) {
      return displayFrame(undefined);
    }
    if (timelineIndex !== undefined) {
      return displayFrame(timelineIndex + 1);
    }
  };

  const displayLastFrame = () => {
    if (timelineIndex === playForDuration - 1) {
      return displayFrame(undefined);
    }
    if (timelineIndex !== undefined) {
      return displayFrame(playForDuration - 1);
    }
  };

  const _updateFrameIndex = (i: TimelineIndex | undefined) => {
    animationFrameIndex.current = i;
    setTimelineIndex(i);
  };

  const _logPlayback = (loggingCode: string) =>
    rLogger.info(loggingCode, {
      playForDuration,
      frameRate: take.frameRate,
      timelineIndex: animationFrameIndex.current ?? "(showing live view)",
    });

  const value: PlaybackContextProps = {
    startPlayback,
    stopPlayback,
    displayFrame,
    displayFirstFrame,
    displayPreviousFrame,
    displayNextFrame,
    displayLastFrame,
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
