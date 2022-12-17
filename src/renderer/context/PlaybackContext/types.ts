import { FrameCount, TimelineIndex } from "../../../common/Flavors";
import { PlaybackFrameName } from "./PlaybackContext";

export interface PlaybackState {
  timelineIndex: TimelineIndex | undefined;
  playing: boolean;
  loopPlayback: boolean;
  playbackSpeed: number;
  playForDuration: FrameCount;
  shortPlayLength: number;
}

export enum PlaybackActionType {
  DISPLAY_FRAME = "playback/DISPLAY_FRAME",
  SET_TIMELINE_INDEX = "playback/SET_TIMELINE_INDEX",
  START_OR_PAUSE_PLAYBACK = "playback/START_OR_PAUSE_PLAYBACK",
  START_SHORT_PLAY = "playback/START_SHORT_PLAY",
  STOP_OR_REPEAT_PLAYBACK = "playback/STOP_OR_REPEAT_PLAYBACK",
  STOP_PLAYBACK = "playback/STOP_PLAYBACK",
}

export type PlaybackAction =
  | DisplayFrameAction
  | SetTimelineIndexAction
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

export interface StartOrPausePlaybackAction {
  type: PlaybackActionType.START_OR_PAUSE_PLAYBACK;
  payload: undefined;
}

export interface StartShortPlayAction {
  type: PlaybackActionType.START_SHORT_PLAY;
  payload: undefined;
}

export interface StopOrRepeatPlaybackAction {
  type: PlaybackActionType.STOP_OR_REPEAT_PLAYBACK;
  payload: undefined;
}

export interface StopPlaybackAction {
  type: PlaybackActionType.STOP_PLAYBACK;
  payload: undefined;
}
