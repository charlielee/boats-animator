import { ImagingDeviceSettingValue } from "../../services/imagingDevice/ImagingDeviceSettings";

export class UnableToChangeSettingError extends Error {
  constructor(name: string, value: ImagingDeviceSettingValue) {
    super(`Unable to change setting ${name} to value ${value}`);
  }
}
