import { Middleware, MiddlewareAPI } from "redux";
import {
  deviceIdentifierToDevice,
  ImagingDeviceIdentifier,
} from "../../services/imagingDevice/ImagingDevice";
import WebMediaDevice from "../../services/imagingDevice/WebMediaDevice";
import { setDeviceStreaming } from "../reducers/app/reducer";
import { RootState } from "../store";

export enum ActionType {
  OPEN_DEVICE = "imagingDevice/OPEN",
  CLOSE_DEVICE = "imagingDevice/CLOSE",
  TAKE_PICTURE = "imagingDevice/TAKE_PICTURE",
  ATTACH_STREAM_TO_ELEMENT = "imagingDevice/ATTACH_STREAM_TO_ELEMENT",
}

export const createCaptureMiddleware: Middleware<{}, RootState> = (
  storeApi: MiddlewareAPI
) => {
  let currentDevice: WebMediaDevice | undefined = undefined;

  return (next) => (action) => {
    switch (action.type) {
      case ActionType.OPEN_DEVICE: {
        currentDevice = deviceIdentifierToDevice(action.payload.identifier);
        currentDevice.open();
        storeApi.dispatch(setDeviceStreaming(true));
        return;
      }
      case ActionType.CLOSE_DEVICE: {
        currentDevice?.close();
        currentDevice = undefined;
        storeApi.dispatch(setDeviceStreaming(false));
        return;
      }
      case ActionType.TAKE_PICTURE: {
        console.log("TODO");
        return;
      }
      case ActionType.ATTACH_STREAM_TO_ELEMENT: {
        console.log("TODO");
        return;
      }
    }

    return next(action);
    // const state = storeApi.getState();
  };
};

export const openDevice = (identifier: ImagingDeviceIdentifier) => ({
  type: ActionType.OPEN_DEVICE,
  payload: { identifier },
});

export const closeDevice = () => ({
  type: ActionType.CLOSE_DEVICE,
});

// export const stopLoading = (): AppAction => ({
//   type: AppActionType.STOP_LOADING,
// });
