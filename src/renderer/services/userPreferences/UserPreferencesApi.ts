import { Dispatch } from "react";
import {
  editUserPreferences,
  UserPreferencesAction,
  UserPreferencesState,
} from "../../redux/bundles/userPreferences";

export const changeExportFrameDir = async (
  userPreferences: UserPreferencesState,
  dispatch: Dispatch<UserPreferencesAction>
) => {
  const newDirectory = await window.preload.ipc.SETTINGS_OPEN_DIR_DIALOG(
    userPreferences.projectDefaults.exportFrameDir,
    "Select a directory to save captured frames"
  );

  dispatch(
    editUserPreferences({
      ...userPreferences,
      projectDefaults: {
        ...userPreferences.projectDefaults,
        exportFrameDir: newDirectory,
      },
    })
  );
};
