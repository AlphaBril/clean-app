import { Session } from "neo4j-driver";
import { generateParams } from "@shared/utils";
import { User } from "./user.d";

export const getUser = async (session: Session, userData: User) => {
  const cypher = `MATCH (n: user { ${generateParams(
    Object.keys(userData),
    "",
    false
  )} }) RETURN n`;
  const result = await session.run(cypher, userData);
  return result.records.map((p) => p.get("n"))[0];
};
