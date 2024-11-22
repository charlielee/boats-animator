export enum ImagingDeviceSettingType {
  RANGE = "RANGE",
  BOOLEAN = "BOOLEAN",
  LIST = "LIST",
}

interface ImagingDeviceSettingBase {
  readonly settingType: ImagingDeviceSettingType;
  readonly value: string | boolean | number;
}

export interface ImagingDeviceSettingBoolean extends ImagingDeviceSettingBase {
  readonly settingType: ImagingDeviceSettingType.BOOLEAN;
  readonly name: string;
  readonly value: boolean;
}

export interface ImagingDeviceSettingList extends ImagingDeviceSettingBase {
  readonly settingType: ImagingDeviceSettingType.LIST;
  readonly options: string[];
  readonly value: string;
}

export interface ImagingDeviceSettingRange extends ImagingDeviceSettingBase {
  readonly settingType: ImagingDeviceSettingType.RANGE;
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
