import { Track } from "../../../../common/Project";
import "./Timeline.css";
import TimelineTrack from "./TimelineTrack/TimelineTrack";

interface TimelineProps {
  tracks: Track[];
}

const Timeline = ({ tracks }: TimelineProps): JSX.Element => {
  return (
    <div className="timeline">
      {tracks.map((track) => (
        <TimelineTrack track={track} />
      ))}
    </div>
  );
};

export default Timeline;
