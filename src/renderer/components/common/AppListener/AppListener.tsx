import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import { RootState } from "../../../redux/store";
import {
  loadSavedPreferences,
  onRouteChange,
  updateCameraAccessStatus,
} from "../../../redux/thunks";
import { handleOnCloseButtonClick } from "../../../services/appListener/AppListenerService";
import * as rLogger from "../../../services/rLogger/rLogger";
import { setAppVersion } from "../../../redux/slices/appSlice";

const AppListeners = (): JSX.Element => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const location = useLocation();
  const { userPreferences } = useSelector((state: RootState) => ({
    userPreferences: state.app.userPreferences,
  }));

  useEffect(() => {
    dispatch(loadSavedPreferences());
    dispatch(updateCameraAccessStatus());
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
    dispatch(onRouteChange(location.pathname as PageRoute));
  }, [dispatch, location]);

  return <></>;
};

export default AppListeners;
