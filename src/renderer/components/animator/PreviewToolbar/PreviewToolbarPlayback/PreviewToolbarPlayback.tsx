import { useContext } from "react";
import { useSelector } from "react-redux";
import PlaybackContext, {
  PlaybackFrameName,
} from "../../../../context/PlaybackContext/PlaybackContext";
import { RootState } from "../../../../redux/store";
import IconName from "../../../common/Icon/IconName";
import { UiActionIcon } from "../../../ui/UiActionIcon/UiActionIcon";
import { PreviewToolbarPlaybackSettings } from "../PreviewToolbarPlaybackSettings/PreviewToolbarPlaybackSettings";

export const PreviewToolbarPlayback = () => {
  const { startOrPausePlayback, stopPlayback, displayFrame, playing } = useContext(PlaybackContext);
  const frameTrack = useSelector((state: RootState) => state.project.take?.frameTrack);
  if (frameTrack === undefined) {
    throw "No frame track found in AnimationToolbar";
  }

  return (
    <>
      <UiActionIcon
        icon={IconName.PLAY_FIRST}
        onClick={() => displayFrame(PlaybackFrameName.FIRST)}
      >
        First Frame
      </UiActionIcon>
      <UiActionIcon
        icon={IconName.PLAY_PREVIOUS}
        onClick={() => displayFrame(PlaybackFrameName.PREVIOUS)}
      >
        Previous Frame
      </UiActionIcon>
      <UiActionIcon
        icon={playing ? IconName.PLAY_PAUSE : IconName.PLAY}
        onClick={() => startOrPausePlayback()}
      >
        {playing ? "Pause Playback" : "Playback Frames"}
      </UiActionIcon>
      <UiActionIcon icon={IconName.PLAY_STOP} onClick={stopPlayback}>
        Stop Playback
      </UiActionIcon>
      <UiActionIcon icon={IconName.PLAY_NEXT} onClick={() => displayFrame(PlaybackFrameName.NEXT)}>
        Next Frame
      </UiActionIcon>
      <UiActionIcon icon={IconName.PLAY_LAST} onClick={() => displayFrame(PlaybackFrameName.LAST)}>
        Last Frame
      </UiActionIcon>
      <PreviewToolbarPlaybackSettings />
    </>
  );
};
