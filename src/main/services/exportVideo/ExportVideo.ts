import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import { spawn } from "child_process";
import { BrowserWindow } from "electron";
import * as fs from "fs";
import * as path from "path";
import IpcChannel from "../../../common/ipc/IpcChannel";
import { filePathWithoutExtension } from "../fileUtils/fileUtils";
import { sendToRenderer } from "../ipcToMainHandler/IpcToMainHandler";
import logger from "../logger/Logger";

export const render = (
  win: BrowserWindow,
  ffmpegArgs: string[],
  videoFilePath: string
): Promise<number> =>
  new Promise((resolve) => {
    // Add current date to file name if already exists
    if (fs.existsSync(videoFilePath)) {
      const newVideoFilePath = [
        filePathWithoutExtension(videoFilePath),
        `_${Math.floor(new Date().getTime() / 1000)}`,
        path.extname(videoFilePath),
      ].join("");
      logger.info("exportVideo.render.handleExistingFile", {
        videoFilePath,
        newVideoFilePath,
      });

      const videoFilePathIndex = ffmpegArgs.findIndex(
        (el) => el === videoFilePath
      );
      ffmpegArgs[videoFilePathIndex] = newVideoFilePath;
    }

    logger.info("exportVideo.render.start", ffmpegArgs.join(" "));
    const ffmpeg = spawn(
      ffmpegPath.replace("app.asar", "app.asar.unpacked"),
      ffmpegArgs
    );

    // All ffmpeg output goes to stderrdata
    // https://stackoverflow.com/questions/35169650/
    ffmpeg.stderr.on("data", (data) => {
      logger.info("exportVideo.render.data", data.toString());
      sendToRenderer(win, IpcChannel.ON_EXPORT_VIDEO_DATA, {
        data: data.toString(),
      });
    });

    ffmpeg.on("exit", (code) => {
      resolve(code ?? 0);
    });
  });
