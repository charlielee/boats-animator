import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ReactNode, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeFrameFileRef } from "../../../common/FileRef";
import cameraSound from "../../audio/camera.wav";
import {
  setCurrentDevice,
  setDeviceOpen,
} from "../../redux/slices/captureSlice";
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
import CaptureContext from "./CaptureContext";

interface CaptureContextProviderProps {
  children: ReactNode;
}

const CaptureContextProvider = ({ children }: CaptureContextProviderProps) => {
  const device = useRef<ImagingDevice | undefined>(undefined);

  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const { playCaptureSound, take } = useSelector((state: RootState) => ({
    playCaptureSound: state.app.userPreferences.playCaptureSound,
    take: state.project.take,
  }));

  const changeDevice = (deviceId: string) => {
    closeDevice();
    const identifier = dispatch(setCurrentDeviceFromId(deviceId));

    if (identifier) {
      device.current = deviceIdentifierToDevice(identifier);
      openDevice();
    } else {
      device.current = undefined;
    }
  };

  const openDevice = () =>
    withLoader(dispatch, "Loading device", async () => {
      if (!device.current) {
        return;
      }

      const hasCameraAccess = await dispatch(updateCameraAccessStatus());
      const deviceOpened = hasCameraAccess && (await device.current.open());

      dispatch(
        deviceOpened ? setDeviceOpen(true) : setCurrentDevice(undefined)
      );
    });

  const closeDevice = () => {
    if (!device.current) {
      return;
    }

    device.current.close();
    dispatch(setDeviceOpen(false));
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
    if (device.current?.stream) {
      element.srcObject = device.current.stream;
    }
  };

  return (
    <CaptureContext.Provider
      value={{
        changeDevice,
        openDevice,
        closeDevice,
        takePhoto,
        attachStreamToVideo,
      }}
    >
      {children}
    </CaptureContext.Provider>
  );
};

export default CaptureContextProvider;
