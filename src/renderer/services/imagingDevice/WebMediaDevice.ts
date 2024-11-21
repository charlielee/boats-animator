import { notifications } from "@mantine/notifications";
import * as rLogger from "../rLogger/rLogger";
import { ImagingDevice, ImagingDeviceIdentifier, ImagingDeviceType } from "./ImagingDevice";
import { ImagingDeviceResolution } from "./ImagingDeviceResolution";

const EXTREMELY_LARGE_WIDTH = 99999;

class WebMediaDevice implements ImagingDevice {
  public stream?: MediaStream;
  public capabilities = { changeResolution: true };
  private imageCapture?: ImageCapture;
  private takePhotoSupported: boolean = false;

  constructor(public identifier: ImagingDeviceIdentifier) {}

  async open(resolution?: ImagingDeviceResolution): Promise<void> {
    rLogger.info("webMediaDevice.open.start");
    if (this.stream) {
      throw "Device is already open";
    }

    const resolutionConstraints: MediaTrackConstraints = resolution
      ? { width: { exact: resolution.width }, height: { exact: resolution.height } }
      : { width: { ideal: EXTREMELY_LARGE_WIDTH } };

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: { exact: this.identifier.deviceId },
          ...resolutionConstraints,
        },
      });

      const videoTrack = this.stream.getVideoTracks()[0];
      this.imageCapture = new ImageCapture(videoTrack);
      this.takePhotoSupported = await this.determineCaptureMethod(videoTrack);
    } catch (e) {
      rLogger.info("webMediaDevice.open.deviceError", `${e}`);
      this.close();
      // todo throw error and handle outside of this file
      notifications.show({ message: `Unable to start ${this.identifier.name}` });
    }
  }

  close(): void {
    rLogger.info("webMediaDevice.close");
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = undefined;
    this.imageCapture = undefined;
    this.takePhotoSupported = false;
  }

  // This determines whether takePhoto() can be used by this device or if the grabFrame() fallback should be used.
  // Calling takePhoto early also prevents delay when the first image is captured
  private async determineCaptureMethod(videoTrack: MediaStreamTrack): Promise<boolean> {
    try {
      const photo = await this.takePhoto();
      await this.checkImageResolutionMatchesVideoStream(photo, videoTrack);
      rLogger.info(
        "webMediaDevice.determineCaptureMethod.takePhoto",
        "Will use takePhoto for this device"
      );
      return true;
    } catch (e) {
      rLogger.info(
        "webMediaDevice.determineCaptureMethod.takePhotoError",
        `Error using takePhoto trying grabFrame ${e}`
      );
      const frame = await this.grabFrame();
      await this.checkImageResolutionMatchesVideoStream(frame, videoTrack);
      rLogger.info(
        "webMediaDevice.determineCaptureMethod.grabFrame",
        "Will use grabFrame for this device"
      );
      return false;
    }
  }

  // Some devices will capture a different resolution with ImageCapture.takePhoto() from the video stream for some reason.
  // This is regardless of the imageWidth and imageHeight that are specified (eg MacBook FaceTime camera captures 1552x1552).
  private async checkImageResolutionMatchesVideoStream(
    image: Blob,
    videoTrack: MediaStreamTrack
  ): Promise<void> {
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
  }

  captureImage = async (): Promise<Blob> =>
    this.takePhotoSupported ? this.takePhoto() : this.grabFrame();

  private async takePhoto(): Promise<Blob> {
    rLogger.info("webMediaDevice.takePhoto");
    if (this.imageCapture === undefined || this.stream === undefined) {
      throw "Device must be open before takePhoto can be called";
    }

    try {
      const videoTrack = this.stream.getVideoTracks()[0];
      const { width: videoWidth, height: videoHeight } = videoTrack.getSettings();
      rLogger.info("takePhotoDimensions", { videoWidth, videoHeight });
      return this.imageCapture.takePhoto({
        imageWidth: videoWidth,
        imageHeight: videoHeight,
      });
    } catch (e) {
      rLogger.warn("webMediaDevice.takePhoto.error", `Error running takePhoto '${e}'`);
      throw e;
    }
  }

  private async grabFrame(): Promise<Blob> {
    rLogger.info("webMediaDevice.grabFrame");
    if (!this.imageCapture) {
      throw "Device must be open before grabFrame can be called";
    }

    const bitmap = await this.imageCapture.grabFrame();

    const canvas = document.createElement("canvas");
    canvas.height = bitmap.height;
    canvas.width = bitmap.width;
    const context = canvas.getContext("bitmaprenderer");
    context?.transferFromImageBitmap(bitmap);
    bitmap.close();

    const image: Blob | null = await new Promise((res) =>
      canvas.toBlob((blob) => res(blob), "image/jpeg")
    );
    if (image === null) {
      throw "Unable to grabFrame as toBlob returned null";
    }
    return image;
  }

  getResolution(): ImagingDeviceResolution {
    if (this.stream === undefined) {
      throw "Device must be open before getResolution can be called";
    }

    const { width, height } = this.stream.getVideoTracks()[0].getSettings();
    if (width === undefined || height === undefined) {
      throw "Unable to device getResolution";
    }

    return { width, height };
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
