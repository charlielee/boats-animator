export class CreateDirectoryAlreadyExistsError extends Error {
  constructor(parentName: string, directoryName: string) {
    super(
      `Unable to create directory "${parentName}/${directoryName}" as a directory with the same name already exists`
    );
  }
}

export class CreateFileAlreadyExistsError extends Error {
  constructor(directoryName: string, fileName: string) {
    super(
      `Unable to create file "${directoryName}/${fileName}" as file with the same name already exists`
    );
  }
}
