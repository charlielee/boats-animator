import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../store";
import { editUserPreferences } from "./reducer";

export const changeWorkingDirectory = (workingDirectory?: string) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const newDirectory = await window.preload.ipcToMain.openDirDialog({
        workingDirectory,
        title: "Select a directory to save captured frames",
      });

      dispatch(
        editUserPreferences({
          workingDirectory: newDirectory,
        })
      );
    })();
  };
};

export const loadSavedPreferences = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    return (async () => {
      const savedPreferences =
        await window.preload.ipcToMain.getUserPreferences();
      dispatch(editUserPreferences(savedPreferences));
    })();
  };
};
