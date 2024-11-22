import { ImagingDevice, ImagingDeviceIdentifier, ImagingDeviceType } from "./ImagingDevice";
import * as rLogger from "../rLogger/rLogger";
import { ImagingDeviceResolution } from "./ImagingDeviceResolution";
import { v4 as uuidv4 } from "uuid";
import { zeroPad } from "../../../common/utils";

export class TestCamera implements ImagingDevice {
  private canvas = document.createElement("canvas");
  private textCounter = 0;
  public stream?: MediaStream;
  public capabilities = { changeResolution: true };

  constructor(public identifier: ImagingDeviceIdentifier) {}

  // todo handle resolutions
  // todo why is kindof broken when you change res
  async open(): Promise<void> {
    rLogger.info("openTestDevice");
    if (this.stream) {
      throw "Device is already open";
    }

    this.canvas.height = 1080;
    this.canvas.width = 1920;
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

export const makeTestCameraIdentifier = (): ImagingDeviceIdentifier => ({
  type: ImagingDeviceType.TEST_CAMERA,
  deviceId: uuidv4(),
  name: "Test Camera",
});
