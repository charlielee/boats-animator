import { notifications } from "@mantine/notifications";
import { ReactNode, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import cameraSound from "../../audio/camera.wav";
import useProjectAndTake from "../../hooks/useProjectAndTake";
import { addFrameTrackItem } from "../../redux/slices/projectSlice";
import { RootState } from "../../redux/store";
import { makeFrameTrackItem } from "../../services/project/projectBuilder";
import { getNextFileNumber } from "../../services/project/projectCalculator";
import * as rLogger from "../../services/rLogger/rLogger";
import { ImagingDeviceContext } from "../ImagingDeviceContext/ImagingDeviceContext";
import { ProjectFilesContext } from "../ProjectFilesContext.tsx/ProjectFilesContext";
import CaptureContext from "./CaptureContext";

interface CaptureContextProviderProps {
  children: ReactNode;
}

const CaptureContextProvider = ({ children }: CaptureContextProviderProps) => {
  const dispatch = useDispatch();
  const { take } = useProjectAndTake();
  const playCaptureSound = useSelector(
    (state: RootState) => state.app.userPreferences.playCaptureSound
  );
  const { saveTrackItemToDisk } = useContext(ProjectFilesContext);
  const { captureImageRaw, deviceLoading, deviceIdentifier } = useContext(ImagingDeviceContext);

  const captureImage = async () => {
    rLogger.info("captureContextProvider.captureImage");
    if (deviceIdentifier === undefined) {
      rLogger.info("captureNoDevice", "Nothing captured as no device selected");
      return;
    }
    if (deviceLoading === true) {
      rLogger.info("captureDeviceNotReady", "Nothing captured as device is not ready yet");
      return;
    }

    if (playCaptureSound) {
      rLogger.info("playCaptureSound");
      const audio = new Audio(cameraSound);
      audio.play();
    }

    try {
      const imageData = await captureImageRaw?.();
      if (imageData === undefined) {
        throw "Unable to captureImage as no imageData returned";
      }

      const fileNumber = getNextFileNumber(take.frameTrack);
      const trackItem = makeFrameTrackItem(take, fileNumber);
      await saveTrackItemToDisk!(take, trackItem, imageData);
      dispatch(addFrameTrackItem(trackItem));
    } catch (e) {
      rLogger.warn(
        "captureImageError",
        `There was an unexpected error capturing with this device ${e}`
      );
      notifications.show({
        message:
          "There was an unexpected error capturing with this Capture Source. Please wait and try again.",
      });
    }
  };

  return (
    <CaptureContext.Provider
      value={{
        captureImage,
      }}
    >
      {children}
    </CaptureContext.Provider>
  );
};

export default CaptureContextProvider;
