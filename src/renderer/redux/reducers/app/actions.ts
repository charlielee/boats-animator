import { AppMode } from "../../../../common/AppMode";
import { ImagingDeviceIdentifier } from "../../../services/imagingDevice/ImagingDevice";

export enum AppActionType {
  SET_APP_MODE = "app/SET_APP_MODE",
  SET_CURRENT_DEVICE = "app/SET_CURRENT_DEVICE",
  SET_DEVICE_LIST = "app/SET_DEVICE_LIST",
  START_LOADING = "app/START_LOADING",
  STOP_LOADING = "app/STOP_LOADING",
}

interface SetAppModeAppAction {
  type: AppActionType.SET_APP_MODE;
  payload: { appMode: AppMode };
}

interface SetCurrentDeviceAppAction {
  type: AppActionType.SET_CURRENT_DEVICE;
  payload: { currentDevice?: ImagingDeviceIdentifier };
}

interface SetDeviceListAppAction {
  type: AppActionType.SET_DEVICE_LIST;
  payload: { deviceList: ImagingDeviceIdentifier[] };
}

interface StartLoadingAppAction {
  type: AppActionType.START_LOADING;
  payload: { message: string };
}

interface StopLoadingAppAction {
  type: AppActionType.STOP_LOADING;
}

export type AppAction =
  | SetAppModeAppAction
  | SetCurrentDeviceAppAction
  | SetDeviceListAppAction
  | StartLoadingAppAction
  | StopLoadingAppAction;
