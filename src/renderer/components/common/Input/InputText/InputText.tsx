interface InputTextProps {
  id?: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?(newValue: string): void;
}

const InputText = ({
  id,
  value,
  placeholder,
  disabled,
  readOnly,
  onChange,
}: InputTextProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange?.(event.target.value);

  return (
    <input
      id={id}
      type="text"
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};

export default InputText;
