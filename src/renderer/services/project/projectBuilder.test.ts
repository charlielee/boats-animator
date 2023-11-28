import {
  PROJECT,
  PROJECT_FILE_NAME,
  PROJECT_NAME,
  TAKE,
  TRACK_GROUP_ID,
  WORKING_DIRECTORY,
} from "../../../common/testConstants";
import {
  DEFAULT_PROJECT_FILE_NAME,
  DEFAULT_PROJECT_NAME,
  PROJECT_DIRECTORY_EXTENSION,
} from "../../../common/utils";
import {
  formatProjectName,
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

  it("should truncate long project name", () => {
    const projectName = "a".repeat(256);
    expect(makeProject({ name: projectName, workingDirectory: WORKING_DIRECTORY })).toEqual({
      name: "a".repeat(256),
      fileName: "a".repeat(60),
      workingDirectory: WORKING_DIRECTORY,
    });
  });

  it("should handle project name with special characters", () => {
    const projectName = ' 🚢<>:"My/\\|Test ?*.Movié 01!龙🐸 ';
    expect(makeProject({ name: projectName, workingDirectory: WORKING_DIRECTORY })).toEqual({
      name: projectName,
      fileName: "🚢MyTest-Movié-01!龙🐸",
      workingDirectory: WORKING_DIRECTORY,
    });
  });

  it("should use default project file name if name is blank", () => {
    const projectName = "";
    expect(makeProject({ name: projectName, workingDirectory: WORKING_DIRECTORY })).toEqual({
      name: projectName,
      fileName: DEFAULT_PROJECT_FILE_NAME,
      workingDirectory: WORKING_DIRECTORY,
    });
  });

  it("should use default project file name if name is only special characters", () => {
    const projectName = ' <>:"/\\|?*. ';
    expect(makeProject({ name: projectName, workingDirectory: WORKING_DIRECTORY })).toEqual({
      name: projectName,
      fileName: DEFAULT_PROJECT_FILE_NAME,
      workingDirectory: WORKING_DIRECTORY,
    });
  });
});

describe("formatProjectName", () => {
  it("should trim whitespace from project name", () => {
    expect(formatProjectName(` My Movie \r\n\t`)).toBe("My Movie");
  });

  it("should use default project name if name is blank or only whitespace", () => {
    expect(formatProjectName("")).toBe(DEFAULT_PROJECT_NAME);
    expect(formatProjectName(` \r\n\t`)).toBe(DEFAULT_PROJECT_NAME);
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
  it("should make expected frame file path", () => {
    const fileName = "cheese";

    expect(makeFrameFilePath(PROJECT, TAKE, fileName)).toEqual(
      `${projectDirectory}/BA_001_01/ba_001_01_frame_cheese.jpg`
    );
  });
});
