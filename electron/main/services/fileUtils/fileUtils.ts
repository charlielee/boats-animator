import { app, shell } from "electron";
import * as path from "path";

export const openUserDataDirectory = async (): Promise<void> => {
  const errorMessage = await shell.openPath(app.getPath("userData"));

  if (errorMessage === "") {
    return;
  } else {
    throw errorMessage;
  }
};

export const showItemInFolder = async (filePath: string) => {
  shell.showItemInFolder(filePath);
};

export const filePathWithoutExtension = (filePath: string) =>
  path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)));
