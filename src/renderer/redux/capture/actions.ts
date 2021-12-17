export enum CaptureActionType {
  CLOSE_DEVICE = "imagingDevice/CLOSE_DEVICE",
  OPEN_DEVICE = "imagingDevice/OPEN_DEVICE",
  CHANGE_DEVICE = "imagingDevice/CHANGE_DEVICE",
  TAKE_PICTURE = "imagingDevice/TAKE_PICTURE",
  ATTACH_STREAM_TO_VIDEO = "imagingDevice/ATTACH_STREAM_TO_VIDEO",
}

export const closeDevice = () => ({
  type: CaptureActionType.CLOSE_DEVICE,
});

export const openDevice = () => ({
  type: CaptureActionType.OPEN_DEVICE,
});

export const changeDevice = (deviceId?: string) => ({
  type: CaptureActionType.CHANGE_DEVICE,
  payload: { deviceId },
});

export const attachStreamToVideo = (element: HTMLVideoElement) => ({
  type: CaptureActionType.ATTACH_STREAM_TO_VIDEO,
  payload: { element },
});
