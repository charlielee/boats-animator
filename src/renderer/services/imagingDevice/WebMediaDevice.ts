import * as rLogger from "../rLogger/rLogger";
import {
  ImagingDevice,
  ImagingDeviceIdentifier,
  ImagingDeviceType,
} from "./ImagingDevice";

class WebMediaDevice implements ImagingDevice {
  public stream?: MediaStream;

  constructor(public identifier: ImagingDeviceIdentifier) {}

  async open() {
    rLogger.info("webMediaDevice.open.start");
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: { exact: this.identifier.deviceId },
          width: { ideal: 99999 },
        },
      });
      return true;
    } catch (e) {
      if (e instanceof DOMException) {
        rLogger.info(
          "webMediaDevice.open.deviceError",
          `${e.name}: ${e.message}`
        );
        return false;
      } else {
        throw e;
      }
    }
  }

  close() {
    rLogger.info("webMediaDevice.close");
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = undefined;
  }

  static async listDevices(): Promise<ImagingDeviceIdentifier[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();

    return devices
      .filter((device) => device.kind === "videoinput")
      .map((device) => ({
        deviceId: device.deviceId,
        name: device.label.split("(")[0],
        type: ImagingDeviceType.WEB_MEDIA,
      }));
  }

  static async onDeviceChange(callback: () => void) {
    navigator.mediaDevices.addEventListener("devicechange", callback);
  }
}

export default WebMediaDevice;