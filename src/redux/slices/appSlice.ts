import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserPreferences, defaultUserPreferences } from "../../../electron/common/UserPreferences";

interface AppState {
  userPreferences: UserPreferences;
  appVersion: string;
}

const initialState: AppState = {
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

    setAppVersion: (state, action: PayloadAction<string>) => {
      state.appVersion = action.payload;
    },
  },
});

export const { editUserPreferences, setAppVersion } = appSlice.actions;

export const appReducer = appSlice.reducer;
