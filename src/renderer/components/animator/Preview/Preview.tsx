import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFileRefById } from "../../../../common/FileRef";
import { TimelineIndex } from "../../../../common/Flavors";
import CaptureContext from "../../../context/CaptureContext/CaptureContext";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import { RootState } from "../../../redux/store";
import { ImagingDevice } from "../../../services/imagingDevice/ImagingDevice";
import { getHighlightedTrackItem } from "../../../services/project/projectCalculator";
import "./Preview.css";
import PreviewFrame from "./PreviewFrame/PreviewFrame";
import PreviewLiveView from "./PreviewLiveView/PreviewLiveView";

interface PreviewProps {
  device: ImagingDevice | undefined;
  liveViewVisible: boolean;
  timelineIndex: TimelineIndex | undefined;
}

const Preview = ({ device, liveViewVisible, timelineIndex }: PreviewProps): JSX.Element => {
  const { take } = useProjectAndTake();
  const { deviceStatus, hasCameraAccess, fileRefs } = useSelector((state: RootState) => ({
    deviceStatus: state.capture.deviceStatus,
    hasCameraAccess: state.app.hasCameraAccess,
    fileRefs: state.project.fileRefs,
  }));
  const [previewSrc, setPreviewSrc] = useState<string | undefined>();

  useEffect(() => {
    const highlightedTrackItem = getHighlightedTrackItem(take.frameTrack, timelineIndex);

    if (highlightedTrackItem) {
      const { location } = getFileRefById(fileRefs, highlightedTrackItem.id);
      setPreviewSrc(location);
    }
  }, [fileRefs, take.frameTrack, timelineIndex]);

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

const PreviewWithContext = (): JSX.Element => (
  <CaptureContext.Consumer>
    {({ device }) => (
      <PlaybackContext.Consumer>
        {({ liveViewVisible, timelineIndex }) => (
          <Preview
            device={device}
            liveViewVisible={liveViewVisible}
            timelineIndex={timelineIndex}
          />
        )}
      </PlaybackContext.Consumer>
    )}
  </CaptureContext.Consumer>
);

export default PreviewWithContext;
