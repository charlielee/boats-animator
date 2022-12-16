import { useState } from "react";
import { playbackSpeeds } from "../../../../common/utils";
import InputSelect from "../../common/Input/InputSelect/InputSelect";

const playbackSpeedOptions = playbackSpeeds.reduce(
  (output, s) => ({ ...output, [`${s}x`]: s }),
  {} as Record<string, number>
);

const PlaybackSpeedSelect = (): JSX.Element => {
  const [speed, setSpeed] = useState(1);

  return (
    <InputSelect
      options={playbackSpeedOptions}
      value={speed}
      onChange={(newValue) => setSpeed(parseFloat(newValue))}
      title={`Playback Speed ${speed}x`}
      fitContent
    />
  );
};

export default PlaybackSpeedSelect;
