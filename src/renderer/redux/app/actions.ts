/* eslint-disable @typescript-eslint/no-namespace */
import { AppMode } from "../../../common/AppMode";
import { UserPreferences } from "../../../common/UserPreferences";
import { ImagingDeviceIdentifier } from "../../services/imagingDevice/ImagingDevice";

export enum AppActionType {
  EDIT_USER_PREFERENCES = "app/EDIT_USER_PREFERENCES",
  SET_APP_MODE = "app/SET_APP_MODE",
  SET_CURRENT_DEVICE = "app/SET_CURRENT_DEVICE",
  SET_IS_DEVICE_OPEN = "app/SET_IS_DEVICE_OPEN",
  SET_DEVICE_LIST = "app/SET_DEVICE_LIST",
  SET_CAMERA_ACCESS = "app/SET_CAMERA_ACCESS",
  START_LOADING = "app/START_LOADING",
  STOP_LOADING = "app/STOP_LOADING",
  SET_PLAYBACK_SPEED = "app/SET_PLAYBACK_SPEED",
}

export type AppAction =
  | AppAction.EditUserPreferences
  | AppAction.SetAppMode
  | AppAction.SetCurrentDevice
  | AppAction.SetIsDeviceOpen
  | AppAction.SetDeviceList
  | AppAction.SetCameraAccess
  | AppAction.StartLoading
  | AppAction.StopLoading;

export namespace AppAction {
  export interface EditUserPreferences {
    type: AppActionType.EDIT_USER_PREFERENCES;
    payload: { userPreferences: Partial<UserPreferences> };
  }

  export interface SetAppMode {
    type: AppActionType.SET_APP_MODE;
    payload: { appMode: AppMode };
  }

  export interface SetCurrentDevice {
    type: AppActionType.SET_CURRENT_DEVICE;
    payload: { currentDevice?: ImagingDeviceIdentifier };
  }

  export interface SetDeviceList {
    type: AppActionType.SET_DEVICE_LIST;
    payload: { deviceList: ImagingDeviceIdentifier[] };
  }

  export interface SetIsDeviceOpen {
    type: AppActionType.SET_IS_DEVICE_OPEN;
    payload: { isDeviceOpen: boolean };
  }

  export interface SetCameraAccess {
    type: AppActionType.SET_CAMERA_ACCESS;
    payload: { hasAccess: boolean };
  }

  export interface StartLoading {
    type: AppActionType.START_LOADING;
    payload: { message: string };
  }

  export interface StopLoading {
    type: AppActionType.STOP_LOADING;
  }
}

export const editUserPreferences = (
  userPreferences: Partial<UserPreferences>
): AppAction.EditUserPreferences => ({
  type: AppActionType.EDIT_USER_PREFERENCES,
  payload: { userPreferences },
});

export const setAppMode = (appMode: AppMode): AppAction.SetAppMode => ({
  type: AppActionType.SET_APP_MODE,
  payload: { appMode },
});

export const setCurrentDevice = (
  currentDevice?: ImagingDeviceIdentifier
): AppAction.SetCurrentDevice => ({
  type: AppActionType.SET_CURRENT_DEVICE,
  payload: { currentDevice },
});

export const setDeviceList = (
  deviceList: ImagingDeviceIdentifier[]
): AppAction.SetDeviceList => ({
  type: AppActionType.SET_DEVICE_LIST,
  payload: { deviceList },
});

export const setIsDeviceOpen = (
  isDeviceOpen: boolean
): AppAction.SetIsDeviceOpen => ({
  type: AppActionType.SET_IS_DEVICE_OPEN,
  payload: { isDeviceOpen },
});

export const setCameraAccess = (
  hasAccess: boolean
): AppAction.SetCameraAccess => ({
  type: AppActionType.SET_CAMERA_ACCESS,
  payload: { hasAccess },
});

export const startLoading = (message: string): AppAction.StartLoading => ({
  type: AppActionType.START_LOADING,
  payload: { message },
});

export const stopLoading = (): AppAction.StopLoading => ({
  type: AppActionType.STOP_LOADING,
});
