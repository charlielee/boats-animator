import {
  makeResolutionSelectData,
  ResolutionName,
  resolutionToName,
} from "./ImagingDeviceResolution";

describe("makeResolutionSelectData", () => {
  it("should make expected makeResolutionSelectData", () => {
    expect(makeResolutionSelectData()).toEqual(
      expect.arrayContaining([
        { value: ResolutionName.RES_1080P, label: "1920×1080" },
        { value: ResolutionName.RES_CUSTOM, label: "Custom" },
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
