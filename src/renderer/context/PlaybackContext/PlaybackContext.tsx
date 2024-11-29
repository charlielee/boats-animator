import { createContext } from "react";
import { TimelineIndex } from "../../../common/Flavors";

export const enum PlaybackFrameName {
  FIRST = "FIRST",
  PREVIOUS = "PREVIOUS",
  NEXT = "NEXT",
  LAST = "LAST",
}

export interface PlaybackContextProps {
  startOrPausePlayback: () => void;
  stopPlayback: (i?: TimelineIndex | undefined, pause?: boolean) => void;
  displayFrame: (name: PlaybackFrameName) => void;
  deleteFrameAtCurrentTimelineIndex?: () => Promise<void>;
  timelineIndex: TimelineIndex | undefined;
  liveViewVisible: boolean;
  playing: boolean;
}

const defaultValue: PlaybackContextProps = {
  startOrPausePlayback: () => undefined,
  stopPlayback: () => undefined,
  displayFrame: () => undefined,
  deleteFrameAtCurrentTimelineIndex: undefined,
  timelineIndex: undefined,
  liveViewVisible: true,
  playing: false,
};

const PlaybackContext = createContext<PlaybackContextProps>(defaultValue);

export default PlaybackContext;
