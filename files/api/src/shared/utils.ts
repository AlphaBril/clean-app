import { response } from "../express.d";

type LogStatus = "INFO" | "WARN" | "ERNO" | "RESET";
enum LogColor {
  INFO = "\x1b[32m",
  WARN = "\x1b[33m",
  ERNO = "\x1b[31m",
  RESET = "\x1b[0m",
}

export const log = (status: LogStatus, ...args: unknown[]): void => {
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
export const warn = (...args: unknown[]): void => log("WARN", ...args);
export const error = (...args: unknown[]): void => log("ERNO", ...args);
export const info = (...args: unknown[]): void => log("INFO", ...args);

export const resError = (res: response, status: number, message: string) => {
  error(message);
  return res.status(status).json({ message });
};
export const resWarn = (res: response, status: number, message: string) => {
  warn(message);
  return res.status(status).json({ message });
};
export const notFound = (res: response, message: string) =>
  resWarn(res, 404, message);
export const unauthorized = (res: response, message: string) =>
  resWarn(res, 401, message);
export const conflict = (res: response, message: string) =>
  resWarn(res, 409, message);
export const badRequest = (res: response, message: string) =>
  resWarn(res, 400, message);
export const internalError = (res: response) => (e: unknown) =>
  resError(res, 500, e as string);
