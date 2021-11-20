import { TrackType } from "../../../../../common/Project";

interface TimelineTrackNoItemsProps {
  trackType: TrackType;
}

const TimelineTrackNoItems = ({
  trackType,
}: TimelineTrackNoItemsProps): JSX.Element => {
  return (
    <td className="timeline-track-no-items">
      <h2>
        {trackType === TrackType.FRAME
          ? "No frames captured."
          : "No audio imported."}
      </h2>
    </td>
  );
};

export default TimelineTrackNoItems;
