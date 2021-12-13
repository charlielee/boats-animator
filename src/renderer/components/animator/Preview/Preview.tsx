import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { attachStreamToVideo } from "../../../redux/capture/middleware";
import { RootState } from "../../../redux/store";
import "./Preview.css";
import PreviewLiveView from "./PreviewLiveView/PreviewLiveView";

interface PreviewProps {
  active?: boolean;
}

const Preview = ({ active }: PreviewProps): JSX.Element => {
  const dispatch = useDispatch();
  const { currentDevice, currentDeviceStreaming } = useSelector(
    (state: RootState) => state.app
  );
  return (
    <div className={classNames("preview", { "preview--active": active })}>
      {currentDevice ? (
        <PreviewLiveView
          streaming={currentDeviceStreaming}
          updateSrcObject={(element) => dispatch(attachStreamToVideo(element))}
        />
      ) : (
        <h2>Select a Camera Source to begin!</h2>
      )}
    </div>
  );
};

export default Preview;
