import { ComboboxData } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { setPlaybackSpeed } from "../../../../redux/slices/projectSlice";
import { RootState } from "../../../../redux/store";
import { UiSelect } from "../../../ui/UiSelect/UiSelect";

const PLAYBACK_SPEED_SELECT_DATA: ComboboxData = [
  { label: "0.1×", value: "0.1" },
  { label: "0.25×", value: "0.25" },
  { label: "0.5×", value: "0.5" },
  { label: "1.0×", value: "1" },
  { label: "2.0×", value: "2" },
  { label: "4.0×", value: "4" },
];

export const PlaybackSpeedSelect = () => {
  const dispatch = useDispatch();
  const playbackSpeed = useSelector((state: RootState) => state.project.playbackSpeed);

  return (
    <UiSelect
      label="Speed"
      data={PLAYBACK_SPEED_SELECT_DATA}
      placeholder=""
      value={String(playbackSpeed)}
      onChange={(newValue) => {
        if (newValue) {
          dispatch(setPlaybackSpeed(parseFloat(newValue)));
        }
      }}
    />
  );
};
