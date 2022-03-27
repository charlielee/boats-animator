import { spawn } from "child_process";
import { BrowserWindow } from "electron";
import pathToFfmpeg from "ffmpeg-static";
import IpcChannel from "../../../common/ipc/IpcChannel";
import { sendToRenderer } from "../ipcToMainHandler/IpcToMainHandler";
import logger from "../logger/Logger";

export const render = (
  win: BrowserWindow,
  ffmpegArgs: string[]
): Promise<number> =>
  new Promise((resolve, reject) => {
    // TODO do we need to do the "asar" hack
    const ffmpegPath = pathToFfmpeg;
    const ffmpeg = spawn(ffmpegPath, ffmpegArgs);

    // All ffmpeg output goes to stderrdata
    // https://stackoverflow.com/questions/35169650/
    ffmpeg.stderr.on("data", (e) => {
      // TODO is the toString required?
      logger.info("exportVideo.render.data", e.toString());
      sendToRenderer(win, IpcChannel.ON_EXPORT_VIDEO_DATA, {
        data: e.toString(),
      });
    });

    // Returns a promise with the exit code
    ffmpeg.on("exit", (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
