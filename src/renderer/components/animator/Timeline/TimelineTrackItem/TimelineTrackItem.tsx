import "./TimelineTrackItem.css";

interface TimelineTrackItemProps {
  dataUrl: string;
}

const TimelineTrackItem = ({ dataUrl }: TimelineTrackItemProps) => {
  return (
    <div className="timeline-track-item">
      <img className="timeline-track-item__img" src={dataUrl} key={dataUrl} />
    </div>
  );
};

export default TimelineTrackItem;
