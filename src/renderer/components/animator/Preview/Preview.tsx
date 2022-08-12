import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFileRefById } from "../../../../common/FileRef";
import { TimelineIndex } from "../../../../common/Flavors";
import { getHighlightedTrackItem, Take } from "../../../../common/Project";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { attachStreamToVideo } from "../../../redux/capture/actions";
import { RootState } from "../../../redux/store";
import "./Preview.css";
import PreviewFrame from "./PreviewFrame/PreviewFrame";
import PreviewLiveView from "./PreviewLiveView/PreviewLiveView";

interface PreviewWithContextProps {
  take: Take;
}

interface PreviewProps extends PreviewWithContextProps {
  isPlaying: boolean;
  timelineIndex: TimelineIndex | undefined;
}

const Preview = ({
  take,
  isPlaying,
  timelineIndex,
}: PreviewProps): JSX.Element => {
  const dispatch = useDispatch();
  const { currentDevice, isDeviceOpen, hasCameraAccess, fileRefs } =
    useSelector((state: RootState) => ({
      currentDevice: state.app.currentDevice,
      isDeviceOpen: state.app.isDeviceOpen,
      hasCameraAccess: state.app.hasCameraAccess,
      fileRefs: state.project.fileRefs,
    }));

  const [previewSrc, setPreviewSrc] = useState("");

  useEffect(() => {
    const highlightedTrackItem = getHighlightedTrackItem(
      take.frameTrack,
      timelineIndex
    );

    if (highlightedTrackItem) {
      const { location } = getFileRefById(fileRefs, highlightedTrackItem.id);
      setPreviewSrc(location);
    }
  }, [timelineIndex]);

  return (
    <div className="preview">
      {currentDevice && hasCameraAccess && (
        <PreviewLiveView
          streaming={isDeviceOpen}
          updateSrcObject={(element) => dispatch(attachStreamToVideo(element))}
        />
      )}

      {!isPlaying &&
        !currentDevice &&
        (hasCameraAccess ? (
          <h2>Select a Camera Source to begin!</h2>
        ) : (
          <h2>
            You have denied camera access to this application.
            <br />
            Please enable access in System Preferences and restart Boats
            Animator.
          </h2>
        ))}

      <PreviewFrame src={previewSrc} hidden={!isPlaying} />
    </div>
  );
};

const PreviewWithContext = (props: PreviewWithContextProps): JSX.Element => (
  <PlaybackContext.Consumer>
    {(value) => <Preview {...props} {...value} />}
  </PlaybackContext.Consumer>
);

export default PreviewWithContext;
