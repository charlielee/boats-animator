import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import { Project } from "../../../common/project/Project";
import { PersistedDirectoryId, TrackItemId } from "../../../common/Flavors";

export interface ProjectState {
  project?: Project;
  take?: Take;
  playbackSpeed: number;
  projectDirectoryId?: PersistedDirectoryId;
}

const initialState: ProjectState = {
  project: undefined,
  take: undefined,
  playbackSpeed: 1,
  projectDirectoryId: undefined,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.project = { ...action.payload };
    },

    updateProject: (state, action: PayloadAction<Project>) => {
      if (state.project) {
        state.project = { ...state.project, ...action.payload };
      }
    },

    addFrameTrackItem: (state, action: PayloadAction<TrackItem>) => {
      state.take?.frameTrack.trackItems.push(action.payload);
    },

    removeFrameTrackItem: (state, action: PayloadAction<TrackItemId>) => {
      const index = state.take?.frameTrack.trackItems.findIndex(
        (trackItem) => trackItem.id === action.payload
      );
      if (index === undefined) {
        throw `Unable to find frame track item to remove with id ${action.payload}`;
      }
      state.take?.frameTrack.trackItems.splice(index);
    },

    setPlaybackSpeed: (state, action: PayloadAction<number>) => {
      state.playbackSpeed = action.payload;
    },

    addTake: (state, action: PayloadAction<Take>) => {
      state.take = action.payload;
    },

    setProjectDirectoryId: (state, action: PayloadAction<PersistedDirectoryId>) => {
      state.projectDirectoryId = action.payload;
    },
  },
});

export const {
  addProject,
  updateProject,
  addFrameTrackItem,
  removeFrameTrackItem,
  setPlaybackSpeed,
  addTake,
  setProjectDirectoryId,
} = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
