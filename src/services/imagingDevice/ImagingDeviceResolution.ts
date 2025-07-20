import { ComboboxData } from "@mantine/core";

export interface ImagingDeviceResolution {
  width: number;
  height: number;
}

interface ImagingDeviceResolutionInfo extends ImagingDeviceResolution {
  label: string;
}

export enum ResolutionName {
  RES_4K = "RES_4K",
  RES_2K = "RES_2K",
  RES_1080P = "RES_1080P",
  RES_720P = "RES_720P",
  RES_480P = "RES_480P",
  RES_CUSTOM = "RES_CUSTOM",
}

export const NAME_TO_RESOLUTION: Partial<Record<ResolutionName, ImagingDeviceResolutionInfo>> = {
  [ResolutionName.RES_4K]: {
    label: "2160p 4K",
    width: 3840,
    height: 2160,
  },
  [ResolutionName.RES_2K]: {
    label: "1440p 2K",
    width: 2560,
    height: 1440,
  },
  [ResolutionName.RES_1080P]: {
    label: "1080p FHD",
    width: 1920,
    height: 1080,
  },
  [ResolutionName.RES_720P]: {
    label: "720p HD",
    width: 1280,
    height: 720,
  },
  [ResolutionName.RES_480P]: {
    label: "480p SD",
    width: 854,
    height: 480,
  },
};

export const makeResolutionSelectData = (): ComboboxData => {
  const options = Object.entries(NAME_TO_RESOLUTION).map(([name, resolution]) => ({
    value: name as ResolutionName,
    label: `${resolution.width}×${resolution.height} (${resolution.label})`,
  }));
  const customOption = { value: ResolutionName.RES_CUSTOM, label: "Custom..." };
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
