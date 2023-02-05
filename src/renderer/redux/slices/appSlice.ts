import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultUserPreferences, UserPreferences } from "../../../common/UserPreferences";

interface AppState {
  hasCameraAccess: boolean;
  loadingMessage?: string;
  userPreferences: UserPreferences;
}

const initialState: AppState = {
  hasCameraAccess: true,
  loadingMessage: undefined,
  userPreferences: defaultUserPreferences,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    editUserPreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.userPreferences = {
        ...state.userPreferences,
        ...action.payload,
      };
    },

    setCameraAccess: (state, action: PayloadAction<boolean>) => {
      state.hasCameraAccess = action.payload;
    },

    startLoading: (state, action: PayloadAction<string>) => {
      state.loadingMessage = action.payload;
    },

    stopLoading: (state) => {
      state.loadingMessage = undefined;
    },
  },
});

export const { editUserPreferences, setCameraAccess, startLoading, stopLoading } = appSlice.actions;

export const appReducer = appSlice.reducer;
