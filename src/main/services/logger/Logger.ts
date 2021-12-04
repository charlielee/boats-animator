import { app } from "electron";
import * as fs from "fs";
import LogLevel from "../../../common/LogLevel";

const USER_DATA_PATH = app.getPath("userData");

class Logger {
  private logFilePath: string;
  private stream: fs.WriteStream | undefined;

  constructor() {
    this.logFilePath = `${USER_DATA_PATH}/boats-animator${
      app.isPackaged ? "" : "-development"
    }.log`;
  }

  initialize() {
    if (fs.existsSync(this.logFilePath)) {
      this.log(LogLevel.INFO, "logger.clear", "Log file cleared", false);
      fs.unlinkSync(this.logFilePath);
    }

    this.log(LogLevel.INFO, "logger.open", "Log file opened");
    this.stream = fs.createWriteStream(this.logFilePath, {
      // a = Open file for appending
      flags: "a",
    });
  }

  log(
    logLevel: LogLevel,
    loggingCode: string,
    message?: string,
    writeToFile: boolean = true
  ) {
    const logLine = this.buildLogLine(logLevel, loggingCode, message);

    if (!app.isPackaged) {
      console.log(logLine);
    }

    if (writeToFile && this.stream) {
      this.stream.write(`${logLine}\n`);
    } else {
      throw "Logger must be initialised first!";
    }
  }

  private buildLogLine(
    logLevel: LogLevel,
    loggingCode: string,
    message?: string
  ) {
    const logDate = new Date().toISOString();
    return JSON.stringify([logDate, logLevel, loggingCode, message]).slice(
      1,
      -1
    );
  }
}

export default new Logger();
