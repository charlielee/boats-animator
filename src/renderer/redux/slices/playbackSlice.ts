import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FrameCount, TimelineIndex } from "../../../common/Flavors";
import { PlaybackFrameName } from "../../../common/utils";
import {
  findRelativeTimelineIndex,
  findShortPlayStartFrame,
  isLiveView,
} from "../../services/timelineIndexCalculator/timelineIndexCalculator";

interface PlaybackState {
  timelineIndex: TimelineIndex | undefined;
  playing: boolean;
  loopPlayback: boolean;
  playbackSpeed: number;
  totalFrames: FrameCount;
  shortPlayLength: number;
}

const initialState: PlaybackState = {
  timelineIndex: undefined,
  playing: false,
  loopPlayback: false,
  playbackSpeed: 1,
  totalFrames: 0,
  shortPlayLength: 6,
};

const playbackSlice = createSlice({
  name: "playback",
  initialState,
  reducers: {
    displayFrame: (state, action: PayloadAction<PlaybackFrameName>) => {
      state.playing = false;
      state.timelineIndex = findRelativeTimelineIndex(
        state.timelineIndex,
        action.payload,
        state.totalFrames
      );
    },

    setTimelineIndex: (state, action: PayloadAction<TimelineIndex>) => {
      state.timelineIndex = action.payload;
    },

    setTotalFrames: (state, action: PayloadAction<FrameCount>) => {
      state.totalFrames = action.payload;
    },

    startOrPausePlayback: (state) => {
      state.playing = !state.playing;
      state.timelineIndex = isLiveView(state.timelineIndex)
        ? 0
        : state.timelineIndex;
    },

    startShortPlay: (state) => {
      state.playing = true;
      state.timelineIndex = findShortPlayStartFrame(
        state.shortPlayLength,
        state.totalFrames
      );
    },

    stopOrRepeatPlayback: (state) => {
      state.playing = state.loopPlayback;
      state.timelineIndex = state.loopPlayback ? 0 : undefined;
    },

    stopPlayback: (state) => {
      state.playing = false;
      state.timelineIndex = undefined;
    },
  },
});

export const {
  displayFrame,
  setTimelineIndex,
  setTotalFrames,
  startOrPausePlayback,
  startShortPlay,
  stopOrRepeatPlayback,
  stopPlayback,
} = playbackSlice.actions;

export const playbackReducer = playbackSlice.reducer;
