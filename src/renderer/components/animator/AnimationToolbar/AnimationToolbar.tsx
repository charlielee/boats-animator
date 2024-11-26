import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import PlaybackContext from "../../../context/PlaybackContext/PlaybackContext";
import { RootState } from "../../../redux/store";
import { getTrackLength } from "../../../services/project/projectCalculator";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import InputRange from "../../common/Input/InputRange/InputRange";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import "./AnimationToolbar.css";

export const AnimationToolbar = (): JSX.Element => {
  const { liveViewVisible, timelineIndex } = useContext(PlaybackContext);
  const frameTrack = useSelector((state: RootState) => state.project.take?.frameTrack);
  if (frameTrack === undefined) {
    throw "No frame track found in AnimationToolbar";
  }

  const [onionSkinAmount, setOnionSkinAmount] = useState(0);

  return (
    <Toolbar className="animation-toolbar">
      <ToolbarItem stretch align={ToolbarItemAlign.LEFT}>
        <IconButton
          title={
            timelineIndex === undefined ? "Undo Last Frame" : `Delete Frame ${timelineIndex + 1}`
          }
          icon={liveViewVisible ? IconName.UNDO : IconName.DELETE}
          onClick={
            getTrackLength(frameTrack) === 0 ? () => undefined : PageRoute.ANIMATOR_DELETE_FRAME
          }
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
    </Toolbar>
  );
};
