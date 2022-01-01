import { useSelector } from "react-redux";
import { Track } from "../../../../../common/Project";
import { RootState } from "../../../../redux/store";
import TimelineTrackLabel from "../TimelineTrackLabel/TimelineTrackLabel";
import TimelineTrackNoItems from "../TimelineTrackNoItems/TimelineTrackNoItems";
import "./TimelineTrack.css";

interface TimelineTrackProps {
  track: Track;
}

const TimelineTrack = ({ track }: TimelineTrackProps): JSX.Element => {
  const fileDataUrls = useSelector(
    (state: RootState) => state.app.fileDataUrls
  );

  return (
    <div className="timeline-track">
      <TimelineTrackLabel trackType={track.trackType} />

      {track.trackItems.length === 0 ? (
        <TimelineTrackNoItems trackType={track.trackType} />
      ) : (
        <>TODO</>
      )}

      {fileDataUrls.map((dataUrl) => {
        return <img src={dataUrl} style={{ width: "100px" }} key={dataUrl} />;
      })}
    </div>
  );
};

export default TimelineTrack;
