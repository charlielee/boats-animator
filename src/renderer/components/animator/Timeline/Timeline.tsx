import { useEffect, useRef } from "react";
import { TimelineIndex } from "../../../../common/Flavors";
import { Track } from "../../../../common/project/Track";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import { getTrackItemStartPosition } from "../../../services/project/projectCalculator";
import "./Timeline.css";
import TimelinePosition from "./TimelinePosition/TimelinePosition";
import TimelineTrack from "./TimelineTrack/TimelineTrack";
import TimelineTrackLabel from "./TimelineTrackLabel/TimelineTrackLabel";

interface TimelineProps {
  timelineIndex: TimelineIndex | undefined;
  stopPlayback: (timelineIndex?: TimelineIndex | undefined) => void;
}

const Timeline = ({ timelineIndex, stopPlayback }: TimelineProps): JSX.Element => {
  const { take } = useProjectAndTake();
  const frameTrack = take.frameTrack;
  const timelineTracksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineTracksRef.current && timelineIndex === undefined) {
      timelineTracksRef.current.scrollLeft = timelineTracksRef.current.scrollWidth;
    }
  }, [timelineIndex, frameTrack.trackItems]);

  const onClickItem = (track: Track, trackItemIndex: number) =>
    stopPlayback(getTrackItemStartPosition(track, trackItemIndex));

  return (
    <div className="timeline">
      <div className="timeline__track-labels">
        <div className="timeline__track-labels-inner">
          <TimelineTrackLabel fileType={frameTrack.fileType} />
        </div>
      </div>
      <div className="timeline__tracks" ref={timelineTracksRef}>
        <div className="timeline__tracks-inner">
          <TimelinePosition frameRate={take.frameRate} totalFrames={frameTrack.trackItems.length} />
          <TimelineTrack
            track={frameTrack}
            key={frameTrack.id}
            timelineIndex={timelineIndex}
            onClickItem={(trackItemIndex) => onClickItem(frameTrack, trackItemIndex)}
            onClickLiveView={() => stopPlayback()}
          />
        </div>
      </div>
    </div>
  );
};

const TimelineWithContext = () => (
  <PlaybackContext.Consumer>{(value) => <Timeline {...value} />}</PlaybackContext.Consumer>
);

export default TimelineWithContext;
