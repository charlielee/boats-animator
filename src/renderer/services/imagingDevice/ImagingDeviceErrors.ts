export class ImagingDeviceNotReadyError extends Error {
  constructor() {
    super("Imaging device is not ready yet. Please wait and try again.");
  }
}
