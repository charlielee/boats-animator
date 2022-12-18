import {
  findRelativeTimelineIndex,
  findShortPlayStartFrame,
  isLiveView,
} from "../../services/timelineIndexCalculator/timelineIndexCalculator";
import { PlaybackAction, PlaybackActionType } from "./actions";
import { initialPlaybackState, PlaybackState } from "./state";

const playbackReducer = (
  state = initialPlaybackState,
  action: PlaybackAction
): PlaybackState => {
  if (state.totalFrames > 0) {
    return actionsWithFrames(state, action);
  }

  return { ...state };
};

const actionsWithFrames = (
  state: PlaybackState,
  action: PlaybackAction
): PlaybackState => {
  const { type } = action;

  switch (type) {
    case PlaybackActionType.DISPLAY_FRAME:
      return {
        ...state,
        playing: false,
        timelineIndex: findRelativeTimelineIndex(
          state.timelineIndex,
          action.payload.name,
          state.totalFrames
        ),
      };

    case PlaybackActionType.SET_TIMELINE_INDEX:
      return {
        ...state,
        timelineIndex: action.payload.timelineIndex,
      };

    case PlaybackActionType.SET_TOTAL_FRAMES:
      return {
        ...state,
        totalFrames: action.payload.totalFrames,
      };

    case PlaybackActionType.START_OR_PAUSE_PLAYBACK:
      return {
        ...state,
        playing: !state.playing,
        timelineIndex: isLiveView(state.timelineIndex)
          ? 0
          : state.timelineIndex,
      };

    case PlaybackActionType.START_SHORT_PLAY:
      return {
        ...state,
        playing: true,
        timelineIndex: findShortPlayStartFrame(
          state.shortPlayLength,
          state.totalFrames
        ),
      };

    case PlaybackActionType.STOP_OR_REPEAT_PLAYBACK:
      return {
        ...state,
        playing: state.loopPlayback,
        timelineIndex: state.loopPlayback ? 0 : undefined,
      };

    case PlaybackActionType.STOP_PLAYBACK:
      return {
        ...state,
        playing: false,
        timelineIndex: undefined,
      };

    default:
      return { ...state };
  }
};

export default playbackReducer;
