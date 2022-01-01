import { AppAction, AppActionType } from "./actions";
import { AppState, initialAppState } from "./state";

const appReducer = (state = initialAppState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionType.ADD_FILE_DATA_URL:
      return {
        ...state,
        fileDataUrls: [...state.fileDataUrls, action.payload.dataUrl],
      };
    case AppActionType.EDIT_USER_PREFERENCES:
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...action.payload?.userPreferences,
        },
      };
    case AppActionType.SET_APP_MODE:
      return { ...state, appMode: action.payload.appMode };
    case AppActionType.SET_CURRENT_DEVICE:
      return { ...state, currentDevice: action.payload.currentDevice };
    case AppActionType.SET_IS_DEVICE_OPEN:
      return {
        ...state,
        isDeviceOpen: action.payload.isDeviceOpen,
      };
    case AppActionType.SET_DEVICE_LIST:
      return { ...state, deviceList: action.payload.deviceList };
    case AppActionType.SET_CAMERA_ACCESS:
      return { ...state, hasCameraAccess: action.payload.hasAccess };
    case AppActionType.START_LOADING:
      return { ...state, loadingMessage: action.payload.message };
    case AppActionType.STOP_LOADING:
      return { ...state, loadingMessage: undefined };
    default:
      return state;
  }
};

export default appReducer;
