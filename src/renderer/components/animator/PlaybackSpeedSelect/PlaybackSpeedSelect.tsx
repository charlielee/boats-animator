import { playbackSpeeds } from "../../../../common/utils";
import InputSelect from "../../common/Input/InputSelect/InputSelect";

const PlaybackSpeedSelect = (): JSX.Element => (
  <InputSelect
    options={playbackSpeeds.reduce(
      (output, s) => ({ ...output, [`${s}X`]: s }),
      {} as Record<string, number>
    )}
    value={1}
    onChange={(newValue) => console.log(newValue)}
  />
);

export default PlaybackSpeedSelect;
