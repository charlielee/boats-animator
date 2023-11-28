import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ImagingDeviceIdentifier,
  ImagingDeviceStatus,
} from "../../services/imagingDevice/ImagingDevice";

interface CaptureState {
  deviceStatus: ImagingDeviceStatus | undefined;
}

const initialState: CaptureState = {
  deviceStatus: undefined,
};

const captureSlice = createSlice({
  name: "capture",
  initialState,
  reducers: {
    reopenDevice: (state) => {
      if (state.deviceStatus) {
        state.deviceStatus.open = true;
      }
    },

    pauseDevice: (state) => {
      if (state.deviceStatus) {
        state.deviceStatus.open = false;
      }
    },

    closeDevice: (state) => {
      state.deviceStatus = undefined;
    },

    changeDevice: (state, action: PayloadAction<ImagingDeviceIdentifier>) => {
      state.deviceStatus = { identifier: action.payload, open: true };
    },
  },
});

export const { reopenDevice, pauseDevice, closeDevice, changeDevice } = captureSlice.actions;

export const captureReducer = captureSlice.reducer;
