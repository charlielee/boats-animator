import { useDispatch, useSelector } from "react-redux";
import { PLAYBACK_SPEEDS } from "../../../../common/utils";
import { setPlaybackSpeed } from "../../../redux/slices/projectSlice";
import { RootState } from "../../../redux/store";
import InputSelect from "../../common/Input/InputSelect/InputSelect";

const PlaybackSpeedSelect = (): JSX.Element => {
  const dispatch = useDispatch();
  const playbackSpeed = useSelector((state: RootState) => state.project.playbackSpeed);

  return (
    <InputSelect
      options={PLAYBACK_SPEEDS}
      value={playbackSpeed}
      onChange={(newValue) => dispatch(setPlaybackSpeed(parseFloat(newValue)))}
      title={`Playback Speed ${playbackSpeed}x`}
      fitContent
    />
  );
};

export default PlaybackSpeedSelect;
