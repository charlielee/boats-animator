interface InputTextAreaProps {
  id?: string;
  value: string;
  onChange(newValue: string): void;
  rows?: number;
  spellCheck?: boolean;
}

const InputTextArea = ({
  id,
  value,
  onChange,
  rows = 5,
  spellCheck = false,
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
    />
  );
};

export default InputTextArea;
