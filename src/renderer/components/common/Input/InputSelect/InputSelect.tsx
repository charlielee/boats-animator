type InputSelectValue = string | number | undefined;

interface InputSelectProps<TValue> {
  id?: string;
  options: Record<string, TValue>;
  value: TValue;
  onChange(newValue: string): void;
}

const InputSelect = <TValue extends InputSelectValue>({
  id,
  options,
  onChange,
  value,
}: InputSelectProps<TValue>): JSX.Element => {
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
