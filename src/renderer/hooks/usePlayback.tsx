import { useEffect, useRef, useState } from "react";
import { FrameNumber, FrameRate } from "../../common/Flavors";
import * as rLogger from "../services/rLogger/rLogger";
import useRequestAnimationFrame from "./useRequestAnimationFrame";

interface UsePlaybackOptions {
  startFrame: FrameNumber;
  stopFrame: FrameNumber;
  frameRate: FrameRate;
}

const usePlayback = ({
  startFrame,
  stopFrame,
  frameRate,
}: UsePlaybackOptions): [() => void, () => void, FrameNumber] => {
  const delay = 1000 / frameRate;
  const previousTime = useRef<number>();
  const [currentPlayFrame, setCurrentPlayFrame] = useState(startFrame);

  const [start, stop] = useRequestAnimationFrame((newTime) => {
    if (
      previousTime.current == undefined ||
      newTime >= previousTime.current + delay
    ) {
      previousTime.current = newTime;
      setCurrentPlayFrame((prev) => prev + 1);
    }
  });

  const startPlayback = () => {
    if (stopFrame > 0) {
      start();
    }
    rLogger.info("usePlayback.startPlayback", {
      startFrame,
      stopFrame,
      frameRate,
      currentPlayFrame,
    });
  };

  const stopPlayback = () => {
    stop();
    setCurrentPlayFrame(0);
    rLogger.info("usePlayback.stopPlayback", {
      startFrame,
      stopFrame,
      frameRate,
      currentPlayFrame,
    });
  };

  useEffect(() => {
    if (currentPlayFrame >= stopFrame) {
      stopPlayback();
    }
  }, [currentPlayFrame]);

  return [startPlayback, stopPlayback, currentPlayFrame];
};

export default usePlayback;
