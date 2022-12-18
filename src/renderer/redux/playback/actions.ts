import { FrameCount, TimelineIndex } from "../../../common/Flavors";
import { PlaybackFrameName } from "../../../common/utils";

export enum PlaybackActionType {
  DISPLAY_FRAME = "playback/DISPLAY_FRAME",
  SET_TIMELINE_INDEX = "playback/SET_TIMELINE_INDEX",
  SET_TOTAL_FRAMES = "playback/SET_TOTAL_FRAMES",
  START_OR_PAUSE_PLAYBACK = "playback/START_OR_PAUSE_PLAYBACK",
  START_SHORT_PLAY = "playback/START_SHORT_PLAY",
  STOP_OR_REPEAT_PLAYBACK = "playback/STOP_OR_REPEAT_PLAYBACK",
  STOP_PLAYBACK = "playback/STOP_PLAYBACK",
}

export type PlaybackAction =
  | DisplayFrameAction
  | SetTimelineIndexAction
  | SetTotalFramesAction
  | StartOrPausePlaybackAction
  | StartShortPlayAction
  | StopOrRepeatPlaybackAction
  | StopPlaybackAction;

export interface DisplayFrameAction {
  type: PlaybackActionType.DISPLAY_FRAME;
  payload: {
    name: PlaybackFrameName;
  };
}

export interface SetTimelineIndexAction {
  type: PlaybackActionType.SET_TIMELINE_INDEX;
  payload: {
    timelineIndex: TimelineIndex;
  };
}

export interface SetTotalFramesAction {
  type: PlaybackActionType.SET_TOTAL_FRAMES;
  payload: {
    totalFrames: number;
  };
}

export interface StartOrPausePlaybackAction {
  type: PlaybackActionType.START_OR_PAUSE_PLAYBACK;
}

export interface StartShortPlayAction {
  type: PlaybackActionType.START_SHORT_PLAY;
}

export interface StopOrRepeatPlaybackAction {
  type: PlaybackActionType.STOP_OR_REPEAT_PLAYBACK;
}

export interface StopPlaybackAction {
  type: PlaybackActionType.STOP_PLAYBACK;
}

export const displayFrame2 = (name: PlaybackFrameName) => ({
  type: PlaybackActionType.DISPLAY_FRAME,
  payload: { name },
});

export const setTimelineIndex2 = (timelineIndex: TimelineIndex) => ({
  type: PlaybackActionType.SET_TIMELINE_INDEX,
  payload: { timelineIndex },
});

// TODO do we need this
export const setTotalFrames2 = (totalFrames: FrameCount) => ({
  type: PlaybackActionType.SET_TOTAL_FRAMES,
  payload: { totalFrames },
});

export const startOrPausePlayback2 = () => ({
  type: PlaybackActionType.START_OR_PAUSE_PLAYBACK,
});

export const startShortPlay2 = () => ({
  type: PlaybackActionType.START_SHORT_PLAY,
});

export const stopOrRepeatPlayback2 = () => ({
  type: PlaybackActionType.STOP_OR_REPEAT_PLAYBACK,
});

export const stopPlayback2 = () => ({
  type: PlaybackActionType.STOP_PLAYBACK,
});
