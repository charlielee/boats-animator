import { createContext } from "react";

export interface CaptureContextProps {
  changeDevice: (deviceId: string) => void;
  openDevice: () => void;
  closeDevice: () => void;
  takePhoto: () => void;
  attachStreamToVideo: (element: HTMLVideoElement) => void;
}

const defaultValue: CaptureContextProps = {
  changeDevice: () => undefined,
  openDevice: () => undefined,
  closeDevice: () => undefined,
  takePhoto: () => undefined,
  attachStreamToVideo: () => undefined,
};

const CaptureContext = createContext<CaptureContextProps>(defaultValue);

export default CaptureContext;
