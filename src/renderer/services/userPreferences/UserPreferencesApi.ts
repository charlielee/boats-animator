import { Dispatch } from "react";
import { UserPreferencesAction } from "../../redux/userPreferences/actions";
import { editUserPreferences } from "../../redux/userPreferences/reducer";

export const changeWorkingDirectory = async (
  dispatch: Dispatch<UserPreferencesAction>,
  currentDirectory?: string
) => {
  const workingDirectory = await window.preload.ipcToMain.settingsOpenDirDialog(
    currentDirectory,
    "Select a directory to save captured frames"
  );

  dispatch(
    editUserPreferences({
      workingDirectory,
    })
  );
};

export const loadPreferences = async (
  dispatch: Dispatch<UserPreferencesAction>
) => {
  const savedPreferences = await window.preload.ipcToMain.getUserPreferences();
  dispatch(editUserPreferences(savedPreferences));
};
