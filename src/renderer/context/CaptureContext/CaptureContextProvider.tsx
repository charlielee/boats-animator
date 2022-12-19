import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ReactNode, useEffect, useRef } from "react";
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
import {
  setCurrentDeviceFromId,
  updateCameraAccessStatus,
} from "../../redux/thunks";
import { withLoader } from "../../redux/utils";
import { saveBlobToDisk } from "../../services/blobUtils/blobUtils";
import {
  deviceIdentifierToDevice,
  ImagingDevice,
} from "../../services/imagingDevice/ImagingDevice";
import {
  makeFrameFilePath,
  makeFrameTrackItem,
} from "../../services/project/projectBuilder";
import * as rLogger from "../../services/rLogger/rLogger";
import CaptureContext from "./CaptureContext";

interface CaptureContextProviderProps {
  children: ReactNode;
}

const CaptureContextProvider = ({ children }: CaptureContextProviderProps) => {
  const device = useRef<ImagingDevice | undefined>(undefined);

  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const { playCaptureSound, deviceIdentifier, deviceList, deviceOpen, take } =
    useSelector((state: RootState) => ({
      playCaptureSound: state.app.userPreferences.playCaptureSound,
      deviceIdentifier: state.capture.deviceIdentifier,
      deviceList: state.capture.deviceList,
      deviceOpen: state.capture.deviceOpen,
      take: state.project.take,
    }));

  useEffect(() => {
    if (deviceIdentifier !== device.current?.identifier) {
      onChangeDevice(deviceIdentifier?.deviceId);
    }
  }, [deviceIdentifier]);

  useEffect(() => {
    if (
      deviceIdentifier &&
      !deviceList.find(
        (device) => device.deviceId === deviceIdentifier.deviceId
      )
    ) {
      rLogger.info("captureContextProvider.currentDeviceRemoved");
      onChangeDevice(undefined);
    }
  }, [deviceList]);

  useEffect(() => {
    if (deviceOpen) {
      onOpenDevice();
    } else {
      onCloseDevice();
    }
  }, [deviceOpen]);

  const onChangeDevice = (deviceId: string | undefined) => {
    dispatch(closeDevice());
    const identifier = dispatch(setCurrentDeviceFromId(deviceId));

    if (identifier) {
      device.current = deviceIdentifierToDevice(identifier);
    } else {
      device.current = undefined;
    }
  };

  const onOpenDevice = () =>
    withLoader(dispatch, "Loading device", async () => {
      if (!device.current) {
        return;
      }

      const hasCameraAccess = await dispatch(updateCameraAccessStatus());
      const deviceOpened = hasCameraAccess && (await device.current.open());

      if (!deviceOpened) {
        dispatch(closeDevice());
      }
    });

  const onCloseDevice = () => {
    if (!device.current) {
      return;
    }

    device.current.close();
  };

  const takePhoto = async () => {
    if (!device.current || !take) {
      return;
    }

    if (playCaptureSound) {
      const audio = new Audio(cameraSound);
      audio.play();
    }

    const filePath = makeFrameFilePath(take);
    const imageData = await device.current.takePhoto();
    saveBlobToDisk(filePath, imageData);

    const trackItem = makeFrameTrackItem(filePath);
    const imageUrl = URL.createObjectURL(imageData);
    dispatch(addFileRef(makeFrameFileRef(trackItem.id, imageUrl)));
    dispatch(addFrameTrackItem(trackItem));
    dispatch(incrementExportedFrameNumber());
  };

  const attachStreamToVideo = (element: HTMLVideoElement) => {
    console.log("attach", device.current?.stream);
    if (device.current?.stream) {
      element.srcObject = device.current.stream;
    }
  };

  return (
    <CaptureContext.Provider
      value={{
        takePhoto,
        attachStreamToVideo,
      }}
    >
      {children}
    </CaptureContext.Provider>
  );
};

export default CaptureContextProvider;
