import { createContext } from "react";
import { TimelineIndex } from "../../../common/Flavors";

export interface PlaybackContextProps {
  startPlayback: () => void;
  stopPlayback: (i?: TimelineIndex | undefined, pause?: boolean) => void;
  pausePlayback: () => void;
  displayFirstFrame: () => void;
  displayPreviousFrame: () => void;
  displayNextFrame: () => void;
  displayLastFrame: () => void;
  timelineIndex: TimelineIndex | undefined;
  liveViewVisible: boolean;
  paused: boolean;
}

const defaultValue: PlaybackContextProps = {
  startPlayback: () => undefined,
  stopPlayback: () => undefined,
  pausePlayback: () => undefined,
  displayFirstFrame: () => undefined,
  displayPreviousFrame: () => undefined,
  displayNextFrame: () => undefined,
  displayLastFrame: () => undefined,
  timelineIndex: undefined,
  liveViewVisible: true,
  paused: false,
};

const PlaybackContext = createContext<PlaybackContextProps>(defaultValue);

export default PlaybackContext;
