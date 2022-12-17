import { ReactNode, useEffect, useReducer } from "react";
import { FrameCount, TimelineIndex } from "../../../common/Flavors";
import { Take } from "../../../common/project/Take";
import { getTrackLength } from "../../services/project/projectCalculator";
import { PlaybackFrameName } from "./PlaybackContext";
import PlaybackContext2, { PlaybackContext2Props } from "./PlaybackContext2";
import { initialPlaybackState, playbackReducer } from "./PlaybackReducer";
import { PlaybackActionType } from "./types";

interface PlaybackContextProvider2Props {
  shortPlayLength: FrameCount;
  take: Take;
  playbackSpeed: number;
  children: ReactNode;
}

const PlaybackContextProvider2 = ({
  // shortPlayLength,
  take,
  // playbackSpeed,
  children,
}: PlaybackContextProvider2Props) => {
  const [state, dispatch] = useReducer(playbackReducer, initialPlaybackState);
  const totalFrames = getTrackLength(take.frameTrack);

  useEffect(() => {
    dispatch({
      type: PlaybackActionType.SET_TOTAL_FRAMES,
      payload: { totalFrames },
    });
  }, [totalFrames]);

  const value: PlaybackContext2Props = {
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
        payload: undefined,
      }),

    startShortPlay: () =>
      dispatch({
        type: PlaybackActionType.START_SHORT_PLAY,
        payload: undefined,
      }),

    stopOrRepeatPlayback: () =>
      dispatch({
        type: PlaybackActionType.STOP_OR_REPEAT_PLAYBACK,
        payload: undefined,
      }),

    stopPlayback: () =>
      dispatch({ type: PlaybackActionType.STOP_PLAYBACK, payload: undefined }),
  };

  return (
    <PlaybackContext2.Provider value={value}>
      {children}
    </PlaybackContext2.Provider>
  );
};

export default PlaybackContextProvider2;
