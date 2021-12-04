import "./InputRange.css";

interface InputRangeProps {
  onChange(newValue: number): void;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
}

const InputRange = ({
  onChange,
  min,
  max,
  step,
  value,
}: InputRangeProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(parseInt(event.target.value, 10));

  return (
    <div className="input-range__container">
      <input
        type="range"
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        value={value}
      />
    </div>
  );
};

export default InputRange;
