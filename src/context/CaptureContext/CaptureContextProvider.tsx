import { notifications } from "@mantine/notifications";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import cameraSound from "../../audio/camera.wav";
import useProjectAndTake from "../../hooks/useProjectAndTake";
import { RootState } from "../../redux/store";
import { makeFrameTrackItem } from "../../services/project/projectBuilder";
import { getNextFileNumber } from "../../services/project/projectCalculator";
import * as rLogger from "../../services/rLogger/rLogger";
import { useImagingDeviceContext } from "../ImagingDeviceContext/ImagingDeviceContext";
import { CaptureContext } from "./CaptureContext";
import { useProjectFilesContext } from "../ProjectFilesContext.tsx/ProjectFilesContext";

interface CaptureContextProviderProps {
  children: ReactNode;
}

const CaptureContextProvider = ({ children }: CaptureContextProviderProps) => {
  const { take } = useProjectAndTake();
  const playCaptureSound = useSelector(
    (state: RootState) => state.app.userPreferences.playCaptureSound
  );
  const { saveTrackItemToDisk } = useProjectFilesContext();
  const { captureImageRaw, deviceStatus } = useImagingDeviceContext();

  const captureImage = async () => {
    rLogger.info("captureContextProvider.captureImage");
    if (deviceStatus === undefined) {
      rLogger.info("captureDeviceNotReady", "Nothing captured as device is not ready yet");
      return;
    }

    if (playCaptureSound) {
      rLogger.info("playCaptureSound");
      const audio = new Audio(cameraSound);
      audio.play();
    }

    try {
      const imageData = await captureImageRaw();
      if (imageData === undefined) {
        throw "Unable to captureImage as no imageData returned";
      }

      const fileNumber = getNextFileNumber(take.frameTrack);
      const trackItem = makeFrameTrackItem(take, fileNumber);
      await saveTrackItemToDisk(take, trackItem, imageData);
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
