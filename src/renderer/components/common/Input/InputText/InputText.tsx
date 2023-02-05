interface InputTextProps {
  id?: string;
  value: string;
  onChange(newValue: string): void;
}

const InputText = ({ id, value, onChange }: InputTextProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

  return <input id={id} type="text" onChange={handleChange} value={value} />;
};

export default InputText;
