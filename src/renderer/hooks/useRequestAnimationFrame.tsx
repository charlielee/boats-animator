import { useRef } from "react";

const useRequestAnimationFrame = (
  callback: (time: DOMHighResTimeStamp) => void
) => {
  const requestId = useRef<number>();

  const animate = (time: DOMHighResTimeStamp) => {
    requestId.current = requestAnimationFrame(animate);
    callback(time);
  };

  const start = () => {
    requestId.current = requestAnimationFrame(animate);
  };

  const stop = () => {
    cancelAnimationFrame(requestId.current ?? 0);
  };

  return [start, stop];
};

export default useRequestAnimationFrame;
