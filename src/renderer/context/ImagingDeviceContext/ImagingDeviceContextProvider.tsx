import { notifications } from "@mantine/notifications";
import { ReactNode, useEffect, useRef, useState } from "react";
import useDeviceList from "../../hooks/useDeviceList";
import {
  deviceIdentifierToDevice,
  ImagingDevice,
  ImagingDeviceIdentifier,
  ImagingDeviceStatus,
} from "../../services/imagingDevice/ImagingDevice";
import { ImagingDeviceContext } from "./ImagingDeviceContext";
import * as rLogger from "../../services/rLogger/rLogger";
import { ImagingDeviceResolution } from "../../services/imagingDevice/ImagingDeviceResolution";

interface ImagingDeviceContextProviderProps {
  children: ReactNode;
}

export const ImagingDeviceContextProvider = ({ children }: ImagingDeviceContextProviderProps) => {
  const deviceList = useDeviceList();

  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const device = useRef<ImagingDevice | undefined>(undefined);
  const [deviceStatus, setDeviceStatus] = useState<ImagingDeviceStatus | undefined>(undefined);
  const [deviceReady, setDeviceReady] = useState(false);
  const [resolution, setResolution] = useState<ImagingDeviceResolution | undefined>(undefined);

  const reopenDevice = () => {
    setDeviceStatus((prev) => (prev ? { ...prev, open: true } : undefined));
    setDeviceReady(false);
  };
  const pauseDevice = () => {
    setDeviceStatus((prev) => (prev ? { ...prev, open: false } : undefined));
    setDeviceReady(false);
  };
  const closeDevice = () => {
    setDeviceStatus(undefined);
    setDeviceReady(false);
  };
  const changeDevice = (identifier: ImagingDeviceIdentifier) => {
    setDeviceStatus({ identifier, open: true });
    setDeviceReady(false);
  };

  useEffect(() => {
    const handleCheckCameraAccess = async () => {
      const hasAccess = await window.preload.ipcToMain.checkCameraAccess();
      rLogger.info("cameraAccessStatus", `Camera access status is ${hasAccess.toString()}`);
      setHasCameraAccess(hasAccess);
    };
    handleCheckCameraAccess();
  }, []);

  useEffect(() => {
    const handleDeviceDisconnected = () => {
      const currentDeviceInDeviceList =
        deviceList.find(
          (identifier) => identifier.deviceId === deviceStatus?.identifier.deviceId
        ) !== undefined;
      rLogger.info(
        "deviceDisconnected",
        `Current device still in device list: ${currentDeviceInDeviceList.toString()}`
      );

      if (deviceStatus?.identifier && !currentDeviceInDeviceList) {
        notifications.show({ message: "Current device was disconnected." });
        closeDevice();
      }
    };
    handleDeviceDisconnected();
  }, [deviceList, deviceStatus?.identifier]);

  useEffect(() => {
    rLogger.info("deviceStatusChange", JSON.stringify(deviceStatus));
    const handleDeviceStatusChange = async () => {
      const identifier = deviceStatus?.identifier;
      const newDevice = identifier ? deviceIdentifierToDevice(identifier) : undefined;

      device.current?.close();
      device.current = newDevice;

      if (deviceStatus?.open === true && newDevice !== undefined) {
        await newDevice.open();
        setResolution(newDevice.getResolution());
        setDeviceReady(true);
      }
    };

    handleDeviceStatusChange();

    return () => {
      rLogger.info("deviceStatusCleanup", "Device closed as ImagingDeviceContext unmounted");
      device.current?.close();
    };
  }, [deviceStatus]);

  return (
    <ImagingDeviceContext.Provider
      value={{
        hasCameraAccess,
        device,
        deviceStatus,
        deviceReady,
        resolution,
        reopenDevice,
        pauseDevice,
        closeDevice,
        changeDevice,
      }}
    >
      {children}
    </ImagingDeviceContext.Provider>
  );
};
