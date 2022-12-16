import { useRef, useState } from "react";

interface InputNumberProps {
  id?: string;
  min: number;
  max: number;
  value: number;
  onChange(newValue: number): void;
  validateOnChange?: boolean;
}

const InputNumber = ({
  id,
  min,
  max,
  value,
  onChange,
  validateOnChange = false,
}: InputNumberProps): JSX.Element => {
  const [rawValue, setRawValue] = useState(value.toString(10));
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) {
      return;
    }

    setRawValue(event.target.value);
    if (!validateOnChange || inputRef.current.reportValidity()) {
      onChange(parseInt(event.target.value, 10));
    }
  };

  return (
    <input
      ref={inputRef}
      id={id}
      type="number"
      onChange={handleChange}
      min={min}
      max={max}
      value={rawValue}
      required
    />
  );
};

export default InputNumber;
