export class UnableToStartDeviceError extends Error {
  constructor() {
    super("Unable to use the selected device");
  }
}

export class UnableToUseResolutionDeviceError extends Error {
  constructor() {
    super("Unable to use the selected resolution");
  }
}
