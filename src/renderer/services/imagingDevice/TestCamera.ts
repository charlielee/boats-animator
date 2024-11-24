import { zeroPad } from "../../../common/utils";
import * as rLogger from "../rLogger/rLogger";
import { ImagingDevice, ImagingDeviceIdentifier, ImagingDeviceType } from "./ImagingDevice";
import { ImagingDeviceResolution } from "./ImagingDeviceResolution";
import {
  ImagingDeviceSetting,
  ImagingDeviceSettingType,
  ImagingDeviceSettingValue,
  makeBooleanSetting,
  makeChangedSetting,
  makeListSetting,
  makeRangeSetting,
} from "./ImagingDeviceSettings";

const TEST_CAMERA_DEVICE_ID = "a9cafa41-f712-478d-b23e-296e2cbf4ebe";
export const TEST_CAMERA_IDENTIFIER: ImagingDeviceIdentifier = {
  type: ImagingDeviceType.TEST_CAMERA,
  deviceId: TEST_CAMERA_DEVICE_ID,
  name: "Test Camera",
};

const ERRORS_ABOVE_5_SETTING_NAME = "rangeErrorsAbove5";

export class TestCamera implements ImagingDevice {
  private canvas = document.createElement("canvas");
  private textCounter = 0;
  private settings: ImagingDeviceSetting[] = [
    makeBooleanSetting("boolean", false),
    makeListSetting("list", "Option 1", ["Option 1", "Option 2", "Option 3"]),
    makeRangeSetting("range", 1, { max: 10, min: 1, step: 1 }),
    makeRangeSetting(ERRORS_ABOVE_5_SETTING_NAME, 1, { max: 10, min: 1, step: 1 }),
  ];
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
    this.updateCanvasText();

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

    this.updateCanvasText(zeroPad(this.textCounter++, 5));
    const image: Blob | null = await new Promise((res) =>
      this.canvas.toBlob((blob) => res(blob), "image/jpeg")
    );
    this.updateCanvasText();

    if (image === null) {
      throw "Unable to capture image as toBlob returned null";
    }
    return image;
  }

  getResolution(): ImagingDeviceResolution {
    return { width: this.canvas.width, height: this.canvas.height };
  }

  getSettings(): ImagingDeviceSetting[] {
    return this.settings;
  }

  async changeSetting(name: string, value: ImagingDeviceSettingValue): Promise<void> {
    const index = this.settings.findIndex((s) => s.name === name);
    const setting = this.settings.find((s) => s.name === name);
    if (setting === undefined) {
      throw `Unable to find setting ${name}`;
    }

    const newSetting = makeChangedSetting(setting, value);

    // This is to test settings erroring
    if (
      newSetting.type === ImagingDeviceSettingType.RANGE &&
      newSetting.name === ERRORS_ABOVE_5_SETTING_NAME &&
      newSetting.value > 5
    ) {
      throw "This setting must not have a value greater than 5";
    }

    this.settings[index] = newSetting;
    this.updateCanvasText();
  }

  private fillCanvasGreen() {
    const context = this.canvas.getContext("2d");
    if (context) {
      context.fillStyle = "darkseagreen";
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private updateCanvasText(text: string = "Live") {
    const context = this.canvas.getContext("2d");
    if (context) {
      this.fillCanvasGreen();
      context.font = "200px serif";
      context.fillStyle = "black";
      context.fillText(text, 120, 300);

      const settingsFontSize = 40;
      context.font = `${settingsFontSize}px serif`;
      this.settings.forEach((setting, i) => {
        context.fillText(JSON.stringify(setting), settingsFontSize, 500 + i * settingsFontSize);
      });
    }
  }
}
