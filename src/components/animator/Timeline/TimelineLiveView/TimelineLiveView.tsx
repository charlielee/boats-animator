import classNames from "classnames";
import IconName from "../../../common/Icon/IconName";
import IconButton from "../../../common/IconButton/IconButton";
import "./TimelineLiveView.css";

interface TimelineLiveViewProps {
  highlighted: boolean;
  onClick: () => void;
}

const TimelineLiveView = ({ highlighted, onClick }: TimelineLiveViewProps) => {
  return (
    <div className="timeline-live-view">
      <IconButton
        icon={IconName.LIVE_VIEW}
        className={classNames("timeline-live-view__button", {
          "timeline-live-view__button--highlighted": highlighted,
        })}
        iconContainerClassName="timeline-live-view__button-icon-container"
        title="Live View"
        onClick={onClick}
        active={highlighted}
      />
    </div>
  );
};

export default TimelineLiveView;
