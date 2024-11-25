import { useContext, useEffect, useState } from "react";
import { ImagingDeviceContext } from "../context/ImagingDeviceContext/ImagingDeviceContext";
import { ImagingDeviceSettingValue } from "../services/imagingDevice/ImagingDeviceSettings";
import * as rLogger from "../services/rLogger/rLogger";

type UseChangeSettingDebouncedResponse<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const useChangeSettingDebounced = <T extends ImagingDeviceSettingValue>(
  name: string
): UseChangeSettingDebouncedResponse<T> => {
  const { changeSetting, deviceStatus } = useContext(ImagingDeviceContext);

  const currentValue = deviceStatus?.settings.find((s) => s.name === name)?.value as T | undefined;
  if (currentValue === undefined) {
    throw `Unable to find expected setting ${name}`;
  }
  const [value, setValue] = useState(currentValue);

  useEffect(() => {
    const handleChangeSettingIfRequired = async (newValue: T) => {
      const shouldChangeSetting = newValue !== undefined && newValue !== currentValue;
      rLogger.info(
        "useChangeSettingIfRequired",
        `name: ${name}, shouldChange: ${shouldChangeSetting}`
      );
      if (shouldChangeSetting) {
        await handleChangeSetting(newValue);
      }
    };

    const handleChangeSetting = async (newValue: T) => {
      try {
        await changeSetting?.(name, newValue);
        rLogger.info("useChangeSettingSuccess", `${name} was changed to ${newValue.toString()}`);
      } catch {
        rLogger.info(
          "useChangeSettingError",
          `Unable to change ${name} to ${newValue}, changing back to ${currentValue}`
        );
        setValue(currentValue);
      }
    };

    const debounceChangeSetting = setTimeout(() => handleChangeSettingIfRequired(value), 1000);
    return () => clearTimeout(debounceChangeSetting);
  }, [changeSetting, currentValue, name, value]);

  return [value, setValue];
};
