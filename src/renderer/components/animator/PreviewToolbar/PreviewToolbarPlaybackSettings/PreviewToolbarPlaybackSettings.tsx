import { Popover, Table } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { setEnableShortPlay, setPlaybackSpeed } from "../../../../redux/slices/projectSlice";
import { RootState } from "../../../../redux/store";
import IconName from "../../../common/Icon/IconName";
import { SemanticColor } from "../../../ui/Theme/SemanticColor";
import { UiActionIcon } from "../../../ui/UiActionIcon/UiActionIcon";
import { UiButton } from "../../../ui/UiButton/UiButton";
import { PlaybackSpeedSelect } from "../PlaybackSpeedSelect/PlaybackSpeedSelect";
import "./PreviewToolbarPlaybackSettings.css";
import { UiSwitch } from "../../../ui/UiSwitch/UiSwitch";

export const PreviewToolbarPlaybackSettings = () => {
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
    <Popover trapFocus position="bottom" withArrow>
      <Popover.Target>
        <UiActionIcon icon={IconName.PLAYBACK_SETTINGS}>Playback Settings</UiActionIcon>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <Table classNames={{ tr: "playback-settings__table-row" }}>
          <Table.Tbody>
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

            {active && (
              <Table.Tr>
                <Table.Td colSpan={2} align="right">
                  <UiButton
                    inList
                    icon={IconName.PLAY_LOOP}
                    semanticColor={SemanticColor.PRIMARY}
                    onClick={handleReset}
                  >
                    Reset
                  </UiButton>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Popover.Dropdown>
    </Popover>
  );
};
