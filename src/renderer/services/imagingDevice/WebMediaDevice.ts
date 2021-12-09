import { ImagingDevice, ImagingDeviceIdentifier } from "./ImagingDevice";

class WebMediaDevice implements ImagingDevice {
  private stream?: MediaStream;

  constructor(public identifier: ImagingDeviceIdentifier) {}

  async open() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { deviceId: { exact: this.identifier.deviceId } },
    });

    return this.stream;
  }

  close() {
    this.stream?.getTracks().forEach((track) => track.stop());
  }

  static async listDevices(): Promise<ImagingDeviceIdentifier[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();

    return devices
      .filter((device) => device.kind === "videoinput")
      .map((device) => ({
        deviceId: device.deviceId,
        name: device.label.split("(")[0],
      }));
  }

  static async onDeviceChange(callback: () => void) {
    navigator.mediaDevices.addEventListener("devicechange", callback);
  }
}

export default WebMediaDevice;
