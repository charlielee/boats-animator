import { path } from "@ffmpeg-installer/ffmpeg";
import { spawn } from "child_process";
import { BrowserWindow } from "electron";
import IpcChannel from "../../../common/ipc/IpcChannel";
import { sendToRenderer } from "../ipcToMainHandler/IpcToMainHandler";
import logger from "../logger/Logger";

export const render = (
  win: BrowserWindow,
  ffmpegArgs: string[]
): Promise<number> =>
  new Promise((resolve) => {
    const ffmpegPath = path.replace("app.asar", "app.asar.unpacked");
    const ffmpeg = spawn(ffmpegPath, ffmpegArgs);

    // All ffmpeg output goes to stderrdata
    // https://stackoverflow.com/questions/35169650/
    ffmpeg.stderr.on("data", (data) => {
      // TODO is the toString required?
      logger.info("exportVideo.render.data", data);
      logger.info("exportVideo.render.data", data.toString());
      sendToRenderer(win, IpcChannel.ON_EXPORT_VIDEO_DATA, {
        data: data.toString(),
      });
    });

    // Returns a promise with the exit code
    ffmpeg.on("exit", (code) => {
      resolve(code ?? 0);
    });
  });
