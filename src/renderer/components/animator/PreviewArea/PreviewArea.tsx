import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import "./PreviewArea.css";

interface PreviewAreaProps {
  active?: boolean;
}

const PreviewArea = ({ active }: PreviewAreaProps): JSX.Element => {
  const { currentDevice } = useSelector((state: RootState) => state.app);
  return (
    <div
      className={classNames("preview-area", { "preview-area--active": active })}
    >
      <h2 className="preview-area__no-source-message">
        {currentDevice
          ? `Selected device ${currentDevice?.deviceId}`
          : "Select a Camera Source to begin!"}
      </h2>
    </div>
  );
};

export default PreviewArea;
