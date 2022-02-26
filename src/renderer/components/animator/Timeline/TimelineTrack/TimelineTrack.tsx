import { Track } from "../../../../../common/Project";
import TimelineTrackItem from "../TimelineTrackItem/TimelineTrackItem";
import TimelineTrackLabel from "../TimelineTrackLabel/TimelineTrackLabel";
import TimelineTrackNoItems from "../TimelineTrackNoItems/TimelineTrackNoItems";
import "./TimelineTrack.css";

interface TimelineTrackProps {
  track?: Track;
}

const TimelineTrack = ({ track }: TimelineTrackProps): JSX.Element => {
  return (
    <div className="timeline-track">
      <TimelineTrackLabel fileType={track?.fileType} />

      {track && track.trackItems.length > 0 ? (
        track.trackItems.map((trackItem) => (
          <TimelineTrackItem
            dataUrl={trackItem.trackFiles[0].filePath}
            key={trackItem.id}
          />
        ))
      ) : (
        <TimelineTrackNoItems fileType={track?.fileType} />
      )}
    </div>
  );
};

export default TimelineTrack;
