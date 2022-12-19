import { createContext, MutableRefObject } from "react";
import { ImagingDevice } from "../../services/imagingDevice/ImagingDevice";

export interface CaptureContextProps {
  takePhoto: () => void;
  deviceRef: MutableRefObject<ImagingDevice | undefined> | undefined;
}

const defaultValue: CaptureContextProps = {
  takePhoto: () => undefined,
  deviceRef: undefined,
};

const CaptureContext = createContext<CaptureContextProps>(defaultValue);

export default CaptureContext;
