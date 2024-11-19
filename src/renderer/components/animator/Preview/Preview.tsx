import { useSelector } from "react-redux";
import CaptureContext from "../../../context/CaptureContext/CaptureContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import { RootState } from "../../../redux/store";
import { getHighlightedTrackItem } from "../../../services/project/projectCalculator";
import "./Preview.css";
import PreviewFrame from "./PreviewFrame/PreviewFrame";
import PreviewLiveView from "./PreviewLiveView/PreviewLiveView";
import { useContext } from "react";
import { ProjectFilesContext } from "../../../context/ProjectFilesContext.tsx/ProjectFilesContext";
import { TrackItem } from "../../../../common/project/TrackItem";
import { PreviewLoader } from "./PreviewLoader/PreviewLoader";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";

export const Preview = (): JSX.Element => {
  const { take } = useProjectAndTake();
  const { deviceStatus } = useSelector((state: RootState) => ({
    deviceStatus: state.capture.deviceStatus,
  }));

  const { getTrackItemFileInfo } = useContext(ProjectFilesContext);
  const { hasCameraAccess } = useContext(ImagingDeviceContext);
  const { device } = useContext(CaptureContext);
  const { liveViewVisible, timelineIndex } = useContext(PlaybackContext);

  const highlightedTrackItem = getHighlightedTrackItem(take.frameTrack, timelineIndex);

  const getTrackItemObjectURL = (trackItem: TrackItem) =>
    getTrackItemFileInfo!(trackItem.id)?.objectURL;

  const previewSrc = highlightedTrackItem ? getTrackItemObjectURL(highlightedTrackItem) : undefined;

  return (
    <div className="preview">
      {deviceStatus && hasCameraAccess && <PreviewLiveView stream={device?.stream} />}

      {liveViewVisible &&
        !deviceStatus &&
        (hasCameraAccess ? (
          <h2>Select a Capture Source to begin!</h2>
        ) : (
          <h2>
            You have denied camera access to this application.
            <br />
            Please enable access in System Preferences and restart Boats Animator.
          </h2>
        ))}

      <PreviewFrame src={previewSrc} hidden={liveViewVisible} />

      {deviceStatus?.open === true && device?.isReady !== true && <PreviewLoader />}
    </div>
  );
};
