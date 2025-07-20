import { Project } from "./Project";
import { Take } from "./Take";

export const CURRENT_PROJECT_INFO_FILE_SCHEMA_VERSION = 1;

interface ProjectInfoFileBase {
  schemaVersion: number;
}

export interface ProjectInfoFileV1 extends ProjectInfoFileBase {
  schemaVersion: 1;
  appVersion: string;
  project: Project;
  takes: Take[];
}
