// Callback over promise fs methods have been used because otherwise
// annoying workarounds are required to access NodeJS.ErrnoException
// eg https://stackoverflow.com/questions/51523509/
import { app, shell } from "electron";
import { mkdir, writeFile } from "fs";
import * as path from "path";
import { dirname } from "path";
import logger from "../logger/Logger";

export const makeContainingDirectory = (filePath: string): Promise<void> =>
  new Promise((resolve, reject) => {
    logger.info("fileUtils.makeContainingDirectory", filePath);

    const directory = dirname(filePath);
    mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

export const saveDataToDisk = async (filePath: string, rawData: Uint8Array): Promise<void> =>
  new Promise((resolve, reject) => {
    writeFile(filePath, rawData, async (err) => {
      if (err) {
        // Specified pathname does not exist
        if (err.code === "ENOENT") {
          await makeContainingDirectory(filePath);
          saveDataToDisk(filePath, rawData);
        } else {
          logger.warn("fileUtils.saveDataToDisk.error", filePath);
          reject(err);
        }
      } else {
        logger.info("fileUtils.saveDataToDisk.success", filePath);
      }

      resolve();
    });
  });

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
