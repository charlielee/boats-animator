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
import {
  areResolutionsEqual,
  ImagingDeviceResolution,
} from "../../services/imagingDevice/ImagingDeviceResolution";

interface ImagingDeviceContextProviderProps {
  children: ReactNode;
}

export const ImagingDeviceContextProvider = ({ children }: ImagingDeviceContextProviderProps) => {
  const deviceList = useDeviceList();

  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const device = useRef<ImagingDevice | undefined>(undefined);
  const [deviceStatus, setDeviceStatus] = useState<ImagingDeviceStatus | undefined>(undefined);
  const [deviceReady, setDeviceReady] = useState(false);

  console.log({ device, deviceStatus, deviceReady });

  const reopenDevice = () => {
    setDeviceStatus((prev) => (prev ? { ...prev, open: true } : undefined));
  };
  const pauseDevice = () => {
    setDeviceStatus((prev) => (prev ? { ...prev, open: false } : undefined));
  };
  const closeDevice = () => {
    setDeviceStatus(undefined);
  };
  const changeDevice = (identifier: ImagingDeviceIdentifier) => {
    setDeviceStatus({ identifier, open: true, resolution: undefined });
  };

  const changeResolution = (resolution: ImagingDeviceResolution) => {
    setDeviceStatus((prev) => (prev ? { ...prev, resolution } : undefined));
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

  // useEffect(() => {
  //   const identifier = deviceStatus?.identifier;
  //   const newDevice = identifier ? deviceIdentifierToDevice(identifier) : undefined;

  //   if (deviceStatus === )
  //   setDeviceReady(false);

  //   setDeviceReady(true);

  // }, [deviceStatus?.open])

  // update/close device should be separate to open device
  useEffect(() => {
    const handleDeviceStatusChange = async () => {
      rLogger.info("deviceStatusChange", JSON.stringify(deviceStatus));
      setDeviceReady(false);

      const identifier = deviceStatus?.identifier;
      const newDevice = identifier ? deviceIdentifierToDevice(identifier) : undefined;

      device.current?.close();
      device.current = newDevice;

      if (deviceStatus?.open === true && newDevice !== undefined) {
        await newDevice.open(deviceStatus.resolution);
        setDeviceReady(true);
      }
    };

    handleDeviceStatusChange();

    return () => {
      rLogger.info("deviceStatusCleanup", "Device closed as ImagingDeviceContext unmounted");
      device.current?.close();
    };
  }, [deviceStatus]);

  // useEffect(() => {})

  return (
    <ImagingDeviceContext.Provider
      value={{
        hasCameraAccess,
        device,
        deviceStatus,
        deviceReady,
        reopenDevice,
        pauseDevice,
        closeDevice,
        changeDevice,
        changeResolution,
      }}
    >
      {children}
    </ImagingDeviceContext.Provider>
  );
};
