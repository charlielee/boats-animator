import { UserPreferences } from "../../../common/UserPreferences";

export const handleOnCloseButtonClick = async (
  userPreferences: UserPreferences
) => {
  const confirmClose = await window.preload.ipcToMain.settingsOpenConfirmPrompt(
    "Are you sure you want to exit Boats Animator?"
  );

  if (confirmClose) {
    await window.preload.ipcToMain.settingsSave(userPreferences);
    window.close();
  }
};
