import { createContext } from "react";
import { ImagingDevice } from "../../services/imagingDevice/ImagingDevice";

export interface CaptureContextProps {
  takePhoto: () => void;
  device: ImagingDevice | undefined;
}

const defaultValue: CaptureContextProps = {
  takePhoto: () => undefined,
  device: undefined,
};

const CaptureContext = createContext<CaptureContextProps>(defaultValue);

export default CaptureContext;
