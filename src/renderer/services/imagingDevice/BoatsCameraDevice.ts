import * as rLogger from "../rLogger/rLogger";
import { ImagingDevice, ImagingDeviceIdentifier, ImagingDeviceType } from "./ImagingDevice";

class BoatsCameraDevice implements ImagingDevice {
  public stream?: MediaStream;

  constructor(public identifier: ImagingDeviceIdentifier) {}

  async open(): Promise<boolean> {
    rLogger.info("boatsCameraDevice.open.start");

    try {
      const response = await fetch("http://localhost:8000/camera/setActive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cameraId: this.identifier.deviceId }),
      });

      if (response.ok) {
        // this.stream = todo
        return true;
      } else {
        const errorResponse = await response.json();
        rLogger.error("boatsCameraDevice.takePhoto.errorResponse", errorResponse);
        throw errorResponse.errorMessage;
      }
    } catch (e) {
      rLogger.error("boatsCameraDevice.open.error", JSON.stringify(e));
      return false;
    }
  }

  // todo should be async so we can check the response of the fetch is ok
  close(): void {
    rLogger.info("boatsCameraDevice.close");
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = undefined;

    fetch("http://localhost:8000/camera/setActive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cameraId: null }),
    });
  }

  async takePhoto(): Promise<Blob> {
    // todo check current camera is the active device
    try {
      const response = await fetch("http://localhost:8000/camera/capture", { method: "GET" });

      if (response.ok) {
        return response.blob();
      } else {
        const errorResponse = await response.json();
        rLogger.error("boatsCameraDevice.takePhoto.errorResponse", errorResponse);
        throw errorResponse.errorMessage;
      }
    } catch (e) {
      rLogger.error("boatsCameraDevice.takePhoto.error", JSON.stringify(e));
      throw e;
    }
  }

  static async listDevices(): Promise<ImagingDeviceIdentifier[]> {
    const devicesResponse = await fetch("http://localhost:8000/camera", { method: "GET" });
    const devicesJson = await devicesResponse.json();

    return devicesJson.detectedCameras.map(
      (camera: any) =>
        ({
          name: camera.info.name === "" ? camera.id : camera.info.name,
          deviceId: camera.id,
          type: ImagingDeviceType.BOATS_CAMERA,
        }) as ImagingDeviceIdentifier
    );
  }
}

export default BoatsCameraDevice;
