import { AppAction, AppActionType } from "./actions";
import { AppState, initialAppState } from "./state";

const appReducer = (state = initialAppState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionType.SET_APP_MODE:
      return { ...state, appMode: action.payload.appMode };
    case AppActionType.SET_CURRENT_DEVICE:
      return { ...state, currentDevice: action.payload.currentDevice };
    case AppActionType.SET_CURRENT_DEVICE_STREAMING:
      return {
        ...state,
        currentDeviceStreaming: action.payload.currentDeviceStreaming,
      };
    case AppActionType.SET_DEVICE_LIST:
      return { ...state, deviceList: action.payload.deviceList };
    case AppActionType.START_LOADING:
      return { ...state, loadingMessage: action.payload.message };
    case AppActionType.STOP_LOADING:
      return { ...state, loadingMessage: undefined };
    default:
      return state;
  }
};

export default appReducer;
