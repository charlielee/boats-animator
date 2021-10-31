import { Dispatch } from "react";
import {
  editSettings,
  SettingsAction,
  SettingsState,
} from "../../redux/bundles/settings";

export const changeExportFrameDir = async (
  settings: SettingsState,
  dispatch: Dispatch<SettingsAction>
) => {
  const newDirectory = await window.preload.ipc.SETTINGS_OPEN_DIR_DIALOG(
    settings.projectDefaults.exportFrameDir,
    "Select a directory to save captured frames"
  );

  dispatch(
    editSettings({
      ...settings,
      projectDefaults: {
        ...settings.projectDefaults,
        exportFrameDir: newDirectory,
      },
    })
  );
};
