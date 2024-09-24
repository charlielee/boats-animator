import * as rLogger from "../rLogger/rLogger";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ImagingDevice, ImagingDeviceIdentifier, ImagingDeviceType } from "./ImagingDevice";

class BoatsCameraDevice implements ImagingDevice {
  public stream?: MediaStream;
  // private imageCapture?: ImageCapture;

  constructor(public identifier: ImagingDeviceIdentifier) {}

  async open(): Promise<boolean> {
    rLogger.info("boatsCameraDevice.open.start");
    return Promise.resolve(true);

    // try {
    //   this.stream = await navigator.mediaDevices.getUserMedia({
    //     audio: false,
    //     video: {
    //       deviceId: { exact: this.identifier.deviceId },
    //       width: { ideal: 1920 },
    //     },
    //   });
    //   this.imageCapture = new ImageCapture(this.stream.getVideoTracks()[0]);
    //   return true;
    // } catch (e) {
    //   if (e instanceof DOMException) {
    //     rLogger.info("boatsCameraDevice.open.deviceError", `${e.name}: ${e.message}`);
    //     return false;
    //   } else {
    //     throw e;
    //   }
    // }
  }

  close(): void {
    rLogger.info("boatsCameraDevice.close");
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = undefined;
    // this.imageCapture = undefined;
  }

  async takePhoto(): Promise<Blob> {
    return Promise.resolve(new Blob());
    // if (!this.imageCapture) {
    //   throw "Device must be open before takePhoto can be called";
    // }

    // rLogger.info("boatsCameraDevice.takePhoto");

    // try {
    //   return await this.imageCapture.takePhoto({
    //     imageHeight: this.getStreamHeight(),
    //     imageWidth: this.getStreamWidth(),
    //   });
    // } catch {
    //   rLogger.info(
    //     "boatsCameraDevice.grabFrameFallback",
    //     "Error running takePhoto. Trying grabFrame instead."
    //   );
    //   const frame = await this.grabFrame();

    //   if (frame) {
    //     return frame;
    //   } else {
    //     rLogger.error("boatsCameraDevice.noImageData", "Both takePhoto and grabFrame failed");
    //     throw "boatsCameraDevice.noImageData Both takePhoto and grabFrame failed";
    //   }
    // }
  }

  // Some devices (eg virtual cameras) do not support imageCapture.takePhoto()
  // so call imageCapture.grabFrame() as a backup and convert the ImageBitmap to a Blob
  // private async grabFrame(): Promise<Blob | null> {
  //   if (!this.imageCapture) {
  //     throw "Device must be open before grabFrame can be called";
  //   }

  //   rLogger.info("boatsCameraDevice.grabFrame");
  //   const bitmap = await this.imageCapture.grabFrame();

  //   const canvas = document.createElement("canvas");
  //   canvas.height = bitmap.height;
  //   canvas.width = bitmap.width;
  //   const context = canvas.getContext("bitmaprenderer");
  //   context?.transferFromImageBitmap(bitmap);

  //   return new Promise((res) => canvas.toBlob((blob) => res(blob), "image/jpeg"));
  // }

  private getStreamHeight() {
    return this.stream?.getVideoTracks()[0].getSettings().height;
  }

  private getStreamWidth() {
    return this.stream?.getVideoTracks()[0].getSettings().width;
  }

  static async listDevices(): Promise<ImagingDeviceIdentifier[]> {
    // const devices = await navigator.mediaDevices.enumerateDevices();
    const devicesResponse = await fetch("http://localhost:8000/camera", { method: "GET" });
    const devicesJson = await devicesResponse.json();

    // console.log(await devices.json());

    return devicesJson.detectedCameras.map(
      (camera: any) =>
        ({
          name: camera.info.name === "" ? camera.id : camera.info.name,
          deviceId: camera.id,
          type: ImagingDeviceType.BOATS_CAMERA,
        }) as ImagingDeviceIdentifier
    );

    // return devices
    //   .filter((device) => device.kind === "videoinput")
    //   .map((device) => ({
    //     deviceId: device.deviceId,
    //     name: device.label.split("(")[0],
    //     type: ImagingDeviceType.WEB_MEDIA,
    //   }));
  }

  //   static addDeviceChangeListener(listener: () => void): void {
  //     navigator.mediaDevices.addEventListener("devicechange", listener);
  //   }

  //   static removeDeviceChangeListener(listener: () => void): void {
  //     navigator.mediaDevices.removeEventListener("devicechange", listener);
  //   }
}

export default BoatsCameraDevice;
