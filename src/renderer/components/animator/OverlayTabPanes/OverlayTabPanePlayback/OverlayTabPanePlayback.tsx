import { Table } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { setEnableShortPlay, setPlaybackSpeed } from "../../../../redux/slices/projectSlice";
import { RootState } from "../../../../redux/store";
import { UiSwitch } from "../../../ui/UiSwitch/UiSwitch";
import { OverlayTabPaneBase } from "../OverlayTabPaneBase/OverlayTabPaneBase";
import { PlaybackSpeedSelect } from "../PlaybackSpeedSelect/PlaybackSpeedSelect";
import "./OverlayTabPanePlayback.css";

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
    <OverlayTabPaneBase title="Playback Settings" active={active} onReset={handleReset}>
      <Table.Tr>
        <Table.Td>Playback Speed</Table.Td>
        <Table.Td>
          <PlaybackSpeedSelect />
        </Table.Td>
      </Table.Tr>

      <Table.Tr>
        <Table.Td>Short Play ({shortPlayFrameText})</Table.Td>
        <Table.Td>
          <UiSwitch checked={enableShortPlay} onChange={handleToggleEnableShortPlay} />
        </Table.Td>
      </Table.Tr>
    </OverlayTabPaneBase>
  );
};
