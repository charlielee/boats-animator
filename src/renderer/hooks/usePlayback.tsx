import { useRef, useState } from "react";
import { FrameNumber, FrameRate } from "../../common/Flavors";
import useRequestAnimationFrame from "./useRequestAnimationFrame";

const usePlayback = (
  startFrame: FrameNumber,
  frameRate: FrameRate
): [() => void, () => void, FrameNumber] => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayFrame, setCurrentPlayFrame] = useState(startFrame);

  const delay = 1000 / frameRate;
  const previousTime = useRef<number>();

  const start = () => setIsPlaying(true);

  const stop = () => setIsPlaying(false);

  useRequestAnimationFrame(isPlaying, (newTime) => {
    console.log("isPlaying", isPlaying);
    if (
      isPlaying &&
      (previousTime.current == undefined ||
        newTime > previousTime.current + delay)
    ) {
      previousTime.current = newTime;
      setCurrentPlayFrame((prev) => prev + 1);
    }
  });

  return [start, stop, currentPlayFrame];
};

export default usePlayback;
