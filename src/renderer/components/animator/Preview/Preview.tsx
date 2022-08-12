import { useDispatch, useSelector } from "react-redux";
import { attachStreamToVideo } from "../../../redux/capture/actions";
import { RootState } from "../../../redux/store";
import "./Preview.css";
import PreviewLiveView from "./PreviewLiveView/PreviewLiveView";

const Preview = (): JSX.Element => {
  const dispatch = useDispatch();
  const { currentDevice, isDeviceOpen, hasCameraAccess } = useSelector(
    (state: RootState) => state.app
  );

  return (
    <div className="preview">
      {currentDevice && hasCameraAccess && (
        <PreviewLiveView
          streaming={isDeviceOpen}
          updateSrcObject={(element) => dispatch(attachStreamToVideo(element))}
        />
      )}

      {!currentDevice &&
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
    </div>
  );
};

export default Preview;
