import { FrameCount, TimelineIndex } from "../../../common/Flavors";

export interface PlaybackState {
  timelineIndex: TimelineIndex | undefined;
  playing: boolean;
  loopPlayback: boolean;
  playbackSpeed: number;
  totalFrames: FrameCount;
  shortPlayLength: number;
}

export const initialPlaybackState = {
  timelineIndex: undefined,
  playing: false,
  loopPlayback: false,
  playbackSpeed: 1,
  totalFrames: 0,
  shortPlayLength: 6,
};
