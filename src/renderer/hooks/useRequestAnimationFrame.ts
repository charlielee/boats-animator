import { useRef } from "react";

/**
 * Hook that wraps requestAnimationFrame
 * @param callback Method to run on each RAF loop.
 *                 Note: many React features such as getting states will have unexpected
 *                 behaviour and cannot be used as RAF runs outside of React's loop.
 * @returns
 */
const useRequestAnimationFrame = (callback: (time: DOMHighResTimeStamp) => void) => {
  const requestId = useRef<number>();

  const animate = (time: DOMHighResTimeStamp) => {
    requestId.current = requestAnimationFrame(animate);
    callback(time);
  };

  const startRAF = () => {
    requestId.current = requestAnimationFrame(animate);
  };

  const stopRAF = () => {
    cancelAnimationFrame(requestId.current ?? 0);
  };

  return [startRAF, stopRAF];
};

export default useRequestAnimationFrame;
