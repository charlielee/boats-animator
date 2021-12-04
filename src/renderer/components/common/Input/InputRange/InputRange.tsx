import { useEffect, useRef } from "react";
import "./InputRange.css";

enum InputRangeColor {
  DEFAULT = "var(--ba-lightred)",
  HOVER = "var(--ba-lightred-hover)",
  ACTIVE = "var(--ba-lightred-active)",
}

interface InputRangeProps {
  onChange(newValue: number): void;
  min: number;
  max: number;
  step: number;
  value: number;
}

const InputRange = ({
  onChange,
  min,
  max,
  step,
  value,
}: InputRangeProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLeftColor(InputRangeColor.DEFAULT);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeftColor(InputRangeColor.ACTIVE);
    onChange(parseInt(event.target.value, 10));
  };

  const setLeftColor = (color: InputRangeColor) => {
    if (!inputRef.current) {
      return;
    }

    const range = max - min;
    const positionFromStart = parseInt(inputRef.current.value, 10) - min;
    const percentage = (positionFromStart / range) * 100;

    inputRef.current.style.backgroundImage = `linear-gradient(
      to right,
      ${color} 0%,
      ${color} ${percentage}%,
      var(--ba-border-active) ${percentage}%,
      var(--ba-border-active) 100%
    )`;
  };

  return (
    <div className="input-range__container">
      <input
        ref={inputRef}
        type="range"
        onChange={handleChange}
        onMouseOver={() => setLeftColor(InputRangeColor.HOVER)}
        onPointerDown={() => setLeftColor(InputRangeColor.ACTIVE)}
        onPointerUp={() => setLeftColor(InputRangeColor.DEFAULT)}
        onPointerLeave={() => setLeftColor(InputRangeColor.DEFAULT)}
        onTouchEnd={() => setLeftColor(InputRangeColor.DEFAULT)}
        min={min}
        max={max}
        step={step}
        value={value}
      />
    </div>
  );
};

export default InputRange;
