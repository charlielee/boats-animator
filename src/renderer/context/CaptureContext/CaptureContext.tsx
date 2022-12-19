import { createContext } from "react";

export interface CaptureContextProps {
  takePhoto: () => void;
  attachStreamToVideo: (element: HTMLVideoElement) => void;
}

const defaultValue: CaptureContextProps = {
  takePhoto: () => undefined,
  attachStreamToVideo: () => undefined,
};

const CaptureContext = createContext<CaptureContextProps>(defaultValue);

export default CaptureContext;
