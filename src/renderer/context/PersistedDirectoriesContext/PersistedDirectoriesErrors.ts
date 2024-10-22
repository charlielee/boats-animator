import { PROJECT_DIRECTORY_EXTENSION } from "../../../common/utils";

export class ProjectDirectoryIsInsideAnotherProjectError extends Error {
  constructor(parentName: string) {
    super(
      `Unable to create project inside "${parentName}" as it is another .${PROJECT_DIRECTORY_EXTENSION} directory`
    );
  }
}
