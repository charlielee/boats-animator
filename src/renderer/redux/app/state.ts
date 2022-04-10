import { AppMode } from "../../../common/AppMode";
import {
  defaultUserPreferences,
  UserPreferences,
} from "../../../common/UserPreferences";
import { ImagingDeviceIdentifier } from "../../services/imagingDevice/ImagingDevice";

export interface AppState {
  appMode: AppMode;
  currentDevice?: ImagingDeviceIdentifier;
  isDeviceOpen: boolean;
  deviceList: ImagingDeviceIdentifier[];
  hasCameraAccess: boolean;
  loadingMessage?: string;
  playback: {
    position: number;
  };
  userPreferences: UserPreferences;
}

export const initialAppState: AppState = {
  appMode: AppMode.CAPTURE,
  currentDevice: undefined,
  isDeviceOpen: false,
  deviceList: [],
  hasCameraAccess: true,
  loadingMessage: undefined,
  playback: {
    position: 0,
  },
  userPreferences: defaultUserPreferences,
};
