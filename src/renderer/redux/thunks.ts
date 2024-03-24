import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { PageRoute } from "../../common/PageRoute";
import { editUserPreferences, setCameraAccess, startLoading, stopLoading } from "./slices/appSlice";
import { pauseDevice, reopenDevice } from "./slices/captureSlice";
import { RootState } from "./store";

export const loadSavedPreferences = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const savedPreferences = await window.preload.ipcToMain.getUserPreferences();
      dispatch(editUserPreferences(savedPreferences));
    })();
  };
};

export const onRouteChange = (route: PageRoute) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    switch (route) {
      case PageRoute.ANIMATOR: {
        dispatch(reopenDevice());
        return;
      }
      default: {
        // Pause streaming when a modal is open
        dispatch(pauseDevice());
        return;
      }
    }
  };
};

export const updateCameraAccessStatus = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const hasAccess = await window.preload.ipcToMain.checkCameraAccess();
      dispatch(setCameraAccess(hasAccess));
      return hasAccess;
    })();
  };
};

export const withLoader = (loadingMessage: string, callback: () => Promise<void>) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      try {
        dispatch(startLoading(loadingMessage));
        await callback();
      } finally {
        dispatch(stopLoading());
      }
    })();
  };
};
