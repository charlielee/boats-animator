import { Popover, Table } from "@mantine/core";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaybackContext from "../../../../context/PlaybackContext/PlaybackContext";
import { RootState } from "../../../../redux/store";
import IconName from "../../../common/Icon/IconName";
import { UiActionIcon } from "../../../ui/UiActionIcon/UiActionIcon";
import { UiButton } from "../../../ui/UiButton/UiButton";
import PlaybackSpeedSelect from "../../PlaybackSpeedSelect/PlaybackSpeedSelect";
import "./PreviewToolbarPlaybackSettings.css";
import { SemanticColor } from "../../../ui/Theme/SemanticColor";
import { setPlaybackSpeed } from "../../../../redux/slices/projectSlice";

export const PreviewToolbarPlaybackSettings = () => {
  const dispatch = useDispatch();
  const { shortPlay } = useContext(PlaybackContext);
  const shortPlayLength = useSelector(
    (state: RootState) => state.app.userPreferences.shortPlayLength
  );
  const shortPlayFrameText =
    shortPlayLength === 1 ? `${shortPlayLength} frame` : `${shortPlayLength} frames`;

  const playbackSpeed = useSelector((state: RootState) => state.project.playbackSpeed);

  const active = playbackSpeed !== 1;

  const handleReset = () => dispatch(setPlaybackSpeed(1));

  return (
    <Popover width="20rem" trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        <UiActionIcon icon={IconName.PLAYBACK_SETTINGS} active={active}>
          Playback Settings
        </UiActionIcon>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <Table classNames={{ tr: "playback-settings__table-row" }}>
          <Table.Tr>
            <Table.Td>Playback Speed</Table.Td>
            <Table.Td>
              <PlaybackSpeedSelect />
            </Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Td>Short Play ({shortPlayFrameText})</Table.Td>
            <Table.Td>
              <UiButton onClick={shortPlay}>Short Play</UiButton>
            </Table.Td>
          </Table.Tr>

          {active && (
            <Table.Tr>
              <Table.Td colSpan={2} align="right">
                <UiButton
                  inTable
                  icon={IconName.PLAY_LOOP}
                  semanticColor={SemanticColor.PRIMARY}
                  onClick={handleReset}
                >
                  Reset
                </UiButton>
              </Table.Td>
            </Table.Tr>
          )}
        </Table>
      </Popover.Dropdown>
    </Popover>
  );
};
