import { ButtonColor } from "../../../common/Button/ButtonColor";
import IconName from "../../../common/Icon/IconName";
import IconButton from "../../../common/IconButton/IconButton";
import "./TimelineLiveView.css";

const TimelineLiveView = () => {
  return (
    <div className="timeline-live-view">
      <IconButton
        icon={IconName.LIVE_VIEW}
        className="timeline-live-view__button"
        iconContainerClassName="timeline-live-view__button-icon-container"
        title="Live View"
        onClick={() => console.log("TODO")}
        active
      />
    </div>
  );
};

export default TimelineLiveView;
