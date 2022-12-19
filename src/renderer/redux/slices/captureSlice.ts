import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImagingDeviceIdentifier } from "../../services/imagingDevice/ImagingDevice";

interface CaptureState {
  deviceIdentifier?: ImagingDeviceIdentifier;
  deviceOpen: boolean;
  deviceList: ImagingDeviceIdentifier[];
}

const initialState: CaptureState = {
  deviceIdentifier: undefined,
  deviceOpen: false,
  deviceList: [],
};

const captureSlice = createSlice({
  name: "capture",
  initialState,
  reducers: {
    reopenDevice: (state) => {
      if (state.deviceIdentifier) {
        state.deviceOpen = true;
      }
    },

    pauseDevice: (state) => {
      state.deviceOpen = false;
    },

    closeDevice: (state) => {
      state.deviceOpen = false;
      state.deviceIdentifier = undefined;
    },

    changeDevice: (state, action: PayloadAction<ImagingDeviceIdentifier>) => {
      state.deviceIdentifier = action.payload;
      state.deviceOpen = true;
    },

    setDeviceList: (
      state,
      action: PayloadAction<ImagingDeviceIdentifier[]>
    ) => {
      state.deviceList = action.payload;
    },
  },
});

export const {
  reopenDevice,
  pauseDevice,
  closeDevice,
  changeDevice,
  setDeviceList,
} = captureSlice.actions;

export const captureReducer = captureSlice.reducer;
