class NoWorkingDirectoryError extends Error {
  constructor() {
    super("Unable to create a new project without a working directory selected");
  }
}

export default NoWorkingDirectoryError;
