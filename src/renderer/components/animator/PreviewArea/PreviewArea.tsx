import classNames from "classnames";
import "./PreviewArea.css";

interface PreviewAreaProps {
  active?: boolean;
}

const PreviewArea = ({ active }: PreviewAreaProps): JSX.Element => {
  return (
    <div
      className={classNames("preview-area", { "preview-area--active": active })}
    >
      <h2 className="preview-area__no-source-message">
        Select a Camera Source to begin!
      </h2>
    </div>
  );
};

export default PreviewArea;
