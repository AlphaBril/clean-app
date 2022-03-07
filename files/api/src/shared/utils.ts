/* eslint-disable */ 
type LogStatus = "INFO" | "WARN" | "ERNO" | "RESET";
enum LogColor {
  INFO = "\x1b[32m",
  WARN = "\x1b[33m",
  ERNO = "\x1b[31m",
  RESET = "\x1b[0m",
}

export const log = (status: LogStatus, ...args: any[]): void => {
  const time = new Date();
  console.info(
    LogColor[status],
    time,
    "|",
    `[${status}]: `,
    LogColor.RESET,
    ...args
  );
};
export const warn = (...args: any[]): void => log("WARN", ...args);
export const error = (...args: any[]): void => log("ERNO", ...args);
export const info = (...args: any[]): void => log("INFO", ...args);

export const resError = (res: any, status: number, message: string) => {
  error(message);
  return res.status(status).json({ message });
};
export const resWarn = (res: any, status: number, message: string) => {
  warn(message);
  return res.status(status).json({ message });
};
export const notFound = (res: any, message: string) =>
  resWarn(res, 404, message);
export const unauthorized = (res: any, message: string) =>
  resWarn(res, 401, message);
export const conflict = (res: any, message: string) =>
  resWarn(res, 409, message);
export const badRequest = (res: any, message: string) =>
  resWarn(res, 400, message);
export const internalError = (res: any) => (e: any) => resError(res, 500, e);
