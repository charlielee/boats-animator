import { PageRoute } from "../../../../common/PageRoute";
import { Take } from "../../../../common/project/Take";
import { zeroPad } from "../../../../common/utils";
import { getTrackLength } from "../../../services/project/projectCalculator";
import Button from "../../common/Button/Button";
import { ButtonColor } from "../../common/Button/ButtonColor";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import "./TitleToolbar.css";

interface TitleToolbarProps {
  take: Take;
}

const TitleToolbar = ({ take }: TitleToolbarProps): JSX.Element => {
  const makeTakeTitle = (take: Take) =>
    `Shot ${zeroPad(take.shotNumber, 3)} Take ${zeroPad(take.takeNumber, 2)}`;

  return (
    <Toolbar className="title-toolbar">
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <Button
          label={makeTakeTitle(take)}
          title="Manage project"
          onClick={PageRoute.STARTUP_MODAL}
          color={ButtonColor.TRANSPARENT}
        />
      </ToolbarItem>
      <ToolbarItem align={ToolbarItemAlign.CENTER}>Untitled Project </ToolbarItem>
      <ToolbarItem stretch align={ToolbarItemAlign.RIGHT}>
        <IconButton
          title="Render current take as a video file"
          onClick={PageRoute.EXPORT_VIDEO_MODAL}
          icon={IconName.VIDEO}
          disabled={getTrackLength(take.frameTrack) === 0}
          color={ButtonColor.TRANSPARENT}
        />
        <IconButton
          title="Preferences"
          onClick={PageRoute.PREFERENCES_MODAL}
          icon={IconName.SETTINGS}
          color={ButtonColor.TRANSPARENT}
        />
      </ToolbarItem>
    </Toolbar>
  );
};

export default TitleToolbar;
