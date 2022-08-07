import { ReactNode } from "react";
import { getTrackLength, Take } from "../../../common/Project";
import usePlayback from "../../hooks/usePlayback";
import PlaybackContext, { PlaybackContextProps } from "./PlaybackContext";

interface PlaybackContextProviderProps {
  take: Take;
  children: ReactNode;
}

const PlaybackContextProvider = ({
  take,
  children,
}: PlaybackContextProviderProps) => {
  const [startPlayback, stopPlayback, timelineIndex] = usePlayback({
    startTimelineIndex: 0,
    playForDuration: getTrackLength(take.frameTrack),
    returnToLiveView: true,
    frameRate: take.frameRate,
  });

  const value: PlaybackContextProps = {
    startPlayback,
    stopPlayback,
    timelineIndex,
  };

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
};

export default PlaybackContextProvider;
