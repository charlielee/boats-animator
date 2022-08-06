import { createContext } from "react";
import { TimelineIndex } from "../../../common/Flavors";

export interface PlaybackContextProps {
  startPlayback: () => void;
  stopPlayback: () => void;
  timelineIndex: TimelineIndex | undefined;
}

const defaultValue: PlaybackContextProps = {
  startPlayback: () => undefined,
  stopPlayback: () => undefined,
  timelineIndex: undefined,
};

const PlaybackContext = createContext<PlaybackContextProps>(defaultValue);

export default PlaybackContext;
