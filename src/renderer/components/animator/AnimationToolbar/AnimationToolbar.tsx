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
        <IconButton
          title="First Frame"
          icon={IconName.PLAY_FIRST}
          onClick={() => undefined}
        />
        <IconButton
          title="Previous Frame"
          icon={IconName.PLAY_PREVIOUS}
          onClick={() => undefined}
        />
        <IconButton
          title="Playback Frames"
          icon={IconName.PLAY}
          onClick={() => undefined}
        />
        <IconButton
          title="Stop Playback"
          icon={IconName.PLAY_STOP}
          onClick={() => undefined}
        />
        <IconButton
          title="Next Frame"
          icon={IconName.PLAY_NEXT}
          onClick={() => undefined}
        />
        <IconButton
          title="Last Frame"
          icon={IconName.PLAY_LAST}
          onClick={() => undefined}
        />
        <IconButton
          title="Loop Playback"
          icon={IconName.PLAY_LOOP}
          onClick={() => undefined}
        />
        <IconButton
          title="Loop Playback"
          icon={IconName.PLAY_SHORT_OFF}
          onClick={() => undefined}
        />
      </ToolbarItem>
    </Toolbar>
  );
};

export default AnimationToolbar;
