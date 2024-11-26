import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { Take } from "../../../../common/project/Take";
import { zeroPad } from "../../../../common/utils";
import { ImagingDeviceContext } from "../../../context/ImagingDeviceContext/ImagingDeviceContext";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import { toggleCapturePane } from "../../../redux/slices/projectSlice";
import { RootState } from "../../../redux/store";
import { getTrackLength } from "../../../services/project/projectCalculator";
import Button from "../../common/Button/Button";
import { ButtonColor } from "../../common/Button/ButtonColor";
import IconName from "../../common/Icon/IconName";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import { UiActionIcon } from "../../ui/UiActionIcon/UiActionIcon";
import "./TitleToolbar.css";
import { TitleToolbarTimestamp } from "./TitleToolbarTimestamp/TitleToolbarTimestamp";

const TitleToolbar = (): JSX.Element => {
  const { take } = useProjectAndTake();
  const dispatch = useDispatch();
  const showCapturePane = useSelector((state: RootState) => state.project.showCapturePane);
  const { deviceIdentifier } = useContext(ImagingDeviceContext);

  const makeTakeTitle = (take: Take) =>
    `Shot ${zeroPad(take.shotNumber, 3)} Take ${zeroPad(take.takeNumber, 2)}`;

  return (
    <Toolbar className="title-toolbar">
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <Button
          label={makeTakeTitle(take)}
          title="Manage project"
          onClick={PageRoute.STARTUP}
          color={ButtonColor.TRANSPARENT}
          icon={IconName.FOLDER}
        />
      </ToolbarItem>
      <ToolbarItem align={ToolbarItemAlign.CENTER}>
        <TitleToolbarTimestamp take={take} />
      </ToolbarItem>
      <ToolbarItem stretch align={ToolbarItemAlign.RIGHT}>
        <UiActionIcon
          icon={IconName.CAPTURE_SETTINGS}
          onClick={() => dispatch(toggleCapturePane())}
          open={showCapturePane}
          active={deviceIdentifier !== undefined}
        >
          {showCapturePane ? "Close Capture Pane" : "Open Capture Pane"}
        </UiActionIcon>

        <UiActionIcon
          icon={IconName.VIDEO}
          onClick={PageRoute.ANIMATOR_EXPORT_VIDEO_MODAL}
          disabled={getTrackLength(take.frameTrack) === 0}
        >
          Export Video
        </UiActionIcon>
      </ToolbarItem>
    </Toolbar>
  );
};

export default TitleToolbar;
