import { ReactNode, useEffect, useReducer } from "react";
import { FrameCount, TimelineIndex } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { getTrackLength } from "../../services/project/projectCalculator";
import PlaybackContext, { PlaybackContextProps } from "./PlaybackContext";
import { initialPlaybackState, playbackReducer } from "./PlaybackReducer";
import { PlaybackActionType, PlaybackFrameName } from "./types";

interface PlaybackContextProviderProps {
  shortPlayLength: FrameCount;
  take: Take;
  playbackSpeed: number;
  children: ReactNode;
}

const PlaybackContextProvider = ({
  // shortPlayLength,
  take,
  // playbackSpeed,
  children,
}: PlaybackContextProviderProps) => {
  const [state, dispatch] = useReducer(playbackReducer, initialPlaybackState);
  const totalFrames = getTrackLength(take.frameTrack);

  useEffect(() => {
    dispatch({
      type: PlaybackActionType.SET_TOTAL_FRAMES,
      payload: { totalFrames },
    });
  }, [totalFrames]);

  const value: PlaybackContextProps = {
    state,

    displayFrame: (name: PlaybackFrameName) =>
      dispatch({ type: PlaybackActionType.DISPLAY_FRAME, payload: { name } }),

    setTimelineIndex: (timelineIndex: TimelineIndex) =>
      dispatch({
        type: PlaybackActionType.SET_TIMELINE_INDEX,
        payload: { timelineIndex },
      }),

    startOrPausePlayback: () =>
      dispatch({
        type: PlaybackActionType.START_OR_PAUSE_PLAYBACK,
      }),

    startShortPlay: () =>
      dispatch({
        type: PlaybackActionType.START_SHORT_PLAY,
      }),

    stopOrRepeatPlayback: () =>
      dispatch({
        type: PlaybackActionType.STOP_OR_REPEAT_PLAYBACK,
      }),

    stopPlayback: () => dispatch({ type: PlaybackActionType.STOP_PLAYBACK }),
  };

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
};

export default PlaybackContextProvider;
