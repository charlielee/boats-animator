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
import {
  CaptureAction,
  CaptureActionType,
  closeDevice,
  openDevice,
} from "./actions";

export const createCaptureMiddleware: Middleware<{}, RootState> = (
  storeApi: MiddlewareAPI<ThunkDispatch<RootState, void, Action>>
) => {
  const { dispatch } = storeApi;
  let currentDevice: ImagingDevice | undefined = undefined;

  return (next) => (action: CaptureAction) => {
    switch (action.type) {
      case CaptureActionType.CLOSE_DEVICE: {
        currentDevice?.close();
        dispatch(setIsDeviceOpen(false));
        return;
      }
      case CaptureActionType.OPEN_DEVICE: {
        withLoader(
          dispatch,
          "Loading device",
          (async () => {
            const deviceOpened = await currentDevice?.open();
            dispatch(deviceOpened ? setIsDeviceOpen(true) : setCurrentDevice());
          })()
        );
        return;
      }
      case CaptureActionType.CHANGE_DEVICE: {
        dispatch(closeDevice());

        const identifier = dispatch(
          setCurrentDeviceFromId(action.payload.deviceId)
        );
        if (identifier) {
          currentDevice = deviceIdentifierToDevice(identifier);
          dispatch(openDevice());
        } else {
          currentDevice = undefined;
        }

        return;
      }
      case CaptureActionType.TAKE_PICTURE: {
        return;
      }
      case CaptureActionType.ATTACH_STREAM_TO_VIDEO: {
        if (currentDevice?.stream) {
          action.payload.element.srcObject = currentDevice.stream;
        }
      }
    }

    return next(action);
  };
};
