import { FileInfoType } from "../../../../services/fileManager/FileInfo";
import "./TimelineTrackNoItems.css";

interface TimelineTrackNoItemsProps {
  fileType: FileInfoType;
}

const TimelineTrackNoItems = ({ fileType }: TimelineTrackNoItemsProps): JSX.Element => {
  return (
    <div className="timeline-track-no-items">
      <p>{fileType === FileInfoType.FRAME ? "No frames captured" : "No audio imported"}</p>
    </div>
  );
};

export default TimelineTrackNoItems;
