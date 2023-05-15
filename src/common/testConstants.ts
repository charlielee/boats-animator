import { v4 as uuidv4 } from "uuid";
import { FileRefType } from "./FileRef";
import { Project } from "./project/Project";
import { Take } from "./project/Take";

export const PROJECT_NAME = "My Test Movie";
export const PROJECT_FILE_NAME = "My-Test-Movie";
export const WORKING_DIRECTORY = "/hello";
export const PROJECT: Project = {
  name: PROJECT_NAME,
  fileName: PROJECT_FILE_NAME,
  workingDirectory: WORKING_DIRECTORY,
};

export const TAKE: Take = {
  id: uuidv4(),
  shotNumber: 1,
  takeNumber: 1,
  frameRate: 15,
  holdFrames: 1,
  lastExportedFrameNumber: 0,
  frameTrack: {
    id: uuidv4(),
    fileType: FileRefType.FRAME,
    trackItems: [],
  },
};

export const TRACK_GROUP_ID = "81d57cf4-af96-4b0c-b1ad-3664ba767be6";
