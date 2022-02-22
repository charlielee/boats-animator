import { secondsToTimeCode } from "../../../../../common/utils";
import "./TimelinePosition.css";

interface TimelinePositionProps {
  frameRate: number;
  totalFrames: number;
}

const TimelinePosition = ({
  frameRate,
  totalFrames,
}: TimelinePositionProps): JSX.Element => {
  const frameCount = totalFrames < 30 ? 30 : totalFrames;
  const frameNumbers = [...Array(frameCount).keys()];

  const buildTimeCode = (framePosition: number) => {
    const timeInSeconds = framePosition / frameRate;
    return secondsToTimeCode(timeInSeconds);
  };

  return (
    <div className="timeline-position">
      <div className="timeline-position__inner">
        {frameNumbers.map((i) => (
          <div className="timeline-position__marker" key={i}>
            {i % frameRate === 0 && buildTimeCode(i)}
            <br />
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelinePosition;
