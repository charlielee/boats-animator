import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeFrameFileRef } from "../../../common/FileRef";
import cameraSound from "../../audio/camera.wav";
import { closeDevice } from "../../redux/slices/captureSlice";
import {
  addFileRef,
  addFrameTrackItem,
  incrementExportedFrameNumber,
} from "../../redux/slices/projectSlice";
import { RootState } from "../../redux/store";
import { setCurrentDeviceFromId, updateCameraAccessStatus, withLoader } from "../../redux/thunks";
import { saveBlobToDisk } from "../../services/blobUtils/blobUtils";
import {
  deviceIdentifierToDevice,
  ImagingDevice,
} from "../../services/imagingDevice/ImagingDevice";
import { makeFrameFilePath, makeFrameTrackItem } from "../../services/project/projectBuilder";
import * as rLogger from "../../services/rLogger/rLogger";
import CaptureContext from "./CaptureContext";
import useProjectAndTake from "../../hooks/useProjectAndTake";
import useDeviceList from "../../hooks/useDeviceList";

interface CaptureContextProviderProps {
  children: ReactNode;
}

const CaptureContextProvider = ({ children }: CaptureContextProviderProps) => {
  const [device, setDevice] = useState<ImagingDevice | undefined>(undefined);

  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const { project, take } = useProjectAndTake();
  const { playCaptureSound, deviceStatus } = useSelector((state: RootState) => ({
    playCaptureSound: state.app.userPreferences.playCaptureSound,
    deviceStatus: state.capture.deviceStatus,
  }));
  const deviceList = useDeviceList();

  const onChangeDevice = useCallback(
    (deviceId: string | undefined) => {
      rLogger.info("captureContextProvider.onChangeDevice");
      dispatch(closeDevice());
      const identifier = dispatch(setCurrentDeviceFromId(deviceId, deviceList));

      if (identifier !== undefined) {
        setDevice(deviceIdentifierToDevice(identifier));
      } else {
        setDevice(undefined);
      }
    },
    [deviceList, dispatch]
  );

  const onOpenDevice = useCallback(
    () =>
      dispatch(
        withLoader("Loading device", async () => {
          rLogger.info("captureContextProvider.onOpenDevice");
          if (!device) {
            return;
          }

          const hasCameraAccess = await dispatch(updateCameraAccessStatus());
          const deviceOpened = hasCameraAccess && (await device.open());

          if (!deviceOpened) {
            dispatch(closeDevice());
          }
        })
      ),
    [device, dispatch]
  );

  const onCloseDevice = useCallback(() => {
    rLogger.info("captureContextProvider.onCloseDevice");
    device?.close();
  }, [device]);

  const takePhoto = async () => {
    if (!device) {
      return;
    }

    if (playCaptureSound) {
      const audio = new Audio(cameraSound);
      audio.play();
    }

    const filePath = makeFrameFilePath(project, take);
    const imageData = await device.takePhoto();
    saveBlobToDisk(filePath, imageData);

    const trackItem = makeFrameTrackItem(filePath);
    const imageUrl = URL.createObjectURL(imageData);
    dispatch(addFileRef(makeFrameFileRef(trackItem.id, imageUrl)));
    dispatch(addFrameTrackItem(trackItem));
    dispatch(incrementExportedFrameNumber());
  };

  // Handle device id changing
  useEffect(() => {
    if (deviceStatus?.identifier !== device?.identifier) {
      onChangeDevice(deviceStatus?.identifier?.deviceId);
    }
  }, [device?.identifier, deviceStatus?.identifier, onChangeDevice]);

  // Handle current device being removed
  useEffect(() => {
    if (
      deviceStatus &&
      deviceList.find((device) => device.deviceId === deviceStatus.identifier.deviceId) ===
        undefined
    ) {
      rLogger.info("captureContextProvider.currentDeviceRemoved");
      onChangeDevice(undefined);
    }
  }, [deviceList, deviceStatus, onChangeDevice]);

  // Handle device being opened or closed
  useEffect(() => {
    if (deviceStatus && deviceStatus?.open) {
      onOpenDevice();
    } else {
      onCloseDevice();
    }
  }, [deviceStatus, onCloseDevice, onOpenDevice]);

  return (
    <CaptureContext.Provider
      value={{
        takePhoto,
        device,
      }}
    >
      {children}
    </CaptureContext.Provider>
  );
};

export default CaptureContextProvider;
