import { useState } from "react";
import { useDispatch } from "react-redux";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { takePhoto } from "../../../redux/capture/actions";
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup";
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
  const dispatch = useDispatch();
  const [onionSkinAmount, setOnionSkinAmount] = useState(0);
  const [loopPlayback, setLoopPlayback] = useState(false);
  const [shortPlay, setShortPlay] = useState(false);

  return (
    <Toolbar borderTop className="animation-toolbar">
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <ButtonGroup>
          <IconButton
            title="Undo Last Frame"
            icon={IconName.UNDO}
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
        </ButtonGroup>
      </ToolbarItem>

      <ToolbarItem align={ToolbarItemAlign.CENTER}>
        <IconButton
          title="Capture Frame"
          icon={IconName.CAPTURE}
          className="animation-toolbar__capture-button"
          onClick={() => dispatch(takePhoto())}
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

const AnimationToolbarWithContext = () => (
  <PlaybackContext.Consumer>
    {(value) => <AnimationToolbar {...value} />}
  </PlaybackContext.Consumer>
);

export default AnimationToolbarWithContext;
