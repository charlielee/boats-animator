import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ImagingDeviceIdentifier,
  ImagingDeviceStatus,
} from "../../services/imagingDevice/ImagingDevice";

interface CaptureState {
  deviceStatus: ImagingDeviceStatus | undefined;
  deviceList: ImagingDeviceIdentifier[];
}

const initialState: CaptureState = {
  deviceStatus: undefined,
  deviceList: [],
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

    setDeviceList: (state, action: PayloadAction<ImagingDeviceIdentifier[]>) => {
      state.deviceList = action.payload;
    },
  },
});

export const { reopenDevice, pauseDevice, closeDevice, changeDevice, setDeviceList } =
  captureSlice.actions;

export const captureReducer = captureSlice.reducer;
