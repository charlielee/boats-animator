import { PageRoute } from "../../../../common/PageRoute";
import { Take } from "../../../../common/project/Take";
import { zeroPad } from "../../../../common/utils";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import { displayProjectTitle } from "../../../services/project/projectBuilder";
import { getTrackLength } from "../../../services/project/projectCalculator";
import Button from "../../common/Button/Button";
import { ButtonColor } from "../../common/Button/ButtonColor";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import "./TitleToolbar.css";

const TitleToolbar = (): JSX.Element => {
  const { project, take } = useProjectAndTake();
  const makeTakeTitle = (take: Take) =>
    `Shot ${zeroPad(take.shotNumber, 3)} Take ${zeroPad(take.takeNumber, 2)}`;

  return (
    <Toolbar className="title-toolbar">
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <Button
          label={displayProjectTitle(project)}
          title="Manage project"
          onClick={PageRoute.STARTUP}
          color={ButtonColor.TRANSPARENT}
          icon={IconName.FOLDER}
        />
      </ToolbarItem>
      <ToolbarItem align={ToolbarItemAlign.CENTER}>{makeTakeTitle(take)}</ToolbarItem>
      <ToolbarItem stretch align={ToolbarItemAlign.RIGHT}>
        <IconButton
          title="Render current take as a video file"
          onClick={PageRoute.ANIMATOR_EXPORT_VIDEO_MODAL}
          icon={IconName.VIDEO}
          disabled={getTrackLength(take.frameTrack) === 0}
          color={ButtonColor.TRANSPARENT}
        />
        <IconButton
          title="Preferences"
          onClick={PageRoute.ANIMATOR_PREFERENCES_MODAL}
          icon={IconName.SETTINGS}
          color={ButtonColor.TRANSPARENT}
        />
      </ToolbarItem>
    </Toolbar>
  );
};

export default TitleToolbar;
