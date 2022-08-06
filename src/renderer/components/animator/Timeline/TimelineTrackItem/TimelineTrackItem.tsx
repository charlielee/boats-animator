import classNames from "classnames";
import "./TimelineTrackItem.css";

interface TimelineTrackItemProps {
  dataUrl: string;
  highlighted: boolean;
}

const TimelineTrackItem = ({
  dataUrl,
  highlighted,
}: TimelineTrackItemProps) => {
  return (
    <div className="timeline-track-item">
      <img
        className={classNames("timeline-track-item__img", {
          "timeline-track-item__img--highlighted": highlighted,
        })}
        src={dataUrl}
        key={dataUrl}
      />
    </div>
  );
};

export default TimelineTrackItem;
