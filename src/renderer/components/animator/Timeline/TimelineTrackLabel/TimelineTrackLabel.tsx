import { TrackType } from "../../../../../common/Project";
import Icon from "../../../common/Icon/Icon";
import IconName from "../../../common/Icon/IconName";
import "./TimelineTrackLabel.css";

interface TimelineTrackLabelProps {
  trackType: TrackType;
}

const TimelineTrackLabel = ({
  trackType,
}: TimelineTrackLabelProps): JSX.Element => {
  return (
    <th className="timeline-track-label">
      <div className="timeline-track-label__icon-container">
        {trackType === TrackType.FRAME && (
          <Icon name={IconName.FRAMES} size="1.5rem" />
        )}
      </div>
    </th>
  );
};

export default TimelineTrackLabel;
