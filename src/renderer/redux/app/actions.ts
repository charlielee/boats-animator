import { AppMode } from "../../../common/AppMode";
import { ImagingDeviceIdentifier } from "../../services/imagingDevice/ImagingDevice";

export enum AppActionType {
  SET_APP_MODE = "app/SET_APP_MODE",
  SET_CURRENT_DEVICE = "app/SET_CURRENT_DEVICE",
  SET_IS_DEVICE_OPEN = "app/SET_IS_DEVICE_OPEN",
  SET_DEVICE_LIST = "app/SET_DEVICE_LIST",
  START_LOADING = "app/START_LOADING",
  STOP_LOADING = "app/STOP_LOADING",
}

export type AppAction =
  | AppAction.SetAppMode
  | AppAction.SetCurrentDevice
  | AppAction.SetIsDeviceOpen
  | AppAction.SetDeviceList
  | AppAction.StartLoading
  | AppAction.StopLoading;

export namespace AppAction {
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

  export interface StartLoading {
    type: AppActionType.START_LOADING;
    payload: { message: string };
  }

  export interface StopLoading {
    type: AppActionType.STOP_LOADING;
  }
}

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

export const startLoading = (message: string): AppAction.StartLoading => ({
  type: AppActionType.START_LOADING,
  payload: { message },
});

export const stopLoading = (): AppAction.StopLoading => ({
  type: AppActionType.STOP_LOADING,
});
