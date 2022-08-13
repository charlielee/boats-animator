import classNames from "classnames";
import { useEffect, useRef } from "react";
import "./TimelineTrackItem.css";

interface TimelineTrackItemProps {
  title: string;
  dataUrl: string;
  highlighted: boolean;
  onClick: () => void;
}

const TimelineTrackItem = ({
  title,
  dataUrl,
  highlighted,
  onClick,
}: TimelineTrackItemProps) => {
  const trackItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlighted) {
      // Note: this is a non-standard webkit method
      (trackItemRef.current as any)?.scrollIntoViewIfNeeded();
    }
  }, [highlighted]);

  return (
    <div
      className="timeline-track-item"
      ref={trackItemRef}
      onClick={onClick}
      title={title}
    >
      <img
        className={classNames("timeline-track-item__img", {
          "timeline-track-item__img--highlighted": highlighted,
        })}
        src={dataUrl}
        key={dataUrl}
      />
      <div className="timeline-track-item__cover"></div>
    </div>
  );
};

export default TimelineTrackItem;
