import classNames from "classnames";
import { useCallback } from "react";
import "./TimelineTrackItem.css";
import { v4 as uuidv4 } from "uuid";

interface TimelineTrackItemProps {
  title: string;
  dataUrl: string | undefined;
  highlighted: boolean;
  onClick: () => void;
}

const TimelineTrackItem = ({ title, dataUrl, highlighted, onClick }: TimelineTrackItemProps) => {
  const scrollTargetRef = useCallback(
    (scrollTargetDiv: HTMLDivElement | null) => {
      if (scrollTargetDiv && highlighted) {
        // Note: this is a non-standard webkit method
        (scrollTargetDiv as any)?.scrollIntoViewIfNeeded();
      }
    },
    [highlighted]
  );

  return (
    <div className="timeline-track-item" onClick={onClick} title={title}>
      <img
        className={classNames("timeline-track-item__img", {
          "timeline-track-item__img--highlighted": highlighted,
        })}
        src={dataUrl}
        key={dataUrl ?? uuidv4()}
      />
      <div className="timeline-track-item__cover"></div>
      <div className="timetime-track-item__scroll-target" ref={scrollTargetRef}></div>
    </div>
  );
};

export default TimelineTrackItem;
