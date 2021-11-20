import { useState } from "react";
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../common/ToolbarItem/ToolbarItem";
import "./AnimationToolbar.css";

const AnimationToolbar = (): JSX.Element => {
  const [loopPlayback, setLoopPlayback] = useState(false);
  const [shortPlay, setShortPlay] = useState(false);

  return (
    <Toolbar borderTop borderBottom className="animation-toolbar">
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
          className="animation-toolbar__capture-button"
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
          className="animation-toolbar__play-last-button"
        />
        <IconButton
          title={`${loopPlayback ? "Disable" : "Enable"} Loop Playback`}
          icon={IconName.PLAY_LOOP}
          onClick={() => setLoopPlayback((prevState) => !prevState)}
          active={loopPlayback}
        />
        <IconButton
          title={`${shortPlay ? "Disable" : "Enable"} Short Play`}
          icon={IconName.PLAY_SHORT}
          onClick={() => setShortPlay((prevState) => !prevState)}
          active={shortPlay}
        />
      </ToolbarItem>
    </Toolbar>
  );
};

export default AnimationToolbar;
