import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import PlaybackContext, {
  PlaybackFrameName,
} from "../../../context/PlaybackContext/PlaybackContext";
import { RootState } from "../../../redux/store";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import InputRange from "../../common/Input/InputRange/InputRange";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import PlaybackSpeedSelect from "../PlaybackSpeedSelect/PlaybackSpeedSelect";
import "./AnimationToolbar.css";

export const AnimationToolbar = (): JSX.Element => {
  const shortPlayLength = useSelector(
    (state: RootState) => state.app.userPreferences.shortPlayLength
  );
  const shortPlayFrameText = shortPlayLength === 1 ? "frame" : "frames";

  const { startOrPausePlayback, stopPlayback, displayFrame, shortPlay, playing } =
    useContext(PlaybackContext);

  const [onionSkinAmount, setOnionSkinAmount] = useState(0);
  const [loopPlayback, setLoopPlayback] = useState(false);

  return (
    <Toolbar className="animation-toolbar">
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <IconButton title="Undo Last Frame" icon={IconName.UNDO} onClick={() => undefined} />
        <IconButton
          title={`Short Play (${shortPlayLength} ${shortPlayFrameText})`}
          icon={IconName.PLAY_SHORT}
          onClick={shortPlay}
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
          onClick={() => displayFrame(PlaybackFrameName.FIRST)}
        />
        <IconButton
          title="Previous Frame"
          icon={IconName.PLAY_PREVIOUS}
          onClick={() => displayFrame(PlaybackFrameName.PREVIOUS)}
        />
        <IconButton
          title={playing ? "Pause Playback" : "Playback Frames"}
          icon={playing ? IconName.PLAY_PAUSE : IconName.PLAY}
          onClick={() => startOrPausePlayback()}
        />
        <IconButton title="Stop Playback" icon={IconName.PLAY_STOP} onClick={stopPlayback} />
        <IconButton
          title="Next Frame"
          icon={IconName.PLAY_NEXT}
          onClick={() => displayFrame(PlaybackFrameName.NEXT)}
        />
        <IconButton
          title="Last Frame"
          icon={IconName.PLAY_LAST}
          onClick={() => displayFrame(PlaybackFrameName.LAST)}
        />
      </ToolbarItem>

      <ToolbarItem stretch align={ToolbarItemAlign.RIGHT}>
        <PlaybackSpeedSelect />
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
