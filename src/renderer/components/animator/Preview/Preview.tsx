import { useContext } from "react";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { ProjectFilesContext } from "../../../context/ProjectFilesContext.tsx/ProjectFilesContext";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import { getHighlightedTrackItem } from "../../../services/project/projectCalculator";
import "./Preview.css";
import PreviewFrame from "./PreviewFrame/PreviewFrame";
import { PreviewFrameOnionSkin } from "./PreviewFrameOnionSkin/PreviewFrameOnionSkin";
import { PreviewLiveView } from "./PreviewLiveView/PreviewLiveView";
import { PreviewLoader } from "./PreviewLoader/PreviewLoader";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { calculateLiveViewOpacity } from "../../../services/onionSkin/onionSkinCalculator";

export const Preview = () => {
  const { take } = useProjectAndTake();
  const { deviceIdentifier, deviceStatus, deviceLoading } = useContext(ImagingDeviceContext);

  const { hasCameraAccess } = useContext(ImagingDeviceContext);
  const { liveViewVisible, timelineIndex } = useContext(PlaybackContext);
  const { getTrackItemObjectURL } = useContext(ProjectFilesContext);

  const enableOnionSkin = useSelector((state: RootState) => state.project.enableOnionSkin);
  const onionSkinOpacity = useSelector((state: RootState) => state.project.onionSkinOpacity);

  const highlightedTrackItem = getHighlightedTrackItem(take.frameTrack, timelineIndex);

  const previewSrc = highlightedTrackItem
    ? getTrackItemObjectURL?.(highlightedTrackItem)
    : undefined;

  if (!hasCameraAccess) {
    return (
      <div className="preview">
        <h2>
          You have denied camera access to this application.
          <br />
          Please enable access in System Preferences and restart Boats Animator.
        </h2>
      </div>
    );
  }

  if (deviceLoading) {
    return (
      <div className="preview">
        <PreviewLoader />
      </div>
    );
  }

  return (
    <div className="preview">
      {deviceIdentifier === undefined && <h2>Select a Capture Source to begin!</h2>}
      {deviceIdentifier && deviceStatus === undefined && (
        <h2>Select a Capture Resolution to begin!</h2>
      )}
      <PreviewFrameOnionSkin />
      <PreviewLiveView
        stream={deviceStatus?.stream}
        opacity={calculateLiveViewOpacity(enableOnionSkin, onionSkinOpacity, take.frameTrack)}
      />
      <PreviewFrame src={previewSrc} opacity={liveViewVisible ? 0 : 1} />
    </div>
  );
};
