interface InputNumberProps {
  onChange(newValue: number): void;
  min: number;
  max: number;
  value?: number;
}

const InputNumber = ({
  onChange,
  min,
  max,
  value,
}: InputNumberProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(parseInt(event.target.value, 10));

  return (
    <input
      type="number"
      onChange={handleChange}
      min={min}
      max={max}
      value={value}
    />
  );
};

export default InputNumber;
