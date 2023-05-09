import { FrameRate, TimelineIndex } from "./Flavors";
import { zeroPad } from "./utils";

export const secondsToTimeCode = (seconds: number, showDecimal = true) => {
  const minuteComponent = Math.floor(seconds / 60);
  const secondComponent = Math.floor(seconds % 60);
  const decimalComponent = Math.round(((seconds % 60) % 1) * 1000);

  return [
    zeroPad(minuteComponent, 2),
    `:${zeroPad(secondComponent, 2)}`,
    showDecimal ? `.${zeroPad(decimalComponent, 3)}` : undefined,
  ].join("");
};

export const buildTimeCode = (
  framePosition: TimelineIndex,
  frameRate: FrameRate,
  showDecimal?: boolean
) => {
  const timeInSeconds = framePosition / frameRate;
  return secondsToTimeCode(timeInSeconds, showDecimal);
};
