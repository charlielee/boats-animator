import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import "./Timeline.css";
import TimelinePosition from "./TimelinePosition/TimelinePosition";
import TimelineTrack from "./TimelineTrack/TimelineTrack";

const Timeline = (): JSX.Element => {
  const project = useSelector((state: RootState) => state.project);
  const frameTrack = project?.take?.frameTrack;

  return (
    <div className="timeline">
      <TimelinePosition frameRate={15} totalFrames={0} />

      {frameTrack ? (
        <TimelineTrack track={frameTrack} key={frameTrack.id} />
      ) : (
        <TimelineTrack />
      )}
    </div>
  );
};

export default Timeline;
