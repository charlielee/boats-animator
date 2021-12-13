import { AppMode } from "../../../common/AppMode";
import { ImagingDeviceIdentifier } from "../../services/imagingDevice/ImagingDevice";

export interface AppState {
  appMode: AppMode;
  currentDevice?: ImagingDeviceIdentifier;
  isDeviceOpen: boolean;
  deviceList: ImagingDeviceIdentifier[];
  loadingMessage?: string;
}

export const initialAppState: AppState = {
  appMode: AppMode.CAPTURE,
  currentDevice: undefined,
  isDeviceOpen: false,
  deviceList: [],
  loadingMessage: undefined,
};
