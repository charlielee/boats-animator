import { FileRefType } from "../../../../../common/FileRef";
import "./TimelineTrackNoItems.css";

interface TimelineTrackNoItemsProps {
  fileType?: FileRefType;
}

const TimelineTrackNoItems = ({
  fileType = FileRefType.FRAME,
}: TimelineTrackNoItemsProps): JSX.Element => {
  return (
    <div className="timeline-track-no-items">
      <p>
        {fileType === FileRefType.FRAME
          ? "No frames captured"
          : "No audio imported"}
      </p>
    </div>
  );
};

export default TimelineTrackNoItems;
