import { notifications } from "@mantine/notifications";
import * as rLogger from "../rLogger/rLogger";
import { ImagingDevice, ImagingDeviceIdentifier, ImagingDeviceType } from "./ImagingDevice";

const EXTREMELY_LARGE_WIDTH = 99999;

class WebMediaDevice implements ImagingDevice {
  public stream?: MediaStream;
  private imageCapture?: ImageCapture;

  constructor(public identifier: ImagingDeviceIdentifier) {}

  async open(): Promise<void> {
    rLogger.info("webMediaDevice.open.start");
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: { exact: this.identifier.deviceId },
          width: { ideal: EXTREMELY_LARGE_WIDTH },
        },
      });
      this.imageCapture = new ImageCapture(this.stream.getVideoTracks()[0]);

      // Need to take a photo to prevent delay when the first image is captured
      await this.takePhoto();
    } catch (e) {
      if (e instanceof DOMException) {
        rLogger.info("webMediaDevice.open.deviceError", `${e.name}: ${e.message}`);
        this.close();
        notifications.show({ message: `Unable to start ${this.identifier.name}` });
      } else {
        throw e;
      }
    }
  }

  close(): void {
    rLogger.info("webMediaDevice.close");
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = undefined;
    this.imageCapture = undefined;
  }

  async takePhoto(): Promise<Blob> {
    rLogger.info("webMediaDevice.takePhoto");
    if (this.imageCapture === undefined || this.stream === undefined) {
      throw "Device must be open before takePhoto can be called";
    }

    try {
      const videoTrack = this.stream.getVideoTracks()[0];
      const { width: videoWidth, height: videoHeight } = videoTrack.getSettings();
      const image = await this.imageCapture.takePhoto({
        imageWidth: videoWidth,
        imageHeight: videoHeight,
      });
      await this.checkImageResolutionMatchesVideoStream(image, videoTrack);

      return image;
    } catch (e) {
      rLogger.info(
        "webMediaDevice.grabFrameFallback",
        `Error running takePhoto '${e}'. Trying grabFrame instead.`
      );
      const frame = await this.grabFrame();

      if (frame) {
        return frame;
      } else {
        rLogger.error("webMediaDevice.noImageData", "Both takePhoto and grabFrame failed");
        throw "webMediaDevice.noImageData Both takePhoto and grabFrame failed";
      }
    }
  }

  // Some devices will capture a different resolution with ImageCapture.takePhoto() from the video stream for some reason.
  // This is regardless of the imageWidth and imageHeight that are specified (eg MacBook FaceTime camera captures 1552x1552).
  private checkImageResolutionMatchesVideoStream = async (
    image: Blob,
    videoTrack: MediaStreamTrack
  ) => {
    // todo is image onload better
    const imageBitmap = await createImageBitmap(image);
    const { width: imageWidth, height: imageHeight } = imageBitmap;
    imageBitmap.close();

    const { width: videoWidth, height: videoHeight } = videoTrack.getSettings();

    rLogger.info("webMediaDevice.checkImageResolutionMatchesVideoStream.dimensions", {
      imageWidth,
      imageHeight,
      videoWidth,
      videoHeight,
    });

    if (imageWidth !== videoWidth || imageHeight !== videoHeight) {
      throw "ImageCapture resolution does not match video track resolution";
    }
  };

  // This is a backup for when ImageCapture.takePhoto() has an error
  private async grabFrame(): Promise<Blob | null> {
    if (!this.imageCapture) {
      throw "Device must be open before grabFrame can be called";
    }

    rLogger.info("webMediaDevice.grabFrame");
    const bitmap = await this.imageCapture.grabFrame();

    const canvas = document.createElement("canvas");
    canvas.height = bitmap.height;
    canvas.width = bitmap.width;
    const context = canvas.getContext("bitmaprenderer");
    context?.transferFromImageBitmap(bitmap);

    return new Promise((res) => canvas.toBlob((blob) => res(blob), "image/jpeg"));
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

  static addDeviceChangeListener(listener: () => void): void {
    navigator.mediaDevices.addEventListener("devicechange", listener);
  }

  static removeDeviceChangeListener(listener: () => void): void {
    navigator.mediaDevices.removeEventListener("devicechange", listener);
  }
}

export default WebMediaDevice;
