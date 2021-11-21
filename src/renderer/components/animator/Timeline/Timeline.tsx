import { Track } from "../../../../common/Project";
import "./Timeline.css";
import TimelinePosition from "./TimelinePosition/TimelinePosition";
import TimelineTrack from "./TimelineTrack/TimelineTrack";

interface TimelineProps {
  tracks: Track[];
}

const Timeline = ({ tracks }: TimelineProps): JSX.Element => {
  return (
    <div className="timeline">
      <TimelinePosition frameRate={15} totalFrames={0} />

      {tracks.map((track) => (
        <TimelineTrack track={track} key={track.id} />
      ))}
    </div>
  );
};

export default Timeline;
