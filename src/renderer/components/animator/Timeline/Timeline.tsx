import { Track } from "../../../../common/Project";
import TimelineTrack from "./TimelineTrack/TimelineTrack";

interface TimelineProps {
  tracks: Track[];
}

const Timeline = ({ tracks }: TimelineProps): JSX.Element => {
  return (
    <table className="timeline">
      {tracks.map((track) => (
        <TimelineTrack track={track} />
      ))}
    </table>
  );
};

export default Timeline;
