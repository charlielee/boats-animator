import { useSelector } from "react-redux";
import { getFileRefById } from "../../../../common/FileRef";
import CaptureContext from "../../../context/CaptureContext/CaptureContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import { RootState } from "../../../redux/store";
import { getHighlightedTrackItem } from "../../../services/project/projectCalculator";
import "./Preview.css";
import PreviewFrame from "./PreviewFrame/PreviewFrame";
import PreviewLiveView from "./PreviewLiveView/PreviewLiveView";
import { useContext } from "react";

export const Preview = (): JSX.Element => {
  const { take } = useProjectAndTake();
  const { deviceStatus, hasCameraAccess, fileRefs } = useSelector((state: RootState) => ({
    deviceStatus: state.capture.deviceStatus,
    hasCameraAccess: state.app.hasCameraAccess,
    fileRefs: state.project.fileRefs,
  }));

  const { device } = useContext(CaptureContext);
  const { liveViewVisible, timelineIndex } = useContext(PlaybackContext);

  const highlightedTrackItem = getHighlightedTrackItem(take.frameTrack, timelineIndex);
  const previewSrc = highlightedTrackItem
    ? getFileRefById(fileRefs, highlightedTrackItem.id)?.location
    : undefined;

  return (
    <div className="preview">
      {deviceStatus && hasCameraAccess && <PreviewLiveView stream={device?.stream} />}

      {liveViewVisible &&
        !deviceStatus &&
        (hasCameraAccess ? (
          <h2>Select a Camera Source to begin!</h2>
        ) : (
          <h2>
            You have denied camera access to this application.
            <br />
            Please enable access in System Preferences and restart Boats Animator.
          </h2>
        ))}

      <PreviewFrame src={previewSrc} hidden={liveViewVisible} />
    </div>
  );
};
