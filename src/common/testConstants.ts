import { v4 as uuidv4 } from "uuid";
import { FileInfoType } from "../renderer/context/FileManagerContext/FileInfo";
import { Project } from "./project/Project";
import { Take } from "./project/Take";
import { DEFAULT_PROJECT_FRAME_RATE } from "./utils";
import { IsoDateTimeString } from "./Flavors";

export const PROJECT_NAME = "My Test Movie";
export const PROJECT_FILE_NAME = "My-Test-Movie";
export const PROJECT: Project = {
  name: PROJECT_NAME,
  fileName: PROJECT_FILE_NAME,
  projectFrameRate: DEFAULT_PROJECT_FRAME_RATE,
  lastSaved: new Date("2024-01-01").toISOString(),
};

export const TAKE: Take = {
  id: uuidv4(),
  lastSaved: new Date("2024-01-01").toISOString(),
  shotNumber: 1,
  takeNumber: 1,
  frameRate: 15,
  holdFrames: 1,
  frameTrack: {
    id: uuidv4(),
    fileType: FileInfoType.FRAME,
    trackItems: [],
  },
};

export const TRACK_GROUP_ID = "81d57cf4-af96-4b0c-b1ad-3664ba767be6";

export const MOCK_ISO_DATE_TIME_STRING: IsoDateTimeString = "2024-01-01T00:00:00.000Z";
export const MOCK_DATE_TIME = new Date(MOCK_ISO_DATE_TIME_STRING);
