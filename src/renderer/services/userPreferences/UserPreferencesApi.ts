import { Dispatch } from "react";
import { UserPreferencesAction } from "../../redux/userPreferences/actions";
import { editUserPreferences } from "../../redux/userPreferences/reducer";

export const changeWorkingDirectory = async (
  dispatch: Dispatch<UserPreferencesAction>,
  workingDirectory?: string
) => {
  const newDirectory = await window.preload.ipcToMain.openDirDialog({
    workingDirectory,
    title: "Select a directory to save captured frames",
  });

  dispatch(
    editUserPreferences({
      workingDirectory: newDirectory,
    })
  );
};

export const loadPreferences = async (
  dispatch: Dispatch<UserPreferencesAction>
) => {
  const savedPreferences = await window.preload.ipcToMain.getUserPreferences();
  dispatch(editUserPreferences(savedPreferences));
};
