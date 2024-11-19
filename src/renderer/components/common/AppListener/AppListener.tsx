import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppVersion } from "../../../redux/slices/appSlice";
import { RootState } from "../../../redux/store";
import { loadSavedPreferences } from "../../../redux/thunks";
import { handleOnCloseButtonClick } from "../../../services/appListener/AppListenerService";
import { useLocation } from "react-router-dom";
import * as rLogger from "../../../services/rLogger/rLogger";

const AppListeners = (): JSX.Element => {
  const location = useLocation();
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const { userPreferences } = useSelector((state: RootState) => ({
    userPreferences: state.app.userPreferences,
  }));

  useEffect(() => {
    dispatch(loadSavedPreferences());
  }, [dispatch]);

  const fetchAppVersion = async () => {
    const appVersion = await window.preload.ipcToMain.appVersion();
    dispatch(setAppVersion(appVersion));
  };

  useEffect(() => {
    fetchAppVersion();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
