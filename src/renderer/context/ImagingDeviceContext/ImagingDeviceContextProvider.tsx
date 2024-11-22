import { notifications } from "@mantine/notifications";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useDeviceList from "../../hooks/useDeviceList";
import {
  deviceIdentifierToDevice,
  ImagingDevice,
  ImagingDeviceIdentifier,
  ImagingDeviceStatus,
} from "../../services/imagingDevice/ImagingDevice";
import { ImagingDeviceResolution } from "../../services/imagingDevice/ImagingDeviceResolution";
import * as rLogger from "../../services/rLogger/rLogger";
import { ImagingDeviceContext } from "./ImagingDeviceContext";

interface ImagingDeviceContextProviderProps {
  children: ReactNode;
}

export const ImagingDeviceContextProvider = ({ children }: ImagingDeviceContextProviderProps) => {
  const deviceList = useDeviceList();

  const [hasCameraAccess, setHasCameraAccess] = useState(true);
  const [deviceLoading, setDeviceLoading] = useState(false);
  const device = useRef<ImagingDevice | undefined>(undefined);

  const [deviceRefUpdate, setDeviceRefUpdate] = useState(uuidv4());
  const updateDeviceStatus = () => setDeviceRefUpdate(uuidv4());

  const deviceIdentifier = useMemo(() => device.current?.identifier, [deviceRefUpdate]); // eslint-disable-line react-hooks/exhaustive-deps
  const deviceStatus: ImagingDeviceStatus | undefined = useMemo(() => {
    if (device.current?.stream) {
      return {
        stream: device.current.stream,
        resolution: device.current.getResolution(),
        settings: device.current.getSettings(),
      };
    }
  }, [deviceRefUpdate]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeDevice = async (identifier: ImagingDeviceIdentifier) => {
    setDeviceLoading(true);

    device.current?.close();
    device.current = deviceIdentifierToDevice(identifier);
    const deviceName = device.current?.identifier.name;

    try {
      await device.current?.open();
    } catch {
      notifications.show({
        message: `Unable to start ${deviceName}. Please select a different Capture Source.`,
      });
      device.current = undefined;
    } finally {
      setDeviceLoading(false);
      updateDeviceStatus();
    }
  };

  const changeResolution = async (resolution: ImagingDeviceResolution) => {
    setDeviceLoading(true);

    device.current?.close();
    const deviceName = device.current?.identifier.name;

    try {
      await device.current?.open(resolution);
    } catch {
      notifications.show({
        message: `Resolution not supported by ${deviceName}. Please select a different resolution.`,
      });
    } finally {
      setDeviceLoading(false);
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
        rLogger.info("currentDeviceDisconnected", "Current Capture Source was disconnected");
        notifications.show({ message: "Current Capture Source was disconnected." });
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
        deviceStatus,
        deviceLoading,
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
