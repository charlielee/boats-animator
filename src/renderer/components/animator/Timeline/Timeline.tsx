import { useCallback, useContext } from "react";
import { Track } from "../../../../common/project/Track";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import { getTrackItemStartPosition } from "../../../services/project/projectCalculator";
import "./Timeline.css";
import TimelinePosition from "./TimelinePosition/TimelinePosition";
import TimelineTrack from "./TimelineTrack/TimelineTrack";
import TimelineTrackLabel from "./TimelineTrackLabel/TimelineTrackLabel";

export const Timeline = (): JSX.Element => {
  const { take } = useProjectAndTake();
  const frameTrack = take.frameTrack;

  const { timelineIndex, stopPlayback } = useContext(PlaybackContext);

  const timelineTracksRef = useCallback(
    (timelineDiv: HTMLDivElement | null) => {
      if (timelineDiv && timelineIndex === undefined) {
        timelineDiv.scrollLeft = timelineDiv.scrollWidth;
      }
    },
    [timelineIndex, frameTrack.trackItems] // eslint-disable-line react-hooks/exhaustive-deps
  );

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
