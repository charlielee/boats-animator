import { FileInfoType } from "../fileManager/FileInfo";
import { Track } from "../../../common/project/Track";
import { getNextFileNumber } from "./projectCalculator";

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
          filePath: "somewhere.jpg",
          fileNumber: 1,
          trackGroupId: "trackGroupId",
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
          filePath: "somewhere.jpg",
          fileNumber: 7,
          trackGroupId: "trackGroupId",
        },
      ],
    };

    expect(getNextFileNumber(track1)).toBe(2);
    expect(getNextFileNumber(track2)).toBe(8);
  });
});
