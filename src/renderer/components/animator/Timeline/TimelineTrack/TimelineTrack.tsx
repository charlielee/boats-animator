import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FileRefType, getFileRefById } from "../../../../../common/FileRef";
import { TimelineIndex } from "../../../../../common/Flavors";
import { Track } from "../../../../../common/project/Track";
import { TrackItem } from "../../../../../common/project/TrackItem";
import { RootState } from "../../../../redux/store";
import {
  getHighlightedTrackItem,
  getTrackItemTitle,
} from "../../../../services/project/projectCalculator";
import TimelineLiveViewButton from "../TimelineLiveView/TimelineLiveView";
import TimelineTrackItem from "../TimelineTrackItem/TimelineTrackItem";
import TimelineTrackLabel from "../TimelineTrackLabel/TimelineTrackLabel";
import TimelineTrackNoItems from "../TimelineTrackNoItems/TimelineTrackNoItems";
import "./TimelineTrack.css";

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
  const { fileRefs } = useSelector((state: RootState) => state.project);
  const [highlightedTrackItem, setHighlightedTrackItem] = useState<
    TrackItem | undefined
  >();

  useEffect(() => {
    setHighlightedTrackItem(getHighlightedTrackItem(track, timelineIndex));
  }, [timelineIndex, track]);

  return (
    <div className="timeline-track">
      <TimelineTrackLabel fileType={track.fileType} />

      {track.trackItems.length > 0 ? (
        <>
          {track.trackItems.map((trackItem, i) => {
            return (
              <TimelineTrackItem
                title={getTrackItemTitle(track, i)}
                dataUrl={getFileRefById(fileRefs, trackItem.id).location}
                highlighted={highlightedTrackItem?.id === trackItem.id}
                key={trackItem.id}
                onClick={() => onClickItem(i)}
              />
            );
          })}

          {track.fileType === FileRefType.FRAME && (
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
