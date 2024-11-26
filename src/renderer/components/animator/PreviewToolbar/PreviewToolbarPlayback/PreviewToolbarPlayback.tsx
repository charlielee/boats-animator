import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import PlaybackContext, {
  PlaybackFrameName,
} from "../../../../context/PlaybackContext/PlaybackContext";
import { RootState } from "../../../../redux/store";
import IconName from "../../../common/Icon/IconName";
import IconButton from "../../../common/IconButton/IconButton";
import PlaybackSpeedSelect from "../../PlaybackSpeedSelect/PlaybackSpeedSelect";

export const PreviewToolbarPlayback = () => {
  const shortPlayLength = useSelector(
    (state: RootState) => state.app.userPreferences.shortPlayLength
  );
  const shortPlayFrameText = shortPlayLength === 1 ? "frame" : "frames";

  const { startOrPausePlayback, stopPlayback, displayFrame, shortPlay, playing } =
    useContext(PlaybackContext);
  const frameTrack = useSelector((state: RootState) => state.project.take?.frameTrack);
  if (frameTrack === undefined) {
    throw "No frame track found in AnimationToolbar";
  }

  const [loopPlayback, setLoopPlayback] = useState(false);

  return (
    <>
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

      <PlaybackSpeedSelect />
      <IconButton
        title={`Short Play (${shortPlayLength} ${shortPlayFrameText})`}
        icon={IconName.PLAY_SHORT}
        onClick={shortPlay}
      />
      <IconButton
        title={`${loopPlayback ? "Disable" : "Enable"} Loop Playback`}
        icon={IconName.PLAY_LOOP}
        onClick={() => setLoopPlayback((prevState) => !prevState)}
        active={loopPlayback}
      />
    </>
  );
};
