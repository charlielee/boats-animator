import {
  MOCK_DATE_TIME,
  MOCK_ISO_DATE_TIME_STRING,
  PROJECT_DIRECTORY_NAME,
  PROJECT_NAME,
  TAKE,
  TRACK_GROUP_ID,
} from "../../../common/testConstants";
import { DEFAULT_PROJECT_DIRECTORY_NAME, PROJECT_DIRECTORY_EXTENSION } from "../../../common/utils";
import {
  makeFrameTrackItem,
  makeProject,
  makeTake,
  makeTakeDirectoryPath,
  makeUniqueProjectDirectoryNameIfRequired,
} from "./projectBuilder";

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
      directoryName: PROJECT_DIRECTORY_NAME,
      lastSaved: MOCK_ISO_DATE_TIME_STRING,
      projectFrameRate: 1,
      fileInfoId: expect.any(String),
    });
  });

  it("should truncate long project name", () => {
    const projectName = "a".repeat(256);
    expect(makeProject({ name: projectName, projectFrameRate: 15 })).toEqual({
      name: "a".repeat(256),
      directoryName: `${"a".repeat(60)}.${PROJECT_DIRECTORY_EXTENSION}`,
      lastSaved: MOCK_ISO_DATE_TIME_STRING,
      projectFrameRate: 15,
      fileInfoId: expect.any(String),
    });
  });

  it("should handle project name with special characters", () => {
    const projectName = ' 🚢<>:"My/\\|Test ?*.Movié 01!龙🐸 ';
    expect(makeProject({ name: projectName, projectFrameRate: 15 })).toEqual({
      name: projectName,
      directoryName: `🚢MyTest-Movié-01!龙🐸.${PROJECT_DIRECTORY_EXTENSION}`,
      lastSaved: MOCK_ISO_DATE_TIME_STRING,
      projectFrameRate: 15,
      fileInfoId: expect.any(String),
    });
  });

  it("should use default project file name if name is blank", () => {
    const projectName = "";
    expect(makeProject({ name: projectName, projectFrameRate: 15 })).toEqual({
      name: projectName,
      directoryName: DEFAULT_PROJECT_DIRECTORY_NAME,
      lastSaved: MOCK_ISO_DATE_TIME_STRING,
      projectFrameRate: 15,
      fileInfoId: expect.any(String),
    });
  });

  it("should use default project file name if name is only special characters", () => {
    const projectName = ' <>:"/\\|?*. ';
    expect(makeProject({ name: projectName, projectFrameRate: 15 })).toEqual({
      name: projectName,
      directoryName: DEFAULT_PROJECT_DIRECTORY_NAME,
      lastSaved: MOCK_ISO_DATE_TIME_STRING,
      projectFrameRate: 15,
      fileInfoId: expect.any(String),
    });
  });
});

describe("makeUniqueProjectDirectoryNameIfRequired", () => {
  it("should make name unique if default project directory name supplied", () => {
    const defaultProjectDirectoryNameRegex = expect.stringMatching(
      /^Untitled-Movie-[a-zA-Z0-9]{6,}.boatsfiles$/
    );
    expect(makeUniqueProjectDirectoryNameIfRequired(DEFAULT_PROJECT_DIRECTORY_NAME)).toEqual(
      defaultProjectDirectoryNameRegex
    );
  });

  it("should not change name if default project directory name is not supplied", () => {
    const name1 = "cheese.boatsfiles";
    expect(makeUniqueProjectDirectoryNameIfRequired(name1)).toEqual(name1);
    const name2 = "  trimming whitespace or missing extension is not handled here   ";
    expect(makeUniqueProjectDirectoryNameIfRequired(name2)).toEqual(name2);
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
  const fileName = "ba_001_01_frame_00001.jpg";
  const fileNumber = 1;

  it("should make frame track item with no Track Group ID supplied", () => {
    expect(makeFrameTrackItem(TAKE, fileNumber)).toStrictEqual({
      fileName,
      id: expect.any(String),
      length: 1,
      fileNumber,
      trackGroupId: expect.any(String),
      fileInfoId: expect.any(String),
    });
  });

  it("should make frame track item with Track Group ID supplied", () => {
    const trackGroupId = TRACK_GROUP_ID;

    expect(makeFrameTrackItem(TAKE, fileNumber, trackGroupId)).toStrictEqual({
      fileName,
      id: expect.any(String),
      length: 1,
      fileNumber,
      trackGroupId,
      fileInfoId: expect.any(String),
    });
  });
});

describe("makeTakeDirectoryPath", () => {
  it("should make take directory path with supplied options", () => {
    expect(makeTakeDirectoryPath(TAKE)).toEqual("BA_001_01");
  });
});
