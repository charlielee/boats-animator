import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  defaultUserPreferences,
  UserPreferences,
} from "../../../common/UserPreferences";
import { ImagingDeviceIdentifier } from "../../services/imagingDevice/ImagingDevice";

interface AppState {
  currentDevice?: ImagingDeviceIdentifier;
  isDeviceOpen: boolean;
  deviceList: ImagingDeviceIdentifier[];
  hasCameraAccess: boolean;
  loadingMessage?: string;
  userPreferences: UserPreferences;
}

const initialState: AppState = {
  currentDevice: undefined,
  isDeviceOpen: false,
  deviceList: [],
  hasCameraAccess: true,
  loadingMessage: undefined,
  userPreferences: defaultUserPreferences,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    editUserPreferences: (
      state,
      action: PayloadAction<Partial<UserPreferences>>
    ) => {
      state.userPreferences = {
        ...state.userPreferences,
        ...action.payload,
      };
    },

    setCurrentDevice: (
      state,
      action: PayloadAction<ImagingDeviceIdentifier | undefined>
    ) => {
      state.currentDevice = action.payload;
    },

    setDeviceList: (
      state,
      action: PayloadAction<ImagingDeviceIdentifier[]>
    ) => {
      state.deviceList = action.payload;
    },

    setIsDeviceOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeviceOpen = action.payload;
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

export const {
  editUserPreferences,
  setCurrentDevice,
  setDeviceList,
  setIsDeviceOpen,
  setCameraAccess,
  startLoading,
  stopLoading,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
