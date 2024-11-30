import { Tooltip } from "@mantine/core";
import { FileInfoType } from "../../../../services/fileManager/FileInfo";
import Icon from "../../../common/Icon/Icon";
import IconName from "../../../common/Icon/IconName";
import "./TimelineTrackLabel.css";

interface TimelineTrackLabelProps {
  fileType: FileInfoType;
}

const TimelineTrackLabel = ({ fileType }: TimelineTrackLabelProps): JSX.Element => {
  return (
    <div className="timeline-track-label">
      {fileType === FileInfoType.FRAME && (
        <Tooltip label={fileType === FileInfoType.FRAME ? "Frame Track" : "Audio Track"}>
          <Icon name={IconName.FRAMES} size="1.5rem" />
        </Tooltip>
      )}
    </div>
  );
};

export default TimelineTrackLabel;
