import { config } from "dotenv";
config();

export const POSTGRES_PROTOCOL = "postgresql";
export const POSTGRES_ADDRESS =
  process.env.POSTGRES_ADDRESS || "database.server.com";
export const POSTGRES_PORT = process.env.POSTGRES_PORT || "3211";
export const POSTGRES_LOGIN = process.env.POSTGRES_LOGIN || "dbuser";
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "secret";
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || "mydb";
