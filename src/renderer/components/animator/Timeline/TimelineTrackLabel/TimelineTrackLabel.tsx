import { FileRefType } from "../../../../../common/FileRef";
import Icon from "../../../common/Icon/Icon";
import IconName from "../../../common/Icon/IconName";
import "./TimelineTrackLabel.css";

interface TimelineTrackLabelProps {
  fileType?: FileRefType;
}

const TimelineTrackLabel = ({
  fileType = FileRefType.FRAME,
}: TimelineTrackLabelProps): JSX.Element => {
  return (
    <div
      className="timeline-track-label"
      title={fileType === FileRefType.FRAME ? "Frame Track" : "Audio Track"}
    >
      {fileType === FileRefType.FRAME && (
        <Icon name={IconName.FRAMES} size="1.5rem" />
      )}
    </div>
  );
};

export default TimelineTrackLabel;
