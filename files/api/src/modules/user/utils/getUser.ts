import { Session } from "neo4j-driver";
import { generateParams } from "../../../shared/utils";
import { User } from "./user";

export const getUser = async (session: Session, userData: User) => {
  const result = await session.run(
    "MATCH (n: `user`{ " +
      generateParams(Object.keys(userData), "", false) +
      "}) " +
      "RETURN n",
    userData
  );
  return result.records.map((p: any) => p.get(0));
};
