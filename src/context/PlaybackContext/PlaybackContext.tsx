import { createContext, useContext } from "react";
import { TimelineIndex } from "../../services/Flavors";

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
  deleteFrameAtCurrentTimelineIndex: () => Promise<void>;
  timelineIndex: TimelineIndex | undefined;
  liveViewVisible: boolean;
  playing: boolean;
}

export const PlaybackContext = createContext<PlaybackContextProps | undefined>(undefined);

export const usePlaybackContext = () => {
  const context = useContext(PlaybackContext);

  if (context === undefined) {
    throw new Error("Must be called within PlaybackContextProvider");
  }

  return context;
};
