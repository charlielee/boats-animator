import { useState, useEffect, useContext } from "react";
import { ImagingDeviceContext } from "../context/ImagingDeviceContext/ImagingDeviceContext";

type UseChangeSettingDebouncedResponse<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const useChangeSettingDebounced = <T extends string | number | boolean>(
  name: string,
  initialValue: T
): UseChangeSettingDebouncedResponse<T> => {
  const { changeSetting } = useContext(ImagingDeviceContext);

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const handleChangeSetting = async (newValue: boolean | string | number) => {
      try {
        await changeSetting?.(name, newValue);
      } catch {
        setValue(initialValue);
      }
    };

    const debounceChangeSetting = setTimeout(() => handleChangeSetting(value), 1000);
    return () => clearTimeout(debounceChangeSetting);
  }, [changeSetting, initialValue, name, value]);

  return [value, setValue];
};
