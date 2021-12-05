import LogLevel from "../../../common/LogLevel";

export const info = (
  loggingCode: string,
  message?: string | Record<string, string>
) =>
  window.preload.ipcToMain.logRenderer({
    logLevel: LogLevel.INFO,
    loggingCode,
    message,
  });

export const warn = (
  loggingCode: string,
  message?: string | Record<string, string>
) =>
  window.preload.ipcToMain.logRenderer({
    logLevel: LogLevel.WARN,
    loggingCode,
    message,
  });

export const error = (
  loggingCode: string,
  message?: string | Record<string, string>
) =>
  window.preload.ipcToMain.logRenderer({
    logLevel: LogLevel.ERROR,
    loggingCode,
    message,
  });
