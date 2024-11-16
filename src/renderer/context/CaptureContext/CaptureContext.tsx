import { createContext } from "react";
import { ImagingDevice } from "../../services/imagingDevice/ImagingDevice";

interface CaptureContextProps {
  captureImage: () => void;
  device: ImagingDevice | undefined;
}

const defaultValue: CaptureContextProps = {
  captureImage: () => undefined,
  device: undefined,
};

const CaptureContext = createContext<CaptureContextProps>(defaultValue);

export default CaptureContext;
