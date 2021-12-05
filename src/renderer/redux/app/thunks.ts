import { Dispatch } from "redux";
import { listDevices } from "../../services/imagingDevice/ImagingDevice";
import { setDeviceList } from "./reducer";

export const loadAndSetDeviceList = () => {
  return (dispatch: Dispatch) => {
    return (async () => {
      const connectedDevices = await listDevices();
      dispatch(setDeviceList(connectedDevices));
    })();
  };
};
