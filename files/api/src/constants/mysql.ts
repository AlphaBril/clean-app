import { config } from "dotenv";
config();

export const MYSQL_PROTOCOL = "mysql";
export const MYSQL_ADDRESS = process.env.MYSQL_ADDRESS || "host";
export const MYSQL_PORT = process.env.MYSQL_PORT || "3306";
export const MYSQL_LOGIN = process.env.MYSQL_LOGIN || "user";
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "pass";
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "db";
