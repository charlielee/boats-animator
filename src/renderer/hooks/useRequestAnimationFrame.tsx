import { useEffect, useRef } from "react";

const useRequestAnimationFrame = (
  stopped: boolean,
  callback: (time: DOMHighResTimeStamp) => void
) => {
  const requestId = useRef<number>();

  const animate = (time: DOMHighResTimeStamp) => {
    requestId.current = requestAnimationFrame(animate);
    callback(time);
  };

  useEffect(() => {
    requestId.current = requestAnimationFrame(animate);
    return () => {
      console.log("return");
      cancelAnimationFrame(requestId.current ?? 0);
    };
  }, [stopped]);
};

export default useRequestAnimationFrame;
