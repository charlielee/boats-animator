import { AppMode } from "../../../common/AppMode";
import { ImagingDeviceIdentifier } from "../../services/imagingDevice/ImagingDevice";

export interface AppState {
  appMode: AppMode;
  currentDevice?: ImagingDeviceIdentifier;
  currentDeviceStreaming: boolean;
  deviceList: ImagingDeviceIdentifier[];
  loadingMessage?: string;
}

export const initialAppState: AppState = {
  appMode: AppMode.CAPTURE,
  currentDevice: undefined,
  currentDeviceStreaming: false,
  deviceList: [],
  loadingMessage: undefined,
};
