import { PROJECT_DIRECTORY_EXTENSION } from "../../../common/utils";

export class DirectoryAccessPermissionError extends Error {
  constructor(directoryName: string, status: string) {
    super(
      `Unable to get file access permission to directory: '${directoryName}'. Status: ${status}`
    );
  }
}

export class ProjectDirectoryIsInsideAnotherProjectError extends Error {
  constructor(parentName: string) {
    super(
      `Unable to create project inside "${parentName}" as it is another .${PROJECT_DIRECTORY_EXTENSION} directory`
    );
  }
}
