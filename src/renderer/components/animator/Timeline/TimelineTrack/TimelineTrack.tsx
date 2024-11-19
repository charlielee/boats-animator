import { FileInfoType } from "../../../../services/fileManager/FileInfo";
import { TimelineIndex } from "../../../../../common/Flavors";
import { Track } from "../../../../../common/project/Track";
import {
  getHighlightedTrackItem,
  getTrackItemTitle,
} from "../../../../services/project/projectCalculator";
import TimelineLiveViewButton from "../TimelineLiveView/TimelineLiveView";
import TimelineTrackItem from "../TimelineTrackItem/TimelineTrackItem";
import TimelineTrackNoItems from "../TimelineTrackNoItems/TimelineTrackNoItems";
import "./TimelineTrack.css";
import { useContext } from "react";
import { ProjectFilesContext } from "../../../../context/ProjectFilesContext.tsx/ProjectFilesContext";
import { TrackItem } from "../../../../../common/project/TrackItem";

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
}: TimelineTrackProps): JSX.Element => {
  const highlightedTrackItem = getHighlightedTrackItem(track, timelineIndex);
  const { getTrackItemFileInfo } = useContext(ProjectFilesContext);

  const getTrackItemObjectURL = (trackItem: TrackItem) =>
    getTrackItemFileInfo!(trackItem.id)?.objectURL;

  return (
    <div className="timeline-track">
      {track.trackItems.length > 0 ? (
        <>
          {track.trackItems.map((trackItem, i) => {
            return (
              <TimelineTrackItem
                title={getTrackItemTitle(track, i)}
                dataUrl={getTrackItemObjectURL(trackItem)}
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
