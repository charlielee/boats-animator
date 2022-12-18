import { useEffect, useRef } from "react";
import { TimelineIndex } from "../../../../common/Flavors";
import { Take } from "../../../../common/project/Take";
import { Track } from "../../../../common/project/Track";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { getTrackItemStartPosition } from "../../../services/project/projectCalculator";
import "./Timeline.css";
import TimelinePosition from "./TimelinePosition/TimelinePosition";
import TimelineTrack from "./TimelineTrack/TimelineTrack";

interface TimelineWithContextProps {
  take: Take;
}

interface TimelineProps extends TimelineWithContextProps {
  timelineIndex: TimelineIndex | undefined;
  setTimelineIndex: (timelineIndex: TimelineIndex) => void;
  stopPlayback: () => void;
}

const Timeline = ({
  take,
  timelineIndex,
  setTimelineIndex,
  stopPlayback,
}: TimelineProps): JSX.Element => {
  const frameTrack = take.frameTrack;
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current && timelineIndex === undefined) {
      timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;
    }
  }, [timelineIndex, frameTrack.trackItems]);

  const onClickItem = (track: Track, trackItemIndex: number) =>
    setTimelineIndex(getTrackItemStartPosition(track, trackItemIndex));

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
          onClickLiveView={stopPlayback}
        />
      </div>
    </div>
  );
};

const TimelineWithContext = (props: TimelineWithContextProps) => (
  <PlaybackContext.Consumer>
    {(value) => (
      <Timeline
        {...value}
        {...props}
        timelineIndex={value.state.timelineIndex}
      />
    )}
  </PlaybackContext.Consumer>
);

export default TimelineWithContext;
