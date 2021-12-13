import { Middleware, MiddlewareAPI } from "redux";
import {
  deviceIdentifierToDevice,
  ImagingDeviceIdentifier,
} from "../../services/imagingDevice/ImagingDevice";
import WebMediaDevice from "../../services/imagingDevice/WebMediaDevice";
import { setCurrentDevice, setDeviceStreaming } from "../reducers/app/reducer";
import { RootState } from "../store";
import { withLoader } from "../utils";

export enum ActionType {
  CHANGE_DEVICE = "imagingDevice/CHANGE",
  TAKE_PICTURE = "imagingDevice/TAKE_PICTURE",
  ATTACH_STREAM_TO_VIDEO = "imagingDevice/ATTACH_STREAM_TO_VIDEO",
}

export const createCaptureMiddleware: Middleware<{}, RootState> = (
  storeApi: MiddlewareAPI
) => {
  const { dispatch } = storeApi;
  let currentDevice: WebMediaDevice | undefined = undefined;

  return (next) => (action) => {
    const { deviceList } = storeApi.getState().app;

    const getDeviceIdentifierById = (deviceId: string) =>
      deviceList.find(
        (identifier: ImagingDeviceIdentifier) =>
          identifier.deviceId === deviceId
      );

    switch (action.type) {
      case ActionType.CHANGE_DEVICE: {
        withLoader(
          dispatch,
          "Loading device",
          (async () => {
            currentDevice?.close();
            dispatch(setDeviceStreaming(false));

            const deviceIdentifier = getDeviceIdentifierById(
              action.payload.deviceId
            );
            storeApi.dispatch(setCurrentDevice(deviceIdentifier));

            if (deviceIdentifier) {
              currentDevice = deviceIdentifierToDevice(deviceIdentifier);
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
