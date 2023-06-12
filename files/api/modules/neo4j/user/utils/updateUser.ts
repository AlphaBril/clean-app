import { Session } from "neo4j-driver";
import { User } from "./user.d";
import { generateParams } from "@shared/utils";

export const updateUser = async (
  session: Session,
  userData: User,
  oldUsername: string
) => {
  const cypher = `MATCH (n: user) WHERE n.Username = $oldUsername SET ${generateParams(
    Object.keys(userData),
    "n",
    true
  )} RETURN n`;
  const result = await session.run(cypher, { oldUsername, ...userData });
  return result.records.map((p) => p.get("n"))[0];
};
