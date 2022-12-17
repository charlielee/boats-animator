import { createContext } from "react";
import { TimelineIndex } from "../../../common/Flavors";
import { PlaybackFrameName } from "./PlaybackContext";
import { initialPlaybackState } from "./PlaybackReducer";
import { PlaybackState } from "./types";

export interface PlaybackContext2Props {
  state: PlaybackState;
  displayFrame: (name: PlaybackFrameName) => void;
  setTimelineIndex: (timelineIndex: TimelineIndex) => void;
  startOrPausePlayback: () => void;
  startShortPlay: () => void;
  stopOrRepeatPlayback: () => void;
  stopPlayback: () => void;
}

const defaultValue: PlaybackContext2Props = {
  state: initialPlaybackState,
  displayFrame: () => undefined,
  setTimelineIndex: () => undefined,
  startOrPausePlayback: () => undefined,
  startShortPlay: () => undefined,
  stopOrRepeatPlayback: () => undefined,
  stopPlayback: () => undefined,
};

const PlaybackContext2 = createContext<PlaybackContext2Props>(defaultValue);

export default PlaybackContext2;
