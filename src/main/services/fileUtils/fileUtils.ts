// Callback over promise fs methods have been used because otherwise
// annoying workarounds are required to access NodeJS.ErrnoException
// eg https://stackoverflow.com/questions/51523509/
import { mkdir, writeFile } from "fs";
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

export const saveDataToDisk = async (
  filePath: string,
  rawData: Uint8Array
): Promise<void> =>
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