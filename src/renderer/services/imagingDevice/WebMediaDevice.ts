import { ImagingDeviceApi } from "./ImagingDevice";

class WebMediaDevice implements ImagingDeviceApi {
  constructor(public id: string, public name: string) {}

  static async listDevices(): Promise<WebMediaDevice[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();

    return devices
      .filter((device) => device.kind === "videoinput")
      .map((device) => ({
        id: device.deviceId,
        name: device.label.split("(")[0],
      }));
  }

  static async onDeviceChange(callback: () => void) {
    navigator.mediaDevices.addEventListener("devicechange", callback);
  }
}

export default WebMediaDevice;
