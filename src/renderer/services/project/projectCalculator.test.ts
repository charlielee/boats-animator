import { FileInfoType } from "../fileManager/FileInfo";
import { getLastTrackItem, getNextFileNumber } from "./projectCalculator";
import { makeFrameTrackItem } from "./projectBuilder";
import { TAKE } from "../../testing/testConstants";
import { Track } from "./Track";

describe("getNextFileNumber", () => {
  it("should get next file number for track with no items", () => {
    const track: Track = {
      id: "trackId",
      fileType: FileInfoType.FRAME,
      trackItems: [],
    };

    expect(getNextFileNumber(track)).toBe(1);
  });

  it("should get next file number for track with items", () => {
    const track1: Track = {
      id: "trackId",
      fileType: FileInfoType.FRAME,
      trackItems: [
        {
          id: "trackItemId",
          length: 1,
          fileName: "somewhere.jpg",
          fileNumber: 1,
          trackGroupId: "trackGroupId",
          fileInfoId: "fileInfoId",
        },
      ],
    };
    const track2: Track = {
      id: "trackId",
      fileType: FileInfoType.FRAME,
      trackItems: [
        {
          id: "trackItemId",
          length: 1,
          fileName: "somewhere.jpg",
          fileNumber: 7,
          trackGroupId: "trackGroupId",
          fileInfoId: "fileInfoId",
        },
      ],
    };

    expect(getNextFileNumber(track1)).toBe(2);
    expect(getNextFileNumber(track2)).toBe(8);
  });
});

describe("getLastTrackItem", () => {
  it("should get last track item in track", () => {
    const trackItem1 = makeFrameTrackItem(TAKE, 1);
    const trackItem2 = makeFrameTrackItem(TAKE, 2);
    const track: Track = {
      id: "trackId",
      fileType: FileInfoType.FRAME,
      trackItems: [trackItem1, trackItem2],
    };

    expect(getLastTrackItem(track)).toEqual(trackItem2);
  });

  it("should return undefined when no track items in track", () => {
    const track: Track = {
      id: "trackId",
      fileType: FileInfoType.FRAME,
      trackItems: [],
    };

    expect(getLastTrackItem(track)).toEqual(undefined);
  });
});
