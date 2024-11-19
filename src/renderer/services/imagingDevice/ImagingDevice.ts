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

interface ImagingDeviceCapabilities {
  changeResolution: boolean;
}

export interface ImagingDeviceStatus {
  identifier: ImagingDeviceIdentifier;
  open: boolean;
}

export interface ImagingDevice {
  stream?: MediaStream;
  identifier: ImagingDeviceIdentifier;
  capabilities: ImagingDeviceCapabilities;
  isReady: boolean;
  open(): Promise<void>;
  close(): void;
  captureImage(): Promise<Blob>;
}

export const listDevices = async (): Promise<ImagingDeviceIdentifier[]> => {
  rLogger.info("imagingDevice.listDevices.start");
  const webMediaDevices = await WebMediaDevice.listDevices();
  const allDevices = [...webMediaDevices];
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
  }
};
