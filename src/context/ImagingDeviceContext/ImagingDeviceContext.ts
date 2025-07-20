import { createContext } from "react";
import {
  ImagingDeviceIdentifier,
  ImagingDeviceStatus,
} from "../../services/imagingDevice/ImagingDevice";
import { ImagingDeviceResolution } from "../../services/imagingDevice/ImagingDeviceResolution";
import { ImagingDeviceSettingValue } from "../../services/imagingDevice/ImagingDeviceSettings";

interface ImagingDeviceContextProps {
  hasCameraAccess: boolean;
  deviceIdentifier: ImagingDeviceIdentifier | undefined;
  deviceStatus: ImagingDeviceStatus | undefined;
  deviceLoading: boolean;
  changeDevice?: (identifier: ImagingDeviceIdentifier) => Promise<void>;
  changeResolution?: (resolution: ImagingDeviceResolution) => Promise<void>;
  changeSetting?: (name: string, value: ImagingDeviceSettingValue) => Promise<void>;
  closeDevice?: () => void;
  captureImageRaw?: () => Promise<Blob> | undefined;
}

const defaultValue: ImagingDeviceContextProps = {
  hasCameraAccess: false,
  deviceIdentifier: undefined,
  deviceStatus: undefined,
  deviceLoading: false,
  changeDevice: undefined,
  changeResolution: undefined,
  changeSetting: undefined,
  closeDevice: undefined,
  captureImageRaw: undefined,
};

export const ImagingDeviceContext = createContext<ImagingDeviceContextProps>(defaultValue);
