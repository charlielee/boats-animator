import { TrackType } from "../../../../../common/Project";
import Icon from "../../../common/Icon/Icon";
import IconName from "../../../common/Icon/IconName";
import "./TimelineTrackLabel.css";

interface TimelineTrackLabelProps {
  trackType?: TrackType;
}

const TimelineTrackLabel = ({
  trackType = TrackType.FRAME,
}: TimelineTrackLabelProps): JSX.Element => {
  return (
    <div
      className="timeline-track-label"
      title={trackType === TrackType.FRAME ? "Frame Track" : "Audio Track"}
    >
      {trackType === TrackType.FRAME && (
        <Icon name={IconName.FRAMES} size="1.5rem" />
      )}
    </div>
  );
};

export default TimelineTrackLabel;
