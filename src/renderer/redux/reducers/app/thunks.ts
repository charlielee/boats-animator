import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { listDevices } from "../../../services/imagingDevice/ImagingDevice";
import * as rLogger from "../../../services/rLogger/rLogger";
import { changeDevice } from "../../middleware/imagingDeviceMiddleware";
import { RootState } from "../../store";
import { setDeviceList } from "./reducer";

export const fetchAndSetDeviceList = () => {
  return (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ) => {
    const { currentDevice } = getState().app;

    return (async () => {
      const connectedDevices = await listDevices();
      dispatch(setDeviceList(connectedDevices));

      const currentDeviceConnected =
        currentDevice &&
        connectedDevices.find(
          (device) => device.deviceId === currentDevice.deviceId
        );

      if (currentDevice && !currentDeviceConnected) {
        rLogger.info("thunks.fetchAndSetDeviceList.currentDeviceRemoved");
        dispatch(changeDevice());
      }
    })();
  };
};
