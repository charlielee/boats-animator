import { useDispatch, useSelector } from "react-redux";
import { playbackSpeeds } from "../../../../common/utils";
import { setPlaybackSpeed } from "../../../redux/project/actions";
import { RootState } from "../../../redux/store";
import InputSelect from "../../common/Input/InputSelect/InputSelect";

const playbackSpeedOptions = playbackSpeeds.reduce(
  (output, s) => ({ ...output, [`${s}x`]: s }),
  {} as Record<string, number>
);

const PlaybackSpeedSelect = (): JSX.Element => {
  const dispatch = useDispatch();
  const playbackSpeed = useSelector(
    (state: RootState) => state.project.playbackSpeed
  );

  return (
    <InputSelect
      options={playbackSpeedOptions}
      value={playbackSpeed}
      onChange={(newValue) => dispatch(setPlaybackSpeed(parseFloat(newValue)))}
      title={`Playback Speed ${playbackSpeed}x`}
      fitContent
    />
  );
};

export default PlaybackSpeedSelect;
