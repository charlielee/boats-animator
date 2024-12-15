import { Input } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { setEnableShortPlay, setPlaybackSpeed } from "../../../../redux/slices/projectSlice";
import { RootState } from "../../../../redux/store";
import { UiSwitch } from "../../../ui/UiSwitch/UiSwitch";
import { OverlayTabPaneBase } from "../OverlayTabPaneBase/OverlayTabPaneBase";
import { PlaybackSpeedSelect } from "../PlaybackSpeedSelect/PlaybackSpeedSelect";
import { UiPaneSection } from "../../../ui/UiPaneSection/UiPaneSection";

export const OverlayTabPanePlayback = () => {
  const dispatch = useDispatch();

  const playbackSpeed = useSelector((state: RootState) => state.project.playbackSpeed);

  const shortPlayLength = useSelector(
    (state: RootState) => state.app.userPreferences.shortPlayLength
  );
  const enableShortPlay = useSelector((state: RootState) => state.project.enableShortPlay);
  const shortPlayFrameText =
    shortPlayLength === 1 ? `${shortPlayLength} frame` : `${shortPlayLength} frames`;

  const active = playbackSpeed !== 1 || enableShortPlay;

  const handleToggleEnableShortPlay = (newValue: boolean) => dispatch(setEnableShortPlay(newValue));

  const handleReset = () => {
    dispatch(setPlaybackSpeed(1));
    dispatch(setEnableShortPlay(false));
  };

  return (
    <OverlayTabPaneBase title="Playback" showReset={active} onReset={handleReset}>
      <UiPaneSection>
        <PlaybackSpeedSelect />
      </UiPaneSection>

      <UiPaneSection>
        {/* todo label position label and justify space between */}
        <UiSwitch
          label={`Short Play (${shortPlayFrameText})`}
          checked={enableShortPlay}
          onChange={handleToggleEnableShortPlay}
        />
      </UiPaneSection>
    </OverlayTabPaneBase>
  );
};
