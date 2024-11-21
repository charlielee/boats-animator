import { createContext } from "react";
import { ImagingDeviceIdentifier } from "../../services/imagingDevice/ImagingDevice";
import { ImagingDeviceResolution } from "../../services/imagingDevice/ImagingDeviceResolution";

interface ImagingDeviceContextProps {
  hasCameraAccess: boolean;
  deviceIdentifier: ImagingDeviceIdentifier | undefined;
  deviceStream: MediaStream | undefined;
  deviceResolution: ImagingDeviceResolution | undefined;
  deviceReady: boolean;
  changeDevice?: (identifier: ImagingDeviceIdentifier) => Promise<void>;
  changeResolution?: (resolution: ImagingDeviceResolution) => Promise<void>;
  closeDevice?: () => void;
  captureImageRaw?: () => Promise<Blob> | undefined;
}

const defaultValue: ImagingDeviceContextProps = {
  hasCameraAccess: false,
  deviceIdentifier: undefined,
  deviceStream: undefined,
  deviceResolution: undefined,
  deviceReady: false,
  changeDevice: undefined,
  changeResolution: undefined,
  closeDevice: undefined,
  captureImageRaw: undefined,
};

export const ImagingDeviceContext = createContext<ImagingDeviceContextProps>(defaultValue);
