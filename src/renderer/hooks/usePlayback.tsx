import { useEffect, useRef, useState } from "react";
import { FrameNumber, FrameRate } from "../../common/Flavors";
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

  useEffect(() => {
    if (currentPlayFrame === stopFrame) {
      stop();
    }
  }, [currentPlayFrame]);

  return [start, stop, currentPlayFrame];
};

export default usePlayback;
