import { TRACK_GROUP_ID } from "../../../common/testConstants";
import { FileInfoType } from "../fileManager/FileInfo";
import { makeFrameTrackItem, makeTake } from "../project/projectBuilder";
import { calculateLiveViewOpacity, calculateOnionSkinFrameOpacity } from "./onionSkinCalculator";
import { v4 as uuidv4 } from "uuid";

const onionSkinOpacity = 0.49;

describe("calculateLiveViewOpacity", () => {
  const trackItem = makeFrameTrackItem(
    makeTake({ shotNumber: 1, takeNumber: 1, frameRate: 15 }),
    1
  );

  it("should return 1 when enableOnionSkin is false", () => {
    expect(
      calculateLiveViewOpacity(false, onionSkinOpacity, {
        id: uuidv4(),
        fileType: FileInfoType.FRAME,
        trackItems: [trackItem],
      })
    ).toEqual(1);
  });

  it("should return 1 when enableOnionSkin is true but there are no track items", () => {
    expect(
      calculateLiveViewOpacity(true, onionSkinOpacity, {
        id: uuidv4(),
        fileType: FileInfoType.FRAME,
        trackItems: [],
      })
    ).toEqual(1);
  });

  it("should return onionSkinOpacity when enableOnionSkin is true and there are track items", () => {
    expect(
      calculateLiveViewOpacity(true, onionSkinOpacity, {
        id: uuidv4(),
        fileType: FileInfoType.FRAME,
        trackItems: [trackItem],
      })
    ).toEqual(onionSkinOpacity);
  });
});

describe("calculateOnionSkinFrameOpacity", () => {
  it("should return 1 when frame index is 0", () => {
    expect(calculateOnionSkinFrameOpacity(onionSkinOpacity, 0)).toEqual(1);
  });

  it("should return onionSkinOpacity when frame index is not 0", () => {
    expect(calculateOnionSkinFrameOpacity(onionSkinOpacity, 1)).toEqual(onionSkinOpacity);
  });
});
