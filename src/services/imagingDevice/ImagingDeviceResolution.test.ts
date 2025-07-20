import {
  areResolutionsEqual,
  makeResolutionSelectData,
  NAME_TO_RESOLUTION,
  ResolutionName,
  resolutionToName,
} from "./ImagingDeviceResolution";

describe("makeResolutionSelectData", () => {
  it("should make expected makeResolutionSelectData", () => {
    expect(makeResolutionSelectData()).toEqual(
      expect.arrayContaining([
        { value: ResolutionName.RES_1080P, label: "1920×1080 (1080p FHD)" },
        { value: ResolutionName.RES_CUSTOM, label: "Custom..." },
      ])
    );
  });
});

describe("resolutionToName", () => {
  it("should make expected resolution name for named resolution", () => {
    expect(resolutionToName({ width: 1920, height: 1080 })).toEqual(ResolutionName.RES_1080P);
  });

  it("should make expected resolution name for custom resolution", () => {
    expect(resolutionToName({ width: 9999, height: 9999 })).toEqual(ResolutionName.RES_CUSTOM);
  });
});

describe("areResolutionsEqual", () => {
  it("should return true for 2 equal resolutions", () => {
    expect(areResolutionsEqual(undefined, undefined)).toBe(true);
    expect(
      areResolutionsEqual(
        NAME_TO_RESOLUTION[ResolutionName.RES_1080P],
        NAME_TO_RESOLUTION[ResolutionName.RES_1080P]
      )
    ).toBe(true);
    expect(areResolutionsEqual({ width: 1280, height: 720 }, { width: 1280, height: 720 })).toBe(
      true
    );
    expect(areResolutionsEqual({ width: 0, height: 720 }, { width: 0, height: 720 })).toBe(true);
    expect(areResolutionsEqual({ width: 1280, height: 0 }, { width: 1280, height: 0 })).toBe(true);
    expect(areResolutionsEqual(NAME_TO_RESOLUTION[ResolutionName.RES_CUSTOM], undefined)).toBe(
      true
    );
  });

  it("should return false for 2 different resolutions", () => {
    expect(
      areResolutionsEqual(
        NAME_TO_RESOLUTION[ResolutionName.RES_1080P],
        NAME_TO_RESOLUTION[ResolutionName.RES_720P]
      )
    ).toBe(false);
    expect(areResolutionsEqual({ width: 1280, height: 720 }, { width: 1281, height: 720 })).toBe(
      false
    );
    expect(areResolutionsEqual({ width: 1280, height: 720 }, { width: 1280, height: 721 })).toBe(
      false
    );
    expect(areResolutionsEqual(NAME_TO_RESOLUTION[ResolutionName.RES_1080P], undefined)).toBe(
      false
    );
    expect(areResolutionsEqual(undefined, NAME_TO_RESOLUTION[ResolutionName.RES_1080P])).toBe(
      false
    );
  });
});
