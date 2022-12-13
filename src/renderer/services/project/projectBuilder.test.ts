import {
  TRACK_GROUP_ID,
  WORKING_DIRECTORY,
} from "../../../common/testConstants";
import {
  makeFrameFilePath,
  makeFrameTrackItem,
  makeTake,
  makeTakeDirectoryPath,
} from "./projectBuilder";

const options = {
  workingDirectory: WORKING_DIRECTORY,
  shotNumber: 2,
  takeNumber: 3,
  frameRate: 15,
};

describe("makeTake", () => {
  it("should make take with the supplied options", () => {
    expect(makeTake(options)).toMatchObject({
      directoryPath: `${options.workingDirectory}/Untitled Project.bafiles/BA_002_03`,
      shotNumber: options.shotNumber,
      takeNumber: options.takeNumber,
      frameRate: options.frameRate,
    });
  });
});

describe("makeFrameTrackItem", () => {
  it("should make frame track item with no Track Group ID supplied", () => {
    const filePath = "/frame.jpg";

    expect(makeFrameTrackItem(filePath)).toStrictEqual({
      filePath,
      id: expect.any(String),
      length: 1,
      trackGroupId: expect.any(String),
    });
  });

  it("should make frame track item with Track Group ID supplied", () => {
    const filePath = "/frame.jpg";
    const trackGroupId = TRACK_GROUP_ID;

    expect(makeFrameTrackItem(filePath, trackGroupId)).toStrictEqual({
      filePath,
      id: expect.any(String),
      length: 1,
      trackGroupId,
    });
  });
});

describe("makeTakeDirectoryPath", () => {
  it("should make take directory path with supplied options", () => {
    expect(makeTakeDirectoryPath(options)).toEqual(
      `${options.workingDirectory}/Untitled Project.bafiles/BA_002_03`
    );
  });
});

describe("makeFrameFilePath", () => {
  it("should make frame file path when frame name supplied", () => {
    const take = makeTake(options);
    const takeDirectoryPath = makeTakeDirectoryPath(options);
    const fileName = "cheese";

    expect(makeFrameFilePath(take, fileName)).toEqual(
      `${takeDirectoryPath}/ba_002_03_frame_cheese.jpg`
    );
  });

  it("should make frame file path when frame name not supplied", () => {
    const take = makeTake(options);
    take.lastExportedFrameNumber = 3;
    const takeDirectoryPath = makeTakeDirectoryPath(options);

    expect(makeFrameFilePath(take)).toEqual(
      `${takeDirectoryPath}/ba_002_03_frame_00004.jpg`
    );
  });
});
