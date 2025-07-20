import { UserPreferences } from "../../../electron/common/UserPreferences";

export const handleOnCloseButtonClick = async (userPreferences: UserPreferences) => {
  const confirmClose = await window.preload.ipcToMain.openConfirmPrompt({
    message: "Are you sure you want to exit Boats Animator?",
  });

  if (confirmClose) {
    await window.preload.ipcToMain.saveSettingsAndClose({ userPreferences });
  }
};
