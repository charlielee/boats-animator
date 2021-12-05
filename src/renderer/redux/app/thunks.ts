import { Dispatch } from "redux";
import { listDevices } from "../../services/imagingDevice/ImagingDevice";
import * as rLogger from "../../services/rLogger/rLogger";
import { setDeviceList } from "./reducer";

export const loadAndSetDeviceList = () => {
  return (dispatch: Dispatch) => {
    rLogger.info("redux.app.thunks.loadAndSetDeviceList");

    return (async () => {
      const connectedDevices = await listDevices();
      dispatch(setDeviceList(connectedDevices));
    })();
  };
};
