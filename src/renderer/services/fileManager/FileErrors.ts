export class CreateFileAlreadyExistsError extends Error {
  constructor(directoryName: string, fileName: string) {
    super(
      `Unable to create file "${directoryName}/${fileName}" as file with the same name already exists`
    );
  }
}
