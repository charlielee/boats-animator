import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrackItem } from "../../../common/project/TrackItem";
import { zeroPad } from "../../../common/utils";
import cameraSound from "../../audio/camera.wav";
import useDeviceList from "../../hooks/useDeviceList";
import useProjectAndTake from "../../hooks/useProjectAndTake";
import useProjectDirectory from "../../hooks/useProjectDirectory";
import { closeDevice } from "../../redux/slices/captureSlice";
import { addFrameTrackItem } from "../../redux/slices/projectSlice";
import { RootState } from "../../redux/store";
import {
  ImagingDevice,
  deviceIdentifierToDevice,
} from "../../services/imagingDevice/ImagingDevice";
import { makeFrameFilePath, makeFrameTrackItem } from "../../services/project/projectBuilder";
import { getNextFileNumber } from "../../services/project/projectCalculator";
import * as rLogger from "../../services/rLogger/rLogger";
import CaptureContext from "./CaptureContext";
import { ProjectFilesContext } from "../ProjectFilesContext.tsx/ProjectFilesContext";

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
  const projectDirectory = useProjectDirectory();
  const projectFilesContext = useContext(ProjectFilesContext);

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
    processPhoto(trackItem);
  };

  const processPhoto = async (trackItem: TrackItem) => {
    if (!device || !projectDirectory) {
      return;
    }
    const imageData = await device.takePhoto();
    await projectFilesContext?.saveTrackItemToDisk(take, trackItem, imageData);
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
