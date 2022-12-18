import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFileRefById } from "../../../../common/FileRef";
import { TimelineIndex } from "../../../../common/Flavors";
import { Take } from "../../../../common/project/Take";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { attachStreamToVideo } from "../../../redux/capture/actions";
import { RootState } from "../../../redux/store";
import { getHighlightedTrackItem } from "../../../services/project/projectCalculator";
import "./Preview.css";
import PreviewFrame from "./PreviewFrame/PreviewFrame";
import PreviewLiveView from "./PreviewLiveView/PreviewLiveView";

interface PreviewWithContextProps {
  take: Take;
}

interface PreviewProps extends PreviewWithContextProps {
  liveViewVisible: boolean;
  timelineIndex: TimelineIndex | undefined;
}

const Preview = ({
  take,
  liveViewVisible,
  timelineIndex,
}: PreviewProps): JSX.Element => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const { currentDeviceIdentifier, isDeviceOpen, hasCameraAccess, fileRefs } =
    useSelector((state: RootState) => ({
      currentDeviceIdentifier: state.capture.currentDeviceIdentifier,
      isDeviceOpen: state.capture.deviceOpen,
      hasCameraAccess: state.app.hasCameraAccess,
      fileRefs: state.project.fileRefs,
    }));
  const [previewSrc, setPreviewSrc] = useState<string | undefined>();

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
      {currentDeviceIdentifier && hasCameraAccess && (
        <PreviewLiveView
          streaming={isDeviceOpen}
          updateSrcObject={(element) => dispatch(attachStreamToVideo(element))}
        />
      )}

      {liveViewVisible &&
        !currentDeviceIdentifier &&
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

      <PreviewFrame src={previewSrc} hidden={liveViewVisible} />
    </div>
  );
};

const PreviewWithContext = (props: PreviewWithContextProps): JSX.Element => (
  <PlaybackContext.Consumer>
    {(value) => <Preview {...props} {...value} />}
  </PlaybackContext.Consumer>
);

export default PreviewWithContext;
