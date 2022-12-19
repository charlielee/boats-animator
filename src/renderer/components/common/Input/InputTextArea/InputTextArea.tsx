import { useEffect, useRef } from "react";

interface InputTextAreaProps {
  id?: string;
  value: string;
  onChange(newValue: string): void;
  rows?: number;
  spellCheck?: boolean;
  disabled?: boolean;
  autoScroll?: boolean;
}

const InputTextArea = ({
  id,
  value,
  onChange,
  rows = 5,
  spellCheck = false,
  disabled = false,
  autoScroll = false,
}: InputTextAreaProps): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoScroll && textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [autoScroll, value]);

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
      ref={textAreaRef}
    />
  );
};

export default InputTextArea;
