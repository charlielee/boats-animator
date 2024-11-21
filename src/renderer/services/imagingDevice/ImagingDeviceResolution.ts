import { ComboboxData } from "@mantine/core";

export interface ImagingDeviceResolution {
  width: number;
  height: number;
}

export enum ResolutionName {
  RES_1080P = "RES_1080P",
  RES_720P = "RES_720P",
  RES_CUSTOM = "RES_CUSTOM",
}

export const NAME_TO_RESOLUTION: Partial<Record<ResolutionName, ImagingDeviceResolution>> = {
  [ResolutionName.RES_1080P]: {
    width: 1920,
    height: 1080,
  },
  [ResolutionName.RES_720P]: {
    width: 1280,
    height: 720,
  },
};

export const makeResolutionSelectData = (): ComboboxData => {
  const options = Object.entries(NAME_TO_RESOLUTION).map(([name, resolution]) => ({
    value: name as ResolutionName,
    label: `${resolution.width}×${resolution.height}`,
  }));
  const customOption = { value: ResolutionName.RES_CUSTOM, label: "Custom" };
  return [...options, customOption];
};

export const resolutionToName = (curResolution: ImagingDeviceResolution): ResolutionName => {
  const option = Object.entries(NAME_TO_RESOLUTION).find(([, resolution]) =>
    areResolutionsEqual(resolution, curResolution)
  );
  return option ? (option[0] as ResolutionName) : ResolutionName.RES_CUSTOM;
};

export const areResolutionsEqual = (
  resolution1?: ImagingDeviceResolution,
  resolution2?: ImagingDeviceResolution
): boolean =>
  resolution1?.width === resolution2?.width && resolution1?.height === resolution2?.height;
