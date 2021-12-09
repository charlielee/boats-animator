import * as rLogger from "../../services/rLogger/rLogger";
import WebMediaDevice from "./WebMediaDevice";

export interface ImagingDeviceIdentifier {
  deviceId: string;
  name: string;
}

export interface ImagingDevice {
  identifier: ImagingDeviceIdentifier;
  open(): Promise<MediaStream>;
  close(): void;
}

const IMAGING_DEVICE_CHANGE_EVENT_NAME = "custom-imagingdevicechange";

const dispatchDeviceChangeEvent = () =>
  document.dispatchEvent(new CustomEvent(IMAGING_DEVICE_CHANGE_EVENT_NAME));

export const listDevices = async (): Promise<ImagingDeviceIdentifier[]> => {
  rLogger.info("imagingDevice.listDevices.start");
  const webMediaDevices = await WebMediaDevice.listDevices();
  const allDevices = [...webMediaDevices];
  rLogger.info(
    "imagingDevice.listDevices.end",
    `${allDevices.length} device(s) found`
  );

  return allDevices;
};

export const onDeviceChange = (callback: () => void) => {
  WebMediaDevice.onDeviceChange(dispatchDeviceChangeEvent);
  document.addEventListener(IMAGING_DEVICE_CHANGE_EVENT_NAME, callback);
};
