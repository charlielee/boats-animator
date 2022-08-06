import { useRef, useState } from "react";
import { FrameRate, TimelineIndex } from "../../common/Flavors";
import * as rLogger from "../services/rLogger/rLogger";
import useRequestAnimationFrame from "./useRequestAnimationFrame";

interface UsePlaybackOptions {
  startTimelineIndex: TimelineIndex;
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
  // const animationFrameNumber = useRef<number>(0);
  const animationFrameIndex = useRef<number | undefined>(undefined);

  const [start, stop] = useRequestAnimationFrame((newTime) => {
    console.log("animate", newTime);

    if (animationFrameIndex.current === undefined) {
      throw "Must set animationFrameIndex.current before running";
    }

    if (newTime >= previousTime.current + delay) {
      previousTime.current = newTime;
      // animationFrameIndex.current += 1;
      console.log("frame", animationFrameIndex.current);
      updateFrameIndex(animationFrameIndex.current + 1);
      // setTimelineIndex(animationFrameIndex.current);
      // animationFrameNumber.current += 1;
    }

    if (stopTimelineIndex && animationFrameIndex.current > stopTimelineIndex) {
      console.log("stopped");
      updateFrameIndex(undefined);
      stop();
    }
  });

  const startPlayback = () => {
    if (stopTimelineIndex) {
      // animationFrameIndex.current = startTimelineIndex;
      updateFrameIndex(0);
      start();
      // timelineIndex
      // setTimelineIndex(0);
    }
    logPlayback("usePlayback.startPlayback");
  };

  const stopPlayback = () => {
    stop();
    // animationFrameIndex.current = stopTimelineIndex;
    updateFrameIndex(undefined);

    // animationFrameNumber.current = 0;
    // setTimelineIndex(undefined);
    logPlayback("usePlayback.stopPlayback");
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

  // useEffect(() => {
  //   console.log("timelineIndex", timelineIndex);
  //   if (
  //     timelineIndex.current === undefined ||
  //     (stopTimelineIndex && timelineIndex.current >= stopTimelineIndex)
  //   ) {
  //     stopPlayback();
  //   }
  // }, [timelineIndex.current]);

  return [startPlayback, stopPlayback, timelineIndex];
};

export default usePlayback;
