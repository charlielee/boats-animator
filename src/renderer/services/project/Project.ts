import { FileInfoId, IsoDateTimeString } from "../Flavors";

export interface Project {
  name: string;
  directoryName: string;
  projectFrameRate: number;
  lastSaved: IsoDateTimeString;
  fileInfoId: FileInfoId;
}
