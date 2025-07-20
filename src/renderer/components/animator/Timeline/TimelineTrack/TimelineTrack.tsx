import { useContext } from "react";
import { ProjectFilesContext } from "../../../../context/ProjectFilesContext.tsx/ProjectFilesContext";
import { FileInfoType } from "../../../../services/fileManager/FileInfo";
import {
  getHighlightedTrackItem,
  getTrackItemTitle,
} from "../../../../services/project/projectCalculator";
import TimelineLiveViewButton from "../TimelineLiveView/TimelineLiveView";
import TimelineTrackItem from "../TimelineTrackItem/TimelineTrackItem";
import TimelineTrackNoItems from "../TimelineTrackNoItems/TimelineTrackNoItems";
import "./TimelineTrack.css";
import { TimelineIndex } from "../../../../services/Flavors";
import { Track } from "../../../../services/project/types";

interface TimelineTrackProps {
  track: Track;
  timelineIndex: TimelineIndex | undefined;
  onClickItem: (trackItemIndex: number) => void;
  onClickLiveView: () => void;
}

const TimelineTrack = ({
  track,
  timelineIndex,
  onClickItem,
  onClickLiveView,
}: TimelineTrackProps) => {
  const highlightedTrackItem = getHighlightedTrackItem(track, timelineIndex);
  const { getTrackItemObjectURL } = useContext(ProjectFilesContext);

  return (
    <div className="timeline-track">
      {track.trackItems.length > 0 ? (
        <>
          {track.trackItems.map((trackItem, i) => {
            return (
              <TimelineTrackItem
                title={getTrackItemTitle(track, i)}
                dataUrl={getTrackItemObjectURL?.(trackItem)}
                highlighted={highlightedTrackItem?.id === trackItem.id}
                key={trackItem.id}
                onClick={() => onClickItem(i)}
              />
            );
          })}

          {track.fileType === FileInfoType.FRAME && (
            <TimelineLiveViewButton
              highlighted={timelineIndex === undefined}
              onClick={onClickLiveView}
            />
          )}
        </>
      ) : (
        <TimelineTrackNoItems fileType={track.fileType} />
      )}
    </div>
  );
};

export default TimelineTrack;
