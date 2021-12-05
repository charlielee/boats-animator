import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { listDevices } from "../../services/imagingDevice/ImagingDevice";
import { RootState } from "../store";
import { setCurrentDevice, setDeviceList } from "./reducer";

export const loadAndSetDeviceList = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const connectedDevices = await listDevices();
      dispatch(setDeviceList(connectedDevices));
    })();
  };
};

export const changeDevice = (deviceId?: string) => {
  return (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ) => {
    return (async () => {
      const { currentDevice, deviceList } = getState().app;

      // Stop the current device

      // Start the new device
      const newDevice = deviceList.find(
        (device) => device.deviceId === deviceId
      );

      // const connectedDevices = await listDevices();
      dispatch(setCurrentDevice(newDevice));
    })();
  };
};
