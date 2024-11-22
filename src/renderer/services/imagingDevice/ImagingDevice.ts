import * as rLogger from "../../services/rLogger/rLogger";
import { ImagingDeviceResolution } from "./ImagingDeviceResolution";
import { makeTestCameraIdentifier, TestCamera } from "./TestCamera";
import WebMediaDevice from "./WebMediaDevice";

export enum ImagingDeviceType {
  TEST_CAMERA = "TEST_CAMERA",
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
  stream: MediaStream;
  resolution: ImagingDeviceResolution;
}

export interface ImagingDevice {
  stream?: MediaStream;
  identifier: ImagingDeviceIdentifier;
  capabilities: ImagingDeviceCapabilities;
  open(resolution?: ImagingDeviceResolution): Promise<void>;
  close(): void;
  captureImage(): Promise<Blob>;
  getResolution(): ImagingDeviceResolution;
}

export const listDevices = async (showTestDevice: boolean): Promise<ImagingDeviceIdentifier[]> => {
  rLogger.info("imagingDevice.listDevices.start");
  const testDevices = showTestDevice ? [makeTestCameraIdentifier()] : [];
  const webMediaDevices = [...(await WebMediaDevice.listDevices())];
  const allDevices = [...testDevices, ...webMediaDevices];
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
    case ImagingDeviceType.TEST_CAMERA:
      return new TestCamera(identifier);
  }
};
