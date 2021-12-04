interface InputNumberProps {
  id?: string;
  min: number;
  max: number;

  value?: number;
  onChange(newValue: number): void;
}

const InputNumber = ({
  id,
  min,
  max,
  value,
  onChange,
}: InputNumberProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(parseInt(event.target.value, 10));

  return (
    <input
      id={id}
      type="number"
      onChange={handleChange}
      min={min}
      max={max}
      value={value}
    />
  );
};

export default InputNumber;
