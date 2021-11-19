import Button from "../../common/Button/Button";
import { ButtonStyle } from "../../common/Button/ButtonStyle";
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup";
import IconName from "../../common/Icon/IconName";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../common/ToolbarItem/ToolbarItem";

const AnimationToolbar = (): JSX.Element => {
  return (
    <Toolbar borderTop borderBottom>
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <ButtonGroup>
          <Button
            title="Undo Last Frame"
            icon={IconName.UNDO}
            style={ButtonStyle.ICON_ONLY}
            onClick={() => undefined}
          />
        </ButtonGroup>
      </ToolbarItem>

      <ToolbarItem align={ToolbarItemAlign.CENTER}>
        <Button
          title="Capture Frame"
          icon={IconName.CAPTURE}
          style={ButtonStyle.ICON_ONLY}
          onClick={() => undefined}
        />
      </ToolbarItem>

      <ToolbarItem stretch align={ToolbarItemAlign.RIGHT}>
        <ButtonGroup>
          <Button
            title="Undo Last Frame"
            icon={IconName.UNDO}
            style={ButtonStyle.ICON_ONLY}
            onClick={() => undefined}
          />
        </ButtonGroup>
      </ToolbarItem>
    </Toolbar>
  );
};

export default AnimationToolbar;
