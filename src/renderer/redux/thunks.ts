import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { editUserPreferences, startLoading, stopLoading } from "./slices/appSlice";
import { RootState } from "./store";

export const loadSavedPreferences = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const savedPreferences = await window.preload.ipcToMain.getUserPreferences();
      dispatch(editUserPreferences(savedPreferences));
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
