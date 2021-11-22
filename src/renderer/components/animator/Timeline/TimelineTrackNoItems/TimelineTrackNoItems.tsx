import { TrackType } from "../../../../../common/Project";
import "./TimelineTrackNoItems.css";

interface TimelineTrackNoItemsProps {
  trackType: TrackType;
}

const TimelineTrackNoItems = ({
  trackType,
}: TimelineTrackNoItemsProps): JSX.Element => {
  return (
    <div className="timeline-track-no-items">
      <p>
        {trackType === TrackType.FRAME
          ? "No frames captured."
          : "No audio imported."}
      </p>
    </div>
  );
};

export default TimelineTrackNoItems;
