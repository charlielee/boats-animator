import { useState } from "react";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import InputRange from "../../common/Input/InputRange/InputRange";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../common/ToolbarItem/ToolbarItem";
import "./AnimationToolbar.css";

interface AnimationToolbarProps {
  startPlayback: () => void;
  stopPlayback: () => void;
}

const AnimationToolbar = ({
  startPlayback,
  stopPlayback,
}: AnimationToolbarProps): JSX.Element => {
  const [onionSkinAmount, setOnionSkinAmount] = useState(0);
  const [loopPlayback, setLoopPlayback] = useState(false);

  return (
    <Toolbar className="animation-toolbar">
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <IconButton
          title="Undo Last Frame"
          icon={IconName.UNDO}
          onClick={() => undefined}
        />
        <IconButton
          title="Short Play"
          icon={IconName.PLAY_SHORT}
          onClick={() => undefined}
        />
        <InputRange
          id="animation-toolbar__onion-skin-range"
          title={`Onion Skin ${onionSkinAmount}%`}
          onChange={setOnionSkinAmount}
          min={-100}
          max={100}
          step={2}
          value={onionSkinAmount}
        />
      </ToolbarItem>

      <ToolbarItem align={ToolbarItemAlign.CENTER}>
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
          onClick={() => startPlayback()}
        />
        <IconButton
          title="Stop Playback"
          icon={IconName.PLAY_STOP}
          onClick={() => stopPlayback()}
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
      </ToolbarItem>

      <ToolbarItem stretch align={ToolbarItemAlign.RIGHT}>
        <IconButton
          title={`${loopPlayback ? "Disable" : "Enable"} Loop Playback`}
          icon={IconName.PLAY_LOOP}
          onClick={() => setLoopPlayback((prevState) => !prevState)}
          active={loopPlayback}
        />
      </ToolbarItem>
    </Toolbar>
  );
};

const AnimationToolbarWithContext = () => (
  <PlaybackContext.Consumer>
    {(value) => <AnimationToolbar {...value} />}
  </PlaybackContext.Consumer>
);

export default AnimationToolbarWithContext;
