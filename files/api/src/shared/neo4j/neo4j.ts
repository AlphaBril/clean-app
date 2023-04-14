import neo4j from "neo4j-driver";

import {
  NEO4J_ADDRESS,
  NEO4J_LOGIN,
  NEO4J_PASSWORD,
  NEO4J_PORT,
  NEO4J_PROTOCOL,
} from "@constants/neo4j";

const neo4jAuth = neo4j.auth.basic(NEO4J_LOGIN, NEO4J_PASSWORD);
const authOptions = { disableLosslessIntegers: true };

export const getDriver = () =>
  neo4j.driver(
    `${NEO4J_PROTOCOL}://${NEO4J_ADDRESS}:${NEO4J_PORT}`,
    neo4jAuth,
    authOptions
  );
export const getSession = () => getDriver().session();
// session = getSession() -> session.run() -> session.close()
