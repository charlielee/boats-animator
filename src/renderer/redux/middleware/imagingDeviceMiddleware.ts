import { Action, Middleware, MiddlewareAPI } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  deviceIdentifierToDevice,
  ImagingDevice,
} from "../../services/imagingDevice/ImagingDevice";
import { setCurrentDevice, setDeviceStreaming } from "../reducers/app/reducer";
import { setCurrentDeviceFromId } from "../reducers/app/thunks";
import { RootState } from "../store";
import { withLoader } from "../utils";

export enum ActionType {
  CHANGE_DEVICE = "imagingDevice/CHANGE",
  TAKE_PICTURE = "imagingDevice/TAKE_PICTURE",
  ATTACH_STREAM_TO_VIDEO = "imagingDevice/ATTACH_STREAM_TO_VIDEO",
}

export const createCaptureMiddleware: Middleware<{}, RootState> = (
  storeApi: MiddlewareAPI<ThunkDispatch<RootState, void, Action>>
) => {
  const { dispatch } = storeApi;
  let currentDevice: ImagingDevice | undefined = undefined;

  return (next) => (action) => {
    switch (action.type) {
      case ActionType.CHANGE_DEVICE: {
        withLoader(
          dispatch,
          "Loading device",
          (async () => {
            currentDevice?.close();
            dispatch(setDeviceStreaming(false));

            const identifier = dispatch(
              setCurrentDeviceFromId(action.payload.deviceId)
            );
            if (identifier) {
              currentDevice = deviceIdentifierToDevice(identifier);
            } else {
              currentDevice = undefined;
              return;
            }

            const deviceOpened = await currentDevice.open();
            if (deviceOpened) {
              storeApi.dispatch(setDeviceStreaming(true));
            } else {
              storeApi.dispatch(setCurrentDevice());
            }
          })()
        );

        return;
      }
      case ActionType.TAKE_PICTURE: {
        return;
      }
      case ActionType.ATTACH_STREAM_TO_VIDEO: {
        if (currentDevice?.stream) {
          action.payload.element.srcObject = currentDevice.stream;
        }
      }
    }

    return next(action);
  };
};

export const changeDevice = (deviceId?: string) => ({
  type: ActionType.CHANGE_DEVICE,
  payload: { deviceId },
});

export const attachStreamToVideo = (element: HTMLVideoElement) => ({
  type: ActionType.ATTACH_STREAM_TO_VIDEO,
  payload: { element },
});
