import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  defaultUserPreferences,
  UserPreferences,
} from "../../../common/UserPreferences";
import { ImagingDeviceIdentifier } from "../../services/imagingDevice/ImagingDevice";

export interface AppState {
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

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    editUserPreferences: (
      state,
      action: PayloadAction<{ userPreferences: Partial<UserPreferences> }>
    ) => {
      state.userPreferences = {
        ...state.userPreferences,
        ...action.payload.userPreferences,
      };
    },

    setCurrentDevice: (
      state,
      action: PayloadAction<{ currentDevice?: ImagingDeviceIdentifier }>
    ) => {
      state.currentDevice = action.payload.currentDevice;
    },

    setDeviceList: (
      state,
      action: PayloadAction<{ deviceList: ImagingDeviceIdentifier[] }>
    ) => {
      state.deviceList = action.payload.deviceList;
    },

    setIsDeviceOpen: (
      state,
      action: PayloadAction<{ isDeviceOpen: boolean }>
    ) => {
      state.isDeviceOpen = action.payload.isDeviceOpen;
    },

    setCameraAccess: (state, action: PayloadAction<{ hasAccess: boolean }>) => {
      state.hasCameraAccess = action.payload.hasAccess;
    },

    startLoading: (state, action: PayloadAction<{ message: string }>) => {
      state.loadingMessage = action.payload.message;
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
