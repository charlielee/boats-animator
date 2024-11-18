import { FileInfoType } from "../../../../services/fileManager/FileInfo";
import Icon from "../../../common/Icon/Icon";
import IconName from "../../../common/Icon/IconName";
import "./TimelineTrackLabel.css";

interface TimelineTrackLabelProps {
  fileType: FileInfoType;
}

const TimelineTrackLabel = ({ fileType }: TimelineTrackLabelProps): JSX.Element => {
  return (
    <div
      className="timeline-track-label"
      title={fileType === FileInfoType.FRAME ? "Frame Track" : "Audio Track"}
    >
      {fileType === FileInfoType.FRAME && <Icon name={IconName.FRAMES} size="1.5rem" />}
    </div>
  );
};

export default TimelineTrackLabel;
