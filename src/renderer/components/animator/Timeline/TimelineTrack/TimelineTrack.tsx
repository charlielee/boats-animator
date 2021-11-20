import { Track } from "../../../../../common/Project";
import TimelineTrackLabel from "../TimelineTrackLabel/TimelineTrackLabel";
import TimelineTrackNoItems from "../TimelineTrackNoItems/TimelineTrackNoItems";
import "./TimelineTrack.css";

interface TimelineTrackProps {
  track: Track;
}

const TimelineTrack = ({ track }: TimelineTrackProps): JSX.Element => {
  return (
    <div className="timeline-track">
      <TimelineTrackLabel trackType={track.trackType} />

      {track.trackItems.length === 0 ? (
        <TimelineTrackNoItems trackType={track.trackType} />
      ) : (
        <>TODO</>
      )}
    </div>
  );
};

export default TimelineTrack;
