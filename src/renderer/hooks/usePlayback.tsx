import { useEffect, useRef, useState } from "react";
import { FrameRate, TimelineIndex } from "../../common/Flavors";
import * as rLogger from "../services/rLogger/rLogger";
import useRequestAnimationFrame from "./useRequestAnimationFrame";

interface UsePlaybackOptions {
  // The zero based index of the first frame to play
  startTimelineIndex: TimelineIndex;
  // The zero based index of the last frame to play
  stopTimelineIndex: TimelineIndex | undefined;
  frameRate: FrameRate;
}

const usePlayback = ({
  startTimelineIndex,
  stopTimelineIndex,
  frameRate,
}: UsePlaybackOptions): [() => void, () => void, TimelineIndex | undefined] => {
  // Note: an `undefined` timeline index indicates the application is showing the live view
  const [timelineIndex, setTimelineIndex] = useState<TimelineIndex | undefined>(
    undefined
  );

  const delay = 1000 / frameRate;
  const previousTime = useRef<number>(0);
  const animationFrameIndex = useRef<number | undefined>(undefined);

  const [start, stop] = useRequestAnimationFrame((newTime) => {
    console.log("animate", animationFrameIndex.current);

    if (animationFrameIndex.current === undefined) {
      throw "Must set animationFrameIndex.current before running";
    }

    // TODO TODO TODO need to handle the first frame

    // if (animationFrameIndex.current === 0) {
    //   previousTime.current = newTime;
    //   return;
    // }

    if (newTime >= previousTime.current + delay) {
      console.log("frame", animationFrameIndex.current);
      previousTime.current = newTime;
      updateFrameIndex(animationFrameIndex.current + 1);
    }

    if (stopTimelineIndex && animationFrameIndex.current > stopTimelineIndex) {
      stopPlayback();
    }
  });

  const startPlayback = () => {
    logPlayback("usePlayback.startPlayback");
    if (stopTimelineIndex) {
      updateFrameIndex(0);
      start();
    }
  };

  const stopPlayback = () => {
    logPlayback("usePlayback.stopPlayback");
    stop();
    updateFrameIndex(undefined);
  };

  const updateFrameIndex = (i: number | undefined) => {
    animationFrameIndex.current = i;
    setTimelineIndex(i);
  };

  const logPlayback = (loggingCode: string) =>
    rLogger.info(loggingCode, {
      startTimelineIndex,
      stopTimelineIndex: stopTimelineIndex ?? "(no frames captured)",
      frameRate,
      timelineIndex: animationFrameIndex.current ?? "(showing live view)",
    });

  useEffect(() => {
    console.log("timelineIndex", timelineIndex);
  }, [timelineIndex]);

  return [startPlayback, stopPlayback, timelineIndex];
};

export default usePlayback;
