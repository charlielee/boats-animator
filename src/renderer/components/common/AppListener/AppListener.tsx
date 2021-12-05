import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadAndSetDeviceList } from "../../../redux/app/thunks";
import { RootState } from "../../../redux/store";
import { loadSavedPreferences } from "../../../redux/userPreferences/thunks";
import { handleOnCloseButtonClick } from "../../../services/appListener/AppListenerService";
import { onDeviceChange } from "../../../services/imagingDevice/ImagingDevice";
import * as rLogger from "../../../services/rLogger/rLogger";

const AppListeners = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userPreferences = useSelector(
    (state: RootState) => state.userPreferences
  );

  useEffect(() => {
    // Load saved preferences
    dispatch(loadSavedPreferences());

    // Get the available cameras
    dispatch(loadAndSetDeviceList());
    onDeviceChange(() => {
      dispatch(loadAndSetDeviceList());
    });
  }, []);

  // Handle pressing the close button
  useEffect(() => {
    return window.preload.ipcToRenderer.onCloseButtonClick(() =>
      handleOnCloseButtonClick(userPreferences)
    );
  }, [userPreferences]);

  // Log when changing route
  useEffect(() => {
    rLogger.info("appListener.routeChange", location.pathname);
  }, [location]);

  return <></>;
};

export default AppListeners;
