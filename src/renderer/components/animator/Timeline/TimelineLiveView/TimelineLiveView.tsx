import classNames from "classnames";
import IconName from "../../../common/Icon/IconName";
import IconButton from "../../../common/IconButton/IconButton";
import "./TimelineLiveView.css";

interface TimelineLiveViewProps {
  highlighted: boolean;
}

const TimelineLiveView = ({ highlighted }: TimelineLiveViewProps) => {
  return (
    <div className="timeline-live-view">
      <IconButton
        icon={IconName.LIVE_VIEW}
        className={classNames("timeline-live-view__button", {
          "timeline-live-view__button--highlighted": highlighted,
        })}
        iconContainerClassName="timeline-live-view__button-icon-container"
        title="Live View"
        onClick={() => console.log("TODO")}
        active
      />
    </div>
  );
};

export default TimelineLiveView;
