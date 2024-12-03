import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Take } from "../../../common/project/Take";
import { TrackItem } from "../../../common/project/TrackItem";
import { Project } from "../../../common/project/Project";
import { PersistedDirectoryId, TrackItemId } from "../../../common/Flavors";
import { OverlayTab } from "../../components/animator/PreviewToolbar/PreviewToolbar";

export interface ProjectState {
  project?: Project;
  take?: Take;
  playbackSpeed: number;
  projectDirectoryId?: PersistedDirectoryId;
  showCapturePane: boolean;
  enableShortPlay: boolean;
  overlayTab: OverlayTab;
}

const initialState: ProjectState = {
  project: undefined,
  take: undefined,
  playbackSpeed: 1,
  projectDirectoryId: undefined,
  showCapturePane: true,
  enableShortPlay: false,
  overlayTab: OverlayTab.FRAME,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (
      state,
      action: PayloadAction<{ project: Project; projectDirectoryId: PersistedDirectoryId }>
    ) => {
      state.project = { ...action.payload.project };
      state.projectDirectoryId = action.payload.projectDirectoryId;
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
      state.take?.frameTrack.trackItems.splice(index, 1);
    },

    setPlaybackSpeed: (state, action: PayloadAction<number>) => {
      state.playbackSpeed = action.payload;
    },

    addTake: (state, action: PayloadAction<Take>) => {
      state.take = action.payload;
    },

    toggleCapturePane: (state) => {
      state.showCapturePane = !state.showCapturePane;
    },

    setEnableShortPlay: (state, action: PayloadAction<boolean>) => {
      state.enableShortPlay = action.payload;
    },

    setOverlayTab: (state, action: PayloadAction<OverlayTab>) => {
      state.overlayTab = action.payload;
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
  toggleCapturePane,
  setEnableShortPlay,
  setOverlayTab,
} = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
