import { FileInfoId } from "../../../common/Flavors";

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

export class UpdateFileInfoIdNotFoundError extends Error {
  constructor(fileInfoId: FileInfoId) {
    super(`Unable to update file with FileInfoId "${fileInfoId}" as not found`);
  }
}

export class DeleteFileInfoIdNotFoundError extends Error {
  constructor(fileInfoId: FileInfoId) {
    super(`Unable to delete file with FileInfoId "${fileInfoId}" as not found`);
  }
}
