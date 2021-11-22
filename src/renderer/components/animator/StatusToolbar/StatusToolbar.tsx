import { PageRoute } from "../../../../common/PageRoute";
import Button from "../../common/Button/Button";
import { ButtonColor } from "../../common/Button/ButtonColor";
import IconName from "../../common/Icon/IconName";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../common/ToolbarItem/ToolbarItem";

const StatusToolbar = (): JSX.Element => {
  return (
    <Toolbar borderBottom>
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <Button
          title="Shot 001 Take 01"
          icon={IconName.CIRCLE_UP}
          onClick={PageRoute.STARTUP_MODAL}
          color={ButtonColor.TRANSPARENT}
        />
      </ToolbarItem>
      <ToolbarItem align={ToolbarItemAlign.CENTER}>Frame 1 of 0</ToolbarItem>
      <ToolbarItem stretch align={ToolbarItemAlign.RIGHT}>
        15 FPS
      </ToolbarItem>
    </Toolbar>
  );
};

export default StatusToolbar;
