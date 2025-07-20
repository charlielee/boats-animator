import { createContext, useContext } from "react";

interface CaptureContextProps {
  captureImage: () => void;
}

export const CaptureContext = createContext<CaptureContextProps | undefined>(undefined);

export const useCaptureContext = () => {
  const context = useContext(CaptureContext);

  if (context === undefined) {
    throw new Error("Must be called within CaptureContextProvider");
  }

  return context;
};
