import { notifications } from "@mantine/notifications";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import useDeviceList from "../../hooks/useDeviceList";
import {
  deviceIdentifierToDevice,
  ImagingDevice,
  ImagingDeviceIdentifier,
} from "../../services/imagingDevice/ImagingDevice";
import { ImagingDeviceContext } from "./ImagingDeviceContext";
import * as rLogger from "../../services/rLogger/rLogger";
import { ImagingDeviceResolution } from "../../services/imagingDevice/ImagingDeviceResolution";
import { v4 as uuidv4 } from "uuid";

interface ImagingDeviceContextProviderProps {
  children: ReactNode;
}

export const ImagingDeviceContextProvider = ({ children }: ImagingDeviceContextProviderProps) => {
  const deviceList = useDeviceList();

  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  // todo rename to deviceLoading and swap around true and false
  const [deviceReady, setDeviceReady] = useState(true);
  const device = useRef<ImagingDevice | undefined>(undefined);

  const [deviceStatusKey, setDeviceStatusKey] = useState(uuidv4());
  const updateDeviceStatus = () => setDeviceStatusKey(uuidv4());

  const deviceIdentifier = useMemo(() => device.current?.identifier, [deviceStatusKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const deviceStream = useMemo(() => device.current?.stream, [deviceStatusKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const deviceResolution = useMemo(
    () => (device.current?.stream ? device.current?.getResolution() : undefined),
    [deviceStatusKey] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const changeDevice = async (identifier: ImagingDeviceIdentifier) => {
    setDeviceReady(false);
    device.current?.close();
    const newDevice = deviceIdentifierToDevice(identifier);
    device.current = newDevice;

    try {
      await newDevice.open();
    } finally {
      setDeviceReady(true);
      updateDeviceStatus();
    }
  };

  const changeResolution = async (resolution: ImagingDeviceResolution) => {
    setDeviceReady(false);
    device.current?.close();

    try {
      await device.current?.open(resolution);
    } finally {
      setDeviceReady(true);
      updateDeviceStatus();
    }
  };

  const closeDevice = useCallback(() => {
    device.current?.close();
    device.current = undefined;
    updateDeviceStatus();
  }, []);

  const captureImageRaw = () => device.current?.captureImage();

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
      const currentDevice = device.current;
      const currentDeviceConnected = deviceList.find(
        (identifier) => identifier.deviceId === currentDevice?.identifier.deviceId
      );

      if (currentDevice && !currentDeviceConnected) {
        rLogger.info("currentDeviceDisconnected", "The current device was disconnected");
        notifications.show({ message: "Current device was disconnected." });
        closeDevice();
      }
    };

    handleDeviceDisconnected();
  }, [deviceList, closeDevice]);

  return (
    <ImagingDeviceContext.Provider
      value={{
        hasCameraAccess,
        deviceIdentifier,
        deviceStream,
        deviceResolution,
        deviceReady,
        changeDevice,
        changeResolution,
        closeDevice,
        captureImageRaw,
      }}
    >
      {children}
    </ImagingDeviceContext.Provider>
  );
};
