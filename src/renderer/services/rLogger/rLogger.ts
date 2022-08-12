import { Primitive } from "../../../common/Flavors";
import LogLevel from "../../../common/LogLevel";

export const info = (
  loggingCode: string,
  message?: Primitive | Record<string, Primitive>
) =>
  window.preload.ipcToMain.logRenderer({
    logLevel: LogLevel.INFO,
    loggingCode,
    message,
  });

export const warn = (
  loggingCode: string,
  message?: Primitive | Record<string, Primitive>
) =>
  window.preload.ipcToMain.logRenderer({
    logLevel: LogLevel.WARN,
    loggingCode,
    message,
  });

export const error = (
  loggingCode: string,
  message?: Primitive | Record<string, Primitive>
) =>
  window.preload.ipcToMain.logRenderer({
    logLevel: LogLevel.ERROR,
    loggingCode,
    message,
  });
