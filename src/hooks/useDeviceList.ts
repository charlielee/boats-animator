import { useEffect, useState } from "react";
import {
  ImagingDeviceIdentifier,
  addDeviceChangeListeners,
  listDevices,
  removeDeviceChangeListeners,
} from "../services/imagingDevice/ImagingDevice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useDeviceList = () => {
  const showTestCamera = useSelector(
    (state: RootState) => state.app.userPreferences.showTestCamera
  );
  const [deviceList, setDeviceList] = useState<ImagingDeviceIdentifier[]>([]);

  useEffect(() => {
    const fetchDeviceList = async () => {
      setDeviceList(await listDevices(showTestCamera));
    };
    fetchDeviceList();
    addDeviceChangeListeners(fetchDeviceList);

    return () => {
      removeDeviceChangeListeners(fetchDeviceList);
    };
  }, [showTestCamera]);

  return deviceList;
};

export default useDeviceList;
