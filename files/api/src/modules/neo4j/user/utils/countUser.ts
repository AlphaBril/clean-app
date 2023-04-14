import { Session } from "neo4j-driver";
import { generateParams } from "@shared/utils";
import { User } from "./user";

export const countSimilarUsers = async (session: Session, user: User) => {
  const cypher = `MATCH (n: user) WHERE ${generateParams(
    Object.keys(user),
    "n",
    true
  )} RETURN count(n)`;
  const result = await session.run(cypher, user);
  return result.records.map((p) => p.get("count(n)"))[0];
};
