import classNames from "classnames";
import { useEffect, useRef } from "react";
import "./TimelineTrackItem.css";

interface TimelineTrackItemProps {
  dataUrl: string;
  highlighted: boolean;
}

const TimelineTrackItem = ({
  dataUrl,
  highlighted,
}: TimelineTrackItemProps) => {
  const trackItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlighted) {
      trackItemRef.current?.scrollIntoView({
        inline: "end",
      });
    }
  }, [highlighted]);

  return (
    <div className="timeline-track-item" ref={trackItemRef}>
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
