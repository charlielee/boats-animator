import { AppMode } from "../../../common/AppMode";
import { AppAction, AppActionType } from "./actions";
import { AppState, initialAppState } from "./state";

const appReducer = (state = initialAppState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionType.SET_APP_MODE:
      return { ...state, appMode: action.payload.appMode };
    case AppActionType.START_LOADING:
      return { ...state, loadingMessage: action.payload.message };
    case AppActionType.STOP_LOADING:
      return { ...state, loadingMessage: undefined };
    default:
      return state;
  }
};

export const setAppMode = (appMode: AppMode): AppAction => ({
  type: AppActionType.SET_APP_MODE,
  payload: { appMode },
});

export const startLoading = (message: string): AppAction => ({
  type: AppActionType.START_LOADING,
  payload: { message },
});

export const stopLoading = (): AppAction => ({
  type: AppActionType.STOP_LOADING,
});

export default appReducer;
