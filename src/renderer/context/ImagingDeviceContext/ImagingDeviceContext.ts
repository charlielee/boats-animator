import { createContext } from "react";

interface ImagingDeviceContextProps {
  hasCameraAccess: boolean;
}

const defaultValue: ImagingDeviceContextProps = {
  hasCameraAccess: false,
};

export const ImagingDeviceContext = createContext<ImagingDeviceContextProps>(defaultValue);
