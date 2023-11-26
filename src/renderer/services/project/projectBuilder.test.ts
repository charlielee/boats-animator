import {
  PROJECT,
  PROJECT_FILE_NAME,
  PROJECT_NAME,
  TAKE,
  TRACK_GROUP_ID,
  WORKING_DIRECTORY,
} from "../../../common/testConstants";
import { PROJECT_DIRECTORY_EXTENSION } from "../../../common/utils";
import {
  makeFrameFilePath,
  makeFrameTrackItem,
  makeProject,
  makeProjectDirectoryPath,
  makeTake,
  makeTakeDirectoryPath,
} from "./projectBuilder";

const projectDirectory = `${WORKING_DIRECTORY}/${PROJECT_FILE_NAME}.${PROJECT_DIRECTORY_EXTENSION}`;

describe("makeProject", () => {
  it("should make project with the supplied options", () => {
    expect(makeProject({ name: PROJECT_NAME, workingDirectory: WORKING_DIRECTORY })).toEqual({
      name: PROJECT_NAME,
      fileName: PROJECT_FILE_NAME,
      workingDirectory: WORKING_DIRECTORY,
    });
  });

  it("should handle project name with special characters", () => {
    const projectName = ' 🚢<>:"My/\\|Test ?*.Movié!龙🐸 ';
    expect(makeProject({ name: projectName, workingDirectory: WORKING_DIRECTORY })).toEqual({
      name: projectName,
      fileName: "🚢MyTest-Movié!龙🐸",
      workingDirectory: WORKING_DIRECTORY,
    });
  });
});

describe("makeTake", () => {
  const takeOptions = {
    shotNumber: 2,
    takeNumber: 3,
    frameRate: 15,
  };

  it("should make take with the supplied options", () => {
    expect(makeTake(takeOptions)).toMatchObject({
      shotNumber: takeOptions.shotNumber,
      takeNumber: takeOptions.takeNumber,
      frameRate: takeOptions.frameRate,
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

describe("makeProjectDirectoryPath", () => {
  it("should make project directory path with supplied options", () => {
    expect(makeProjectDirectoryPath(PROJECT)).toBe(projectDirectory);
  });
});

describe("makeTakeDirectoryPath", () => {
  it("should make take directory path with supplied options", () => {
    expect(makeTakeDirectoryPath(PROJECT, TAKE)).toEqual(`${projectDirectory}/BA_001_01`);
  });
});

describe("makeFrameFilePath", () => {
  it("should make frame file path when frame name supplied", () => {
    const fileName = "cheese";

    expect(makeFrameFilePath(PROJECT, TAKE, fileName)).toEqual(
      `${projectDirectory}/BA_001_01/ba_001_01_frame_cheese.jpg`
    );
  });

  it("should make frame file path when frame name not supplied", () => {
    const take = TAKE;
    take.lastExportedFrameNumber = 3;

    expect(makeFrameFilePath(PROJECT, take)).toEqual(
      `${projectDirectory}/BA_001_01/ba_001_01_frame_00004.jpg`
    );
  });
});
