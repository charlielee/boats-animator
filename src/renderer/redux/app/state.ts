import { AppMode } from "../../../common/AppMode";
import { ImagingDevice } from "../../services/imagingDevice/ImagingDevice";

export interface AppState {
  appMode: AppMode;
  currentDevice?: ImagingDevice;
  deviceList: ImagingDevice[];
  loadingMessage?: string;
}

export const initialAppState: AppState = {
  appMode: AppMode.CAPTURE,
  currentDevice: undefined,
  deviceList: [],
  loadingMessage: undefined,
};
