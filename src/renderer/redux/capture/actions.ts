export enum CaptureActionType {
  CLOSE_DEVICE = "imagingDevice/CLOSE_DEVICE",
  OPEN_DEVICE = "imagingDevice/OPEN_DEVICE",
  CHANGE_DEVICE = "imagingDevice/CHANGE_DEVICE",
  TAKE_PICTURE = "imagingDevice/TAKE_PICTURE",
  ATTACH_STREAM_TO_VIDEO = "imagingDevice/ATTACH_STREAM_TO_VIDEO",
}

export type CaptureAction =
  | CaptureAction.CloseDevice
  | CaptureAction.OpenDevice
  | CaptureAction.ChangeDevice
  | CaptureAction.TakePicture
  | CaptureAction.AttachStreamToVideo;

export namespace CaptureAction {
  export interface CloseDevice {
    type: CaptureActionType.CLOSE_DEVICE;
  }

  export interface OpenDevice {
    type: CaptureActionType.OPEN_DEVICE;
  }

  export interface ChangeDevice {
    type: CaptureActionType.CHANGE_DEVICE;
    payload: { deviceId?: string };
  }

  export interface TakePicture {
    type: CaptureActionType.TAKE_PICTURE;
  }

  export interface AttachStreamToVideo {
    type: CaptureActionType.ATTACH_STREAM_TO_VIDEO;
    payload: { element: HTMLVideoElement };
  }
}

export const closeDevice = (): CaptureAction.CloseDevice => ({
  type: CaptureActionType.CLOSE_DEVICE,
});

export const openDevice = (): CaptureAction.OpenDevice => ({
  type: CaptureActionType.OPEN_DEVICE,
});

export const changeDevice = (
  deviceId?: string
): CaptureAction.ChangeDevice => ({
  type: CaptureActionType.CHANGE_DEVICE,
  payload: { deviceId },
});

export const attachStreamToVideo = (
  element: HTMLVideoElement
): CaptureAction.AttachStreamToVideo => ({
  type: CaptureActionType.ATTACH_STREAM_TO_VIDEO,
  payload: { element },
});
