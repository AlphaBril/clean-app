import { Session } from "neo4j-driver";
import { generateParams } from "@shared/utils";
import { User } from "./user";

export const countSimilarUsers = async (session: Session, user: User) => {
  const result = await session.run(
    "MATCH (n: `user`) " +
      "WHERE " +
      generateParams(Object.keys(user), "n", true) +
      " " +
      "RETURN count(n)",
    user
  );
  return result.records.map((p: any) => p.get(0));
};
