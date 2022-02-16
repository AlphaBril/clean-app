import { config } from "dotenv";
config();

export const NEO4J_PROTOCOL = "neo4j";
export const NEO4J_ADDRESS = process.env.NEO4J_ADDRESS || "";
export const NEO4J_PORT = process.env.NEO4J_PORT || "";
export const NEO4J_LOGIN = process.env.NEO4J_LOGIN || "";
export const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || "";
