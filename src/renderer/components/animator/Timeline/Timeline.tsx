import { useEffect, useRef } from "react";
import { TimelineIndex } from "../../../../common/Flavors";
import {
  getTrackItemStartPosition,
  Take,
  Track,
} from "../../../../common/Project";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import "./Timeline.css";
import TimelinePosition from "./TimelinePosition/TimelinePosition";
import TimelineTrack from "./TimelineTrack/TimelineTrack";

interface TimelineWithContextProps {
  take: Take;
}

interface TimelineProps extends TimelineWithContextProps {
  timelineIndex: TimelineIndex | undefined;
  displayFrame: (timelineIndex: TimelineIndex | undefined) => void;
}

const Timeline = ({
  take,
  timelineIndex,
  displayFrame,
}: TimelineProps): JSX.Element => {
  const frameTrack = take.frameTrack;
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current && timelineIndex === undefined) {
      timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;
    }
  }, [timelineIndex, frameTrack.trackItems]);

  const onClickItem = (track: Track, trackItemIndex: number) =>
    displayFrame(getTrackItemStartPosition(track, trackItemIndex));

  return (
    <div className="timeline" ref={timelineRef}>
      <div className="timeline__inner">
        <TimelinePosition
          frameRate={take.frameRate}
          totalFrames={frameTrack.trackItems.length}
        />
        <TimelineTrack
          track={frameTrack}
          key={frameTrack.id}
          timelineIndex={timelineIndex}
          onClickItem={(trackItemIndex) =>
            onClickItem(frameTrack, trackItemIndex)
          }
          onClickLiveView={() => displayFrame(undefined)}
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
