import { Action, Middleware, MiddlewareAPI } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { makeFrameTrackItem } from "../../../common/Project";
import {
  deviceIdentifierToDevice,
  ImagingDevice,
} from "../../services/imagingDevice/ImagingDevice";
import {
  addFileDataUrl,
  setCurrentDevice,
  setIsDeviceOpen,
} from "../app/actions";
import {
  setCurrentDeviceFromId,
  updateCameraAccessStatus,
} from "../app/thunks";
import { addFrameTrackItem } from "../project/actions";
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
        if (!currentDevice) {
          return;
        }

        currentDevice.close();
        dispatch(setIsDeviceOpen(false));
        return;
      }
      case CaptureActionType.OPEN_DEVICE: {
        withLoader(dispatch, "Loading device", async () => {
          if (!currentDevice) {
            return;
          }

          const hasCameraAccess = await dispatch(updateCameraAccessStatus());
          const deviceOpened = hasCameraAccess && (await currentDevice.open());
          dispatch(deviceOpened ? setIsDeviceOpen(true) : setCurrentDevice());
        });
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
      case CaptureActionType.TAKE_PHOTO: {
        (async () => {
          const imageData = await currentDevice?.takePhoto();
          if (imageData) {
            const imageUrl = URL.createObjectURL(imageData);
            dispatch(addFileDataUrl(imageUrl));
            dispatch(addFrameTrackItem(makeFrameTrackItem(imageUrl)));
          }
        })();
        return;
      }
      case CaptureActionType.ATTACH_STREAM_TO_VIDEO: {
        if (currentDevice?.stream) {
          action.payload.element.srcObject = currentDevice.stream;
        }
        return;
      }
      default: {
        return next(action);
      }
    }
  };
};
