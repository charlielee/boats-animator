import { createContext } from "react";

export interface PlaybackContextProps {
  videoFrames: string[];
}

const PlaybackContext = createContext<PlaybackContextProps | null>(null);

export default PlaybackContext;
