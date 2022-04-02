interface InputTextAreaProps {
  id?: string;
  value: string;
  onChange(newValue: string): void;
  rows?: number;
  spellCheck?: boolean;
  disabled?: boolean;
}

const InputTextArea = ({
  id,
  value,
  onChange,
  rows = 5,
  spellCheck = false,
  disabled = false,
}: InputTextAreaProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange(event.target.value);

  return (
    <textarea
      id={id}
      onChange={handleChange}
      value={value}
      rows={rows}
      spellCheck={spellCheck}
      disabled={disabled}
    />
  );
};

export default InputTextArea;
