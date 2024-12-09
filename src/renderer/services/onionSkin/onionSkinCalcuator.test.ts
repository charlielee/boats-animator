import { v4 as uuidv4 } from "uuid";
import { FileInfoType } from "../fileManager/FileInfo";
import { makeFrameTrackItem, makeTake } from "../project/projectBuilder";
import {
  calculateLiveViewOpacity,
  calculateOnionSkinFrameOpacity,
  getOnionSkinTrackItems,
} from "./onionSkinCalculator";

const onionSkinOpacity = 0.49;

const makeMockFrameTrackItem = () =>
  makeFrameTrackItem(makeTake({ shotNumber: 1, takeNumber: 1, frameRate: 15 }), 1);

const frameTrack = {
  id: uuidv4(),
  fileType: FileInfoType.FRAME,
  trackItems: [],
};
const trackItem1 = makeMockFrameTrackItem();
const trackItem2 = makeMockFrameTrackItem();
const trackItem3 = makeMockFrameTrackItem();

describe("getOnionSkinTrackItems", () => {
  it("should return empty array if no track items", () => {
    expect(getOnionSkinTrackItems(frameTrack, 1)).toEqual([]);
  });

  it("should return last track item if frames visible is 1", () => {
    expect(
      getOnionSkinTrackItems({ ...frameTrack, trackItems: [trackItem1, trackItem2] }, 1)
    ).toEqual([trackItem2]);
  });

  it("should return last 2 track items if frames visible is 2", () => {
    expect(
      getOnionSkinTrackItems({ ...frameTrack, trackItems: [trackItem1, trackItem2, trackItem3] }, 2)
    ).toEqual([trackItem2, trackItem3]);
  });

  it("should handle if frames visible is greater than the number of track items", () => {
    expect(
      getOnionSkinTrackItems({ ...frameTrack, trackItems: [trackItem1, trackItem2] }, 3)
    ).toEqual([trackItem1, trackItem2]);
  });
});

describe("calculateLiveViewOpacity", () => {
  it("should return 1 when enableOnionSkin is false", () => {
    expect(
      calculateLiveViewOpacity(false, onionSkinOpacity, { ...frameTrack, trackItems: [trackItem1] })
    ).toEqual(1);
  });

  it("should return 1 when enableOnionSkin is true but there are no track items", () => {
    expect(
      calculateLiveViewOpacity(true, onionSkinOpacity, { ...frameTrack, trackItems: [] })
    ).toEqual(1);
  });

  it("should return onionSkinOpacity when enableOnionSkin is true and there are track items", () => {
    expect(
      calculateLiveViewOpacity(true, onionSkinOpacity, { ...frameTrack, trackItems: [trackItem1] })
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
