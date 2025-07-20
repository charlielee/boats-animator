import { FrameRate, FrameCount, TimelineIndex } from "../../../../services/Flavors";
import { buildStartTimeCode } from "../../../../services/timeUtils";
import "./TimelinePosition.css";

interface TimelinePositionProps {
  frameRate: FrameRate;
  totalFrames: FrameCount;
}

const TimelinePosition = ({ frameRate, totalFrames }: TimelinePositionProps) => {
  const frameCount: FrameCount = totalFrames < 30 ? 30 : totalFrames;
  const frameNumbers = [...Array(frameCount).keys()];

  return (
    <div className="timeline-position">
      <div className="timeline-position__inner">
        {frameNumbers.map((i: TimelineIndex) => (
          <div className="timeline-position__marker" key={i}>
            {i % frameRate === 0 && buildStartTimeCode(i, frameRate, false)}
            <br />
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelinePosition;
