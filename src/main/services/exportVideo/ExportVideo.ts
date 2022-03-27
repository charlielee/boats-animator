import { spawn } from "child_process";
import pathToFfmpeg from "ffmpeg-static";
import logger from "../logger/Logger";

export const render = (ffmpegArgs: string[]): Promise<number> =>
  new Promise((resolve, reject) => {
    // TODO do we need to do the "asar" hack
    const ffmpegPath = pathToFfmpeg;
    const ffmpeg = spawn(ffmpegPath, ffmpegArgs);

    // All ffmpeg output goes to stderrdata
    // https://stackoverflow.com/questions/35169650/
    ffmpeg.stderr.on("data", (e) => {
      logger.info("exportVideo.render.data", e.toString());

      // TODO pass to renderer
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
