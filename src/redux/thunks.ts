import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { editUserPreferences } from "./slices/appSlice";
import { RootState } from "./store";

export const loadSavedPreferences = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const savedPreferences = await window.preload.ipcToMain.getUserPreferences();
      dispatch(editUserPreferences(savedPreferences));
    })();
  };
};
