import { zeroPad } from "../../../common/utils";
import * as rLogger from "../rLogger/rLogger";
import { ImagingDevice, ImagingDeviceIdentifier, ImagingDeviceType } from "./ImagingDevice";
import { ImagingDeviceResolution } from "./ImagingDeviceResolution";

const TEST_CAMERA_DEVICE_ID = "a9cafa41-f712-478d-b23e-296e2cbf4ebe";
export const TEST_CAMERA_IDENTIFIER: ImagingDeviceIdentifier = {
  type: ImagingDeviceType.TEST_CAMERA,
  deviceId: TEST_CAMERA_DEVICE_ID,
  name: "Test Camera",
};

export class TestCamera implements ImagingDevice {
  private canvas = document.createElement("canvas");
  private textCounter = 0;
  public stream?: MediaStream;
  public capabilities = { changeResolution: true };

  constructor(public identifier: ImagingDeviceIdentifier) {}

  async open(resolution?: ImagingDeviceResolution): Promise<void> {
    rLogger.info("openTestDevice");
    if (this.stream) {
      throw "Device is already open";
    }

    this.canvas.height = resolution?.height ?? 1080;
    this.canvas.width = resolution?.width ?? 1920;
    this.addTextToCanvas("Live");

    this.stream = this.canvas.captureStream();
  }

  close(): void {
    rLogger.info("closeTestDevice");
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = undefined;
  }

  async captureImage(): Promise<Blob> {
    if (this.stream === undefined) {
      throw "Device must be opened before captureImage can be called";
    }

    this.addTextToCanvas(zeroPad(this.textCounter++, 5));
    const image: Blob | null = await new Promise((res) =>
      this.canvas.toBlob((blob) => res(blob), "image/jpeg")
    );
    this.addTextToCanvas("Live");

    if (image === null) {
      throw "Unable to capture image as toBlob returned null";
    }
    return image;
  }

  getResolution(): ImagingDeviceResolution {
    return { width: this.canvas.width, height: this.canvas.height };
  }

  private fillCanvasGreen() {
    const context = this.canvas.getContext("2d");
    if (context) {
      context.fillStyle = "limegreen";
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private addTextToCanvas(text: string) {
    const context = this.canvas.getContext("2d");
    if (context) {
      this.fillCanvasGreen();
      context.font = "200px serif";
      context.fillStyle = "black";
      context.fillText(text, 300, 400);
    }
  }
}
