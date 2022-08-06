import { ReactNode } from "react";
import { FrameNumber } from "../../../common/Flavors";
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
  const [startPlayback, stopPlayback, currentPlayFrame] = usePlayback({
    startFrame: 0,
    stopFrame: getTrackLength(take.frameTrack) as FrameNumber,
    frameRate: take.frameRate,
  });

  const value: PlaybackContextProps = {
    startPlayback,
    stopPlayback,
    currentPlayFrame,
  };

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
};

export default PlaybackContextProvider;
