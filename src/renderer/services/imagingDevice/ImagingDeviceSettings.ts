export enum ImagingDeviceSettingType {
  RANGE = "RANGE",
  BOOLEAN = "BOOLEAN",
  LIST = "LIST",
}

interface ImagingDeviceSettingBase {
  readonly type: ImagingDeviceSettingType;
  readonly name: string;
  readonly value: string | boolean | number;
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

// export type ImagingDeviceSettings = Record<string, ImagingDeviceSetting>;

// export const makeImagingDevice;

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
