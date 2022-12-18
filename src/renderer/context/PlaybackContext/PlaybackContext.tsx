import { createContext } from "react";
import { TimelineIndex } from "../../../common/Flavors";
import { initialPlaybackState } from "./PlaybackReducer";
import { PlaybackFrameName, PlaybackState } from "./types";

export interface PlaybackContextProps {
  state: PlaybackState;
  displayFrame: (name: PlaybackFrameName) => void;
  setTimelineIndex: (timelineIndex: TimelineIndex) => void;
  startOrPausePlayback: () => void;
  startShortPlay: () => void;
  stopOrRepeatPlayback: () => void;
  stopPlayback: () => void;
}

const defaultValue: PlaybackContextProps = {
  state: initialPlaybackState,
  displayFrame: () => undefined,
  setTimelineIndex: () => undefined,
  startOrPausePlayback: () => undefined,
  startShortPlay: () => undefined,
  stopOrRepeatPlayback: () => undefined,
  stopPlayback: () => undefined,
};

const PlaybackContext = createContext<PlaybackContextProps>(defaultValue);

export default PlaybackContext;
