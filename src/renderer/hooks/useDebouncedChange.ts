import { useState, useEffect } from "react";

type UseDebouncedChangeResponse<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const useDebouncedChange = <T>(
  initialValue: T,
  onChange: (newValue: T) => void
): UseDebouncedChangeResponse<T> => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const debounceChangeSetting = setTimeout(async () => {
      onChange(value);
    }, 2000);
    return () => clearTimeout(debounceChangeSetting);
  }, [onChange, value]);

  return [value, setValue];
};
