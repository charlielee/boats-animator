import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { attachStreamToVideo } from "../../../redux/capture/actions";
import { RootState } from "../../../redux/store";
import "./Preview.css";
import PreviewLiveView from "./PreviewLiveView/PreviewLiveView";

const Preview = (): JSX.Element => {
  const dispatch = useDispatch();
  const { currentDevice, isDeviceOpen } = useSelector(
    (state: RootState) => state.app
  );
  return (
    <div className={classNames("preview", { "preview--active": isDeviceOpen })}>
      {currentDevice ? (
        <PreviewLiveView
          streaming={isDeviceOpen}
          updateSrcObject={(element) => dispatch(attachStreamToVideo(element))}
        />
      ) : (
        <h2>Select a Camera Source to begin!</h2>
      )}
    </div>
  );
};

export default Preview;
