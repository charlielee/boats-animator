interface InputSelectProps {
  id?: string;
  options: Record<string, string>;
  value: string | undefined;
  onChange(newValue: string): void;
}

const InputSelect = ({
  id,
  options,
  onChange,
  value,
}: InputSelectProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(event.target.value);

  return (
    <select id={id} value={value} onChange={handleChange}>
      {Object.entries(options).map(([k, v]) => (
        <option value={v} key={k}>
          {k}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;
