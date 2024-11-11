import { IsoDateTimeString } from "../Flavors";

export interface Project {
  name: string;
  fileName: string;
  projectFrameRate: number;
  lastSaved: IsoDateTimeString;
}
