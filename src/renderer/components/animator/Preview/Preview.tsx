import { useContext } from "react";
import { TrackItem } from "../../../../common/project/TrackItem";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { ProjectFilesContext } from "../../../context/ProjectFilesContext.tsx/ProjectFilesContext";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import {
  getHighlightedTrackItem,
  getLastTrackItem,
} from "../../../services/project/projectCalculator";
import "./Preview.css";
import PreviewFrame from "./PreviewFrame/PreviewFrame";
import PreviewLiveView from "./PreviewLiveView/PreviewLiveView";
import { PreviewLoader } from "./PreviewLoader/PreviewLoader";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const Preview = (): JSX.Element => {
  const { take } = useProjectAndTake();
  const { deviceIdentifier, deviceStatus, deviceLoading } = useContext(ImagingDeviceContext);

  const { getTrackItemFileInfo } = useContext(ProjectFilesContext);
  const { hasCameraAccess } = useContext(ImagingDeviceContext);
  const { liveViewVisible, timelineIndex } = useContext(PlaybackContext);

  const highlightedTrackItem = getHighlightedTrackItem(take.frameTrack, timelineIndex);

  const getTrackItemObjectURL = (trackItem: TrackItem) =>
    getTrackItemFileInfo!(trackItem.id)?.objectURL;

  const previewSrc = highlightedTrackItem ? getTrackItemObjectURL(highlightedTrackItem) : undefined;

  const enableOnionSkin = useSelector((state: RootState) => state.project.enableOnionSkin);
  const onionSkinOpacity = useSelector((state: RootState) => state.project.onionSkinOpacity);
  const onionSkinTrackItem = getLastTrackItem(take.frameTrack);
  const onionSkinSrc = onionSkinTrackItem ? getTrackItemObjectURL(onionSkinTrackItem) : undefined;
  const showOnionSkinFrame = liveViewVisible && onionSkinSrc !== undefined && enableOnionSkin;

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
      <PreviewLiveView stream={deviceStatus?.stream} />
      <PreviewFrame src={previewSrc} opacity={liveViewVisible ? 0 : 1} />
      <PreviewFrame src={onionSkinSrc} opacity={showOnionSkinFrame ? onionSkinOpacity / 100 : 0} />
    </div>
  );
};
