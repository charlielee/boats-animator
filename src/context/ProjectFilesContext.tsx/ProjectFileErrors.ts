import { Take } from "../../services/project/types";


export class TakeDirectroryMissingError extends Error {
  constructor(take: Take) {
    super(
      `Unable to load Take as folder '${take.takeDirectory}' is missing.`
    );
  }
}

export class MissingBoatsInfoFileError extends Error{
  constructor(dirHandler : FileSystemDirectoryHandle){
    super(
      `Unable to load project from folder '${dirHandler.name}' as missing the 'project.boatsinfo' file.`
    );
  }
}