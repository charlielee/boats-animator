import { AppMode } from "../../../common/AppMode";
import { ImagingDeviceIdentifier } from "../../services/imagingDevice/ImagingDevice";

export enum AppActionType {
  SET_APP_MODE = "app/SET_APP_MODE",
  SET_CURRENT_DEVICE = "app/SET_CURRENT_DEVICE",
  SET_CURRENT_DEVICE_STREAMING = "app/SET_CURRENT_DEVICE_STREAMING",
  SET_DEVICE_LIST = "app/SET_DEVICE_LIST",
  START_LOADING = "app/START_LOADING",
  STOP_LOADING = "app/STOP_LOADING",
}

// export type AppAction =

export type AppAction =
  | AppAction.SetAppMode
  | AppAction.SetCurrentDevice
  | AppAction.SetCurrentDeviceStreaming
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

  export interface SetCurrentDeviceStreaming {
    type: AppActionType.SET_CURRENT_DEVICE_STREAMING;
    payload: { currentDeviceStreaming: boolean };
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

export const setDeviceStreaming = (
  currentDeviceStreaming: boolean
): AppAction.SetCurrentDeviceStreaming => ({
  type: AppActionType.SET_CURRENT_DEVICE_STREAMING,
  payload: { currentDeviceStreaming },
});

export const startLoading = (message: string): AppAction.StartLoading => ({
  type: AppActionType.START_LOADING,
  payload: { message },
});

export const stopLoading = (): AppAction.StopLoading => ({
  type: AppActionType.STOP_LOADING,
});
