import { AppMode } from "../../../common/AppMode";
import { UserPreferences } from "../../../common/UserPreferences";
import { ImagingDeviceIdentifier } from "../../services/imagingDevice/ImagingDevice";

export interface AppState {
  appMode: AppMode;
  currentDevice?: ImagingDeviceIdentifier;
  fileDataUrls: string[];
  isDeviceOpen: boolean;
  deviceList: ImagingDeviceIdentifier[];
  hasCameraAccess: boolean;
  loadingMessage?: string;
  userPreferences: UserPreferences;
}

export const initialAppState: AppState = {
  appMode: AppMode.CAPTURE,
  currentDevice: undefined,
  fileDataUrls: [],
  isDeviceOpen: false,
  deviceList: [],
  hasCameraAccess: true,
  loadingMessage: undefined,
  userPreferences: {
    workingDirectory: undefined,
  },
};
