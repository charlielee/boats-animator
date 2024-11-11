import {
  MOCK_DATE_TIME,
  MOCK_ISO_DATE_TIME_STRING,
  PROJECT,
  PROJECT_FILE_NAME,
  PROJECT_NAME,
  TAKE,
  TRACK_GROUP_ID,
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
  makeProjectDirectoryName,
  makeTake,
  makeTakeDirectoryPath,
} from "./projectBuilder";

const projectDirectory = `${PROJECT_FILE_NAME}.${PROJECT_DIRECTORY_EXTENSION}`;

beforeEach(() => {
  jest.useFakeTimers({ now: MOCK_DATE_TIME });
});

afterEach(() => {
  jest.useRealTimers();
});

describe("makeProject", () => {
  it("should make project with the supplied options", () => {
    expect(makeProject({ name: PROJECT_NAME, projectFrameRate: 1 })).toEqual({
      name: PROJECT_NAME,
      fileName: PROJECT_FILE_NAME,
      lastSaved: MOCK_ISO_DATE_TIME_STRING,
      projectFrameRate: 1,
    });
  });

  it("should truncate long project name", () => {
    const projectName = "a".repeat(256);
    expect(makeProject({ name: projectName, projectFrameRate: 15 })).toEqual({
      name: "a".repeat(256),
      fileName: "a".repeat(60),
      lastSaved: MOCK_ISO_DATE_TIME_STRING,
      projectFrameRate: 15,
    });
  });

  it("should handle project name with special characters", () => {
    const projectName = ' 🚢<>:"My/\\|Test ?*.Movié 01!龙🐸 ';
    expect(makeProject({ name: projectName, projectFrameRate: 15 })).toEqual({
      name: projectName,
      fileName: "🚢MyTest-Movié-01!龙🐸",
      lastSaved: MOCK_ISO_DATE_TIME_STRING,
      projectFrameRate: 15,
    });
  });

  it("should use default project file name if name is blank", () => {
    const projectName = "";
    expect(makeProject({ name: projectName, projectFrameRate: 15 })).toEqual({
      name: projectName,
      fileName: expect.stringContaining(DEFAULT_PROJECT_FILE_NAME),
      lastSaved: MOCK_ISO_DATE_TIME_STRING,
      projectFrameRate: 15,
    });
  });

  it("should use default project file name if name is only special characters", () => {
    const projectName = ' <>:"/\\|?*. ';
    expect(makeProject({ name: projectName, projectFrameRate: 15 })).toEqual({
      name: projectName,
      fileName: expect.stringContaining(DEFAULT_PROJECT_FILE_NAME),
      lastSaved: MOCK_ISO_DATE_TIME_STRING,
      projectFrameRate: 15,
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
  const filePath = "/frame.jpg";
  const fileNumber = 0;

  it("should make frame track item with no Track Group ID supplied", () => {
    expect(makeFrameTrackItem(filePath, fileNumber)).toStrictEqual({
      filePath,
      id: expect.any(String),
      length: 1,
      fileNumber,
      trackGroupId: expect.any(String),
    });
  });

  it("should make frame track item with Track Group ID supplied", () => {
    const trackGroupId = TRACK_GROUP_ID;

    expect(makeFrameTrackItem(filePath, fileNumber, trackGroupId)).toStrictEqual({
      filePath,
      id: expect.any(String),
      length: 1,
      fileNumber,
      trackGroupId,
    });
  });
});

describe("makeProjectDirectoryName", () => {
  it("should make project directory name with supplied options", () => {
    expect(makeProjectDirectoryName(PROJECT)).toBe(projectDirectory);
  });
});

describe("makeTakeDirectoryPath", () => {
  it("should make take directory path with supplied options", () => {
    expect(makeTakeDirectoryPath(TAKE)).toEqual("BA_001_01");
  });
});

describe("makeFrameFilePath", () => {
  it("should make expected frame file path", () => {
    const fileName = "cheese";

    expect(makeFrameFilePath(TAKE, fileName)).toEqual("BA_001_01/ba_001_01_frame_cheese.jpg");
  });
});
