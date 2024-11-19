import { createContext, MutableRefObject } from "react";
import {
  ImagingDevice,
  ImagingDeviceIdentifier,
  ImagingDeviceStatus,
} from "../../services/imagingDevice/ImagingDevice";
import { ImagingDeviceResolution } from "../../services/imagingDevice/ImagingDeviceResolution";

interface ImagingDeviceContextProps {
  hasCameraAccess: boolean;
  device: MutableRefObject<ImagingDevice | undefined>;
  deviceStatus: ImagingDeviceStatus | undefined;
  deviceReady: boolean;
  resolution: ImagingDeviceResolution | undefined;
  reopenDevice: () => void;
  pauseDevice: () => void;
  closeDevice: () => void;
  changeDevice: (identifier: ImagingDeviceIdentifier) => void;
}

const defaultValue: ImagingDeviceContextProps = {
  hasCameraAccess: false,
  device: { current: undefined },
  deviceStatus: undefined,
  deviceReady: false,
  resolution: undefined,
  reopenDevice: () => undefined,
  pauseDevice: () => undefined,
  closeDevice: () => undefined,
  changeDevice: () => undefined,
};

export const ImagingDeviceContext = createContext<ImagingDeviceContextProps>(defaultValue);
