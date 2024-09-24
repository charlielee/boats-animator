import * as rLogger from "../../services/rLogger/rLogger";
import BoatsCameraDevice from "./BoatsCameraDevice";
import WebMediaDevice from "./WebMediaDevice";

export enum ImagingDeviceType {
  WEB_MEDIA = "WEB_MEDIA",
  BOATS_CAMERA = "BOATS_CAMERA",
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

export const listDevices = async (): Promise<ImagingDeviceIdentifier[]> => {
  rLogger.info("imagingDevice.listDevices.start");
  const webMediaDevices = await WebMediaDevice.listDevices();
  const boatsCameraDevice = await BoatsCameraDevice.listDevices();
  const allDevices = [...webMediaDevices, ...boatsCameraDevice];
  rLogger.info("imagingDevice.listDevices.end", `${allDevices.length} device(s) found`);

  return allDevices;
};

export const addDeviceChangeListeners = (listener: () => void): void => {
  WebMediaDevice.addDeviceChangeListener(listener);
};

export const removeDeviceChangeListeners = (listener: () => void): void => {
  WebMediaDevice.removeDeviceChangeListener(listener);
};

export const deviceIdentifierToDevice = (identifier: ImagingDeviceIdentifier): ImagingDevice => {
  switch (identifier.type) {
    case ImagingDeviceType.WEB_MEDIA:
      return new WebMediaDevice(identifier);
    case ImagingDeviceType.BOATS_CAMERA:
      return new BoatsCameraDevice(identifier);
  }
};
