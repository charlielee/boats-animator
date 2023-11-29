import { ProjectId } from "../Flavors";

export interface Project {
  id: ProjectId;
  name: string;
  fileName: string;
  workingDirectory: string;
  fileLastSavedToDisk?: Date;
}
