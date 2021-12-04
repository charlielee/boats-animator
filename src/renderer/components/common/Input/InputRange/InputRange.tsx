import { useEffect, useRef, useState } from "react";
import "./InputRange.css";

enum InputRangeSliderState {
  DEFAULT = "DEFAULT",
  HOVER = "HOVER",
  ACTIVE = "ACTIVE",
}

interface InputRangeProps {
  id?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange(newValue: number): void;
}

const InputRange = ({
  id,
  min,
  max,
  step,
  value,
  onChange,
}: InputRangeProps): JSX.Element => {
  const [slider, setSlider] = useState<InputRangeSliderState>(
    InputRangeSliderState.DEFAULT
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLeftColor(slider);
  }, [value, slider]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlider(InputRangeSliderState.ACTIVE);
    onChange(parseInt(event.target.value, 10));
  };

  const setLeftColor = (sliderState: InputRangeSliderState) => {
    if (!inputRef.current) {
      return;
    }

    const color = () => {
      switch (sliderState) {
        case InputRangeSliderState.DEFAULT:
          return "var(--ba-lightred)";
        case InputRangeSliderState.HOVER:
          return "var(--ba-lightred-hover)";
        case InputRangeSliderState.ACTIVE:
          return "var(--ba-lightred-active)";
      }
    };

    const range = max - min;
    const positionFromStart = parseInt(inputRef.current.value, 10) - min;
    const percentage = (positionFromStart / range) * 100;

    inputRef.current.style.backgroundImage = `linear-gradient(
      to right,
      ${color()} 0%,
      ${color()} ${percentage}%,
      var(--ba-border-active) ${percentage}%,
      var(--ba-border-active) 100%
    )`;
  };

  return (
    <div className="input-range__container">
      <input
        id={id}
        ref={inputRef}
        type="range"
        onChange={handleChange}
        onMouseOver={() => setSlider(InputRangeSliderState.HOVER)}
        onPointerDown={() => setSlider(InputRangeSliderState.ACTIVE)}
        onPointerUp={() => setSlider(InputRangeSliderState.DEFAULT)}
        onPointerLeave={() => setSlider(InputRangeSliderState.DEFAULT)}
        onTouchEnd={() => setSlider(InputRangeSliderState.DEFAULT)}
        min={min}
        max={max}
        step={step}
        value={value}
      />
    </div>
  );
};

export default InputRange;
