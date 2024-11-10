import { FileInfoId } from "../../../common/Flavors";

export class FileErrorBase extends Error {
  constructor(
    public action: string,
    public filePath: string,
    message: string
  ) {
    super(message);
  }
}

export class CreateDirectoryAlreadyExistsError extends FileErrorBase {
  constructor(parentName: string, directoryName: string) {
    super(
      "create directory",
      `${parentName}/${directoryName}`,
      `Unable to create directory "${parentName}/${directoryName}" as a directory with the same name already exists`
    );
  }
}

export class CreateDirectoryUnexpectedError extends FileErrorBase {
  constructor(parentName: string, directoryName: string, e: unknown) {
    super(
      "create directory",
      `${parentName}/${directoryName}`,
      `Unable to create directory "${parentName}/${directoryName}" due to an unexpected error ${e}`
    );
  }
}

export class CreateFileAlreadyExistsError extends FileErrorBase {
  constructor(directoryName: string, fileName: string) {
    super(
      "create file",
      `${directoryName}/${fileName}`,
      `Unable to create file "${directoryName}/${fileName}" as file with the same name already exists`
    );
  }
}

export class CreateFileUnexpectedError extends FileErrorBase {
  constructor(directoryName: string, fileName: string, e: unknown) {
    super(
      "create file",
      `${directoryName}/${fileName}`,
      `Unable to create file "${fileName}" due to an unexpected error ${e}`
    );
  }
}

export class UpdateFileInfoIdNotFoundError extends FileErrorBase {
  constructor(fileInfoId: FileInfoId) {
    super(
      "update file",
      "unknown",
      `Unable to update file with FileInfoId "${fileInfoId}" as not found`
    );
  }
}

export class UpdateFileUnexpectedError extends FileErrorBase {
  constructor(fileName: string, e: unknown) {
    super(
      "update file",
      fileName,
      `Unable to update file "${fileName}" due to an unexpected error ${e}`
    );
  }
}

export class DeleteFileInfoIdNotFoundError extends FileErrorBase {
  constructor(fileInfoId: FileInfoId) {
    super(
      "delete file",
      "unknown",
      `Unable to delete file with FileInfoId "${fileInfoId}" as not found`
    );
  }
}

export class DeleteFileUnexpectedError extends FileErrorBase {
  constructor(fileName: string, e: unknown) {
    super(
      "update file",
      fileName,
      `Unable to delete file "${fileName}" due to an unexpected error ${e}`
    );
  }
}
