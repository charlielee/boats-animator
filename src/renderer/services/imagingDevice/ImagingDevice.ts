import WebMediaDevice from "./WebMediaDevice";

export interface ImagingDeviceApi {
  id: string;
  name: string;
}

const dispatchDeviceChangeEvent = () =>
  document.dispatchEvent(new CustomEvent("custom-imagingdevicechange"));

export const listDevices = async (): Promise<ImagingDeviceApi[]> => {
  const webMediaDevices = await WebMediaDevice.listDevices();
  return [...webMediaDevices];
};

export const onDeviceChange = (callback: () => void) => {
  WebMediaDevice.onDeviceChange(dispatchDeviceChangeEvent);
  document.addEventListener("custom-imagingdevicechange", callback);
};
