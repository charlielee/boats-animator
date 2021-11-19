import ButtonGroup from "../../common/ButtonGroup/ButtonGroup";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../common/ToolbarItem/ToolbarItem";

const AnimationToolbar = (): JSX.Element => {
  return (
    <Toolbar borderTop borderBottom>
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <ButtonGroup>
          <IconButton
            title="Undo Last Frame"
            icon={IconName.UNDO}
            onClick={() => undefined}
          />
        </ButtonGroup>
      </ToolbarItem>

      <ToolbarItem align={ToolbarItemAlign.CENTER}>
        <IconButton
          title="Capture Frame"
          icon={IconName.CAPTURE}
          onClick={() => undefined}
        />
      </ToolbarItem>

      <ToolbarItem stretch align={ToolbarItemAlign.RIGHT}>
        <ButtonGroup>
          <IconButton
            title="Undo Last Frame"
            icon={IconName.UNDO}
            onClick={() => undefined}
          />
        </ButtonGroup>
      </ToolbarItem>
    </Toolbar>
  );
};

export default AnimationToolbar;
