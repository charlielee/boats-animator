import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeFrameFileRef } from "../../../common/FileRef";
import cameraSound from "../../audio/camera.wav";
import useProjectAndTake from "../../hooks/useProjectAndTake";
import { addFileRef, addFrameTrackItem } from "../../redux/slices/projectSlice";
import { RootState } from "../../redux/store";
import { saveBlobToDisk } from "../../services/blobUtils/blobUtils";
import {
  ImagingDevice,
  deviceIdentifierToDevice,
} from "../../services/imagingDevice/ImagingDevice";
import { makeFrameFilePath, makeFrameTrackItem } from "../../services/project/projectBuilder";
import CaptureContext from "./CaptureContext";
import * as rLogger from "../../services/rLogger/rLogger";
import useDeviceList from "../../hooks/useDeviceList";
import { closeDevice } from "../../redux/slices/captureSlice";
import { zeroPad } from "../../../common/utils";
import { TrackItem } from "../../../common/project/TrackItem";
import { getNextFileNumber } from "../../services/project/projectCalculator";

interface CaptureContextProviderProps {
  children: ReactNode;
}

const CaptureContextProvider = ({ children }: CaptureContextProviderProps) => {
  const [device, setDevice] = useState<ImagingDevice | undefined>(undefined);

  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const deviceList = useDeviceList();
  const { project, take } = useProjectAndTake();
  const deviceStatus = useSelector((state: RootState) => state.capture.deviceStatus);
  const playCaptureSound = useSelector(
    (state: RootState) => state.app.userPreferences.playCaptureSound
  );

  const takePhoto = () => {
    rLogger.info("captureContextProvider.takePhoto");

    if (playCaptureSound) {
      const audio = new Audio(cameraSound);
      audio.play();
    }

    // Frame track items should be created synchronously to ensure frames are created in the correct order
    // and do not have overwriting file names
    const fileNumber = getNextFileNumber(take.frameTrack);
    const filePath = makeFrameFilePath(project, take, zeroPad(fileNumber, 5));
    const trackItem = makeFrameTrackItem(filePath, fileNumber);
    dispatch(addFrameTrackItem(trackItem));

    // Intentionally fire async method without await
    processPhoto(filePath, trackItem);
  };

  const processPhoto = async (filePath: string, trackItem: TrackItem) => {
    if (!device) {
      return;
    }
    const imageData = await device.takePhoto();
    saveBlobToDisk(filePath, imageData);

    const imageUrl = URL.createObjectURL(imageData);
    dispatch(addFileRef(makeFrameFileRef(trackItem.id, imageUrl)));
  };

  const onChangeDevice = useCallback(async () => {
    rLogger.info("captureContextProvider.onChangeDevice", JSON.stringify(deviceStatus));
    const identifier = deviceStatus?.identifier;
    const newDevice = identifier ? deviceIdentifierToDevice(identifier) : undefined;

    device?.close();

    if (deviceStatus?.open === true) {
      await newDevice?.open();
    }

    setDevice(newDevice);
  }, [deviceStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const onDeviceListChange = useCallback(() => {
    if (
      deviceStatus &&
      !deviceList.find((identifier) => identifier.deviceId === deviceStatus.identifier.deviceId)
    ) {
      rLogger.info("captureContextProvider.currentDeviceDisconnected");
      dispatch(closeDevice());
    }
  }, [deviceList, deviceStatus, dispatch]);

  useEffect(() => {
    onChangeDevice();
  }, [onChangeDevice, deviceStatus]);

  useEffect(() => {
    onDeviceListChange();
  }, [onDeviceListChange, deviceList]);

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
