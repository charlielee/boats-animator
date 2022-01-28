import "./TimelineTrackItem.css";

interface TimelineTrackItemProps {
  dataUrl: string;
}

const TimelineTrackItem = ({ dataUrl }: TimelineTrackItemProps) => {
  return (
    <div className="timeline-track-item">
      <img src={dataUrl} style={{ width: "100px" }} key={dataUrl} />
    </div>
  );
};

export default TimelineTrackItem;
