import { ImagingDevice } from "./ImagingDevice";

class WebMediaDevice implements ImagingDevice {
  constructor(public deviceId: string, public name: string) {}

  static async listDevices(): Promise<WebMediaDevice[]> {
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
