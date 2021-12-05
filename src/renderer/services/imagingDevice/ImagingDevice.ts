import * as rLogger from "../../services/rLogger/rLogger";
import WebMediaDevice from "./WebMediaDevice";

export interface ImagingDevice {
  id: string;
  name: string;
}

const IMAGING_DEVICE_CHANGE_EVENT_NAME = "custom-imagingdevicechange";

const dispatchDeviceChangeEvent = () =>
  document.dispatchEvent(new CustomEvent(IMAGING_DEVICE_CHANGE_EVENT_NAME));

export const listDevices = async (): Promise<ImagingDevice[]> => {
  rLogger.info("imagingDevice.listDevices");
  const webMediaDevices = await WebMediaDevice.listDevices();
  return [...webMediaDevices];
};

export const onDeviceChange = (callback: () => void) => {
  WebMediaDevice.onDeviceChange(dispatchDeviceChangeEvent);
  document.addEventListener(IMAGING_DEVICE_CHANGE_EVENT_NAME, callback);
};
