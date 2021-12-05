import { Dispatch } from "redux";
import { UserPreferencesAction } from "./actions";
import { editUserPreferences } from "./reducer";

export const changeWorkingDirectory = (workingDirectory?: string) => {
  return (dispatch: Dispatch<UserPreferencesAction>) => {
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
  return (dispatch: Dispatch<UserPreferencesAction>) => {
    return (async () => {
      const savedPreferences =
        await window.preload.ipcToMain.getUserPreferences();
      dispatch(editUserPreferences(savedPreferences));
    })();
  };
};
