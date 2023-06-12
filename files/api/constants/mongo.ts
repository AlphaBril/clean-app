import { config } from "dotenv";
config();

export const MONGO_PROTOCOL = "mongodb";
export const MONGO_ADDRESS = process.env.MONGO_ADDRESS || "sample.host";
export const MONGO_PORT = process.env.MONGO_PORT || "27017";
export const MONGO_LOGIN = process.env.MONGO_LOGIN || "user";
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "pass";
