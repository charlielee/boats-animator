import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import "./Preview.css";
import PreviewLiveView from "./PreviewLiveView/PreviewLiveView";

interface PreviewProps {
  active?: boolean;
}

const Preview = ({ active }: PreviewProps): JSX.Element => {
  const { currentDevice } = useSelector((state: RootState) => state.app);
  return (
    <div className={classNames("preview", { "preview--active": active })}>
      {currentDevice ? (
        <PreviewLiveView />
      ) : (
        <h2>Select a Camera Source to begin!</h2>
      )}
    </div>
  );
};

export default Preview;
