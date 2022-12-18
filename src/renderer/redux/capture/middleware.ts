import { Action, Middleware, MiddlewareAPI } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { makeFrameFileRef } from "../../../common/FileRef";
import cameraSound from "../../audio/camera.wav";
import { saveBlobToDisk } from "../../services/blobUtils/blobUtils";
import {
  deviceIdentifierToDevice,
  ImagingDevice,
} from "../../services/imagingDevice/ImagingDevice";
import {
  makeFrameFilePath,
  makeFrameTrackItem,
} from "../../services/project/projectBuilder";
import { setCurrentDeviceFromId, updateCameraAccessStatus } from "../thunks";
import { RootState } from "../store";
import { withCurrentTake, withLoader } from "../utils";
import {
  CaptureAction,
  CaptureActionType,
  closeDevice,
  openDevice,
} from "./actions";
import { setIsDeviceOpen, setCurrentDevice } from "../slices/appSlice";
import {
  addFileRef,
  addFrameTrackItem,
  incrementExportedFrameNumber,
} from "../slices/projectSlice";

export const createCaptureMiddleware: Middleware<
  Record<string, unknown>,
  RootState
> = (storeApi: MiddlewareAPI<ThunkDispatch<RootState, void, Action>>) => {
  const { getState, dispatch } = storeApi;
  let currentDevice: ImagingDevice | undefined = undefined;

  return (next) => (action: CaptureAction) => {
    const state: RootState = getState();

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
        withCurrentTake(state, async (take) => {
          if (currentDevice === undefined) {
            return;
          }

          if (state.app.userPreferences.playCaptureSound) {
            const audio = new Audio(cameraSound);
            audio.play();
          }

          const imageData = await currentDevice.takePhoto();
          const imageUrl = URL.createObjectURL(imageData);

          const filePath = makeFrameFilePath(take);
          const trackItem = makeFrameTrackItem(filePath);
          saveBlobToDisk(filePath, imageData);

          dispatch(addFileRef(makeFrameFileRef(trackItem.id, imageUrl)));
          dispatch(addFrameTrackItem(trackItem));
          dispatch(incrementExportedFrameNumber());
        });
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
