import { Dispatch } from "react";
import { IpcChannel } from "../../../common/IpcApi";
import {
  editSettings,
  SettingsAction,
  SettingsState,
} from "../../redux/bundles/settings";

export const changeFrameDir = async (
  settings: SettingsState,
  dispatch: Dispatch<SettingsAction>
) => {
  const newDirectory = await window.preload.ipc[
    IpcChannel.SETTINGS_OPEN_DIR_DIALOG
  ](settings.exportFrameDir, "Select a directory to save captured frames");

  dispatch(
    editSettings({
      ...settings,
      exportFrameDir: newDirectory,
    })
  );
};
