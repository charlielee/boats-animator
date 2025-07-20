import { createContext, useContext } from "react";
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
  changeDevice: (identifier: ImagingDeviceIdentifier) => Promise<void>;
  changeResolution: (resolution: ImagingDeviceResolution) => Promise<void>;
  changeSetting: (name: string, value: ImagingDeviceSettingValue) => Promise<void>;
  closeDevice: () => void;
  captureImageRaw: () => Promise<Blob> | undefined;
}

export const ImagingDeviceContext = createContext<ImagingDeviceContextProps | undefined>(undefined);

export const useImagingDeviceContext = () => {
  const context = useContext(ImagingDeviceContext);

  if (context === undefined) {
    throw new Error("Must be called within ImagingDeviceContextProvider");
  }

  return context;
};
