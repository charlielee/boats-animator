import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileRef } from "../../../common/FileRef";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";

export interface ProjectState {
  fileRefs: FileRef[];
  take?: Take;
  playbackSpeed: number;
}

const initialState: ProjectState = {
  fileRefs: [],
  take: undefined,
  playbackSpeed: 1,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addFrameTrackItem: (state, action: PayloadAction<TrackItem>) => {
      state.take?.frameTrack.trackItems.push(action.payload);
    },

    incrementExportedFrameNumber: (state) => {
      if (state.take) {
        state.take.lastExportedFrameNumber += 1;
      }
    },

    setPlaybackSpeed: (state, action: PayloadAction<number>) => {
      state.playbackSpeed = action.payload;
    },

    addFileRef: (state, action: PayloadAction<FileRef>) => {
      state.fileRefs.push(action.payload);
    },

    addTake: (state, action: PayloadAction<Take>) => {
      state.take = action.payload;
    },
  },
});

export const {
  addFrameTrackItem,
  incrementExportedFrameNumber,
  setPlaybackSpeed,
  addFileRef,
  addTake,
} = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
