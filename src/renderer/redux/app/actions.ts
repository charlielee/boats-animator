import { AppMode } from "../../../common/AppMode";

export enum AppActionType {
  SET_APP_MODE = "app/SET_APP_MODE",
  START_LOADING = "app/START_LOADING",
  STOP_LOADING = "app/STOP_LOADING",
}

interface SetAppModeAppAction {
  type: AppActionType.SET_APP_MODE;
  payload: { appMode: AppMode };
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
  | StartLoadingAppAction
  | StopLoadingAppAction;
