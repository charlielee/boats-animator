export interface Project {
  name: string;
  fileName: string;
  workingDirectory: string;
  fileLastSavedToDisk?: Date;
}
