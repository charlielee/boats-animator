import { PageRoute } from "../../../../common/PageRoute";
import { Take } from "../../../../common/project/Take";
import { zeroPad } from "../../../../common/utils";
import Button from "../../common/Button/Button";
import { ButtonColor } from "../../common/Button/ButtonColor";
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
          title={makeTakeTitle(take)}
          onClick={PageRoute.STARTUP_MODAL}
          color={ButtonColor.TRANSPARENT}
        />
      </ToolbarItem>
      <ToolbarItem align={ToolbarItemAlign.CENTER}>Untitled Project </ToolbarItem>
      <ToolbarItem stretch align={ToolbarItemAlign.RIGHT}>
        todo
      </ToolbarItem>
    </Toolbar>
  );
};

export default TitleToolbar;
