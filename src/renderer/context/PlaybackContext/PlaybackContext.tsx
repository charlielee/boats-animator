import { createContext } from "react";
import { TimelineIndex } from "../../../common/Flavors";

export interface PlaybackContextProps {
  startPlayback: () => void;
  stopPlayback: () => void;
  displayFrame: (i: TimelineIndex | undefined) => void;
  displayFirstFrame: () => void;
  displayPreviousFrame: () => void;
  displayNextFrame: () => void;
  displayLastFrame: () => void;
  timelineIndex: TimelineIndex | undefined;
  liveViewVisible: boolean;
}

const defaultValue: PlaybackContextProps = {
  startPlayback: () => undefined,
  stopPlayback: () => undefined,
  displayFrame: () => undefined,
  displayFirstFrame: () => undefined,
  displayPreviousFrame: () => undefined,
  displayNextFrame: () => undefined,
  displayLastFrame: () => undefined,
  timelineIndex: undefined,
  liveViewVisible: true,
};

const PlaybackContext = createContext<PlaybackContextProps>(defaultValue);

export default PlaybackContext;
