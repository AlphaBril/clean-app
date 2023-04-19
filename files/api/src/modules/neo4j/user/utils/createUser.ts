import { Session } from "neo4j-driver";
import { User } from "./user.d";
import { generateParams } from "@shared/utils";

export const createUser = async (session: Session, userData: User) => {
  const cypher = `CREATE (n: user { ${generateParams(
    Object.keys(userData),
    "n",
    false
  )} })`;
  await session.run(cypher, userData);
};
