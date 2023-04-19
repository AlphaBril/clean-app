import { Session } from "neo4j-driver";
import { User } from "./user.d";
import { generateParams } from "@shared/utils";

export const updateUser = async (
  session: Session,
  userData: User,
  token: string
) => {
  const cypher = `MATCH (n: user) WHERE n.Token = $oldToken SET ${generateParams(
    Object.keys(userData),
    "n",
    true
  )} RETURN n`;
  const result = await session.run(cypher, { oldToken: token, ...userData });
  return result.records.map((p) => p.get("n"))[0];
};
