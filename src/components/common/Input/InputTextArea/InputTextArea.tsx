import { useCallback } from "react";

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
}: InputTextAreaProps) => {
  const textAreaRef = useCallback(
    (textArea: HTMLTextAreaElement | null) => {
      if (textArea && autoScroll) {
        textArea.scrollTop = textArea.scrollHeight;
      }
    },
    [autoScroll, value] // eslint-disable-line react-hooks/exhaustive-deps
  );

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
