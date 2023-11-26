import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileRef } from "../../../common/FileRef";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import { Project } from "../../../common/project/Project";

export interface ProjectState {
  project?: Project;
  fileRefs: FileRef[];
  take?: Take;
  playbackSpeed: number;
}

const initialState: ProjectState = {
  project: undefined,
  fileRefs: [],
  take: undefined,
  playbackSpeed: 1,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.project = { ...action.payload, name: action.payload.name.trim() };
    },

    updateProject: (state, action: PayloadAction<Project>) => {
      if (state.project) {
        state.project = { ...state.project, ...action.payload, name: action.payload.name.trim() };
      }
    },

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
  addProject,
  updateProject,
  addFrameTrackItem,
  incrementExportedFrameNumber,
  setPlaybackSpeed,
  addFileRef,
  addTake,
} = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
