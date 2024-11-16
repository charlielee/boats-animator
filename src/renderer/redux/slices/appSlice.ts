import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultUserPreferences, UserPreferences } from "../../../common/UserPreferences";

interface AppState {
  hasCameraAccess: boolean;
  loadingMessage?: string;
  userPreferences: UserPreferences;
  appVersion: string;
}

const initialState: AppState = {
  hasCameraAccess: false,
  loadingMessage: undefined,
  userPreferences: defaultUserPreferences,
  appVersion: "",
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

    setAppVersion: (state, action: PayloadAction<string>) => {
      state.appVersion = action.payload;
    },
  },
});

export const { editUserPreferences, setCameraAccess, startLoading, stopLoading, setAppVersion } =
  appSlice.actions;

export const appReducer = appSlice.reducer;
