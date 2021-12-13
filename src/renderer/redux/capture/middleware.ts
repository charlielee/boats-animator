import { Action, Middleware, MiddlewareAPI } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  deviceIdentifierToDevice,
  ImagingDevice,
} from "../../services/imagingDevice/ImagingDevice";
import { setCurrentDevice, setIsDeviceOpen } from "../app/actions";
import { setCurrentDeviceFromId } from "../app/thunks";
import { RootState } from "../store";
import { withLoader } from "../utils";

export enum ActionType {
  CLOSE_DEVICE = "imagingDevice/CLOSE_DEVICE",
  OPEN_DEVICE = "imagingDevice/OPEN_DEVICE",
  CHANGE_DEVICE = "imagingDevice/CHANGE_DEVICE",
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
      case ActionType.CLOSE_DEVICE: {
        currentDevice?.close();
        dispatch(setIsDeviceOpen(false));
        return;
      }
      case ActionType.OPEN_DEVICE: {
        withLoader(
          dispatch,
          "Loading device",
          (async () => {
            const deviceOpened = await currentDevice?.open();

            if (deviceOpened) {
              storeApi.dispatch(setIsDeviceOpen(true));
            } else {
              storeApi.dispatch(setCurrentDevice());
            }
          })()
        );
        return;
      }
      case ActionType.CHANGE_DEVICE: {
        dispatch(closeDevice());

        const identifier = dispatch(
          setCurrentDeviceFromId(action.payload.deviceId)
        );
        if (identifier) {
          currentDevice = deviceIdentifierToDevice(identifier);
        } else {
          currentDevice = undefined;
          return;
        }

        dispatch(openDevice());

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

export const closeDevice = () => ({
  type: ActionType.CLOSE_DEVICE,
});

export const openDevice = () => ({
  type: ActionType.OPEN_DEVICE,
});

export const changeDevice = (deviceId?: string) => ({
  type: ActionType.CHANGE_DEVICE,
  payload: { deviceId },
});

export const attachStreamToVideo = (element: HTMLVideoElement) => ({
  type: ActionType.ATTACH_STREAM_TO_VIDEO,
  payload: { element },
});
