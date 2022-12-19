import * as rLogger from "../../services/rLogger/rLogger";
import WebMediaDevice from "./WebMediaDevice";

export enum ImagingDeviceType {
  WEB_MEDIA = "WEB_MEDIA",
}

export interface ImagingDeviceIdentifier {
  deviceId: string;
  name: string;
  type: ImagingDeviceType;
}

export interface ImagingDeviceStatus {
  identifier: ImagingDeviceIdentifier;
  open: boolean;
}

export interface ImagingDevice {
  stream?: MediaStream;
  identifier: ImagingDeviceIdentifier;
  open(): Promise<boolean>;
  close(): void;
  takePhoto(): Promise<Blob>;
}

const IMAGING_DEVICE_CHANGE_EVENT_NAME = "imaging-device-change";

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

export const onDeviceChange = (callback: () => void): void => {
  WebMediaDevice.onDeviceChange(dispatchDeviceChangeEvent);
  document.addEventListener(IMAGING_DEVICE_CHANGE_EVENT_NAME, callback);
};

export const deviceIdentifierToDevice = (
  identifier: ImagingDeviceIdentifier
): ImagingDevice => {
  switch (identifier.type) {
    case ImagingDeviceType.WEB_MEDIA:
      return new WebMediaDevice(identifier);
  }
};
