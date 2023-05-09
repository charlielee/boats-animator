import { FrameRate, TimelineIndex } from "./Flavors";
import { zeroPad } from "./utils";

export const secondsToTimeCode = (seconds: number, showDecimal = true) => {
  const roundedSeconds = seconds.toFixed(showDecimal ? 3 : 0);
  const [fullSeconds, millisecondComponent] = roundedSeconds.split(".");

  const minuteComponent = Math.floor(parseInt(fullSeconds, 10) / 60);
  const secondComponent = parseInt(fullSeconds, 10) % 60;
  const paddedMinutesAndSeconds = `${zeroPad(minuteComponent, 2)}:${zeroPad(secondComponent, 2)}`;

  return showDecimal
    ? `${paddedMinutesAndSeconds}.${millisecondComponent}`
    : paddedMinutesAndSeconds;
};

export const buildStartTimeCode = (
  framePosition: TimelineIndex,
  frameRate: FrameRate,
  showDecimal?: boolean
) => {
  const timeInSeconds = framePosition / frameRate;
  return secondsToTimeCode(timeInSeconds, showDecimal);
};
