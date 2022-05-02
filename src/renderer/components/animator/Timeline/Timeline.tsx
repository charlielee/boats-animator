import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getTrackLength, Take } from "../../../../common/Project";
import { RootState } from "../../../redux/store";
import "./Timeline.css";
import TimelinePosition from "./TimelinePosition/TimelinePosition";
import TimelineTrack from "./TimelineTrack/TimelineTrack";

interface TimelineProps {
  take: Take;
}

const Timeline = ({ take }: TimelineProps): JSX.Element => {
  const frameTrack = take.frameTrack;

  const playbackPosition = useSelector(
    (state: RootState) => state.app.playback.position
  );
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) {
      return;
    }

    if (playbackPosition > 0) {
      timelineRef.current.scrollLeft =
        playbackPosition *
        (timelineRef.current.scrollWidth / getTrackLength(frameTrack));
    } else {
      timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;
    }
  }, [playbackPosition, frameTrack.trackItems]);

  return (
    <div className="timeline" ref={timelineRef}>
      <div className="timeline__inner">
        <TimelinePosition
          frameRate={15}
          totalFrames={frameTrack.trackItems.length ?? 0}
        />
        <TimelineTrack track={frameTrack} key={frameTrack.id} />
      </div>
    </div>
  );
};

export default Timeline;
