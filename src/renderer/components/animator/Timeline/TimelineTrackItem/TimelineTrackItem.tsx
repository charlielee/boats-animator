import classNames from "classnames";
import { useCallback } from "react";
import "./TimelineTrackItem.css";

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
    <div
      className={classNames("timeline-track-item", {
        "timeline-track-item--loading": dataUrl === undefined,
      })}
      onClick={onClick}
      title={title}
    >
      {dataUrl !== undefined && (
        <img
          className={classNames("timeline-track-item__img", {
            "timeline-track-item__img--highlighted": highlighted,
          })}
          src={dataUrl}
        />
      )}
      <div className="timeline-track-item__cover"></div>
      <div className="timetime-track-item__scroll-target" ref={scrollTargetRef}></div>
    </div>
  );
};

export default TimelineTrackItem;
