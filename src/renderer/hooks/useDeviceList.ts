import { useEffect, useState } from "react";
import {
  ImagingDeviceIdentifier,
  addDeviceChangeListeners,
  listDevices,
  removeDeviceChangeListeners,
} from "../services/imagingDevice/ImagingDevice";

const useDeviceList = () => {
  const [deviceList, setDeviceList] = useState<ImagingDeviceIdentifier[]>([]);

  const fetchDeviceList = async () => {
    setDeviceList(await listDevices());
  };

  useEffect(() => {
    fetchDeviceList();
    addDeviceChangeListeners(fetchDeviceList);

    return () => {
      removeDeviceChangeListeners(fetchDeviceList);
    };
  }, []);

  return deviceList;
};

export default useDeviceList;
