import { Dispatch } from "react";
import {
  editUserPreferences,
  UserPreferencesAction,
  UserPreferencesState,
} from "../../redux/bundles/userPreferences";

export const changeWorkingDirectory = async (
  userPreferences: UserPreferencesState,
  dispatch: Dispatch<UserPreferencesAction>
) => {
  const workingDirectory = await window.preload.ipc.SETTINGS_OPEN_DIR_DIALOG(
    userPreferences.workingDirectory,
    "Select a directory to save captured frames"
  );

  dispatch(
    editUserPreferences({
      workingDirectory,
    })
  );
};
