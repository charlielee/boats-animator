import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadAndSetDeviceList } from "../../../redux/app/thunks";
import { RootState } from "../../../redux/store";
import { handleOnCloseButtonClick } from "../../../services/appListener/AppListenerService";
import * as rLogger from "../../../services/rLogger/rLogger";

const AppListeners = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userPreferences = useSelector(
    (state: RootState) => state.userPreferences
  );

  useEffect(() => {
    dispatch(loadAndSetDeviceList());

    // return onDeviceChange(() => {
    //   rLogger.info("appListener.onDeviceChange");
    //   dispatch(loadAndSetDeviceList());
    // });
  }, []);

  useEffect(() => {
    return window.preload.ipcToRenderer.onCloseButtonClick(() =>
      handleOnCloseButtonClick(userPreferences)
    );
  }, [userPreferences]);

  useEffect(() => {
    rLogger.info("appListener.routeChange", location.pathname);
  }, [location]);

  return <></>;
};

export default AppListeners;
