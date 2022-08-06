import { createContext } from "react";
import { FrameNumber } from "../../../common/Flavors";

export interface PlaybackContextProps {
  startPlayback: () => void;
  stopPlayback: () => void;
  currentPlayFrame: FrameNumber;
}

const defaultValue: PlaybackContextProps = {
  startPlayback: () => undefined,
  stopPlayback: () => undefined,
  currentPlayFrame: 0,
};

const PlaybackContext = createContext<PlaybackContextProps>(defaultValue);

export default PlaybackContext;
