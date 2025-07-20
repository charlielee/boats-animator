import { createContext } from "react";

interface CaptureContextProps {
  captureImage: () => void;
}

const defaultValue: CaptureContextProps = {
  captureImage: () => undefined,
};

const CaptureContext = createContext<CaptureContextProps>(defaultValue);

export default CaptureContext;
