import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cameraSound from "../../audio/camera.wav";
import useDeviceList from "../../hooks/useDeviceList";
import useProjectAndTake from "../../hooks/useProjectAndTake";
import { closeDevice } from "../../redux/slices/captureSlice";
import { addFrameTrackItem } from "../../redux/slices/projectSlice";
import { RootState } from "../../redux/store";
import {
  ImagingDevice,
  deviceIdentifierToDevice,
} from "../../services/imagingDevice/ImagingDevice";
import { makeFrameTrackItem } from "../../services/project/projectBuilder";
import { getNextFileNumber } from "../../services/project/projectCalculator";
import * as rLogger from "../../services/rLogger/rLogger";
import CaptureContext from "./CaptureContext";
import { ProjectFilesContext } from "../ProjectFilesContext.tsx/ProjectFilesContext";
import { ImagingDeviceNotReadyError } from "../../services/imagingDevice/ImagingDeviceErrors";
import { notifications } from "@mantine/notifications";

interface CaptureContextProviderProps {
  children: ReactNode;
}

const CaptureContextProvider = ({ children }: CaptureContextProviderProps) => {
  const [device, setDevice] = useState<ImagingDevice | undefined>(undefined);

  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const deviceList = useDeviceList();
  const { take } = useProjectAndTake();
  const deviceStatus = useSelector((state: RootState) => state.capture.deviceStatus);
  const playCaptureSound = useSelector(
    (state: RootState) => state.app.userPreferences.playCaptureSound
  );
  const { saveTrackItemToDisk } = useContext(ProjectFilesContext);

  const captureImage = async () => {
    rLogger.info("captureContextProvider.captureImage");
    if (device === undefined) {
      rLogger.info(
        "captureContextProvider.captureImage.noDevice",
        "Nothing captured as no device selected"
      );
      return;
    }

    if (playCaptureSound) {
      rLogger.info("captureContextProvider.captureImage.playCaptureSound");
      const audio = new Audio(cameraSound);
      audio.play();
    }

    try {
      const imageData = await device.captureImage();

      const fileNumber = getNextFileNumber(take.frameTrack);
      const trackItem = makeFrameTrackItem(take, fileNumber);
      await saveTrackItemToDisk!(take, trackItem, imageData);
      dispatch(addFrameTrackItem(trackItem));
    } catch (e) {
      if (e instanceof ImagingDeviceNotReadyError) {
        rLogger.warn("captureNotReadyError", `Device was not ready for capture, try again`);
        return notifications.show({ message: "Device is not ready please wait and try again." });
      } else {
        rLogger.warn(
          "captureImageError",
          `There was an unexpected error capturing with this device ${e}`
        );
        notifications.show({
          message:
            "There was an unexpected error capturing with this device. Please reconnect the device and try again.",
        });
      }
    }
  };

  const _onChangeDevice = useCallback(async () => {
    rLogger.info("captureContextProvider.onChangeDevice", JSON.stringify(deviceStatus));
    const identifier = deviceStatus?.identifier;
    const newDevice = identifier ? deviceIdentifierToDevice(identifier) : undefined;

    device?.close();

    if (deviceStatus?.open === true) {
      await newDevice?.open();
    }

    setDevice(newDevice);
  }, [deviceStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const _onDeviceListChange = useCallback(() => {
    if (
      deviceStatus &&
      !deviceList.find((identifier) => identifier.deviceId === deviceStatus.identifier.deviceId)
    ) {
      rLogger.info("captureContextProvider.currentDeviceDisconnected");
      notifications.show({ message: "Current device was disconnected." });
      dispatch(closeDevice());
    }
  }, [deviceList, deviceStatus, dispatch]);

  useEffect(() => {
    _onChangeDevice();
  }, [_onChangeDevice, deviceStatus]);

  useEffect(() => {
    _onDeviceListChange();
  }, [_onDeviceListChange, deviceList]);

  return (
    <CaptureContext.Provider
      value={{
        captureImage,
        device,
      }}
    >
      {children}
    </CaptureContext.Provider>
  );
};

export default CaptureContextProvider;
