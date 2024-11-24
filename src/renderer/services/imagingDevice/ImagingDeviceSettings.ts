export enum ImagingDeviceSettingType {
  RANGE = "RANGE",
  BOOLEAN = "BOOLEAN",
  LIST = "LIST",
}

export type ImagingDeviceSettingValue = boolean | string | number;

interface ImagingDeviceSettingBase {
  readonly type: ImagingDeviceSettingType;
  readonly name: string;
  readonly value: ImagingDeviceSettingValue;
}

export interface ImagingDeviceSettingBoolean extends ImagingDeviceSettingBase {
  readonly type: ImagingDeviceSettingType.BOOLEAN;
  readonly value: boolean;
}

export interface ImagingDeviceSettingList extends ImagingDeviceSettingBase {
  readonly type: ImagingDeviceSettingType.LIST;
  readonly options: string[];
  readonly value: string;
}

export interface ImagingDeviceSettingRange extends ImagingDeviceSettingBase {
  readonly type: ImagingDeviceSettingType.RANGE;
  readonly max: number;
  readonly min: number;
  readonly step: number;
  readonly value: number;
}

export type ImagingDeviceSetting =
  | ImagingDeviceSettingBoolean
  | ImagingDeviceSettingList
  | ImagingDeviceSettingRange;

export const makeBooleanSetting = (name: string, value: boolean): ImagingDeviceSettingBoolean => ({
  type: ImagingDeviceSettingType.BOOLEAN,
  name,
  value,
});

export const makeListSetting = (
  name: string,
  value: string,
  options: string[]
): ImagingDeviceSettingList => ({
  type: ImagingDeviceSettingType.LIST,
  name,
  value,
  options,
});

export const makeRangeSetting = (
  name: string,
  value: number,
  options: { max: number; min: number; step: number }
): ImagingDeviceSettingRange => ({
  type: ImagingDeviceSettingType.RANGE,
  name,
  value,
  ...options,
});

export const makeChangedSetting = (
  setting: ImagingDeviceSetting,
  value: ImagingDeviceSettingValue
): ImagingDeviceSetting => {
  if (setting.type === ImagingDeviceSettingType.BOOLEAN && typeof value === "boolean") {
    return { ...setting, value };
  }
  if (setting.type === ImagingDeviceSettingType.LIST && typeof value === "string") {
    return { ...setting, value };
  }
  if (setting.type === ImagingDeviceSettingType.RANGE && typeof value === "number") {
    return { ...setting, value };
  }
  throw `Unable to update setting ${setting.name} to value ${value}. Expected value to be type ${setting.type}.`;
};
