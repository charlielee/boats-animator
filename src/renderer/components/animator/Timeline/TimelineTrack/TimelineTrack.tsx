import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FileRefType, getFileRefById } from "../../../../../common/FileRef";
import { FrameNumber } from "../../../../../common/Flavors";
import {
  getHighlightedTrackItem,
  getTrackItemEndPosition,
  getTrackItemsLength,
  getTrackItemStartPosition,
  getTrackLength,
  Track,
  TrackItem,
} from "../../../../../common/Project";
import { RootState } from "../../../../redux/store";
import TimelineLiveViewButton from "../TimelineLiveView/TimelineLiveView";
import TimelineTrackItem from "../TimelineTrackItem/TimelineTrackItem";
import TimelineTrackLabel from "../TimelineTrackLabel/TimelineTrackLabel";
import TimelineTrackNoItems from "../TimelineTrackNoItems/TimelineTrackNoItems";
import "./TimelineTrack.css";

interface TimelineTrackProps {
  track: Track;
  currentPlayFrame: FrameNumber;
}

const TimelineTrack = ({
  track,
  currentPlayFrame,
}: TimelineTrackProps): JSX.Element => {
  const { fileRefs } = useSelector((state: RootState) => state.project);
  const [highlightedTrackItem, setHighlightedTrackItem] = useState<
    TrackItem | undefined
  >();

  useEffect(() => {
    setHighlightedTrackItem(getHighlightedTrackItem(track, currentPlayFrame));
  }, [currentPlayFrame]);

  console.log("getTrackItemsLength", getTrackItemsLength(track.trackItems));
  console.log("getTrackLength", getTrackLength(track));

  track.trackItems.map((trackItem, i) => {
    console.log(trackItem.filePath, {
      getTrackItemStartPosition: getTrackItemStartPosition(
        track,
        i,
        trackItem.length
      ),
      getTrackItemEndPosition: getTrackItemEndPosition(track, i),
    });
  });

  return (
    <div className="timeline-track">
      <TimelineTrackLabel fileType={track.fileType} />

      {track && track.trackItems.length > 0 ? (
        <>
          {track.trackItems.map((trackItem) => {
            return (
              <TimelineTrackItem
                dataUrl={getFileRefById(fileRefs, trackItem.id).location}
                highlighted={highlightedTrackItem?.id === trackItem.id}
                key={trackItem.id}
              />
            );
          })}

          {track.fileType === FileRefType.FRAME && <TimelineLiveViewButton />}
        </>
      ) : (
        <TimelineTrackNoItems fileType={track.fileType} />
      )}
    </div>
  );
};

export default TimelineTrack;
