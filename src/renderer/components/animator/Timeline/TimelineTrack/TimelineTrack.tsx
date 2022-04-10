import { useSelector } from "react-redux";
import { FileRefType, getFileRefById } from "../../../../../common/FileRef";
import { Track } from "../../../../../common/Project";
import { RootState } from "../../../../redux/store";
import TimelineLiveViewButton from "../TimelineLiveView/TimelineLiveView";
import TimelineTrackItem from "../TimelineTrackItem/TimelineTrackItem";
import TimelineTrackLabel from "../TimelineTrackLabel/TimelineTrackLabel";
import TimelineTrackNoItems from "../TimelineTrackNoItems/TimelineTrackNoItems";
import "./TimelineTrack.css";

interface TimelineTrackProps {
  track: Track;
}

const TimelineTrack = ({ track }: TimelineTrackProps): JSX.Element => {
  const { fileRefs } = useSelector((state: RootState) => state.project);
  return (
    <div className="timeline-track">
      <TimelineTrackLabel fileType={track.fileType} />

      {track && track.trackItems.length > 0 ? (
        <>
          {track.trackItems.map((trackItem) => (
            <TimelineTrackItem
              dataUrl={getFileRefById(fileRefs, trackItem.id).location}
              key={trackItem.id}
            />
          ))}

          {track.fileType === FileRefType.FRAME && <TimelineLiveViewButton />}
        </>
      ) : (
        <TimelineTrackNoItems fileType={track.fileType} />
      )}
    </div>
  );
};

export default TimelineTrack;
