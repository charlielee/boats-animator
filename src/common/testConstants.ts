import { v4 as uuidv4 } from "uuid";
import { FileInfoType } from "../renderer/services/fileManager/FileInfo";
import { Project } from "./project/Project";
import { Take } from "./project/Take";

export const PROJECT_NAME = "My Test Movie";
export const PROJECT_FILE_NAME = "My-Test-Movie";
export const PROJECT: Project = {
  name: PROJECT_NAME,
  fileName: PROJECT_FILE_NAME,
};

export const TAKE: Take = {
  id: uuidv4(),
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
