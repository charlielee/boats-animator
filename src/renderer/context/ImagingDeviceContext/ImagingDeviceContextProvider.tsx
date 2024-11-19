import { ReactNode, useEffect, useState } from "react";
import { ImagingDeviceContext } from "./ImagingDeviceContext";

interface ImagingDeviceContextProviderProps {
  children: ReactNode;
}

export const ImagingDeviceContextProvider = ({ children }: ImagingDeviceContextProviderProps) => {
  const [hasCameraAccess, setHasCameraAccess] = useState(false);

  const updateHasCameraAccess = async () => {
    const hasAccess = await window.preload.ipcToMain.checkCameraAccess();
    setHasCameraAccess(hasAccess);
  };

  useEffect(() => {
    updateHasCameraAccess();
  }, []);

  return (
    <ImagingDeviceContext.Provider value={{ hasCameraAccess }}>
      {children}
    </ImagingDeviceContext.Provider>
  );
};
