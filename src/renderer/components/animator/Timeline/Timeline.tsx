import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FrameNumber } from "../../../../common/Flavors";
import { getTrackLength, Take } from "../../../../common/Project";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { RootState } from "../../../redux/store";
import "./Timeline.css";
import TimelinePosition from "./TimelinePosition/TimelinePosition";
import TimelineTrack from "./TimelineTrack/TimelineTrack";

interface TimelineWithContextProps {
  take: Take;
}

interface TimelineProps extends TimelineWithContextProps {
  currentPlayFrame: FrameNumber;
}

const Timeline = ({ take, currentPlayFrame }: TimelineProps): JSX.Element => {
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
          frameRate={15} // TODO
          totalFrames={frameTrack.trackItems.length}
        />
        <TimelineTrack
          track={frameTrack}
          key={frameTrack.id}
          currentPlayFrame={currentPlayFrame}
        />
      </div>
    </div>
  );
};

const TimelineWithContext = (props: TimelineWithContextProps) => (
  <PlaybackContext.Consumer>
    {(value) => <Timeline {...value} {...props} />}
  </PlaybackContext.Consumer>
);

export default TimelineWithContext;
