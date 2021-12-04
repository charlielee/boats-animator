import "./InputSelect.css";

interface InputSelectProps {
  options: Record<string, string>;
  onChange(newValue: string): void;
  selectedValue?: string;
}

const InputSelect = ({
  options,
  onChange,
  selectedValue,
}: InputSelectProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(event.target.value);

  return (
    <select value={selectedValue} onChange={handleChange}>
      {Object.entries(options).map(([key, value], i) => (
        <option value={value} key={key}>
          {key}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;
