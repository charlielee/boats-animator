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

  const [deviceStateChanged, setDeviceStateChanged] = useState(uuidv4());
  const triggerDeviceStateChange = () => setDeviceStateChanged(uuidv4());

  // todo can these be combined into a single memo
  const deviceIdentifier = useMemo(() => device.current?.identifier, [deviceStateChanged]); // eslint-disable-line react-hooks/exhaustive-deps
  const deviceStream = useMemo(() => device.current?.stream, [deviceStateChanged]); // eslint-disable-line react-hooks/exhaustive-deps
  const deviceResolution = useMemo(
    () => (device.current?.stream ? device.current?.getResolution() : undefined),
    [deviceStateChanged] // eslint-disable-line react-hooks/exhaustive-deps
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
      triggerDeviceStateChange();
    }
  };

  const changeResolution = async (resolution: ImagingDeviceResolution) => {
    setDeviceReady(false);
    device.current?.close();

    try {
      await device.current?.open(resolution);
    } finally {
      setDeviceReady(true);
      triggerDeviceStateChange();
    }
  };

  const closeDevice = useCallback(() => {
    device.current?.close();
    device.current = undefined;
    triggerDeviceStateChange();
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
    const handleDeviceDisconnected = async () => {
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
  }, [closeDevice, deviceIdentifier?.deviceId, deviceList]);

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
