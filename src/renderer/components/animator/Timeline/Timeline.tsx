import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getTrackLength } from "../../../../common/Project";
import { RootState } from "../../../redux/store";
import "./Timeline.css";
import TimelinePosition from "./TimelinePosition/TimelinePosition";
import TimelineTrack from "./TimelineTrack/TimelineTrack";

const Timeline = (): JSX.Element => {
  const state = useSelector((state: RootState) => state);
  const frameTrack = state.project.take?.frameTrack;
  const playbackPosition = state.app.playback.position;

  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) {
      return;
    }

    if (playbackPosition > 0 && frameTrack) {
      timelineRef.current.scrollLeft =
        playbackPosition *
        (timelineRef.current.scrollWidth / getTrackLength(frameTrack));
    } else {
      timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;
    }
  }, [playbackPosition, frameTrack?.trackItems]);

  return (
    <div className="timeline" ref={timelineRef}>
      <div className="timeline__inner">
        <TimelinePosition
          frameRate={15}
          totalFrames={frameTrack?.trackItems.length ?? 0}
        />

        {frameTrack && <TimelineTrack track={frameTrack} key={frameTrack.id} />}
      </div>
    </div>
  );
};

export default Timeline;
