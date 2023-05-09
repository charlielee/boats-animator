import { FrameRate, TimelineIndex } from "./Flavors";
import { zeroPad } from "./utils";

export const secondsToTimeCode = (seconds: number) => {
  const minuteComponent = (seconds - (seconds % 60)) / 60;
  const secondComponent = seconds % 60;

  return [zeroPad(minuteComponent, 2), zeroPad(secondComponent, 2)].join(":");
};

export const buildTimeCode = (framePosition: TimelineIndex, frameRate: FrameRate) => {
  const timeInSeconds = framePosition / frameRate;
  return secondsToTimeCode(timeInSeconds);
};
