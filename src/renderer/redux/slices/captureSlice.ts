import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImagingDeviceIdentifier } from "../../services/imagingDevice/ImagingDevice";

interface CaptureState {
  currentDeviceIdentifier?: ImagingDeviceIdentifier;
  deviceOpen: boolean;
  deviceList: ImagingDeviceIdentifier[];
}

const initialState: CaptureState = {
  currentDeviceIdentifier: undefined,
  deviceOpen: false,
  deviceList: [],
};

const captureSlice = createSlice({
  name: "capture",
  initialState,
  reducers: {
    setDeviceOpen: (state, action: PayloadAction<boolean>) => {
      state.deviceOpen = action.payload;
    },

    setCurrentDevice: (
      state,
      action: PayloadAction<ImagingDeviceIdentifier | undefined>
    ) => {
      state.currentDeviceIdentifier = action.payload;
    },

    setDeviceList: (
      state,
      action: PayloadAction<ImagingDeviceIdentifier[]>
    ) => {
      state.deviceList = action.payload;
    },
  },
});

export const { setDeviceOpen, setCurrentDevice, setDeviceList } =
  captureSlice.actions;

export const captureReducer = captureSlice.reducer;

// things in context
// takePhoto
// attachStreamToVideo
