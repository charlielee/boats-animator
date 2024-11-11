import { IsoDateTimeString } from "../Flavors";

export interface Project {
  name: string;
  directoryName: string;
  projectFrameRate: number;
  lastSaved: IsoDateTimeString;
}
